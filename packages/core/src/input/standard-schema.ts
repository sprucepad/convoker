import { InputValidationError } from "./error";
import type { StandardSchemaV1 } from "@standard-schema/spec";

/**
 * Validates a value.
 * @param entry The Standard Schema validator.
 * @param value The value to validate.
 * @returns The validated value.
 */
export async function validate<T extends StandardSchemaV1<any, any>>(
  entry: T,
  value: any,
): Promise<T extends StandardSchemaV1<any, infer Out> ? Out : never> {
  const result = await entry["~standard"].validate(value);
  if (result.issues) {
    const msgs = result.issues.map((i) => i.message);
    throw new InputValidationError(msgs);
  }

  return result.value;
}
