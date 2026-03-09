---
editUrl: false
next: false
prev: false
title: "InferInput"
---

> **InferInput**\<`T`\> = `{ [K in keyof T]: InferEntry<T[K]> }`

Defined in: [packages/input/src/input.ts:38](https://github.com/sprucepad/convoker/blob/e7b2a4fd289b328fba79a8ed6d3b6800d52c810a/packages/input/src/input.ts#L38)

Infers TypeScript types from an input object.

## Type Parameters

### T

`T` *extends* [`Input`](/api/convoker/input/interfaces/input/)
