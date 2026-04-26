import type { Command, MiddlewareFn } from "@/command";
import { HelpAskedError, VersionAskedError } from "@/error";
import { Option } from "@convoker/input";

type VersionInput = {
  version: Option<"boolean", false>;
};

export function versionFlag(
  command: Command<any>,
  flagNames?: string[],
): MiddlewareFn<VersionInput> {
  const fn: MiddlewareFn<VersionInput> = ({ version }) => {
    if (version) throw new VersionAskedError(command);
  };

  fn.extend = (c) => {
    c.$input = {
      version: new Option(
        "boolean",
        flagNames ?? ["--version", "-V"],
      ).optional(),
      ...c.$input,
    };
  };

  return fn;
}

type HelpInput = {
  help: Option<"boolean", false>;
};

export function helpFlag(
  command: Command<any>,
  flagNames?: string[],
): MiddlewareFn<HelpInput> {
  const fn: MiddlewareFn<HelpInput> = ({ help }) => {
    if (help) throw new HelpAskedError(command);
  };

  fn.extend = (c) => {
    c.$input = {
      version: new Option("boolean", flagNames ?? ["--help", "-h"]).optional(),
      ...c.$input,
    };
  };

  return fn;
}
