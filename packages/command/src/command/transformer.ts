import process from "node:process";
import { CHILDREN, INPUT, type AnyCommand } from ".";
import type { AST, Parser } from "./plugin";
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

export async function reify(
  argv: string[],
  command: AnyCommand,
  parser: Parser,
): Promise<ConcreteCLITree<any, any>> {
  const options: any = {};
  const args: any = {};
  const env: any = {};
  const errors: Error[] = [];

  const ast = await parser.parse(argv);
  await traverseAndBuild(command, ast, parser.getNames.bind(parser), 0, options, args, env, errors);

  return {
    options,
    args,
    env,
    command,
  };
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

  const maps = input.reduce(
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
            acc.arg.set(key, builder);
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
      arg: new Map<string, AnyBuilder>(),
      env: new Map<string, AnyBuilder>(),
    },
  );

  const toValidateOptions = new Map<AnyArrayBuilder, [string, ...any[]]>();
  const toValidateArgs = new Map<AnyArrayBuilder, [string, ...any[]]>();
  const toValidateEnv = new Map<AnyArrayBuilder, [string, ...any[]]>();
  let lastCommand = false;

  while (i < ast.length) {
    const node = ast[i]!;
    switch (node.type) {
      case "option": {
        for (const [key, builder] of maps.option) {
          const names = getNames(builder[NAMES] ?? [key]);
          if (!names.some((name) => name && node.names.includes(name))) continue;

          let value =
            builder[TYPE] === "boolean" || builder[TYPE] === "bool"
              ? Boolean(node.value ?? true)
              : node.value;
          if (!value && builder[REQUIRED]) {
            const valueNode = ast[++i];
            if (!valueNode) {
              errors.push(new Error(`Missing value for ${builder[HELP_STR]}!`));
              continue;
            }

            value = valueNode.rawValue;
          }

          const { validatedValue, isError } = await validate(node.rawValue, builder, errors);
          if (isError) continue;

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
        const child = cmd[CHILDREN].get(node.rawValue);
        if (child) {
          i = await traverseAndBuild(child.cmd, ast, getNames, ++i, options, args, env, errors);
          continue;
        } else {
          lastCommand = true;
        }

        if (lastCommand) {
          for (const [key, builder] of maps.arg) {
            const { validatedValue, isError } = await validate(node.rawValue, builder, errors);
            if (isError) continue;

            if (isArrayBuilder(builder)) {
              if (!toValidateArgs.get(builder)) toValidateArgs.set(builder, [key]);
              toValidateArgs.get(builder)?.push(validatedValue);
            } else if (isSingleBuilder(builder)) {
              args[key] = validatedValue;
            }
          }
        }
      }
    }

    i++;
  }

  for (const [key, builder] of maps.env) {
    const { validatedValue, isError } = await validate(process.env[key]!, builder, errors);
    if (isError) continue;

    if (isArrayBuilder(builder)) {
      if (!toValidateEnv.get(builder)) toValidateEnv.set(builder, [key]);
      toValidateEnv.get(builder)?.push(validatedValue);
    } else if (isSingleBuilder(builder)) {
      env[key] = validatedValue;
    }
  }

  for (const [builder, [key, ...values]] of toValidateOptions) {
    options[key] = (await builder[VALIDATOR]?.["~standard"].validate(values)) ?? values;
  }
  for (const [builder, [key, ...values]] of toValidateArgs) {
    args[key] = (await builder[VALIDATOR]?.["~standard"].validate(values)) ?? values;
  }
  for (const [builder, [key, ...values]] of toValidateEnv) {
    env[key] = (await builder[VALIDATOR]?.["~standard"].validate(values)) ?? values;
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
