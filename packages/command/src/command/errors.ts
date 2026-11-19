import type { StandardSchemaV1 } from "@standard-schema/spec";

export class ConvokerError extends Error {}

export class TooManyArgumentsError extends ConvokerError {
  constructor(public expected: number) {
    super(`too many arguments! expected at most ${expected}`);
  }
}

export class TooFewArgumentsError extends ConvokerError {
  constructor(
    public min: number,
    public max?: number,
  ) {
    super(
      `too few arguments! expected ${min === max ? min : max ? `${min}-${max}` : `at least ${min}`} arguments`,
    );
  }
}

export class MissingOptionError extends ConvokerError {
  constructor(public opt: string) {
    super(`missing value for option \`${opt}\`!`);
  }
}

export class UnknownOptionError extends ConvokerError {
  constructor(public opt: string) {
    super(`unknown option: \`${opt}\`!`);
  }
}

export class MissingEnvError extends ConvokerError {
  constructor(public env: string) {
    super(`missing value for environment variable \`${env}\`!`);
  }
}

export class WrongTypeError extends ConvokerError {
  constructor(
    public value: string,
    public expected: string,
  ) {
    super(`wrong type! \`${value}\` is not ${expected}`);
  }
}

export class ValidationError extends ConvokerError {
  constructor(public issues: readonly StandardSchemaV1.Issue[]) {
    super(`validation issues:\n\t${issues.map((issue) => issue.message).join("\n\t")}`);
  }
}
