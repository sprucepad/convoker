import {
  defineParser,
  type AST,
  type NodeOption,
  type NodePositional,
  type Parser,
} from "../command";

export function gnu(opts?: { verbose?: boolean }) {
  const { verbose = false } = opts ?? {};

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

      let waitingForValue = false;
      for (const arg of argv) {
        if (arg.startsWith("--") && !verbose) {
          const node = longOpt(arg, "--");
          ast.push(node);

          waitingForValue = !node.value;
          continue;
        }

        if (arg.startsWith("-")) {
          let node: NodeOption;
          if (verbose) node = longOpt(arg, "-");
          else node = shortOpt(arg, "-");

          ast.push(node);
          waitingForValue = !node.value;
          continue;
        }

        if (waitingForValue) {
          waitingForValue = false;
          ast.push(value(arg));
        } else ast.push(positional(arg));
      }

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

function longOpt(arg: string, prefix: string): NodeOption {
  const [key, ...values] = arg.slice(prefix.length).trim().split("=") as [string, ...string[]];
  return {
    type: "option",
    names: [key],
    compound: false,
    prefix,
    rawValue: arg,
    value: values.length ? values.join("=") : undefined,
  };
}

function shortOpt(arg: string, prefix: string): NodeOption {
  const [keysStr, ...values] = arg.slice(prefix.length).trim().split("=") as [string, ...string[]];
  return {
    type: "option",
    names: keysStr.split(""),
    compound: true,
    prefix,
    rawValue: arg,
    value: values.length ? values.join("=") : undefined,
  };
}

function positional(arg: string): NodePositional {
  return {
    type: "positional",
    rawValue: arg,
  };
}

function value(arg: string): NodePositional {
  return {
    type: "value",
    rawValue: arg,
  };
}
