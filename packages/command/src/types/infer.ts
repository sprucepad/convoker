import type { Command } from "../command";
import type { Input } from "../input/builders";

export type InferInherited<T extends Command<any, any> | Input | null> = never;

export type InferFormat<T extends string> = {
  type: never;
  required: never;
  array: never;
};
