import type { StandardSchemaV1 } from "@standard-schema/spec";

export const TYPE = Symbol("__type__");
export const KIND = Symbol("__kind__");
export const HELP_STR = Symbol("__help_str__");
export const NAMES = Symbol("__names__");
export const REQUIRED = Symbol("__required__");
export const VALIDATOR = Symbol("__validator__");
export const VALIDATOR_ARRAY = Symbol("__validator_array__");
export const DEFAULT = Symbol("__default__");
export const IS_INHERITED = Symbol("__is_inherited__");

type Rebuild<
  TSelf,
  TType,
  TKind extends BuilderKind,
  TRequired extends boolean,
  TResolved,
  THasDefault extends boolean,
  TIsInherited extends boolean,
> = Omit<TSelf, keyof Builder<any, any, any, any, any>> &
  Builder<TType, TKind, TRequired, TResolved, THasDefault, TIsInherited>;

export type BuilderKind = "positional" | "option" | "env";

export class Builder<
  TType,
  TKind extends BuilderKind,
  TRequired extends boolean,
  TResolved = TType,
  THasDefault extends boolean = false,
  TIsInherited extends boolean = false,
> {
  public [TYPE]!: string;
  public [KIND]!: TKind;
  public [REQUIRED]!: TRequired;
  public [HELP_STR]!: string;
  public [IS_INHERITED]!: TIsInherited;
  public [NAMES]?: string[];
  public [VALIDATOR]?: StandardSchemaV1<TType, any>;
  public [DEFAULT]?: TType;

  public default(val?: TType): Rebuild<this, TType, TKind, true, TResolved, true, TIsInherited> {
    this[DEFAULT] = val;
    return this as any;
  }

  public validate<T extends StandardSchemaV1<TType, any>>(
    val: T,
  ): Rebuild<
    this,
    TType,
    TKind,
    TRequired,
    StandardSchemaV1.InferOutput<T>,
    THasDefault,
    TIsInherited
  > {
    this[VALIDATOR] = val;
    return this;
  }

  public inherit(): Rebuild<this, TType, TKind, TRequired, TResolved, THasDefault, true> {
    this[IS_INHERITED] = true as any;
    return this as any;
  }
}

export class ArrayBuilder<
  TType,
  TKind extends BuilderKind,
  TRequired extends boolean,
  TResolved = TType,
  THasDefault extends boolean = false,
  TIsInherited extends boolean = false,
> extends Builder<
  TType extends any[] ? TType : TType[],
  TKind,
  TRequired,
  TResolved extends any[] ? TResolved : TResolved[],
  THasDefault
> {
  public [VALIDATOR_ARRAY]?: StandardSchemaV1<TType extends any[] ? TType[number] : TType>;

  public validateEach<T extends StandardSchemaV1<TType extends any[] ? TType[number] : TType, any>>(
    v: T,
  ): Rebuild<
    this,
    TType,
    TKind,
    TRequired,
    StandardSchemaV1.InferOutput<T>,
    THasDefault,
    TIsInherited
  > {
    this[VALIDATOR_ARRAY] = v;
    return this as any;
  }
}

export type InputObj = Record<
  string,
  Builder<any, any, any, any, any, any> | ArrayBuilder<any, any, any, any, any, any>
>;
export type Input = InputObj | InputObj[];
