import type { StandardSchemaV1 } from "@convoker/input";
import type { Theme } from "@convoker/theme";

export interface SharedOpts<T> {
  message: string;
  validate?: StandardSchemaV1<any, T> | ((value: T) => boolean | T);

  theme?: Theme;
  input?: NodeJS.ReadableStream;
  output?: NodeJS.WritableStream;
  clearPromptOnDone?: boolean;
  signal?: AbortSignal;
}
