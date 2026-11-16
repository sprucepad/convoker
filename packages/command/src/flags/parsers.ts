import { defineParser, type AST, type Parser } from "../command";

export function gnu(opts?: { verbose?: boolean }) {
  const { verbose = true } = opts ?? {};

  return defineParser({
    getNames(names) {
      return names.map((name) => {
        if (!name.startsWith("-")) return null;

        if (!verbose && name.startsWith("--")) {
          return name.slice(2);
        } else {
          return name.slice(1);
        }
      });
    },

    parse(argv) {
      const ast: AST = [];

      void argv; // TODO

      return ast;
    },
  });
}

export function bsd(): Parser {
  throw new Error("TODO: not implemented");
}

export function keyValue(): Parser {
  throw new Error("TODO: not implemented");
}

export function windows(opts?: { verbose?: boolean }): Parser {
  void opts;
  throw new Error("TODO: not implemented");
}
