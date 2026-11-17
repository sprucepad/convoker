import type { Resolvable } from "../types/utils";
import type { Input } from "../input/builders";
import type { InferEnv, InferInherited, InferOptions, InferPositional } from "../types/infer";
import type { Flatten } from "../types/utils";
import { gnu } from "../flags/parsers";
import { reify, type ConcreteCLITree } from "./reifier";
import { PluginHost, type Parser, type Plugin } from "./plugin";

export const ALIASES = Symbol("__aliases__");
export const DESCRIPTION = Symbol("__description__");
export const PARSER = Symbol("__parser__");
export const MIDDLEWARE = Symbol("__middleware__");
export const CHILDREN = Symbol("__children__");
export const PLUGINS = Symbol("__plugins__");
export const META = Symbol("__meta__");
export const INPUT = Symbol("__input__");
export const FN = Symbol("__fn__");

export type ActionFn<TInputs extends readonly unknown[], TInput = Flatten<TInputs>> = ({
  args,
  options,
  env,
}: {
  args: InferPositional<TInput>;
  options: InferOptions<TInput>;
  env: InferEnv<TInput>;
}) => Resolvable<number | void>;

export type MiddlewareFn<TInputs extends readonly unknown[], TInput = Flatten<TInputs>> = (
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

export type Middleware<Cmd extends AnyCommand | null = null> =
  Cmd extends Command<infer T, infer I, infer P> ? MiddlewareFn<[I, P, T]> : MiddlewareFn<[]>;

export type Config = Plugin<any> | Parser | MiddlewareFn<any, any>;

export type CommandBuilder<Self> = (c: Command<Self>) => AnyCommand | void;

export type AnyCommand = Command<any, any, any>;

export class Command<TInput = {}, TInherited = {}, TPlugins = []> {
  public [ALIASES]: string[];
  public [META]: Partial<Record<"version" | (string & {}), any>> = {};
  public [PARSER] = gnu();
  public [MIDDLEWARE]: MiddlewareFn<any, any>[] = [];
  public [CHILDREN] = new Map<string, { cmd: AnyCommand; aliasFor?: string }>();
  public [PLUGINS]: PluginHost = new PluginHost();
  public [DESCRIPTION]?: string;
  public [INPUT]?: TInput;
  public [FN]?: ActionFn<[TInherited, TInput, TPlugins]>;

  public constructor(...aliases: string[]) {
    this[ALIASES] = aliases;
  }

  public inheritFrom<T extends AnyCommand>(): Command<TInput, InferInherited<T>, TPlugins> {
    return this as any;
  }

  public add(names: string | string[], builder: CommandBuilder<this>): this;
  public add(names: string | string[], c: AnyCommand): this;
  public add(c: AnyCommand): this;

  public add(
    namesOrCmd: string | string[] | AnyCommand,
    builderOrCmd?: CommandBuilder<this> | AnyCommand,
  ) {
    let cmd: AnyCommand =
      typeof namesOrCmd === "object" && !Array.isArray(namesOrCmd)
        ? namesOrCmd
        : typeof builderOrCmd === "function"
          ? (() => {
              const command = new Command(...namesOrCmd) as any;
              const result = builderOrCmd(command);

              if (result) return result;
              else return command;
            })()
          : builderOrCmd;
    const names = Array.isArray(namesOrCmd)
      ? namesOrCmd
      : typeof namesOrCmd === "string"
        ? [namesOrCmd]
        : cmd[ALIASES];

    for (let i = 0; i < names.length; i++) {
      const name = names[i]!;
      this[CHILDREN].set(name, {
        cmd,
        aliasFor: i === 0 ? undefined : names[0]!,
      });
    }

    return this;
  }

  public use<T extends Config[]>(
    ...middleware: T
  ): Command<TInput, TInherited, GetPluginExtensions<T>> {
    for (const mw of middleware) {
      if (typeof mw === "function") this[MIDDLEWARE].push(mw);
      else if (mw.type === "plugin") this[PLUGINS].plugins.push(mw);
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

  public input<const T extends Input>(i: T): Command<T, TInherited, TPlugins> {
    this[INPUT] = i as any;
    return this as any;
  }

  public action(fn: ActionFn<[TInherited, TInput, TPlugins]>): this {
    this[FN] = fn;
    return this;
  }

  public printHelpMessage() {
    throw new Error("TODO: not implemented");
  }

  public async parse(
    argv = process.argv.slice(2),
  ): Promise<ConcreteCLITree<[TInherited, TInput, TPlugins]>> {
    return reify(argv, this as any);
  }

  public async run(argv = process.argv.slice(2)) {
    const cst = await this.parse(argv);

    // TODO run actions and middleware

    return cst;
  }
}

type GetPluginExtensions<T extends Config[]> = {
  [K in keyof T as T[K] extends Plugin<any> ? K : never]: T[K] extends Plugin<infer Ext>
    ? Ext
    : never;
};

export * as reifier from "./reifier";
export * from "./plugin";
