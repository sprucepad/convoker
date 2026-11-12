import type { Resolvable } from "@/types/utils";
import type { Input } from "../input/builders";
import type { InferInherited, InferPositional, MergeInputs } from "../types/infer";

export const INPUT = Symbol("__input__");
export const FN = Symbol("__fn__");

export interface ParseResult {
  options: Record<string, (string | boolean)[]>;
  args: string[];
}

export interface Parser {
  parse(argv: string[]): Resolvable<ParseResult>;
}

export type ActionFn<TInherited, TSelf, TInput = MergeInputs<TInherited, TSelf>> = ({
  args,
  options,
  env,
}: {
  args: InferPositional<TInput>;
  options: InferPositional<TInput>;
  env: InferPositional<TInput>;
}) => Resolvable<number | void>;

export class Command<TParent = null, TInput = {}, TInherited = InferInherited<TParent>> {
  public [INPUT]?: TInput;
  public [FN]?: ActionFn<TInherited, TInput>;

  public input<const T extends Input>(i: T): Command<TParent, T, TInherited> {
    this[INPUT] = i as any;
    return this as any;
  }

  public action(fn: ActionFn<TInherited, TInput>): this {
    this[FN] = fn;
    return this;
  }

  public async run() {
    throw new Error("TODO: not implemented");
  }
}
