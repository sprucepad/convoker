---
editUrl: false
next: false
prev: false
title: "createInteractivePrompt"
---

> **createInteractivePrompt**\<`T`, `O`, `S`\>(`config`): (`opts`) => `Promise`\<`T`\>

Defined in: [packages/prompt/src/core/interactive.ts:24](https://github.com/sprucepad/convoker/blob/e7b2a4fd289b328fba79a8ed6d3b6800d52c810a/packages/prompt/src/core/interactive.ts#L24)

## Type Parameters

### T

`T`

### O

`O` *extends* [`CoreOpts`](/api/convoker/prompt/interfaces/coreopts/)\<`T`\>

### S

`S`

## Parameters

### config

#### initialState

(`opts`) => `S`

#### render

(`ctx`) => `void`

#### setup?

(`ctx`) => `void`

## Returns

> (`opts`): `Promise`\<`T`\>

### Parameters

#### opts

`O`

### Returns

`Promise`\<`T`\>
