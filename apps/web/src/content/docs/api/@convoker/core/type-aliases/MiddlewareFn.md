---
editUrl: false
next: false
prev: false
title: "MiddlewareFn"
---

> **MiddlewareFn**\<`T`\> = (`input`, `next`) => `any` \| `Promise`\<`any`\>

Defined in: [packages/core/src/command.ts:71](https://github.com/sprucepad/convoker/blob/e7b2a4fd289b328fba79a8ed6d3b6800d52c810a/packages/core/src/command.ts#L71)

Command middleware function.

## Type Parameters

### T

`T` *extends* [`Input`](/api/convoker/core/namespaces/i/interfaces/input/) = [`Input`](/api/convoker/core/namespaces/i/interfaces/input/)

## Parameters

### input

[`InferInput`](/api/convoker/core/namespaces/i/type-aliases/inferinput/)\<`T`\>

### next

() => `Promise`\<`any`\>

## Returns

`any` \| `Promise`\<`any`\>
