export type Resolvable<T> = T | Promise<T>;

export type Flatten<T extends readonly unknown[]> = T extends readonly [infer First, ...infer Rest]
  ? First extends readonly unknown[]
    ? [...Flatten<First>, ...Flatten<Rest>]
    : [First, ...Flatten<Rest>]
  : [];
