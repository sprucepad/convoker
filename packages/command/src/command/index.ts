import type { Resolvable } from "../types/utils";
import type { Input } from "../input/builders";
import type {
  InferEnv,
  InferInherited,
  InferOptions,
  InferPositional,
  MergeInputs as Flatten,
} from "../types/infer";
import { gnu } from "../flags/parsers";

export const ALIASES = Symbol("__aliases__");
export const DESCRIPTION = Symbol("__description__");
export const PARSER = Symbol("__parser__");
export const MIDDLEWARE = Symbol("__middleware__");
export const CHILDREN = Symbol("__children__");
export const PLUGINS = Symbol("__plugins__");
export const META = Symbol("__meta__");
export const INPUT = Symbol("__input__");
export const FN = Symbol("__fn__");

export interface ParseResult {
  options: Record<string, (string | boolean)[]>;
  args: string[];
}

export interface BaseContext {
  cmd: Command<any, any, any, any>;
}

export interface ContextWithInput extends BaseContext {
  input: unknown;
}

export interface Plugin<_Ext = {}> {
  type: "plugin";

  beforeParseSelf?({ cmd }: BaseContext): Resolvable<void>;
  beforeParseGlobal?({ cmd }: BaseContext): Resolvable<void>;
  afterParseGlobal?({ cmd, input }: ContextWithInput): Resolvable<void>;
  afterParseSelf?({ cmd, input }: ContextWithInput): Resolvable<void>;

  beforeRun?({ cmd, input }: ContextWithInput): Resolvable<void>;
  afterRun?({ cmd, input }: ContextWithInput): Resolvable<void>;

  catchSelf?({ cmd, input }: ContextWithInput): Resolvable<void>;
  catchGlobal?({ cmd, input }: ContextWithInput): Resolvable<void>;
}

export interface Parser {
  type: "parser";

  parse(argv: string[]): Resolvable<ParseResult>;
}

export type ActionFn<TInputs extends readonly unknown[], TInput = Flatten<TInputs>> = ({
  args,
  options,
  env,
}: {
  args: InferPositional<TInput>;
  options: InferOptions<TInput>;
  env: InferEnv<TInput>;
}) => Resolvable<number | void>;

export type Middleware<TInputs extends readonly unknown[], TInput = Flatten<TInputs>> = (
  {
    args,
    options,
    env,
  }: {
    args: InferPositional<TInput>;
    options: InferOptions<TInput>;
    env: InferEnv<TInput>;
  },
  next: () => Promise<number | void>,
) => Resolvable<number | void>;

type Config = Plugin<any> | Parser | Middleware<any, any>;

export class Command<
  TParent = null,
  TInput = {},
  TInherited = InferInherited<TParent>,
  TPlugins = [],
> {
  public [ALIASES]: string[];
  public [META]: Partial<Record<"version" | (string & {}), any>> = {};
  public [PARSER] = gnu();
  public [MIDDLEWARE]: Middleware<any, any>[] = [];
  public [CHILDREN] = new Map<string, Command<any, any, any, any>>();
  public [PLUGINS]: Plugin[] = [];
  public [DESCRIPTION]?: string;
  public [INPUT]?: TInput;
  public [FN]?: ActionFn<[TInherited, TInput, TPlugins]>;

  public constructor(...aliases: string[]) {
    this[ALIASES] = aliases;
  }

  public use<T extends Config[]>(
    ...middleware: T
  ): Command<TParent, TInput, TInherited, GetPluginExtensions<T>> {
    for (const mw of middleware) {
      if (typeof mw === "function") this[MIDDLEWARE].push(mw);
      else if (mw.type === "plugin") this[PLUGINS].push(mw);
      else if (mw.type === "parser") this[PARSER] = mw;
    }
    return this as any;
  }

  public alias(...aliases: string[]) {
    this[ALIASES].push(...aliases);
    return this;
  }

  public description(desc: string) {
    this[DESCRIPTION] = desc;
    return this;
  }

  public input<const T extends Input>(i: T): Command<TParent, T, TInherited, TPlugins> {
    this[INPUT] = i as any;
    return this as any;
  }

  public action(fn: ActionFn<[TInherited, TInput, TPlugins]>): this {
    this[FN] = fn;
    return this;
  }

  public async run() {
    throw new Error("TODO: not implemented");
  }
}

export function defineParser(parser: Omit<Parser, "type">): Parser {
  return Object.assign(parser, { type: "parser" as const });
}

export function definePlugin<T = {}>(plugin: Omit<Plugin<T>, "type">): Plugin<T> {
  return Object.assign(plugin, { type: "plugin" as const });
}

type GetPluginExtensions<T extends Config[]> = {
  [K in keyof T as T[K] extends Plugin<any> ? K : never]: T[K] extends Plugin<infer Ext>
    ? Ext
    : never;
};
