import type { InferFormat } from "@/types/infer";
import { ArrayBuilder, Builder, type BuilderKind } from "./builders";

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

export function positional<T extends string>(format: T): InferBuilder<T, "positional"> {
  throw new Error("TODO: not implemented");
}

export function option<T extends string>(format: T): InferBuilder<T, "option"> {
  throw new Error("TODO: not implemented");
}

export function env<T extends string>(format: T): InferBuilder<T, "env"> {
  throw new Error("TODO: not implemented");
}

export * as builders from "./builders";
