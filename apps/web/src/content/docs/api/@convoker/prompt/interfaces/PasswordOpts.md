---
editUrl: false
next: false
prev: false
title: "PasswordOpts"
---

Defined in: [packages/prompt/src/prompts/password.ts:7](https://github.com/sprucepad/convoker/blob/e7b2a4fd289b328fba79a8ed6d3b6800d52c810a/packages/prompt/src/prompts/password.ts#L7)

Options for password input.

## Extends

- [`TextOpts`](/api/convoker/prompt/interfaces/textopts/)

## Properties

### clearPromptOnDone?

> `optional` **clearPromptOnDone**: `boolean`

Defined in: [packages/prompt/src/core/index.ts:37](https://github.com/sprucepad/convoker/blob/e7b2a4fd289b328fba79a8ed6d3b6800d52c810a/packages/prompt/src/core/index.ts#L37)

If the screen should be cleared when finishing a prompt.

#### Inherited from

[`TextOpts`](/api/convoker/prompt/interfaces/textopts/).[`clearPromptOnDone`](/api/convoker/prompt/interfaces/textopts/#clearpromptondone)

***

### confirm?

> `optional` **confirm**: `boolean`

Defined in: [packages/prompt/src/prompts/password.ts:15](https://github.com/sprucepad/convoker/blob/e7b2a4fd289b328fba79a8ed6d3b6800d52c810a/packages/prompt/src/prompts/password.ts#L15)

If the user should be asked to confirm the password, by typing it again.

***

### default?

> `optional` **default**: `string`

Defined in: [packages/prompt/src/core/index.ts:24](https://github.com/sprucepad/convoker/blob/e7b2a4fd289b328fba79a8ed6d3b6800d52c810a/packages/prompt/src/core/index.ts#L24)

The default value.

#### Inherited from

[`TextOpts`](/api/convoker/prompt/interfaces/textopts/).[`default`](/api/convoker/prompt/interfaces/textopts/#default)

***

### input?

> `optional` **input**: `ReadStream`

Defined in: [packages/prompt/src/core/index.ts:29](https://github.com/sprucepad/convoker/blob/e7b2a4fd289b328fba79a8ed6d3b6800d52c810a/packages/prompt/src/core/index.ts#L29)

The standard input. Defaults to `process.stdin`.

#### Inherited from

[`TextOpts`](/api/convoker/prompt/interfaces/textopts/).[`input`](/api/convoker/prompt/interfaces/textopts/#input)

***

### mask?

> `optional` **mask**: `string`

Defined in: [packages/prompt/src/prompts/password.ts:11](https://github.com/sprucepad/convoker/blob/e7b2a4fd289b328fba79a8ed6d3b6800d52c810a/packages/prompt/src/prompts/password.ts#L11)

The mask for the password input.

***

### maxLength?

> `optional` **maxLength**: `number`

Defined in: [packages/prompt/src/prompts/text.ts:19](https://github.com/sprucepad/convoker/blob/e7b2a4fd289b328fba79a8ed6d3b6800d52c810a/packages/prompt/src/prompts/text.ts#L19)

Maximum length of the input.

#### Inherited from

[`TextOpts`](/api/convoker/prompt/interfaces/textopts/).[`maxLength`](/api/convoker/prompt/interfaces/textopts/#maxlength)

***

### message

> **message**: `string`

Defined in: [packages/prompt/src/core/index.ts:12](https://github.com/sprucepad/convoker/blob/e7b2a4fd289b328fba79a8ed6d3b6800d52c810a/packages/prompt/src/core/index.ts#L12)

The message of the prompt.

#### Inherited from

[`TextOpts`](/api/convoker/prompt/interfaces/textopts/).[`message`](/api/convoker/prompt/interfaces/textopts/#message)

***

### minLength?

> `optional` **minLength**: `number`

Defined in: [packages/prompt/src/prompts/text.ts:15](https://github.com/sprucepad/convoker/blob/e7b2a4fd289b328fba79a8ed6d3b6800d52c810a/packages/prompt/src/prompts/text.ts#L15)

Minimum length of the input.

#### Inherited from

[`TextOpts`](/api/convoker/prompt/interfaces/textopts/).[`minLength`](/api/convoker/prompt/interfaces/textopts/#minlength)

***

### output?

> `optional` **output**: `WriteStream`

Defined in: [packages/prompt/src/core/index.ts:33](https://github.com/sprucepad/convoker/blob/e7b2a4fd289b328fba79a8ed6d3b6800d52c810a/packages/prompt/src/core/index.ts#L33)

The standard output. Defaults to `process.stdout`.

#### Inherited from

[`TextOpts`](/api/convoker/prompt/interfaces/textopts/).[`output`](/api/convoker/prompt/interfaces/textopts/#output)

***

### placeholder?

> `optional` **placeholder**: `string`

Defined in: [packages/prompt/src/prompts/text.ts:11](https://github.com/sprucepad/convoker/blob/e7b2a4fd289b328fba79a8ed6d3b6800d52c810a/packages/prompt/src/prompts/text.ts#L11)

A placeholder, displayed when the user hasn't typed anything yet.

#### Inherited from

[`TextOpts`](/api/convoker/prompt/interfaces/textopts/).[`placeholder`](/api/convoker/prompt/interfaces/textopts/#placeholder)

***

### signal?

> `optional` **signal**: `AbortSignal`

Defined in: [packages/prompt/src/core/index.ts:41](https://github.com/sprucepad/convoker/blob/e7b2a4fd289b328fba79a8ed6d3b6800d52c810a/packages/prompt/src/core/index.ts#L41)

An `AbortSignal` to cancel the prompt.

#### Inherited from

[`TextOpts`](/api/convoker/prompt/interfaces/textopts/).[`signal`](/api/convoker/prompt/interfaces/textopts/#signal)

***

### theme?

> `optional` **theme**: [`Theme`](/api/convoker/namespaces/theme/interfaces/theme/)

Defined in: [packages/prompt/src/core/index.ts:20](https://github.com/sprucepad/convoker/blob/e7b2a4fd289b328fba79a8ed6d3b6800d52c810a/packages/prompt/src/core/index.ts#L20)

The theme of the prompt.

#### Inherited from

[`TextOpts`](/api/convoker/prompt/interfaces/textopts/).[`theme`](/api/convoker/prompt/interfaces/textopts/#theme)

***

### validate?

> `optional` **validate**: [`StandardSchemaV1`](/api/convoker/namespaces/i/interfaces/standardschemav1/)\<`any`, `string`\> \| (`value`) => `string` \| `boolean`

Defined in: [packages/prompt/src/core/index.ts:16](https://github.com/sprucepad/convoker/blob/e7b2a4fd289b328fba79a8ed6d3b6800d52c810a/packages/prompt/src/core/index.ts#L16)

A validator function, or a Standard Schema validator.

#### Inherited from

[`TextOpts`](/api/convoker/prompt/interfaces/textopts/).[`validate`](/api/convoker/prompt/interfaces/textopts/#validate)
