---
editUrl: false
next: false
prev: false
title: "PromptContext"
---

Defined in: [packages/prompt/src/core/static.ts:8](https://github.com/sprucepad/convoker/blob/e7b2a4fd289b328fba79a8ed6d3b6800d52c810a/packages/prompt/src/core/static.ts#L8)

## Extended by

- [`InteractiveContext`](/api/convoker/prompt/interfaces/interactivecontext/)

## Type Parameters

### T

`T`

## Properties

### abort()

> **abort**: () => `void`

Defined in: [packages/prompt/src/core/static.ts:13](https://github.com/sprucepad/convoker/blob/e7b2a4fd289b328fba79a8ed6d3b6800d52c810a/packages/prompt/src/core/static.ts#L13)

#### Returns

`void`

***

### done()

> **done**: (`value`) => `void`

Defined in: [packages/prompt/src/core/static.ts:11](https://github.com/sprucepad/convoker/blob/e7b2a4fd289b328fba79a8ed6d3b6800d52c810a/packages/prompt/src/core/static.ts#L11)

#### Parameters

##### value

`T`

#### Returns

`void`

***

### error()

> **error**: (`err`) => `void`

Defined in: [packages/prompt/src/core/static.ts:12](https://github.com/sprucepad/convoker/blob/e7b2a4fd289b328fba79a8ed6d3b6800d52c810a/packages/prompt/src/core/static.ts#L12)

#### Parameters

##### err

`unknown`

#### Returns

`void`

***

### input

> **input**: `ReadStream`

Defined in: [packages/prompt/src/core/static.ts:16](https://github.com/sprucepad/convoker/blob/e7b2a4fd289b328fba79a8ed6d3b6800d52c810a/packages/prompt/src/core/static.ts#L16)

***

### opts

> **opts**: [`CoreOpts`](/api/convoker/prompt/interfaces/coreopts/)\<`T`\>

Defined in: [packages/prompt/src/core/static.ts:9](https://github.com/sprucepad/convoker/blob/e7b2a4fd289b328fba79a8ed6d3b6800d52c810a/packages/prompt/src/core/static.ts#L9)

***

### output

> **output**: `WriteStream`

Defined in: [packages/prompt/src/core/static.ts:17](https://github.com/sprucepad/convoker/blob/e7b2a4fd289b328fba79a8ed6d3b6800d52c810a/packages/prompt/src/core/static.ts#L17)

***

### theme

> **theme**: [`Theme`](/api/convoker/namespaces/theme/interfaces/theme/)

Defined in: [packages/prompt/src/core/static.ts:15](https://github.com/sprucepad/convoker/blob/e7b2a4fd289b328fba79a8ed6d3b6800d52c810a/packages/prompt/src/core/static.ts#L15)

***

### validate()

> **validate**: (`value`) => `Promise`\<`T`\>

Defined in: [packages/prompt/src/core/static.ts:14](https://github.com/sprucepad/convoker/blob/e7b2a4fd289b328fba79a8ed6d3b6800d52c810a/packages/prompt/src/core/static.ts#L14)

#### Parameters

##### value

`T`

#### Returns

`Promise`\<`T`\>

***

### value

> **value**: `T` \| `undefined`

Defined in: [packages/prompt/src/core/static.ts:10](https://github.com/sprucepad/convoker/blob/e7b2a4fd289b328fba79a8ed6d3b6800d52c810a/packages/prompt/src/core/static.ts#L10)
