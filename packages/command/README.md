# Convoker Command

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
