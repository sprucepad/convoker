import { describe, expectTypeOf, it } from "vitest";

import { Command } from ".";
import { env, option, positional } from "@/input";
import type { InferEnv, InferOptions, InferPositional, MergeInputs } from "../index";

describe("Command types", () => {
  it("inherits input", () => {
    const command1 = new Command().input([
      {
        test: option("--test [TEST]").inherited(),
      },
      {
        test2: option("--test2 [TEST2]").inherited(),
      },
    ]);
    const command2 = new Command<typeof command1>();

    type OneInput = typeof command1 extends Command<any, infer T, infer I> ? [T, I] : never;
    type TwoInput = typeof command2 extends Command<any, infer T, infer I> ? [T, I] : never;

    expectTypeOf<TwoInput[1]>().toExtend<[...OneInput[0], {}]>();
  });

  it("has correct action function types", () => {
    const command = new Command().input([
      {
        test: option("--test [TEST]").default("testing"),
        test2: option("--test2 [TEST2:number]"),
        test3: option("--test3 <TEST3:boolean>"),
      },
      {
        test: positional("[TEST]").default("testing"),
        test2: positional("[TEST2:number]"),
        test3: positional("<TEST3:boolean>"),
      },
      {
        test: env("[TEST]").default("testing"),
        test2: env("[TEST2:number]"),
        test3: env("<TEST3:boolean>"),
      },
    ]);

    type Inputs = typeof command extends Command<any, infer T, infer I> ? MergeInputs<T, I> : never;
    type Options = InferOptions<Inputs>;
    type Args = InferPositional<Inputs>;
    type Env = InferEnv<Inputs>;

    expectTypeOf<Options>().toMatchObjectType<{
      readonly test: string;
      readonly test2: number | undefined;
      readonly test3: boolean;
    }>();
    expectTypeOf<Args>().toMatchObjectType<{
      readonly test: string;
      readonly test2: number | undefined;
      readonly test3: boolean;
    }>();
    expectTypeOf<Env>().toMatchObjectType<{
      readonly test: string;
      readonly test2: number | undefined;
      readonly test3: boolean;
    }>();
  });
});
