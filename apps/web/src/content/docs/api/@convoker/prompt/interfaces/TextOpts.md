---
editUrl: false
next: false
prev: false
title: "TextOpts"
---

Defined in: [packages/prompt/src/prompts/text.ts:7](https://github.com/sprucepad/convoker/blob/e7b2a4fd289b328fba79a8ed6d3b6800d52c810a/packages/prompt/src/prompts/text.ts#L7)

Options for text input.

## Extends

- [`CoreOpts`](/api/convoker/prompt/interfaces/coreopts/)\<`string`\>

## Extended by

- [`PasswordOpts`](/api/convoker/prompt/interfaces/passwordopts/)

## Properties

### clearPromptOnDone?

> `optional` **clearPromptOnDone**: `boolean`

Defined in: [packages/prompt/src/core/index.ts:37](https://github.com/sprucepad/convoker/blob/e7b2a4fd289b328fba79a8ed6d3b6800d52c810a/packages/prompt/src/core/index.ts#L37)

If the screen should be cleared when finishing a prompt.

#### Inherited from

[`CoreOpts`](/api/convoker/prompt/interfaces/coreopts/).[`clearPromptOnDone`](/api/convoker/prompt/interfaces/coreopts/#clearpromptondone)

***

### default?

> `optional` **default**: `string`

Defined in: [packages/prompt/src/core/index.ts:24](https://github.com/sprucepad/convoker/blob/e7b2a4fd289b328fba79a8ed6d3b6800d52c810a/packages/prompt/src/core/index.ts#L24)

The default value.

#### Inherited from

[`CoreOpts`](/api/convoker/prompt/interfaces/coreopts/).[`default`](/api/convoker/prompt/interfaces/coreopts/#default)

***

### input?

> `optional` **input**: `ReadStream`

Defined in: [packages/prompt/src/core/index.ts:29](https://github.com/sprucepad/convoker/blob/e7b2a4fd289b328fba79a8ed6d3b6800d52c810a/packages/prompt/src/core/index.ts#L29)

The standard input. Defaults to `process.stdin`.

#### Inherited from

[`CoreOpts`](/api/convoker/prompt/interfaces/coreopts/).[`input`](/api/convoker/prompt/interfaces/coreopts/#input)

***

### maxLength?

> `optional` **maxLength**: `number`

Defined in: [packages/prompt/src/prompts/text.ts:19](https://github.com/sprucepad/convoker/blob/e7b2a4fd289b328fba79a8ed6d3b6800d52c810a/packages/prompt/src/prompts/text.ts#L19)

Maximum length of the input.

***

### message

> **message**: `string`

Defined in: [packages/prompt/src/core/index.ts:12](https://github.com/sprucepad/convoker/blob/e7b2a4fd289b328fba79a8ed6d3b6800d52c810a/packages/prompt/src/core/index.ts#L12)

The message of the prompt.

#### Inherited from

[`CoreOpts`](/api/convoker/prompt/interfaces/coreopts/).[`message`](/api/convoker/prompt/interfaces/coreopts/#message)

***

### minLength?

> `optional` **minLength**: `number`

Defined in: [packages/prompt/src/prompts/text.ts:15](https://github.com/sprucepad/convoker/blob/e7b2a4fd289b328fba79a8ed6d3b6800d52c810a/packages/prompt/src/prompts/text.ts#L15)

Minimum length of the input.

***

### output?

> `optional` **output**: `WriteStream`

Defined in: [packages/prompt/src/core/index.ts:33](https://github.com/sprucepad/convoker/blob/e7b2a4fd289b328fba79a8ed6d3b6800d52c810a/packages/prompt/src/core/index.ts#L33)

The standard output. Defaults to `process.stdout`.

#### Inherited from

[`CoreOpts`](/api/convoker/prompt/interfaces/coreopts/).[`output`](/api/convoker/prompt/interfaces/coreopts/#output)

***

### placeholder?

> `optional` **placeholder**: `string`

Defined in: [packages/prompt/src/prompts/text.ts:11](https://github.com/sprucepad/convoker/blob/e7b2a4fd289b328fba79a8ed6d3b6800d52c810a/packages/prompt/src/prompts/text.ts#L11)

A placeholder, displayed when the user hasn't typed anything yet.

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

> `optional` **validate**: [`StandardSchemaV1`](/api/convoker/namespaces/i/interfaces/standardschemav1/)\<`any`, `string`\> \| (`value`) => `string` \| `boolean`

Defined in: [packages/prompt/src/core/index.ts:16](https://github.com/sprucepad/convoker/blob/e7b2a4fd289b328fba79a8ed6d3b6800d52c810a/packages/prompt/src/core/index.ts#L16)

A validator function, or a Standard Schema validator.

#### Inherited from

[`CoreOpts`](/api/convoker/prompt/interfaces/coreopts/).[`validate`](/api/convoker/prompt/interfaces/coreopts/#validate)
