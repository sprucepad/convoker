# Convoker

Convoker is a simple, type-safe CLI framework for TypeScript. It provides several components that can help you build command line interfaces.

## Modules

### [Command](https://www.npmjs.com/package/@convoker/command)

A highly customizable CLI routing/argument parsing library.

```ts
import { Command, i, flags } from "@convoker/command";
import * as v from "valibot";

import anotherExample from "./another-example-command";

const program = new Command("static-server")
  .use(flags.parsers.gnu(), flags.casing.kebab(), flags.help(), flags.version())
  .input([
    {
      ports: i
        .option("-p, --ports [PORT...:number]") // you can put a type here...
        .validateEach(v.pipe(v.number(), v.integer(), v.minValue(0), v.maxValue(65535)))
        .description("The port(s) to serve the files in.")
        .default([8000]),
      hosts: i
        .option("-h, --hosts [HOSTS]")
        .validate(v.array(v.pipe(v.string(), v.domain()))) // ...or here, through a Standard Schema validator, for more complex types
        .description("The hostname(s) to serve files in.")
        .default(["localhost"]),
    },
    {
      path: i.positional("[path:string]").default("."),
    },
  ])
  .action(({ options, args }) => {
    console.log(options, args);
    // ^ options: {
    //   hosts: string[],
    //   ports: number[],
    // }
    // ^ args: {
    //   path: string,
    // }
  })
  .add("example", (c) =>
    c.description("Example subcommand!").action(() => console.log("Hello, World!")),
  )
  .add(anotherExample);

await program.run();
```

## [Keyboard](https://www.npmjs.com/package/@convoker/keyboard)

A customizable CLI interactivity library, for adding custom interactivity to your app. This can also be used to create custom prompts.

```ts
import * as keyboard from "@convoker/keyboard";

// TODO
// Design an API for this
```

## [Prompt](https://www.npmjs.com/package/@convoker/prompt)

A pre-built set of prompts for CLI applications, for adding interactivity and loading indicators to your app.

```ts
import * as prompt from "@convoker/prompt";

const confirmation = await prompt.confirm({
  message: "Are you sure you want to proceed?",
});
if (!confirmation) return;

const username = await prompt.text({ message: "Username" });
const password = await prompt.password({ message: "Password" });
// You can also have editors, searching and selecting.
```

### [Theme](https://www.npmjs.com/package/@convoker/theme)

An ANSI coloring library.

```ts
import * as theme from "@convoker/theme";

console.log(`${theme.bold("Hello,")} ${theme.green("World!")}`);
```
