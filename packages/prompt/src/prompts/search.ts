import type { SelectOption, SelectOpts } from "./select";

/**
 * Options for search input.
 */
export interface SearchOpts<T, M extends boolean = false> extends SelectOpts<
  T,
  M
> {
  /**
   * Placeholder for the search input.
   */
  placeholder?: string;
  /**
   * Minimum length for a query string.
   */
  minQueryLength?: number;
  /**
   * Filters a single option.
   * @param query The search query.
   * @param option The option to filter.
   */
  filter?(query: string, option: SelectOption<T>): boolean;
}

/**
 * Prompts the user to search through a list of options.
 * @param opts Options for search input.
 * @returns The selected option.
 */
export default function search<T, M extends boolean = false>(
  opts: SearchOpts<T, M>,
): Promise<M extends true ? T[] : T> {
  // TODO
}
