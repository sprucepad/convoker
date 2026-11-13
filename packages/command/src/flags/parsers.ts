import type { Parser } from "../command";

export function gnu(opts?: { verbose?: boolean }): Parser {
  void opts;
  throw new Error("TODO: not implemented");
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
