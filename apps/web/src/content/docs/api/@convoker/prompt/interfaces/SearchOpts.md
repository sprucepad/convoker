---
editUrl: false
next: false
prev: false
title: "SearchOpts"
---

Defined in: [packages/prompt/src/prompts/search.ts:7](https://github.com/sprucepad/convoker/blob/e7b2a4fd289b328fba79a8ed6d3b6800d52c810a/packages/prompt/src/prompts/search.ts#L7)

Options for search input.

## Extends

- [`SelectOpts`](/api/convoker/prompt/interfaces/selectopts/)\<`T`, `M`\>

## Type Parameters

### T

`T`

### M

`M` *extends* `boolean` = `false`

### Q

`Q` = `string`

## Properties

### clearPromptOnDone?

> `optional` **clearPromptOnDone**: `boolean`

Defined in: [packages/prompt/src/core/index.ts:37](https://github.com/sprucepad/convoker/blob/e7b2a4fd289b328fba79a8ed6d3b6800d52c810a/packages/prompt/src/core/index.ts#L37)

If the screen should be cleared when finishing a prompt.

#### Inherited from

[`SelectOpts`](/api/convoker/prompt/interfaces/selectopts/).[`clearPromptOnDone`](/api/convoker/prompt/interfaces/selectopts/#clearpromptondone)

***

### default?

> `optional` **default**: `T`

Defined in: [packages/prompt/src/core/index.ts:24](https://github.com/sprucepad/convoker/blob/e7b2a4fd289b328fba79a8ed6d3b6800d52c810a/packages/prompt/src/core/index.ts#L24)

The default value.

#### Inherited from

[`SelectOpts`](/api/convoker/prompt/interfaces/selectopts/).[`default`](/api/convoker/prompt/interfaces/selectopts/#default)

***

### initialIndex?

> `optional` **initialIndex**: `number`

Defined in: [packages/prompt/src/prompts/select.ts:40](https://github.com/sprucepad/convoker/blob/e7b2a4fd289b328fba79a8ed6d3b6800d52c810a/packages/prompt/src/prompts/select.ts#L40)

The initial option selected.

#### Inherited from

[`SelectOpts`](/api/convoker/prompt/interfaces/selectopts/).[`initialIndex`](/api/convoker/prompt/interfaces/selectopts/#initialindex)

***

### input?

> `optional` **input**: `ReadStream`

Defined in: [packages/prompt/src/core/index.ts:29](https://github.com/sprucepad/convoker/blob/e7b2a4fd289b328fba79a8ed6d3b6800d52c810a/packages/prompt/src/core/index.ts#L29)

The standard input. Defaults to `process.stdin`.

#### Inherited from

[`SelectOpts`](/api/convoker/prompt/interfaces/selectopts/).[`input`](/api/convoker/prompt/interfaces/selectopts/#input)

***

### message

> **message**: `string`

Defined in: [packages/prompt/src/core/index.ts:12](https://github.com/sprucepad/convoker/blob/e7b2a4fd289b328fba79a8ed6d3b6800d52c810a/packages/prompt/src/core/index.ts#L12)

The message of the prompt.

#### Inherited from

[`SelectOpts`](/api/convoker/prompt/interfaces/selectopts/).[`message`](/api/convoker/prompt/interfaces/selectopts/#message)

***

### minQueryLength?

> `optional` **minQueryLength**: `number`

Defined in: [packages/prompt/src/prompts/search.ts:19](https://github.com/sprucepad/convoker/blob/e7b2a4fd289b328fba79a8ed6d3b6800d52c810a/packages/prompt/src/prompts/search.ts#L19)

Minimum length for a query string.

***

### multiple?

> `optional` **multiple**: `M`

Defined in: [packages/prompt/src/prompts/select.ts:36](https://github.com/sprucepad/convoker/blob/e7b2a4fd289b328fba79a8ed6d3b6800d52c810a/packages/prompt/src/prompts/select.ts#L36)

If the user can select multiple options.

#### Inherited from

[`SelectOpts`](/api/convoker/prompt/interfaces/selectopts/).[`multiple`](/api/convoker/prompt/interfaces/selectopts/#multiple)

***

### options

> **options**: [`SelectOption`](/api/convoker/prompt/interfaces/selectoption/)\<`T`\>[]

Defined in: [packages/prompt/src/prompts/select.ts:32](https://github.com/sprucepad/convoker/blob/e7b2a4fd289b328fba79a8ed6d3b6800d52c810a/packages/prompt/src/prompts/select.ts#L32)

Every option the user can pick from.

#### Inherited from

[`SelectOpts`](/api/convoker/prompt/interfaces/selectopts/).[`options`](/api/convoker/prompt/interfaces/selectopts/#options)

***

### output?

> `optional` **output**: `WriteStream`

Defined in: [packages/prompt/src/core/index.ts:33](https://github.com/sprucepad/convoker/blob/e7b2a4fd289b328fba79a8ed6d3b6800d52c810a/packages/prompt/src/core/index.ts#L33)

The standard output. Defaults to `process.stdout`.

#### Inherited from

[`SelectOpts`](/api/convoker/prompt/interfaces/selectopts/).[`output`](/api/convoker/prompt/interfaces/selectopts/#output)

***

### placeholder?

> `optional` **placeholder**: `string`

Defined in: [packages/prompt/src/prompts/search.ts:15](https://github.com/sprucepad/convoker/blob/e7b2a4fd289b328fba79a8ed6d3b6800d52c810a/packages/prompt/src/prompts/search.ts#L15)

Placeholder for the search input.

***

### signal?

> `optional` **signal**: `AbortSignal`

Defined in: [packages/prompt/src/core/index.ts:41](https://github.com/sprucepad/convoker/blob/e7b2a4fd289b328fba79a8ed6d3b6800d52c810a/packages/prompt/src/core/index.ts#L41)

An `AbortSignal` to cancel the prompt.

#### Inherited from

[`SelectOpts`](/api/convoker/prompt/interfaces/selectopts/).[`signal`](/api/convoker/prompt/interfaces/selectopts/#signal)

***

### theme?

> `optional` **theme**: [`Theme`](/api/convoker/namespaces/theme/interfaces/theme/)

Defined in: [packages/prompt/src/core/index.ts:20](https://github.com/sprucepad/convoker/blob/e7b2a4fd289b328fba79a8ed6d3b6800d52c810a/packages/prompt/src/core/index.ts#L20)

The theme of the prompt.

#### Inherited from

[`SelectOpts`](/api/convoker/prompt/interfaces/selectopts/).[`theme`](/api/convoker/prompt/interfaces/selectopts/#theme)

***

### validate?

> `optional` **validate**: [`StandardSchemaV1`](/api/convoker/namespaces/i/interfaces/standardschemav1/)\<`any`, `T`\> \| (`value`) => `boolean` \| `T`

Defined in: [packages/prompt/src/core/index.ts:16](https://github.com/sprucepad/convoker/blob/e7b2a4fd289b328fba79a8ed6d3b6800d52c810a/packages/prompt/src/core/index.ts#L16)

A validator function, or a Standard Schema validator.

#### Inherited from

[`SelectOpts`](/api/convoker/prompt/interfaces/selectopts/).[`validate`](/api/convoker/prompt/interfaces/selectopts/#validate)

## Methods

### filter()?

> `optional` **filter**(`query`, `option`): `boolean`

Defined in: [packages/prompt/src/prompts/search.ts:26](https://github.com/sprucepad/convoker/blob/e7b2a4fd289b328fba79a8ed6d3b6800d52c810a/packages/prompt/src/prompts/search.ts#L26)

Filters a single option.

#### Parameters

##### query

`Q`

The search query.

##### option

[`SelectOption`](/api/convoker/prompt/interfaces/selectoption/)\<`T`\>

The option to filter.

#### Returns

`boolean`

***

### transformQuery()?

> `optional` **transformQuery**(`query`): `Q`

Defined in: [packages/prompt/src/prompts/search.ts:20](https://github.com/sprucepad/convoker/blob/e7b2a4fd289b328fba79a8ed6d3b6800d52c810a/packages/prompt/src/prompts/search.ts#L20)

#### Parameters

##### query

`string`

#### Returns

`Q`
