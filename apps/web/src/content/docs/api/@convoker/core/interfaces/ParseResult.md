---
editUrl: false
next: false
prev: false
title: "ParseResult"
---

Defined in: [packages/core/src/command.ts:38](https://github.com/sprucepad/convoker/blob/e7b2a4fd289b328fba79a8ed6d3b6800d52c810a/packages/core/src/command.ts#L38)

The result of the `Command.parse` function.

## Type Parameters

### T

`T` *extends* [`Input`](/api/convoker/core/namespaces/i/interfaces/input/)

## Properties

### command

> **command**: [`Command`](/api/convoker/core/classes/command/)\<`T`\>

Defined in: [packages/core/src/command.ts:42](https://github.com/sprucepad/convoker/blob/e7b2a4fd289b328fba79a8ed6d3b6800d52c810a/packages/core/src/command.ts#L42)

A pointer to the command to run.

***

### errors

> **errors**: [`ConvokerError`](/api/convoker/core/classes/convokererror/)[]

Defined in: [packages/core/src/command.ts:50](https://github.com/sprucepad/convoker/blob/e7b2a4fd289b328fba79a8ed6d3b6800d52c810a/packages/core/src/command.ts#L50)

Errors collected during parsing.

***

### input

> **input**: [`InferInput`](/api/convoker/core/namespaces/i/type-aliases/inferinput/)\<`T`\>

Defined in: [packages/core/src/command.ts:46](https://github.com/sprucepad/convoker/blob/e7b2a4fd289b328fba79a8ed6d3b6800d52c810a/packages/core/src/command.ts#L46)

The input to pass into the command.

***

### isHelp

> **isHelp**: `boolean`

Defined in: [packages/core/src/command.ts:58](https://github.com/sprucepad/convoker/blob/e7b2a4fd289b328fba79a8ed6d3b6800d52c810a/packages/core/src/command.ts#L58)

If this should result in displaying a help screen.

***

### isVersion

> **isVersion**: `boolean`

Defined in: [packages/core/src/command.ts:54](https://github.com/sprucepad/convoker/blob/e7b2a4fd289b328fba79a8ed6d3b6800d52c810a/packages/core/src/command.ts#L54)

If this should result in displaying the version of the command.
