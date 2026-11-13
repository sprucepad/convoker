import type { Command } from "../command";
import type { Builder, BuilderKind, Input, InputObj } from "../input/builders";

export type InferInherited<T> = T extends null
  ? [{}]
  : T extends Input
    ? InheritedInput<T>
    : T extends Command<any, infer TInput, infer Inherited, infer Plugins>
      ? TInput extends Input
        ? MergeInputs<[InheritedInput<TInput>, Inherited, Plugins]>
        : MergeInputs<[Inherited]>
      : never;

type InheritedInput<T extends Input> = T extends InputObj
  ? InheritedInputObj<T>
  : { [K in keyof T]: T[K] extends InputObj ? InheritedInputObj<T[K]> : never };

type InheritedInputObj<T extends InputObj> = {
  [K in keyof T as T[K] extends Builder<any, any, any, any, any, true> ? K : never]: T[K];
};

export type InferFormat<T extends string> = T extends `${string}<${infer String}>${string}`
  ? InferString<String> & { required: true }
  : T extends `${string}[${infer String}]${string}`
    ? InferString<String> & { required: false }
    : never;

type InferString<T extends string> = T extends `${infer Name}:${infer Type}`
  ? { type: TypeOf<Type>; array: IsVariadic<Name> }
  : { type: string; array: IsVariadic<T> };

type IsVariadic<T extends string> = T extends `${string}...` ? true : false;

type TypeOf<T> = T extends "string"
  ? string
  : T extends "number"
    ? number
    : T extends "bool" | "boolean"
      ? boolean
      : never;

export type MergeInputs<T extends readonly unknown[]> = T extends readonly [
  infer First,
  ...infer Rest,
]
  ? First extends readonly unknown[]
    ? [...MergeInputs<First>, ...MergeInputs<Rest>]
    : [First, ...MergeInputs<Rest>]
  : [];

type InferInputObj<T extends InputObj, Kind extends BuilderKind> = {
  [K in keyof T as T[K] extends Builder<any, Kind, any, any, any, any> ? K : never]: InferBuilder<
    T[K]
  >;
};

type UnionToIntersection<T> = (T extends any ? (value: T) => void : never) extends (
  value: infer I,
) => void
  ? I
  : never;

type Simplify<T> = { [K in keyof T]: T[K] };

type InferInputArray<T extends InputObj[], Kind extends BuilderKind> = Simplify<
  UnionToIntersection<{ [K in keyof T]: InferInputObj<T[K], Kind> }[number]>
>;

type InferInput<T, Kind extends BuilderKind> = T extends InputObj[]
  ? InferInputArray<T, Kind>
  : T extends InputObj
    ? InferInputObj<T, Kind>
    : never;

export type InferOptions<T> = InferInput<T, "option">;
export type InferPositional<T> = InferInput<T, "positional">;
export type InferEnv<T> = InferInput<T, "env">;

export type InferBuilder<T> =
  T extends Builder<any, any, infer Required, infer Type, infer HasDefault, any>
    ? Required extends true
      ? Type
      : HasDefault extends true
        ? Type
        : Type | undefined
    : never;
