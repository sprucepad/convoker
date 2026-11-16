import process from "node:process";
import { CHILDREN, INPUT, PARSER, PLUGINS, type AnyCommand } from ".";
import type { AST } from "./plugin";
import type { InferOptions, InferPositional } from "../types/infer";
import type { Flatten } from "../types/utils";
import {
  BUILDER_TYPE,
  HELP_STR,
  KIND,
  NAMES,
  REQUIRED,
  TYPE,
  VALIDATOR,
  VALIDATOR_ARRAY,
  type AnyArrayBuilder,
  type AnyBuilder,
  type AnySingleBuilder,
  type Input,
  type InputObj,
} from "../input/builders";

// TODO proper errors that can be caught and handled in the help screen

export interface ConcreteCLITree<TInputs extends readonly unknown[], TInput = Flatten<TInputs>> {
  args: InferPositional<TInput>;
  options: InferOptions<TInput>;
  env: InferOptions<TInput>;
  command: AnyCommand;

  errors?: Error[];
}

export async function reify(argv: string[], cmd: AnyCommand): Promise<ConcreteCLITree<any, any>> {
  const options: any = {};
  const args: any = {};
  const env: any = {};
  const errors: Error[] = [];

  const parser = cmd[PARSER];
  const pluginHost = cmd[PLUGINS];

  await pluginHost.beforeParse({ cmd, stage: "parse" });

  const ast = await parser.parse(argv);
  await traverseAndBuild(cmd, ast, parser.getNames.bind(parser), 0, options, args, env, errors);

  const parseResult = { command: cmd, options, args, env };
  await pluginHost.afterParse({ cmd, stage: "parse", parseResult });

  return parseResult;
}

export async function traverseAndBuild(
  cmd: AnyCommand,
  ast: AST,
  getNames: (names: string[]) => (string | null | undefined)[],
  i: number,
  options: any,
  args: any,
  env: any,
  errors: Error[],
) {
  const input = flatten(cmd[INPUT]);

  const mappers = input.reduce(
    (acc, obj) => {
      for (const key in obj) {
        const builder = obj[key]!;
        switch (builder[KIND]) {
          case "env":
            acc.env.set(key, builder);
            break;
          case "option":
            acc.option.set(key, builder);
            break;
          case "positional":
            acc.arg.push(Object.assign(builder, { __key: key }));
            break;
          default:
            const exhaustive: never = builder[KIND];
            throw new Error(exhaustive);
        }
      }

      return acc;
    },
    {
      option: new Map<string, AnyBuilder>(),
      arg: [] as (AnyBuilder & { __key: string })[],
      env: new Map<string, AnyBuilder>(),
    },
  );

  outer: for (const [key, builder] of mappers.env) {
    if (isArrayBuilder(builder)) {
      const split = process.env[key]!.split(",");

      const arr: any[] = [];
      for (const rawValue of split) {
        const { validatedValue, isError } = await validate(rawValue.trim(), builder, errors);
        if (isError) continue outer;

        arr.push(validatedValue);
      }

      const validationResult = await builder[VALIDATOR]?.["~standard"].validate(arr);
      if (validationResult?.issues) {
        errors.push(new Error("Validation error!"));
        continue;
      }

      env[key] = validationResult?.value ?? arr;
    } else if (isSingleBuilder(builder)) {
      const { validatedValue, isError } = await validate(process.env[key]!, builder, errors);
      if (isError) continue;

      env[key] = validatedValue;
    }
  }

  const toValidateOptions = new Map<AnyArrayBuilder, [string, ...any[]]>();

  let lastCommand = false;
  let variadicArg: { builder: AnyArrayBuilder; key: string; values: any[] } | undefined;
  let argIndex = 0;

  while (i < ast.length) {
    const node = ast[i]!;
    switch (node.type) {
      case "option": {
        for (const [key, builder] of mappers.option) {
          const names = getNames(builder[NAMES] ?? [key]);
          if (!names.some((name) => name && node.names.includes(name))) break;

          let value =
            builder[TYPE] === "boolean" || builder[TYPE] === "bool"
              ? Boolean(node.value ?? true)
              : node.value;
          if (value == null && builder[REQUIRED]) {
            const valueNode = ast[++i];
            if (!valueNode) {
              errors.push(new Error(`Missing value for ${builder[HELP_STR]}!`));
              break;
            }

            value = valueNode.rawValue;
          }

          const { validatedValue, isError } = await validate(node.rawValue, builder, errors);
          if (isError) break;

          if (isArrayBuilder(builder)) {
            if (!toValidateOptions.get(builder)) toValidateOptions.set(builder, [key]);
            toValidateOptions.get(builder)?.push(validatedValue);
          } else if (isSingleBuilder(builder)) {
            options[key] = validatedValue;
          }
        }
        break;
      }
      case "positional": {
        if (!lastCommand) {
          const child = cmd[CHILDREN].get(node.rawValue);
          if (child) {
            i = await traverseAndBuild(child.cmd, ast, getNames, ++i, options, args, env, errors);
            break;
          } else {
            lastCommand = true;
          }
        } else if (variadicArg) {
          const { validatedValue, isError } = await validate(
            node.rawValue,
            variadicArg.builder,
            errors,
          );
          if (isError) break;

          variadicArg.values.push(validatedValue);
        } else {
          const arg = mappers.arg[argIndex++];
          if (!arg) break;

          const { validatedValue, isError } = await validate(node.rawValue, arg, errors);
          if (isError) break;

          if (isArrayBuilder(arg)) {
            variadicArg = { builder: arg, key: arg.__key, values: [validatedValue] };
          } else if (isSingleBuilder(arg)) {
            args[arg.__key] = validatedValue;
          }
        }

        break;
      }
    }

    i++;
  }

  for (const [builder, [key, ...values]] of toValidateOptions) {
    const { validatedValue, isError } = await validateArray(values, builder, errors);
    if (isError) continue;

    options[key] = validatedValue;
  }

  if (variadicArg) {
    const { validatedValue, isError } = await validateArray(
      variadicArg.values,
      variadicArg.builder,
      errors,
    );
    if (isError) return i;

    args[variadicArg.key] = validatedValue;
  }

  return i;
}

function flatten(input: Input) {
  return [input].flat(Infinity) as InputObj[];
}

type ValidationResult =
  | { validatedValue?: undefined; isError: true }
  | { validatedValue: any; isError: false };

async function validate(
  value: string,
  builder: AnyBuilder,
  errors: Error[],
): Promise<ValidationResult> {
  const convertedValue = convert(value, builder[TYPE]);
  const validatedValue = await (
    isArrayBuilder(builder) ? builder[VALIDATOR_ARRAY] : builder[VALIDATOR]
  )?.["~standard"].validate(convertedValue);
  if (validatedValue?.issues) {
    errors.push(new Error("Validation error!"));
    return { isError: true };
  }

  return {
    isError: false,
    validatedValue: validatedValue ?? convertedValue,
  };
}

async function validateArray(
  values: any[],
  builder: AnyBuilder,
  errors: Error[],
): Promise<ValidationResult> {
  const validationResult = await builder[VALIDATOR]?.["~standard"].validate(values);
  if (validationResult?.issues) {
    errors.push(new Error("Validation error!"));
    return { isError: true };
  }

  return { validatedValue: validationResult?.value ?? values, isError: false };
}

function convert(raw: string, type: string) {
  switch (type) {
    case "object":
      return JSON.parse(raw);
    case "number":
      return Number(raw);
    case "boolean":
      return Boolean(raw);
    default:
      return raw;
  }
}

function isArrayBuilder(v: AnyBuilder): v is AnyArrayBuilder {
  return v[BUILDER_TYPE] === "array";
}

function isSingleBuilder(v: AnyBuilder): v is AnySingleBuilder {
  return v[BUILDER_TYPE] === "single";
}
