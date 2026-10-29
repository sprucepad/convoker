import type { InferFormat } from "@/types/infer";
import { ArrayBuilder, SingularBuilder } from "./builders";

export function positional<T extends string>(
  format: T,
): InferFormat<T> extends { array: true }
  ? ArrayBuilder<InferFormat<T>["type"], "positional", InferFormat<T>["required"], false>
  : SingularBuilder<InferFormat<T>["type"], "positional", InferFormat<T>["required"], false> {
  throw new Error("TODO: not implemented");
}

export function option<T extends string>(
  format: T,
): InferFormat<T> extends { array: true }
  ? ArrayBuilder<InferFormat<T>["type"], "option", InferFormat<T>["required"], false>
  : SingularBuilder<InferFormat<T>["type"], "option", InferFormat<T>["required"], false> {
  throw new Error("TODO: not implemented");
}

export function env<T extends string>(
  format: T,
): InferFormat<T> extends { array: true }
  ? ArrayBuilder<InferFormat<T>["type"], "env", InferFormat<T>["required"], false>
  : SingularBuilder<InferFormat<T>["type"], "env", InferFormat<T>["required"], false> {
  throw new Error("TODO: not implemented");
}

export * as builders from "./builders";
