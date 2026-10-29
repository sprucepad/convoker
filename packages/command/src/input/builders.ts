export type BuilderKind = "positional" | "option" | "env";

export class SingularBuilder<
  TType,
  TKind extends BuilderKind,
  TRequired extends boolean,
  THasDefault extends boolean,
> {}

export class ArrayBuilder<
  TType,
  TKind extends BuilderKind,
  TRequired extends boolean,
  THasDefault extends boolean,
> {}

type SingleInput = Record<
  string,
  SingularBuilder<any, any, any, any> | ArrayBuilder<any, any, any, any>
>;
export type Input = SingleInput | SingleInput[];
