import { describe, expectTypeOf, it } from "vitest";

import * as v from "valibot";

import { ArrayBuilder, Builder } from "./builders";
import { env, option, positional } from ".";

describe("Builder types", () => {
  it("keeps type information after mutations", () => {
    const builder = new Builder<string, "option", true>()
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
    const builder = new ArrayBuilder<string, "option", true>()
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

describe("option(), positional() and env() types", () => {
  it("option() returns required Builder with correct type", () => {
    const opt = option("--name, -n <NAME:number>");
    expectTypeOf<typeof opt>().toExtend<Builder<number, "option", true>>();
  });

  it("option() returns required ArrayBuilder with correct type", () => {
    const opt = option("--name, -n <NAME...:number>");
    expectTypeOf<typeof opt>().toExtend<ArrayBuilder<number, "option", true>>();
  });

  it("option() returns optional Builder with correct type", () => {
    const opt = option("--name, -n [NAME:number]");
    expectTypeOf<typeof opt>().toExtend<Builder<number, "option", false>>();
  });

  it("option() returns optional ArrayBuilder with correct type", () => {
    const opt = option("--name, -n [NAME...:number]");
    expectTypeOf<typeof opt>().toExtend<ArrayBuilder<number, "option", false>>();
  });

  it("positional() returns required Builder with correct type", () => {
    const opt = positional("--name, -n <NAME:number>");
    expectTypeOf<typeof opt>().toExtend<Builder<number, "positional", true>>();
  });

  it("positional() returns required ArrayBuilder with correct type", () => {
    const opt = positional("--name, -n <NAME...:number>");
    expectTypeOf<typeof opt>().toExtend<ArrayBuilder<number, "positional", true>>();
  });

  it("positional() returns optional Builder with correct type", () => {
    const opt = positional("--name, -n [NAME:number]");
    expectTypeOf<typeof opt>().toExtend<Builder<number, "positional", false>>();
  });

  it("positional() returns optional ArrayBuilder with correct type", () => {
    const opt = positional("--name, -n [NAME...:number]");
    expectTypeOf<typeof opt>().toExtend<ArrayBuilder<number, "positional", false>>();
  });

  it("env() returns required Builder with correct type", () => {
    const opt = env("--name, -n <NAME:number>");
    expectTypeOf<typeof opt>().toExtend<Builder<number, "env", true>>();
  });

  it("env() returns required ArrayBuilder with correct type", () => {
    const opt = env("--name, -n <NAME...:number>");
    expectTypeOf<typeof opt>().toExtend<ArrayBuilder<number, "env", true>>();
  });

  it("env() returns optional Builder with correct type", () => {
    const opt = env("--name, -n [NAME:number]");
    expectTypeOf<typeof opt>().toExtend<Builder<number, "env", false>>();
  });

  it("env() returns optional ArrayBuilder with correct type", () => {
    const opt = env("--name, -n [NAME...:number]");
    expectTypeOf<typeof opt>().toExtend<ArrayBuilder<number, "env", false>>();
  });
});
