---
editUrl: false
next: false
prev: false
title: "TypeOf"
---

> **TypeOf**\<`T`\> = `T` *extends* [`StandardSchemaV1`](/api/convoker/input/interfaces/standardschemav1/)\<`any`, infer Out\> ? `Out` : `T` *extends* `"boolean"` ? `boolean` : `T` *extends* `"string"` ? `string` : `T` *extends* `"number"` ? `number` : `T` *extends* `"bigint"` ? `bigint` : `never`

Defined in: [packages/input/src/input.ts:22](https://github.com/sprucepad/convoker/blob/e7b2a4fd289b328fba79a8ed6d3b6800d52c810a/packages/input/src/input.ts#L22)

Converts a Kind to a TypeScript type.

## Type Parameters

### T

`T` *extends* [`Kind`](/api/convoker/input/type-aliases/kind/)
