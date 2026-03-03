import type { TextOpts } from "./text";

/**
 * Options for password input.
 */
export interface PasswordOpts extends TextOpts {
  /**
   * The mask for the password input.
   */
  mask?: string;
  /**
   * If the user should be asked to confirm the password, by typing it again.
   */
  confirm?: boolean;
}

/**
 * Prompts the user for a password.
 * @param opts Options for password input.
 * @returns The password.
 */
export default async function password(opts: PasswordOpts): Promise<string> {
  // TODO
}
