import type { AnyCommand } from ".";
import type { Resolvable } from "../types/utils";
import type { ConcreteCLITree } from "./transformer";

export interface BaseContext {
  cmd: AnyCommand;
  stage: "parse" | "run";
  next: () => Promise<void>;
}

export interface ContextWithParseResult extends BaseContext {
  parseResult: ConcreteCLITree<any, any>;
}

export function defineParser(parser: Omit<Parser, "type">): Parser {
  return Object.assign(parser, { type: "parser" as const });
}

export function definePlugin<T = {}>(plugin: Omit<Plugin<T>, "type">): Plugin<T> {
  return Object.assign(plugin, { type: "plugin" as const });
}

export interface Plugin<_Ext = {}> {
  type: "plugin";

  beforeParseSelf?({ cmd, next }: BaseContext): Resolvable<void>;
  beforeParseChildren?({ cmd, next }: BaseContext): Resolvable<void>;
  afterParseChildren?({ cmd, parseResult, next }: ContextWithParseResult): Resolvable<void>;
  afterParseSelf?({ cmd, parseResult, next }: ContextWithParseResult): Resolvable<void>;

  beforeRun?({ cmd, parseResult, next }: ContextWithParseResult): Resolvable<void>;
  afterRun?({ cmd, parseResult, next }: ContextWithParseResult): Resolvable<void>;

  catchSelf?({ cmd, parseResult, next }: ContextWithParseResult): Resolvable<void>;
  catchChildren?({ cmd, parseResult, next }: ContextWithParseResult): Resolvable<void>;
}

export interface Parser {
  type: "parser";

  getNames(names: string[]): (string | null | undefined)[];
  parse(argv: string[]): Resolvable<AST>;
}

export type ASTNode = NodePositional | NodeOption;
export type AST = Array<ASTNode>;

export interface NodeOption {
  type: "option";
  rawValue: string;

  prefix: string;
  names: string[];
  value?: string;
  compound: boolean;
}

export interface NodePositional {
  type: "positional";
  rawValue: string;
}
