---
editUrl: false
next: false
prev: false
title: "SelectOpts"
---

Defined in: [packages/prompt/src/prompts/select.ts:28](https://github.com/sprucepad/convoker/blob/e7b2a4fd289b328fba79a8ed6d3b6800d52c810a/packages/prompt/src/prompts/select.ts#L28)

Options for select input.

## Extends

- [`CoreOpts`](/api/convoker/prompt/interfaces/coreopts/)\<`T`\>

## Extended by

- [`SearchOpts`](/api/convoker/prompt/interfaces/searchopts/)

## Type Parameters

### T

`T`

### M

`M` *extends* `boolean` = `false`

## Properties

### clearPromptOnDone?

> `optional` **clearPromptOnDone**: `boolean`

Defined in: [packages/prompt/src/core/index.ts:37](https://github.com/sprucepad/convoker/blob/e7b2a4fd289b328fba79a8ed6d3b6800d52c810a/packages/prompt/src/core/index.ts#L37)

If the screen should be cleared when finishing a prompt.

#### Inherited from

[`CoreOpts`](/api/convoker/prompt/interfaces/coreopts/).[`clearPromptOnDone`](/api/convoker/prompt/interfaces/coreopts/#clearpromptondone)

***

### default?

> `optional` **default**: `T`

Defined in: [packages/prompt/src/core/index.ts:24](https://github.com/sprucepad/convoker/blob/e7b2a4fd289b328fba79a8ed6d3b6800d52c810a/packages/prompt/src/core/index.ts#L24)

The default value.

#### Inherited from

[`CoreOpts`](/api/convoker/prompt/interfaces/coreopts/).[`default`](/api/convoker/prompt/interfaces/coreopts/#default)

***

### initialIndex?

> `optional` **initialIndex**: `number`

Defined in: [packages/prompt/src/prompts/select.ts:40](https://github.com/sprucepad/convoker/blob/e7b2a4fd289b328fba79a8ed6d3b6800d52c810a/packages/prompt/src/prompts/select.ts#L40)

The initial option selected.

***

### input?

> `optional` **input**: `ReadStream`

Defined in: [packages/prompt/src/core/index.ts:29](https://github.com/sprucepad/convoker/blob/e7b2a4fd289b328fba79a8ed6d3b6800d52c810a/packages/prompt/src/core/index.ts#L29)

The standard input. Defaults to `process.stdin`.

#### Inherited from

[`CoreOpts`](/api/convoker/prompt/interfaces/coreopts/).[`input`](/api/convoker/prompt/interfaces/coreopts/#input)

***

### message

> **message**: `string`

Defined in: [packages/prompt/src/core/index.ts:12](https://github.com/sprucepad/convoker/blob/e7b2a4fd289b328fba79a8ed6d3b6800d52c810a/packages/prompt/src/core/index.ts#L12)

The message of the prompt.

#### Inherited from

[`CoreOpts`](/api/convoker/prompt/interfaces/coreopts/).[`message`](/api/convoker/prompt/interfaces/coreopts/#message)

***

### multiple?

> `optional` **multiple**: `M`

Defined in: [packages/prompt/src/prompts/select.ts:36](https://github.com/sprucepad/convoker/blob/e7b2a4fd289b328fba79a8ed6d3b6800d52c810a/packages/prompt/src/prompts/select.ts#L36)

If the user can select multiple options.

***

### options

> **options**: [`SelectOption`](/api/convoker/prompt/interfaces/selectoption/)\<`T`\>[]

Defined in: [packages/prompt/src/prompts/select.ts:32](https://github.com/sprucepad/convoker/blob/e7b2a4fd289b328fba79a8ed6d3b6800d52c810a/packages/prompt/src/prompts/select.ts#L32)

Every option the user can pick from.

***

### output?

> `optional` **output**: `WriteStream`

Defined in: [packages/prompt/src/core/index.ts:33](https://github.com/sprucepad/convoker/blob/e7b2a4fd289b328fba79a8ed6d3b6800d52c810a/packages/prompt/src/core/index.ts#L33)

The standard output. Defaults to `process.stdout`.

#### Inherited from

[`CoreOpts`](/api/convoker/prompt/interfaces/coreopts/).[`output`](/api/convoker/prompt/interfaces/coreopts/#output)

***

### signal?

> `optional` **signal**: `AbortSignal`

Defined in: [packages/prompt/src/core/index.ts:41](https://github.com/sprucepad/convoker/blob/e7b2a4fd289b328fba79a8ed6d3b6800d52c810a/packages/prompt/src/core/index.ts#L41)

An `AbortSignal` to cancel the prompt.

#### Inherited from

[`CoreOpts`](/api/convoker/prompt/interfaces/coreopts/).[`signal`](/api/convoker/prompt/interfaces/coreopts/#signal)

***

### theme?

> `optional` **theme**: [`Theme`](/api/convoker/namespaces/theme/interfaces/theme/)

Defined in: [packages/prompt/src/core/index.ts:20](https://github.com/sprucepad/convoker/blob/e7b2a4fd289b328fba79a8ed6d3b6800d52c810a/packages/prompt/src/core/index.ts#L20)

The theme of the prompt.

#### Inherited from

[`CoreOpts`](/api/convoker/prompt/interfaces/coreopts/).[`theme`](/api/convoker/prompt/interfaces/coreopts/#theme)

***

### validate?

> `optional` **validate**: [`StandardSchemaV1`](/api/convoker/namespaces/i/interfaces/standardschemav1/)\<`any`, `T`\> \| (`value`) => `boolean` \| `T`

Defined in: [packages/prompt/src/core/index.ts:16](https://github.com/sprucepad/convoker/blob/e7b2a4fd289b328fba79a8ed6d3b6800d52c810a/packages/prompt/src/core/index.ts#L16)

A validator function, or a Standard Schema validator.

#### Inherited from

[`CoreOpts`](/api/convoker/prompt/interfaces/coreopts/).[`validate`](/api/convoker/prompt/interfaces/coreopts/#validate)
