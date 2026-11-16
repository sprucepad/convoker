import type { AnyCommand } from ".";
import type { Resolvable } from "../types/utils";
import type { ConcreteCLITree } from "./reifier";

export interface BaseContext {
  cmd: AnyCommand;
  stage: "parse" | "run";
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

  beforeParse?({ cmd }: BaseContext): Resolvable<void>;
  afterParse?({ cmd, parseResult }: ContextWithParseResult): Resolvable<void>;

  beforeRun?({ cmd, parseResult }: ContextWithParseResult): Resolvable<void>;
  afterRun?({ cmd, parseResult }: ContextWithParseResult): Resolvable<void>;

  catch?({ cmd, parseResult }: ContextWithParseResult): Resolvable<void>;
}

export class PluginHost implements Required<Plugin> {
  public type = "plugin" as const;
  public plugins: Plugin<any>[] = [];

  private hook<K extends Exclude<keyof Plugin, "type">>(key: K): NonNullable<Plugin[K]> {
    return async (ctx: any) => {
      await Promise.all(
        this.plugins.map(async (plugin) => {
          await plugin[key]?.(ctx);
        }),
      );
    };
  }

  public beforeParse = this.hook("beforeParse");
  public afterParse = this.hook("afterParse");

  public beforeRun = this.hook("beforeRun");
  public afterRun = this.hook("afterRun");

  public catch = this.hook("catch");
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
