import { describe, expect, it } from "vitest";

import { option, positional, env } from ".";
import { ArrayBuilder, Builder, HELP_STR, KIND, NAMES, REQUIRED, TYPE } from "./builders";

// TODO builder class
// describe("Builder class", () => {});

describe("functions", () => {
  describe("option()", () => {
    it("parses required option with multiple names correctly", () => {
      const opt = option("--name, -n <NAMES:string>");

      expect(opt).toBeInstanceOf(Builder);
      expect(opt).not.toBeInstanceOf(ArrayBuilder);
      expect(opt[TYPE]).toBe("string");
      expect(opt[NAMES]).toEqual(["--name", "-n"]);
      expect(opt[KIND]).toBe("option");
      expect(opt[HELP_STR]).toBe("<NAMES>");
      expect(opt[REQUIRED]).toBe(true);
    });

    it("parses optional option with multiple names correctly", () => {
      const opt = option("--name, -n [NAMES:string]");

      expect(opt).toBeInstanceOf(Builder);
      expect(opt).not.toBeInstanceOf(ArrayBuilder);
      expect(opt[TYPE]).toBe("string");
      expect(opt[NAMES]).toEqual(["--name", "-n"]);
      expect(opt[KIND]).toBe("option");
      expect(opt[HELP_STR]).toBe("[NAMES]");
      expect(opt[REQUIRED]).toBe(false);
    });

    it("parses required array with multiple names correctly", () => {
      const opt = option("--name, -n <NAMES...:string>");

      expect(opt).toBeInstanceOf(ArrayBuilder);
      expect(opt[TYPE]).toBe("string");
      expect(opt[NAMES]).toEqual(["--name", "-n"]);
      expect(opt[KIND]).toBe("option");
      expect(opt[HELP_STR]).toBe("<NAMES...>");
      expect(opt[REQUIRED]).toBe(true);
    });

    it("parses optional array with multiple names correctly", () => {
      const opt = option("--name, -n [NAMES...:string]");

      expect(opt).toBeInstanceOf(ArrayBuilder);
      expect(opt[TYPE]).toBe("string");
      expect(opt[NAMES]).toEqual(["--name", "-n"]);
      expect(opt[KIND]).toBe("option");
      expect(opt[HELP_STR]).toBe("[NAMES...]");
      expect(opt[REQUIRED]).toBe(false);
    });
  });

  describe("positional()", () => {
    it("parses required positional correctly", () => {
      const opt = positional("<NAMES:string>");

      expect(opt).toBeInstanceOf(Builder);
      expect(opt).not.toBeInstanceOf(ArrayBuilder);
      expect(opt[TYPE]).toBe("string");
      expect(opt[NAMES]).toBeUndefined();
      expect(opt[KIND]).toBe("positional");
      expect(opt[HELP_STR]).toBe("<NAMES>");
      expect(opt[REQUIRED]).toBe(true);
    });

    it("parses optional positional correctly", () => {
      const opt = positional("[NAMES:string]");

      expect(opt).toBeInstanceOf(Builder);
      expect(opt).not.toBeInstanceOf(ArrayBuilder);
      expect(opt[TYPE]).toBe("string");
      expect(opt[NAMES]).toBeUndefined();
      expect(opt[KIND]).toBe("positional");
      expect(opt[HELP_STR]).toBe("[NAMES]");
      expect(opt[REQUIRED]).toBe(false);
    });

    it("parses required array correctly", () => {
      const opt = positional("<NAMES...:string>");

      expect(opt).toBeInstanceOf(ArrayBuilder);
      expect(opt[TYPE]).toBe("string");
      expect(opt[NAMES]).toBeUndefined();
      expect(opt[KIND]).toBe("positional");
      expect(opt[HELP_STR]).toBe("<NAMES...>");
      expect(opt[REQUIRED]).toBe(true);
    });

    it("parses optional array correctly", () => {
      const opt = positional("[NAMES...:string]");

      expect(opt).toBeInstanceOf(ArrayBuilder);
      expect(opt[TYPE]).toBe("string");
      expect(opt[NAMES]).toBeUndefined();
      expect(opt[KIND]).toBe("positional");
      expect(opt[HELP_STR]).toBe("[NAMES...]");
      expect(opt[REQUIRED]).toBe(false);
    });
  });

  describe("env()", () => {
    it("parses required env correctly", () => {
      const opt = env("<NAMES:string>");

      expect(opt).toBeInstanceOf(Builder);
      expect(opt).not.toBeInstanceOf(ArrayBuilder);
      expect(opt[TYPE]).toBe("string");
      expect(opt[NAMES]).toBeUndefined();
      expect(opt[KIND]).toBe("env");
      expect(opt[HELP_STR]).toBe("<NAMES>");
      expect(opt[REQUIRED]).toBe(true);
    });

    it("parses optional env correctly", () => {
      const opt = env("[NAMES:string]");

      expect(opt).toBeInstanceOf(Builder);
      expect(opt).not.toBeInstanceOf(ArrayBuilder);
      expect(opt[TYPE]).toBe("string");
      expect(opt[NAMES]).toBeUndefined();
      expect(opt[KIND]).toBe("env");
      expect(opt[HELP_STR]).toBe("[NAMES]");
      expect(opt[REQUIRED]).toBe(false);
    });

    it("parses required array correctly", () => {
      const opt = env("<NAMES...:string>");

      expect(opt).toBeInstanceOf(ArrayBuilder);
      expect(opt[TYPE]).toBe("string");
      expect(opt[NAMES]).toBeUndefined();
      expect(opt[KIND]).toBe("env");
      expect(opt[HELP_STR]).toBe("<NAMES...>");
      expect(opt[REQUIRED]).toBe(true);
    });

    it("parses optional array correctly", () => {
      const opt = env("[NAMES...:string]");

      expect(opt).toBeInstanceOf(ArrayBuilder);
      expect(opt[TYPE]).toBe("string");
      expect(opt[NAMES]).toBeUndefined();
      expect(opt[KIND]).toBe("env");
      expect(opt[HELP_STR]).toBe("[NAMES...]");
      expect(opt[REQUIRED]).toBe(false);
    });
  });
});
