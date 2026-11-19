import { Command, i } from "@convoker/command";

const program = new Command("my-framework")
  .input([
    {
      greeting: i.option("--greeting [GREETING]").default("Hello"),
    },
    {
      names: i.positional("[NAMES...]").default(["World"]),
    },
  ])
  .action(({ args, options }) => {
    for (const name of args.names) {
      console.log(`${options.greeting}, ${name}!`);
    }
  });

await program.run();
