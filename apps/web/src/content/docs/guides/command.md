---
title: Argument parsing
description: Argument parsing is the core package in Convoker.
sidebar:
  order: 1
---

Command-line argument parsing is usually one of the first things that happen in the lifecycle of your program. It's the act of parsing a command like `demo --first --second=hello hello.txt world.py -xyz` into a format that's easier to consume in a program, like an object.

The core of Convoker is several command-line argument parsers, by default a UNIX-like parser. It works through a `Command` class, with several metadata properties, which are used to auto-generate a help screen, and execution methods.

```js title="index.js"
import { Command, i, log } from "convoker";

const program = new Command("demo")
  .description("An example program.")
  .version("1.0.0");
```

There are several metadata setters:

- `alias`: Adds aliases to this command, meaning it can be called through multiple names.
- `description`: Adds a description.
- `version`: Adds a version.
- `input`: Adds [input](#input) to the command.

There are several execution setters:

- `use`: Adds zero or more [middleware](#middleware) functions.
- `action`: Adds an action function.
- `error`: Adds an error handler function.
- `subCommand`: Adds a [subcommand](#subcommands).

## Subcommands

There are 3 main ways to define subcommands:

1. A builder function, which isolates your command from others:

   ```js title="index.js"
   program.subCommand("add", (c) =>
     c
       .description("Adds a list of numbers.")
       .input({
         numbers: i.positional("number").list(),
       })
       .action(({ numbers }) => {
         let sum = 0;
         for (const number of numbers) {
           sum += number;
         }
         log.info(sum);
       }),
   );
   ```

2. Individual, which allows commands to easily be in different files:

   ```js title="add.js"
   import { Command, i, log } from "convoker";

   export default new Command("add")
     .description("Adds a list of numbers.")
     .input({
       numbers: i.positional("number").list(),
     })
     .action(({ numbers }) => {
       let sum = 0;
       for (const number of numbers) {
         sum += number;
       }
       log.info(sum);
     });
   ```

   ```js title="index.js"
   import exampleCommand from "./add";
   program.add(exampleCommand);
   ```

3. An inline builder, which allows you to easily define sub-subcommands.

   ```js title="index.js"
   program
     .subCommand("add")
     .input({
       numbers: i.positional("number").list(),
     })
     .action(({ numbers }) => {
       let sum = 0;
       for (const number of numbers) {
         sum += number;
       }
       log.info(sum);
     });
   ```

## Input

Input is what your command takes in to execute, similar to function parameters. Parsed input is passed as the first argument to [middleware](#middleware) functions and action functions. You can use it from the `i` namespace in the core package.

```ts
program.input({
  verbose: i.option("boolean", "-v", "--verbose"),
  version: i.option("boolean", "-V", "--version"),
  help: i.option("boolean", "-h", "--help"),
});
```

You can pass a string for basic types, or you can use any [Standard Schema](https://standardschema.dev/) validator.

## Middleware

Middleware are functions that run before action functions in a chain, that can be used for shared logic or setup. They take in two parameters: the input, and a reference to the next function in the chain. They can be at any level, in any subcommand.

```ts
program.use((input, next) => {
  log.info("Middleware reached!");
  return next();
});
```

:::note
You must return or await the result of `next` to avoid hanging promise errors, and you can't call `next` multiple times.
:::

## Parsers

Convoker comes with 3 built-in parsers, in the `parsers` namespace in the core package. By default, a UNIX-like parser.

```ts
// # Unix parser
parsers.unix(
  parsers.gnu() || // GNU-style parsing, used in the UNIX parser as the default. Enables:
    // - short flags & joining (`-abcdef`, being 6 different flags)
    // - long flags with values (separated by spaces or `=`)

    parsers.verbose() || // Verbose parsing. Enables:
    // - non-joinable short flags (-a -b -c -d -e -f)
    // - long flags with values (separated by `=` only)

    parsers.bsd() || // BSD-style parsing. Enables:
    // - non-joinable short flags with values (`-aExample`)

    // Custom preset.
    ({} as any),
); // UNIX-like parsing. Comes with three different presets. Allows for:
// - subcommands
// - other capabilities, depending on the preset (see above)

// # Windows parser
parsers.windows(); // Windows-like parsing. Allows for:
// - subcommands
// - long & short flags, with values (separated by `:`)

// # Key-value parser
parsers.keyValue(); // Key/value pair parsing (`command key=value`)
// - long flags only with values (separated by `=`)
```

To use a parser, you can use the `use` function in your root command.

:::note
Only the root command can customize the parser. Parsers in subcommands will be ignored.
:::

```ts
program
  .input({
    names: i.option("string", "/names").list(),
  })
  .use(parsers.windows())
  .action(({ names }) => {
    for (const name of names) {
      console.log(`Hello, ${name}!`);
    }
  });

program.run(["/names:John,Amy"]);
```

## Execution

To execute your program, you can use the `program.run([...argv]?)` function. By default, `argv` is Node.js' `process.argv.slice(2)`. You can also manually do execution by using the `program.parse([...argv]?)` function.

At the moment, Convoker only supports Node.js and Bun, which is Node-compatible. We have not tested this, but with the correct Node compatibility settings, you might be able to use it in Deno.
