# Convoker Prompt

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
