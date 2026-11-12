import type { InferFormat } from "@/types/infer";
import {
  ArrayBuilder,
  Builder,
  HELP_STR,
  KIND,
  NAMES,
  REQUIRED,
  TYPE,
  type BuilderKind,
  type Input,
} from "./builders";

type InferBuilder<T extends string, TKind extends BuilderKind> =
  InferFormat<T> extends {
    required: infer Required extends boolean;
    type: infer Type extends any;
    array: infer IsArray extends boolean;
  }
    ? IsArray extends true
      ? ArrayBuilder<Type, TKind, Required>
      : Builder<Type, TKind, Required>
    : never;

const FORMAT_REGEX =
  /(?<names>(?:--[\w-]+|-[\w-]+)(?:\s*,\s*(?:--[\w-]+|-[\w-]+))*)?\s*(?<bracket>[<[])(?<help>[A-Z_][A-Z0-9_]*)?(?<variadic>\.\.\.)?(?::(?<type>[\w-]+))?[>\]]/;

// Parse format strings like:

// "[PATH:string]" -> Builder { required: false, type: string, help: "[PATH]" }
export function positional<T extends string>(format: T): InferBuilder<T, "positional"> {
  const { builder } = parse(format);
  builder[KIND] = "positional";
  return builder as any;
}

// "--options, -o <OPTIONS...:number>" -> ArrayBuilder { required: true, type: number, help: "--options, -o <OPTIONS...>" }
export function option<T extends string>(format: T): InferBuilder<T, "option"> {
  const { builder, match } = parse(format);
  builder[KIND] = "option";
  builder[NAMES] = match?.groups?.names?.split(",").map((str) => str.trim()) ?? [];
  return builder as any;
}

// "<ENV_VAR...:string>" -> Builder { required: true, type: string, help: "<ENV_VAR...>" }
export function env<T extends string>(format: T): InferBuilder<T, "env"> {
  const { builder } = parse(format);
  builder[KIND] = "env";
  return builder as any;
}

export function defineInput<const T extends Input>(input: T): T {
  return input;
}

export * as builders from "./builders";

function parse(format: string) {
  const match = format.match(FORMAT_REGEX);

  const isVariadic = match?.groups?.variadic === "...";
  const isRequired = !(match?.groups?.bracket === "[");

  let builder: Builder<any, any, any, any, any>;
  if (isVariadic) builder = new ArrayBuilder();
  else builder = new Builder();

  builder[REQUIRED] = isRequired;
  builder[TYPE] = match?.groups?.type ?? "string";

  builder[HELP_STR] =
    `${isRequired ? "<" : "["}${match?.groups?.help ?? "ARG"}${isVariadic ? "..." : ""}${isRequired ? ">" : "]"}`;

  return { builder, match };
}
