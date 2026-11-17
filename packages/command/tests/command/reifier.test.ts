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

    process.env.EXAMPLE = "true";
    const result = await cmd.parse(["test", "--option", "hello-world", "500"]);

    expect(result).toMatchObject({
      args: { argument: 500 },
      env: { EXAMPLE: true },
      options: { option: "hello-world" },
      command: c2,
    });
  });
});
