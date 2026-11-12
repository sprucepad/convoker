import type { Command } from "../command";
import type { Builder, Input, InputObj } from "../input/builders";

export type InferInherited<T extends Command<any, any> | Input | null> = T extends null
  ? {}
  : T extends Input
    ? InheritedInput<T>
    : T extends Command<infer Parent, infer TInput>
      ? TInput extends Input
        ? InheritedInput<TInput> & InferInherited<Parent>
        : InferInherited<Parent>
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
