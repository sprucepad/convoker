import type { SharedOpts } from "@/core";

/**
 * Options for text input.
 */
export interface TextOpts extends SharedOpts<string> {
  /**
   * A placeholder, displayed when the user hasn't typed anything yet.
   */
  placeholder?: string;
  /**
   * Minimum length of the input.
   */
  minLength?: number;
  /**
   * Maximum length of the input.
   */
  maxLength?: number;
}

/**
 * Prompts the user for text input.
 * @param opts Options for text input.
 * @returns The text the user typed in, or the default.
 */
export default async function text(opts: TextOpts): Promise<string> {
  // TODO
}
