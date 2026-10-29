import type { StandardSchemaV1 } from "@standard-schema/spec";

export const REQUIRED = Symbol("__required__");
export const VALIDATOR = Symbol("__validator__");
export const VALIDATOR_ARRAY = Symbol("__validator_array__");
export const DEFAULT = Symbol("__default__");

type Rebuild<
  TSelf,
  TType,
  TKind extends BuilderKind,
  TRequired extends boolean,
  TResolved,
  THasDefault extends boolean,
> = Omit<TSelf, keyof Builder<any, any, any, any, any>> &
  Builder<TType, TKind, TRequired, TResolved, THasDefault>;

export type BuilderKind = "positional" | "option" | "env";

export class Builder<
  TType,
  TKind extends BuilderKind,
  TRequired extends boolean,
  TResolved = TType,
  THasDefault extends boolean = false,
> {
  public [REQUIRED]: TRequired;
  public [VALIDATOR]: StandardSchemaV1<TType, any> | undefined;
  public [DEFAULT]: TType | undefined;

  constructor(required: TRequired) {
    this[REQUIRED] = required;
  }

  public default(val?: TType): Rebuild<this, TType, TKind, true, TResolved, true> {
    this[DEFAULT] = val;
    return this as any;
  }

  public validate<T extends StandardSchemaV1<TType, any>>(
    val: T,
  ): Rebuild<this, TType, TKind, TRequired, StandardSchemaV1.InferOutput<T>, THasDefault> {
    this[VALIDATOR] = val;
    return this;
  }
}

export class ArrayBuilder<
  TType,
  TKind extends BuilderKind,
  TRequired extends boolean,
  TResolved = TType,
  THasDefault extends boolean = false,
> extends Builder<
  TType extends any[] ? TType : TType[],
  TKind,
  TRequired,
  TResolved extends any[] ? TResolved : TResolved[],
  THasDefault
> {
  public [VALIDATOR_ARRAY]:
    | StandardSchemaV1<TType extends any[] ? TType[number] : TType>
    | undefined;

  public validateEach<T extends StandardSchemaV1<TType extends any[] ? TType[number] : TType, any>>(
    v: T,
  ): Rebuild<this, TType, TKind, TRequired, StandardSchemaV1.InferOutput<T>, THasDefault> {
    this[VALIDATOR_ARRAY] = v;
    return this as any;
  }
}

type InputObj = Record<
  string,
  Builder<any, any, any, any, any> | ArrayBuilder<any, any, any, any, any>
>;
export type Input = InputObj | InputObj[];
