import type { StandardSchemaV1 } from "@standard-schema/spec";

export type BuilderKind = "positional" | "option" | "env";

export class SingularBuilder<
  TType,
  TKind extends BuilderKind,
  TRequired extends boolean,
  THasDefault extends boolean,
> {
  public validate<T extends StandardSchemaV1>(): SingularBuilder<
    StandardSchemaV1.InferOutput<T>,
    TKind,
    TRequired,
    THasDefault
  > {
    throw new Error("TODO: not implemented");
  }
}

export class ArrayBuilder<
  TType,
  TKind extends BuilderKind,
  TRequired extends boolean,
  THasDefault extends boolean,
> {
  public validate<T extends StandardSchemaV1>(): SingularBuilder<
    StandardSchemaV1.InferOutput<T>,
    TKind,
    TRequired,
    THasDefault
  > {
    throw new Error("TODO: not implemented");
  }
}

type SingleInput = Record<
  string,
  SingularBuilder<any, any, any, any> | ArrayBuilder<any, any, any, any>
>;
export type Input = SingleInput | SingleInput[];
