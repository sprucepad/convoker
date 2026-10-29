import type { Input } from "../input/builders";
import type { InferInherited } from "../types/infer";

export class Command<
  TParent extends Command<any, any> | Input | null = null,
  TInput = InferInherited<TParent>,
> {}
