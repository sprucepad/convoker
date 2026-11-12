import type { Command } from "../command";
import type { Builder, Input, InputObj } from "../input/builders";

export type InferInherited<T> = T extends null
  ? [{}]
  : T extends Input
    ? InheritedInput<T>
    : T extends Command<any, infer TInput, infer Inherited>
      ? TInput extends Input
        ? MergeInputs<InheritedInput<TInput>, Inherited>
        : MergeInputs<Inherited, {}>
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

export type MergeInputs<A, B> = A extends any[]
  ? B extends any[]
    ? [...A, ...B]
    : [...A, B]
  : B extends any[]
    ? [A, ...B]
    : [A, B];

export type InferOptions<T> = (T extends InputObj[] ? T : [T]) extends infer I
  ? {
      [
        K in keyof I as I[K] extends Builder<any, "option", any, any, any, any> ? K : never
      ]: InferBuilder<I[K]>;
    }
  : never;
export type InferPositional<T> = (T extends InputObj[] ? T : [T]) extends infer I
  ? {
      [
        K in keyof I as I[K] extends Builder<any, "positional", any, any, any, any> ? K : never
      ]: InferBuilder<I[K]>;
    }
  : never;
export type InferEnv<T> = (T extends InputObj[] ? T : [T]) extends infer I
  ? {
      [
        K in keyof I as I[K] extends Builder<any, "env", any, any, any, any> ? K : never
      ]: InferBuilder<I[K]>;
    }
  : never;

export type InferBuilder<T> =
  T extends Builder<any, any, infer Required, infer Type, infer HasDefault, any>
    ? Required extends true
      ? Type
      : HasDefault extends true
        ? Type
        : Type | undefined
    : never;
