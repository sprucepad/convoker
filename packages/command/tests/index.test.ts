import { describe, expect, it, vi } from "vitest";
import { greet } from "./index";

describe("greet()", () => {
  it("greets a set of people", () => {
    const spy = vi.spyOn(console, "log");

    greet("John", "Amy");

    expect(spy).toHaveBeenNthCalledWith(1, "Hello, John!");
    expect(spy).toHaveBeenNthCalledWith(2, "Hello, Amy!");
  });
});
