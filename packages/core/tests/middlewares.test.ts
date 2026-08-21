import { beforeEach, describe, expect, test, vi } from "vitest";
import { Command } from "@/command";
import { HelpAskedError, VersionAskedError } from "@/error";
import { helpFlag, versionFlag } from "./middlewares";
import { option } from "@/input";

describe("versionFlag()", () => {
  let root: Command<any>;
  beforeEach(() => {
    root = new Command("testing");
  });

  test("updates command input", () => {
    root.use(versionFlag(root));

    expect(root.$input).toEqual({
      version: option("boolean", "--version", "-V").optional(),
    });
  });

  test("runs error handler on --version", async () => {
    root.use(versionFlag(root));

    const spy = vi.spyOn(root, "defaultErrorScreen");
    await root.run(["--version"]);
    expect(spy).toHaveBeenCalledWith([new VersionAskedError(root)]);
  });
});

describe("helpFlag()", () => {
  let root: Command<any>;
  beforeEach(() => {
    root = new Command("testing");
  });

  test("updates command input", () => {
    root.use(helpFlag(root));

    expect(root.$input).toEqual({
      help: option("boolean", "--help", "-h").optional(),
    });
  });

  test("runs error handler on --help", async () => {
    root.use(helpFlag(root));

    const spy = vi.spyOn(root, "defaultErrorScreen");
    await root.run(["--help"]);
    expect(spy).toHaveBeenCalledWith([new HelpAskedError(root)]);
  });
});
