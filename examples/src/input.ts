import { Command, i } from "convoker";

// Convoker allows you to validate inputs, that being positional arguments or flags/options.
// This can be done with a validation library that supports Standard Schema, like Zod or Valibot:
import { z } from "zod";
// or just simple strings if you don't need further validation.

export const inputExample = new Command("input")
  // To define inputs, you use the `.input()` function and pass an object.
  .input({
    // Convoker provides input utilities from the `convoker/input` module or the `i` object in root.
    x: i.option(z.coerce.number(), "--x", "-x"), // If you want more complex validation
    y: i.option("number", "--y", "-y"), // If you don't need a validator
    // Both of the above can be lists as well, using the `.list()` modifier. The separator by default is `,`, but this can be changed in the parser.

    // You can also have positional arguments:
    names: i.positional("string").list(), // They can be lists as well. The separator by default is ` ` (one per argument), but this can be changed in the parser.
  })
  // This input is accessible as the first argument of either middlewares or actions,
  // and is fully type-safe.
  .use((input, next) => next())
  .action(({ x, y, names }) => {
    console.log(`x: ${x}, y: ${y}`);
    console.log(`Names: ${names.join(", ")}`);
  });
