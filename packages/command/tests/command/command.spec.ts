import { describe, expectTypeOf, it } from "vitest";
import { Command } from ".";
import type { Input } from "@/input/builders";
import { option } from "@/input";

describe("Command types", () => {
  it("inherits input", () => {
    const oneInput = {
      test: option("--test [TEST:string]").inherit(),
    } satisfies Input;
    const command1 = new Command<null, typeof oneInput>();
    const command2 = new Command<typeof command1>();

    type OneInput = typeof command1 extends Command<any, infer T> ? T : never;
    type TwoInput = typeof command2 extends Command<any, infer T> ? T : never;

    expectTypeOf<TwoInput>().toExtend<OneInput>();
  });
});
