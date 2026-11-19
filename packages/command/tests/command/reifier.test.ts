import { describe, expect, it } from "vitest";
import { Command } from ".";
import * as i from "../input";

describe("reify()", () => {
  it("parses and reifies a CLI argument string", async () => {
    const c2 = new Command("test")
      .input({
        option: i.option("--option, -o [OPTIONAL]").default("defaultValue"),
        argument: i.positional("<REQUIRED:number>"),
        EXAMPLE: i.env("<REQUIRED:boolean>"),
      })
      .action(() => {});
    const cmd = new Command().add(c2);

    const result = await cmd.parse({
      argv: ["test", "--option", "hello-world", "500"],
      env: {
        EXAMPLE: "true",
      },
    });

    expect(result).toMatchObject({
      errors: [],
      args: { argument: 500 },
      env: { EXAMPLE: true },
      options: { option: "hello-world" },
      command: c2,
    });
  });

  it("applies defaults", async () => {
    const cmd = new Command("test")
      .input({
        option: i.option("--option, -o [OPTIONAL]").default("defaultValue"),
        argument: i.positional("[OPTIONAL:number]").default(500),
        EXAMPLE: i.env("[OPTIONAL:boolean]").default(true),
      })
      .action(() => {});

    const result = await cmd.parse({
      argv: [],
      env: {},
    });

    expect(result).toMatchObject({
      args: { argument: 500 },
      env: { EXAMPLE: true },
      options: { option: "defaultValue" },
      command: cmd,
    });
  });
});
