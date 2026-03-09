---
editUrl: false
next: false
prev: false
title: "InteractiveContext"
---

Defined in: [packages/prompt/src/core/interactive.ts:12](https://github.com/sprucepad/convoker/blob/e7b2a4fd289b328fba79a8ed6d3b6800d52c810a/packages/prompt/src/core/interactive.ts#L12)

## Extends

- [`PromptContext`](/api/convoker/prompt/interfaces/promptcontext/)\<`T`\>

## Type Parameters

### T

`T`

### O

`O` *extends* [`CoreOpts`](/api/convoker/prompt/interfaces/coreopts/)\<`T`\>

### S

`S`

## Properties

### abort()

> **abort**: () => `void`

Defined in: [packages/prompt/src/core/static.ts:13](https://github.com/sprucepad/convoker/blob/e7b2a4fd289b328fba79a8ed6d3b6800d52c810a/packages/prompt/src/core/static.ts#L13)

#### Returns

`void`

#### Inherited from

[`PromptContext`](/api/convoker/prompt/interfaces/promptcontext/).[`abort`](/api/convoker/prompt/interfaces/promptcontext/#abort)

***

### done()

> **done**: (`value`) => `void`

Defined in: [packages/prompt/src/core/static.ts:11](https://github.com/sprucepad/convoker/blob/e7b2a4fd289b328fba79a8ed6d3b6800d52c810a/packages/prompt/src/core/static.ts#L11)

#### Parameters

##### value

`T`

#### Returns

`void`

#### Inherited from

[`PromptContext`](/api/convoker/prompt/interfaces/promptcontext/).[`done`](/api/convoker/prompt/interfaces/promptcontext/#done)

***

### error()

> **error**: (`err`) => `void`

Defined in: [packages/prompt/src/core/static.ts:12](https://github.com/sprucepad/convoker/blob/e7b2a4fd289b328fba79a8ed6d3b6800d52c810a/packages/prompt/src/core/static.ts#L12)

#### Parameters

##### err

`unknown`

#### Returns

`void`

#### Inherited from

[`PromptContext`](/api/convoker/prompt/interfaces/promptcontext/).[`error`](/api/convoker/prompt/interfaces/promptcontext/#error)

***

### input

> **input**: `ReadStream`

Defined in: [packages/prompt/src/core/static.ts:16](https://github.com/sprucepad/convoker/blob/e7b2a4fd289b328fba79a8ed6d3b6800d52c810a/packages/prompt/src/core/static.ts#L16)

#### Inherited from

[`PromptContext`](/api/convoker/prompt/interfaces/promptcontext/).[`input`](/api/convoker/prompt/interfaces/promptcontext/#input)

***

### onKeypress()

> **onKeypress**: (`handler`) => `void`

Defined in: [packages/prompt/src/core/interactive.ts:21](https://github.com/sprucepad/convoker/blob/e7b2a4fd289b328fba79a8ed6d3b6800d52c810a/packages/prompt/src/core/interactive.ts#L21)

#### Parameters

##### handler

(`key`) => `void`

#### Returns

`void`

***

### opts

> **opts**: `O`

Defined in: [packages/prompt/src/core/interactive.ts:17](https://github.com/sprucepad/convoker/blob/e7b2a4fd289b328fba79a8ed6d3b6800d52c810a/packages/prompt/src/core/interactive.ts#L17)

#### Overrides

[`PromptContext`](/api/convoker/prompt/interfaces/promptcontext/).[`opts`](/api/convoker/prompt/interfaces/promptcontext/#opts)

***

### output

> **output**: `WriteStream`

Defined in: [packages/prompt/src/core/static.ts:17](https://github.com/sprucepad/convoker/blob/e7b2a4fd289b328fba79a8ed6d3b6800d52c810a/packages/prompt/src/core/static.ts#L17)

#### Inherited from

[`PromptContext`](/api/convoker/prompt/interfaces/promptcontext/).[`output`](/api/convoker/prompt/interfaces/promptcontext/#output)

***

### render()

> **render**: () => `void`

Defined in: [packages/prompt/src/core/interactive.ts:20](https://github.com/sprucepad/convoker/blob/e7b2a4fd289b328fba79a8ed6d3b6800d52c810a/packages/prompt/src/core/interactive.ts#L20)

#### Returns

`void`

***

### setState()

> **setState**: (`updater`) => `void`

Defined in: [packages/prompt/src/core/interactive.ts:19](https://github.com/sprucepad/convoker/blob/e7b2a4fd289b328fba79a8ed6d3b6800d52c810a/packages/prompt/src/core/interactive.ts#L19)

#### Parameters

##### updater

(`prev`) => `S`

#### Returns

`void`

***

### state

> **state**: `S`

Defined in: [packages/prompt/src/core/interactive.ts:18](https://github.com/sprucepad/convoker/blob/e7b2a4fd289b328fba79a8ed6d3b6800d52c810a/packages/prompt/src/core/interactive.ts#L18)

***

### theme

> **theme**: [`Theme`](/api/convoker/namespaces/theme/interfaces/theme/)

Defined in: [packages/prompt/src/core/static.ts:15](https://github.com/sprucepad/convoker/blob/e7b2a4fd289b328fba79a8ed6d3b6800d52c810a/packages/prompt/src/core/static.ts#L15)

#### Inherited from

[`PromptContext`](/api/convoker/prompt/interfaces/promptcontext/).[`theme`](/api/convoker/prompt/interfaces/promptcontext/#theme)

***

### validate()

> **validate**: (`value`) => `Promise`\<`T`\>

Defined in: [packages/prompt/src/core/static.ts:14](https://github.com/sprucepad/convoker/blob/e7b2a4fd289b328fba79a8ed6d3b6800d52c810a/packages/prompt/src/core/static.ts#L14)

#### Parameters

##### value

`T`

#### Returns

`Promise`\<`T`\>

#### Inherited from

[`PromptContext`](/api/convoker/prompt/interfaces/promptcontext/).[`validate`](/api/convoker/prompt/interfaces/promptcontext/#validate)

***

### value

> **value**: `T` \| `undefined`

Defined in: [packages/prompt/src/core/static.ts:10](https://github.com/sprucepad/convoker/blob/e7b2a4fd289b328fba79a8ed6d3b6800d52c810a/packages/prompt/src/core/static.ts#L10)

#### Inherited from

[`PromptContext`](/api/convoker/prompt/interfaces/promptcontext/).[`value`](/api/convoker/prompt/interfaces/promptcontext/#value)
