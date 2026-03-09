---
editUrl: false
next: false
prev: false
title: "convert"
---

> **convert**\<`TKind`\>(`kind`, `value`): `Promise`\<[`TypeOf`](/api/convoker/input/type-aliases/typeof/)\<`TKind`\> \| [`TypeOf`](/api/convoker/input/type-aliases/typeof/)\<`TKind`\>[]\>

Defined in: [packages/input/src/input.ts:65](https://github.com/sprucepad/convoker/blob/e7b2a4fd289b328fba79a8ed6d3b6800d52c810a/packages/input/src/input.ts#L65)

Converts a value from a Kind to a TypeScript type.

## Type Parameters

### TKind

`TKind` *extends* [`Kind`](/api/convoker/input/type-aliases/kind/)

## Parameters

### kind

`TKind`

The kind to convert to.

### value

The value to convert.

`string` | `string`[]

## Returns

`Promise`\<[`TypeOf`](/api/convoker/input/type-aliases/typeof/)\<`TKind`\> \| [`TypeOf`](/api/convoker/input/type-aliases/typeof/)\<`TKind`\>[]\>

The converted value.
