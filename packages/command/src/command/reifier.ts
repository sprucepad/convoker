import { CHILDREN, FN, INPUT, PARSER, PLUGINS, type AnyCommand, type MiddlewareFn } from ".";
import {
  MissingEnvError,
  MissingOptionError,
  TooFewArgumentsError,
  TooManyArgumentsError,
  UnknownOptionError,
  ValidationError,
  WrongTypeError,
} from "./errors";
import type { AST } from "./plugin";
import type { InferOptions, InferPositional } from "../types/infer";
import type { Flatten } from "../types/utils";
import {
  BUILDER_TYPE,
  DEFAULT,
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

export interface ConcreteCLITree<TInputs extends readonly unknown[], TInput = Flatten<TInputs>> {
  args: InferPositional<TInput>;
  options: InferOptions<TInput>;
  env: InferOptions<TInput>;
  chain: () => Promise<number>;
  command: AnyCommand;

  errors: Error[];
}

export async function reify(
  argv: string[],
  rawEnv: Record<string, string | undefined>,
  cmd: AnyCommand,
  stage: "parse" | "run" = "parse",
): Promise<ConcreteCLITree<any, any>> {
  const options: any = {};
  const args: any = {};
  const env: any = {};
  const errors: Error[] = [];

  const parser = cmd[PARSER];
  const pluginHost = cmd[PLUGINS];
  const ref = { cmd, middleware: [] };

  await pluginHost.beforeParse({ cmd: ref.cmd, stage });

  const ast = await parser.parse(argv);
  await traverseAndBuild(
    ref,
    rawEnv,
    ast,
    parser.getNames.bind(parser),
    0,
    options,
    args,
    env,
    errors,
  );

  const props = { args, options, env };
  const parseResult = {
    errors,
    command: ref.cmd,
    chain: createChain(props, ref.middleware, ref.cmd),
    ...props,
  };

  await pluginHost.afterParse({ cmd: ref.cmd, stage, parseResult });

  return parseResult;
}

function createChain(
  ctx: Parameters<MiddlewareFn<any, any>>[0],
  middlewares: MiddlewareFn<any, any>[],
  cmd: AnyCommand,
) {
  async function run(i: number): Promise<number> {
    if (i >= middlewares.length) return (await cmd[FN]?.(ctx)) ?? 0;
    else return (await middlewares[i]!(ctx, () => run(i + 1))) ?? 0;
  }

  return () => run(0);
}

export async function traverseAndBuild(
  ref: { cmd: AnyCommand; middleware: MiddlewareFn<any, any>[] },
  rawEnv: Record<string, string | undefined>,
  ast: AST,
  getNames: (names: string[]) => (string | null | undefined)[],
  i: number,
  options: any,
  args: any,
  env: any,
  errors: Error[],
) {
  const input = flatten(ref.cmd[INPUT]);

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

  const toValidateOptions = new Map<string, any[]>();
  const alreadySetOptions = new Set<string>();

  let lastCommand = false;
  let variadicArg: { builder: AnyArrayBuilder; key: string; values: any[] } | undefined;
  let argIndex = 0;

  outer: for (const [key, builder] of mappers.env) {
    if (isArrayBuilder(builder)) {
      const split = rawEnv[key]?.split(",") ?? [];

      const arr: any[] = [];
      for (const rawValue of split) {
        const { validatedValue, isError } = await validate(rawValue.trim(), builder, errors);
        if (isError) continue outer;

        arr.push(validatedValue);
      }

      const { validatedValue, isError } = await validateArray(arr, builder, errors);
      if (isError) continue;

      env[key] = validatedValue;
    } else if (isSingleBuilder(builder)) {
      let value = rawEnv[key];
      if (value != null) {
        const { validatedValue, isError } = await validate(value, builder, errors);
        if (isError) continue;

        value = validatedValue;
      } else value = builder[DEFAULT];

      if (value == null && builder[REQUIRED]) {
        errors.push(new MissingEnvError(key));
        continue;
      }

      env[key] = value;
    }
  }

  while (i < ast.length) {
    const node = ast[i]!;
    switch (node.type) {
      case "option": {
        let found = false;
        for (const [key, builder] of mappers.option) {
          const names = getNames(builder[NAMES] ?? [key]);
          if (!names.some((name) => name && node.names.includes(name))) continue;

          found = true;

          let value =
            builder[TYPE] === "boolean" || builder[TYPE] === "bool"
              ? Boolean(node.value ?? builder[DEFAULT] ?? true)
              : node.value;
          if (value == null) {
            const valueNode = ast[i + 1];
            if (valueNode?.type === "option" || valueNode?.type === "value") {
              value = valueNode.rawValue;
            }
          }

          let validatedValue: any;
          if (typeof value === "string") {
            const result = await validate(value, builder, errors);
            if (result.isError) break;

            validatedValue = result.validatedValue;
          } else if (value == null) {
            value = builder[DEFAULT];
            if (value == null && builder[REQUIRED]) {
              errors.push(new MissingOptionError(builder[HELP_STR]));
            }
          } else validatedValue = value;

          if (isArrayBuilder(builder)) {
            if (!toValidateOptions.get(key)) toValidateOptions.set(key, []);
            toValidateOptions.get(key)?.push(validatedValue);

            alreadySetOptions.add(key);
          } else if (isSingleBuilder(builder)) {
            options[key] = validatedValue;
            alreadySetOptions.add(key);
          }

          break;
        }

        if (!found) errors.push(new UnknownOptionError(`${node.prefix}${node.names.join("")}`));
        break;
      }
      case "value":
      case "positional": {
        if (!lastCommand) {
          const child = ref.cmd[CHILDREN].get(node.rawValue);
          if (child) {
            ref.cmd = child.cmd;
            i = await traverseAndBuild(ref, rawEnv, ast, getNames, ++i, options, args, env, errors);
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
          if (!arg) {
            errors.push(new TooManyArgumentsError(argIndex));
            break;
          }

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

      default: {
        const exhaustive: never = node;
        throw new Error(exhaustive);
      }
    }

    i++;
  }

  for (const [key, builder] of mappers.option) {
    if (toValidateOptions.get(key)) {
      const values = toValidateOptions.get(key)!;
      const { validatedValue, isError } = await validateArray(values, builder, errors);
      if (isError) continue;

      options[key] = validatedValue;
    } else if (!alreadySetOptions.has(key)) {
      if (builder[DEFAULT] != null) options[key] = builder[DEFAULT];
      else if (builder[REQUIRED]) {
        errors.push(new MissingOptionError(builder[HELP_STR]));
        continue;
      }
    }
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

  if (argIndex < mappers.arg.length) {
    let missingStart = argIndex;
    const missingEnd = mappers.arg.length;
    const missingBuilders = mappers.arg.slice(missingStart);

    for (const builder of missingBuilders) {
      if (builder[DEFAULT]) {
        args[builder.__key] = builder[DEFAULT];
        argIndex++;
      }
    }

    if (argIndex < missingEnd) {
      errors.push(
        new TooFewArgumentsError(
          mappers.arg.filter((builder) => builder[REQUIRED]).length,
          variadicArg ? undefined : missingEnd,
        ),
      );
      return i;
    }
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
  if (convertedValue instanceof Error) {
    errors.push(convertedValue);
    return { isError: true };
  }

  const validatedValue = await (
    isArrayBuilder(builder) ? builder[VALIDATOR_ARRAY] : builder[VALIDATOR]
  )?.["~standard"].validate(convertedValue);
  if (validatedValue?.issues) {
    errors.push(new ValidationError(validatedValue.issues));
    return { isError: true };
  }

  return {
    isError: false,
    validatedValue: validatedValue?.value ?? convertedValue,
  };
}

async function validateArray(
  values: any[],
  builder: AnyBuilder,
  errors: Error[],
): Promise<ValidationResult> {
  const validationResult = await builder[VALIDATOR]?.["~standard"].validate(values);
  if (validationResult?.issues) {
    errors.push(new ValidationError(validationResult.issues));
    return { isError: true };
  }

  return { validatedValue: validationResult?.value ?? values, isError: false };
}

function convert(raw: string, type: string) {
  switch (type) {
    case "object":
      try {
        return JSON.parse(raw);
      } catch (e) {
        return e as SyntaxError;
      }
    case "number":
      const n = Number(raw);
      return Number.isNaN(n) ? new WrongTypeError(raw, type) : n;
    case "boolean":
      return raw === "true" ? true : raw === "false" ? false : new WrongTypeError(raw, type);
    case "string":
      return raw;
    default:
      throw new Error(`unknown type: ${type}!`);
  }
}

function isArrayBuilder(v: AnyBuilder): v is AnyArrayBuilder {
  return v[BUILDER_TYPE] === "array";
}

function isSingleBuilder(v: AnyBuilder): v is AnySingleBuilder {
  return v[BUILDER_TYPE] === "single";
}
