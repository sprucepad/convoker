import { createInteractivePrompt } from "@/core";
import type { SelectOption, SelectOpts } from "./select";

/**
 * Options for search input.
 */
export interface SearchOpts<
  T,
  M extends boolean = false,
  Q = string,
> extends SelectOpts<T, M> {
  /**
   * Placeholder for the search input.
   */
  placeholder?: string;
  /**
   * Minimum length for a query string.
   */
  minQueryLength?: number;
  transformQuery?(query: string): Q;
  /**
   * Filters a single option.
   * @param query The search query.
   * @param option The option to filter.
   */
  filter?(query: Q, option: SelectOption<T>): boolean;
}

/**
 * Prompts the user to search through a list of options.
 * @param opts Options for search input.
 * @returns The selected option.
 */
export default function search<T, M extends boolean = false>(
  opts: SearchOpts<T, M>,
): Promise<M extends true ? T[] : T> {
  if (opts.multiple) return searchMultiple(opts);
  else return searchSingle(opts);
}

interface SearchSingleState {
  /**
   * Current search query typed by the user.
   */
  query: string;
  /**
   * Index of the currently highlighted item
   * within the filtered results array.
   */
  cursor: number;
  /**
   * Indices of options that match the current query.
   * These are indices into opts.options.
   */
  filtered: number[];
}

const searchSingle = createInteractivePrompt<
  any,
  SearchOpts<any, any, any>,
  SearchSingleState
>({
  initialState(opts) {
    return {
      query: "",
      cursor: 0,
      filtered: opts.options.map((_, i) => i),
    };
  },

  setup(ctx) {
    const { opts } = ctx;

    ctx.onKeypress(async (key) => {
      const { state } = ctx;

      if (key.ctrl && key.name === "c") {
        return ctx.abort();
      }

      if (key.name === "return") {
        const index = state.filtered[state.cursor];
        if (index === undefined) return;

        const value = opts.options[index]!.value;
        const validated = await ctx.validate(value);
        ctx.done(validated);
        return;
      }

      if (key.name === "up") {
        ctx.setState((s) => ({
          ...s,
          cursor: Math.max(0, s.cursor - 1),
        }));
        return;
      }

      if (key.name === "down") {
        ctx.setState((s) => ({
          ...s,
          cursor: Math.min(s.filtered.length - 1, s.cursor + 1),
        }));
        return;
      }

      if (key.name === "backspace") {
        ctx.setState((s) => {
          const query = s.query.slice(0, -1);
          const filtered = computeFiltered(query, opts);

          return {
            query,
            filtered,
            cursor: 0,
          };
        });
        return;
      }

      if (key.name?.length === 1 && !key.ctrl && !key.meta) {
        ctx.setState((s) => {
          const query = s.query + key.name;
          const filtered = computeFiltered(query, opts);

          return {
            query,
            filtered,
            cursor: 0,
          };
        });
      }
    });
  },

  render(ctx) {
    const { output, opts, state } = ctx;

    const placeholder = opts.placeholder ?? opts.message;
    const query = state.query || placeholder;

    output.write(`? ${query}\n`);

    if (state.filtered.length === 0) {
      output.write("  No results\n");
      return;
    }

    for (let i = 0; i < state.filtered.length; i++) {
      const optionIndex = state.filtered[i]!;
      const option = opts.options[optionIndex]!;

      const cursor = i === state.cursor ? "❯" : " ";
      output.write(`${cursor} ${option.label}\n`);
    }
  },
});

interface SearchMultipleState {
  /**
   * Current search query.
   */
  query: string;
  /**
   * Cursor position within filtered results.
   */
  cursor: number;
  /**
   * Filtered option indices (same concept as single).
   */
  filtered: number[];
  /**
   * Selected option indices (original option indices).
   */
  selected: Set<number>;
}

const searchMultiple = createInteractivePrompt<
  any,
  SearchOpts<any, any, any>,
  SearchMultipleState
>({
  initialState(opts) {
    return {
      query: "",
      cursor: 0,
      filtered: opts.options.map((_, i) => i),
      selected: new Set(),
    };
  },

  setup(ctx) {
    const { opts } = ctx;

    ctx.onKeypress(async (key) => {
      const { state } = ctx;

      if (key.ctrl && key.name === "c") {
        return ctx.abort();
      }

      if (key.name === "return") {
        const values = [...state.selected].map((i) => opts.options[i]!.value);

        const validated = await ctx.validate(values);
        ctx.done(validated);
        return;
      }

      if (key.name === "space") {
        const optionIndex = state.filtered[state.cursor];
        if (optionIndex === undefined) return;

        ctx.setState((s) => {
          const selected = new Set(s.selected);

          if (selected.has(optionIndex)) selected.delete(optionIndex);
          else selected.add(optionIndex);

          return { ...s, selected };
        });

        return;
      }

      if (key.name === "up") {
        ctx.setState((s) => ({
          ...s,
          cursor: Math.max(0, s.cursor - 1),
        }));
        return;
      }

      if (key.name === "down") {
        ctx.setState((s) => ({
          ...s,
          cursor: Math.min(s.filtered.length - 1, s.cursor + 1),
        }));
        return;
      }

      if (key.name === "backspace") {
        ctx.setState((s) => {
          const query = s.query.slice(0, -1);
          const filtered = computeFiltered(query, opts);

          return {
            ...s,
            query,
            filtered,
            cursor: 0,
          };
        });
        return;
      }

      if (key.name?.length === 1 && !key.ctrl && !key.meta) {
        ctx.setState((s) => {
          const query = s.query + key.name;
          const filtered = computeFiltered(query, opts);

          return {
            ...s,
            query,
            filtered,
            cursor: 0,
          };
        });
      }
    });
  },

  render(ctx) {
    const { output, opts, state } = ctx;

    const placeholder = opts.placeholder ?? opts.message;
    const query = state.query || placeholder;

    output.write(`? ${query}\n`);

    if (state.filtered.length === 0) {
      output.write("  No results\n");
      return;
    }

    for (let i = 0; i < state.filtered.length; i++) {
      const optionIndex = state.filtered[i]!;
      const option = opts.options[optionIndex]!;

      const cursor = i === state.cursor ? "❯" : " ";
      const checked = state.selected.has(optionIndex) ? "[x]" : "[ ]";

      output.write(`${cursor} ${checked} ${option.label}\n`);
    }

    output.write("\nPress space to select, enter to confirm\n");
  },
});

function computeFiltered<T, Q>(
  query: string,
  opts: SearchOpts<T, any>,
): number[] {
  const q = opts.transformQuery?.(query) ?? (query as unknown as Q);

  if (opts.minQueryLength && query.length < opts.minQueryLength) {
    return opts.options.map((_, i) => i);
  }

  return opts.options
    .map((opt, i) => ({ opt, i }))
    .filter(({ opt }) =>
      opts.filter
        ? opts.filter(q as any, opt)
        : String(opt.label).toLowerCase().includes(query.toLowerCase()),
    )
    .map(({ i }) => i);
}
