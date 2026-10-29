import { describe, expectTypeOf, it } from "vitest";
import { ArrayBuilder, Builder } from "./builders";
import * as v from "valibot";

describe("Builder types", () => {
  it("keeps type information after mutations", () => {
    const builder = new Builder<string, "option", true>(true)
      .validate(
        v.pipe(
          v.string(),
          v.transform(() => 5),
        ),
      )
      .default("world");

    type Types =
      typeof builder extends Builder<any, any, infer Required, infer Resolved, infer HasDefault>
        ? {
            Resolved: Resolved;
            Required: Required;
            HasDefault: HasDefault;
          }
        : never;

    expectTypeOf<Types["Resolved"]>().toBeNumber();
    expectTypeOf<Types["Required"]>().toExtend<true>();
    expectTypeOf<Types["HasDefault"]>().toExtend<true>();
  });

  it("keeps type information after mutations on subclasses", () => {
    const builder = new ArrayBuilder<string, "option", true>(true)
      .validate(
        v.pipe(
          v.array(v.string()),
          v.transform(() => 5),
        ),
      )
      .default(["world"]);

    type Types =
      typeof builder extends Builder<any, any, infer Required, infer Resolved, infer HasDefault>
        ? {
            Resolved: Resolved;
            Required: Required;
            HasDefault: HasDefault;
          }
        : never;

    expectTypeOf<Types["Resolved"]>().toBeNumber();
    expectTypeOf<Types["Required"]>().toExtend<true>();
    expectTypeOf<Types["HasDefault"]>().toExtend<true>();
  });
});
