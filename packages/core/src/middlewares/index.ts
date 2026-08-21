import type { Command, MiddlewareFn } from "@/command";
import { HelpAskedError, VersionAskedError } from "@/error";
import { Option } from "@/input";

type VersionInput = {
  version: Option<"boolean", false>;
};

export function versionFlag(
  command: Command<any>,
  flagNames?: string[],
): MiddlewareFn<any> {
  const fn: MiddlewareFn<VersionInput> = ({ version }, next) => {
    if (version) throw new VersionAskedError(command);
    return next();
  };

  command.$input = {
    version: new Option("boolean", flagNames ?? ["version", "V"]).optional(),
    ...command.$input,
  };

  return fn;
}

type HelpInput = {
  help: Option<"boolean", false>;
};

export function helpFlag(
  command: Command<any>,
  flagNames?: string[],
): MiddlewareFn<any> {
  const fn: MiddlewareFn<HelpInput> = ({ help }, next) => {
    if (help) throw new HelpAskedError(command);
    return next();
  };

  command.$input = {
    help: new Option("boolean", flagNames ?? ["--help", "-h"]).optional(),
    ...command.$input,
  };

  return fn;
}
