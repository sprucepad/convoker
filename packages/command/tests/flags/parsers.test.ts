import { describe, expect, it } from "vitest";
import { gnu } from "./parsers";
import type { AST } from "../command/plugin";

describe("GNU parser", () => {
  describe("verbose = true (GCC-like)", () => {
    const parser = gnu({ verbose: true });

    it("removes dashes from option names", () => {
      const rawNames = ["-abc", "-def"];
      const names = parser.getNames(rawNames);
      expect(names).toEqual(["abc", "def"]);
    });

    it("parsers complex cli argument string", () => {
      const ast = parser.parse([
        "-abc",
        "-a",
        "quoted argument",
        "-b=true",
        "non-value",
        "also-non-value",
      ]);
      expect(ast).toEqual<AST>([
        {
          type: "option",
          names: ["abc"],
          compound: false,
          prefix: "-",
          rawValue: "-abc",
          value: undefined,
        },
        {
          type: "option",
          names: ["a"],
          compound: false,
          prefix: "-",
          rawValue: "-a",
          value: undefined,
        },
        { type: "value", rawValue: "quoted argument" },
        {
          type: "option",
          names: ["b"],
          compound: false,
          prefix: "-",
          rawValue: "-b=true",
          value: "true",
        },
        { type: "positional", rawValue: "non-value" },
        { type: "positional", rawValue: "also-non-value" },
      ]);
    });
  });

  describe("verbose = false (Git-like)", () => {
    const parser = gnu({ verbose: false });

    it("removes dashes from option names", () => {
      const rawNames = ["-a", "--abc"];
      const names = parser.getNames(rawNames);
      expect(names).toEqual(["a", "abc"]);
    });

    it("parsers complex cli argument string", () => {
      const ast = parser.parse([
        "-compound",
        "--long=value",
        "non-value",
        "--long-two",
        "yes-value",
        "-wv=true",
        "also-non-value",
        "-g",
        "also-yes-value",
      ]);

      expect(ast).toEqual<AST>([
        {
          type: "option",
          names: ["c", "o", "m", "p", "o", "u", "n", "d"],
          compound: true,
          prefix: "-",
          rawValue: "-compound",
          value: undefined,
        },
        {
          type: "option",
          names: ["long"],
          compound: false,
          prefix: "--",
          rawValue: "--long=value",
          value: "value",
        },
        { type: "positional", rawValue: "non-value" },
        {
          type: "option",
          names: ["long-two"],
          compound: false,
          prefix: "--",
          rawValue: "--long-two",
          value: undefined,
        },
        { type: "value", rawValue: "yes-value" },
        {
          type: "option",
          names: ["w", "v"],
          compound: true,
          prefix: "-",
          rawValue: "-wv=true",
          value: "true",
        },
        { type: "positional", rawValue: "also-non-value" },
        {
          type: "option",
          names: ["g"],
          compound: true,
          prefix: "-",
          rawValue: "-g",
          value: undefined,
        },
        { type: "value", rawValue: "also-yes-value" },
      ]);
    });
  });
});
