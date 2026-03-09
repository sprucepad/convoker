---
editUrl: false
next: false
prev: false
title: "search"
---

> **search**\<`T`, `M`\>(`opts`): `Promise`\<`M` *extends* `true` ? `T`[] : `T`\>

Defined in: [packages/prompt/src/prompts/search.ts:34](https://github.com/sprucepad/convoker/blob/e7b2a4fd289b328fba79a8ed6d3b6800d52c810a/packages/prompt/src/prompts/search.ts#L34)

Prompts the user to search through a list of options.

## Type Parameters

### T

`T`

### M

`M` *extends* `boolean` = `false`

## Parameters

### opts

[`SearchOpts`](/api/convoker/prompt/interfaces/searchopts/)\<`T`, `M`\>

Options for search input.

## Returns

`Promise`\<`M` *extends* `true` ? `T`[] : `T`\>

The selected option.
