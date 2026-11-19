import { describe, expect, it } from "vitest";
import * as v from "valibot";

import { option, positional, env } from ".";
import {
  ArrayBuilder,
  Builder,
  DEFAULT,
  HELP_STR,
  IS_INHERITED,
  KIND,
  NAMES,
  REQUIRED,
  TYPE,
  VALIDATOR,
  VALIDATOR_ARRAY,
} from "./builders";

describe("string parsers", () => {
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

describe("Builder and ArrayBuilder classes", () => {
  it("sets default value", () => {
    const builder = option("[NAME:string]").default("Evan");

    expect(builder[DEFAULT]).toBe("Evan");
  });

  it("sets validator", () => {
    const validator = v.pipe(v.string(), v.minLength(3), v.maxLength(6));
    const builder = option("[NAME:string]").validate(validator);

    expect(builder[VALIDATOR]).toBe(validator);
  });

  it("sets inherited status", () => {
    const builder = option("[NAME:string]").inherited();
    expect(builder[IS_INHERITED]).toBe(true);
  });

  it("sets array validator", () => {
    const validator = v.pipe(v.string(), v.minLength(3), v.maxLength(6));
    const builder = option("[NAME...:string]").validateEach(validator);

    expect(builder[VALIDATOR_ARRAY]).toBe(validator);
  });
});
