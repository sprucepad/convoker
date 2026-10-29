export * from "./command";
export * as i from "./input";

export function greet(...names: string[]) {
  for (const name of names) {
    console.log(`Hello, ${name}!`);
  }
}
