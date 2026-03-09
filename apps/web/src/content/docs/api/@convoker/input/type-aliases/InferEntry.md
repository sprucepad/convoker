---
editUrl: false
next: false
prev: false
title: "InferEntry"
---

> **InferEntry**\<`T`\> = `T` *extends* `object` ? `List` *extends* `true` ? `Required` *extends* `true` ? [`TypeOf`](/api/convoker/input/type-aliases/typeof/)\<`TKind`\>[] : [`TypeOf`](/api/convoker/input/type-aliases/typeof/)\<`TKind`\>[] \| `undefined` : `Required` *extends* `true` ? [`TypeOf`](/api/convoker/input/type-aliases/typeof/)\<`TKind`\> : [`TypeOf`](/api/convoker/input/type-aliases/typeof/)\<`TKind`\> \| `undefined` : `never`

Defined in: [packages/input/src/input.ts:45](https://github.com/sprucepad/convoker/blob/e7b2a4fd289b328fba79a8ed6d3b6800d52c810a/packages/input/src/input.ts#L45)

Infers a TypeScript type from an option or positional.

## Type Parameters

### T

`T`
