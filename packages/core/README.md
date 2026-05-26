# Convoker Core

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
