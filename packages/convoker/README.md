# Convoker

Convoker is a simple, type-safe CLI framework for TypeScript. It provides several components that can help you build command line interfaces.

## Modules

Each module can be installed independently, or simply with the [convoker](https://www.npmjs.com/package/convoker) package.

### [Core](https://www.npmjs.com/package/@convoker/core)

A customizable CLI argument parser.

```ts
import { Command, i, parsers, middleware } from "convoker";

export default new Command("greet")
  .description()
  .input({
    names: i.positional("string").list().optional(),
  })
  .use(middleware.versionFlag(), middleware.helpFlag())
  .use(async (input, next) => {
    // Middleware logic
    return next();
  })
  .action(async ({ names }) => {
    names.forEach((name) => {
      console.log(`Hello, ${name}!`);
    });
  });
```

## [Prompt](https://www.npmjs.com/package/@convoker/prompt)

A customizable CLI prompting library.

```ts
import { prompt } from "convoker";

const confirmation = await prompt.confirm({
  message: "Are you sure you want to proceed?",
});
if (!confirmation) return;

const username = await prompt.text({ message: "Username" });
const password = await prompt.password({ message: "Password" });
// You can also have editors, searching and selecting.
```

### [Log](https://www.npmjs.com/package/@convoker/log)

A logging library, with several logging levels and customizable messages.

```ts
import { log } from "convoker";

log.trace("Debug information");
log.info("Information");
log.warn("Warning");
log.error("Error");
log.fatal("Fatal");
```

### [Theme](https://www.npmjs.com/package/@convoker/theme)

An ANSI coloring library, as well as theme definitions for core, logging and prompting.

```ts
import { theme } from "convoker";

console.log(`${theme.bold("Hello,")} ${theme.green("World!")}`);
```
