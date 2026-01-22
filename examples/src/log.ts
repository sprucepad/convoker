import { Command, log } from "convoker";

// Convoker provides async logging. This is provided throught the `log` object from root, or through the `convoker/log` module.
// Note that this doesn't replace `console` -- it is mostly for things like server logs or debugging, while `console` can be used for program output.

export const logExample = new Command("log")
  .version("1.0.0")
  .description("Log example in Convoker.")
  .action(async () => {
    // Make sure you have already set up logging. This is usually done in the root middleware,
    // so every command has access to it.
    await log.setup();

    // Convoker provides 5 basic log levels, and they all work similar to `console`
    // functions, but async:
    await log.trace("Debugging");
    await log.info("Informational");
    await log.warn("Warning");
    await log.error("Non-fatal error");
    await log.fatal("Fatal error");
    // `.fatal()` also exits the program.
  });
