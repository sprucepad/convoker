---
editUrl: false
next: false
prev: false
title: "ErrorFn"
---

> **ErrorFn**\<`T`\> = (`command`, `errors`, `input`) => `void` \| `Promise`\<`void`\>

Defined in: [packages/core/src/command.ts:79](https://github.com/sprucepad/convoker/blob/e7b2a4fd289b328fba79a8ed6d3b6800d52c810a/packages/core/src/command.ts#L79)

Command error handler.

## Type Parameters

### T

`T` *extends* [`Input`](/api/convoker/core/namespaces/i/interfaces/input/)

## Parameters

### command

[`Command`](/api/convoker/core/classes/command/)\<`T`\>

### errors

`Error`[]

### input

`Partial`\<[`InferInput`](/api/convoker/core/namespaces/i/type-aliases/inferinput/)\<`T`\>\>

## Returns

`void` \| `Promise`\<`void`\>
