---
editUrl: false
next: false
prev: false
title: "Props"
---

Defined in: [packages/input/src/standard-schema.ts:14](https://github.com/sprucepad/convoker/blob/e7b2a4fd289b328fba79a8ed6d3b6800d52c810a/packages/input/src/standard-schema.ts#L14)

The Standard Schema properties interface.

## Type Parameters

### Input

`Input` = `unknown`

### Output

`Output` = `Input`

## Properties

### types?

> `readonly` `optional` **types**: [`Types`](/api/convoker/input/namespaces/standardschemav1/interfaces/types/)\<`Input`, `Output`\>

Defined in: [packages/input/src/standard-schema.ts:24](https://github.com/sprucepad/convoker/blob/e7b2a4fd289b328fba79a8ed6d3b6800d52c810a/packages/input/src/standard-schema.ts#L24)

Inferred types associated with the schema.

***

### validate()

> `readonly` **validate**: (`value`) => [`Result`](/api/convoker/input/namespaces/standardschemav1/type-aliases/result/)\<`Output`\> \| `Promise`\<[`Result`](/api/convoker/input/namespaces/standardschemav1/type-aliases/result/)\<`Output`\>\>

Defined in: [packages/input/src/standard-schema.ts:20](https://github.com/sprucepad/convoker/blob/e7b2a4fd289b328fba79a8ed6d3b6800d52c810a/packages/input/src/standard-schema.ts#L20)

Validates unknown input values.

#### Parameters

##### value

`unknown`

#### Returns

[`Result`](/api/convoker/input/namespaces/standardschemav1/type-aliases/result/)\<`Output`\> \| `Promise`\<[`Result`](/api/convoker/input/namespaces/standardschemav1/type-aliases/result/)\<`Output`\>\>

***

### vendor

> `readonly` **vendor**: `string`

Defined in: [packages/input/src/standard-schema.ts:18](https://github.com/sprucepad/convoker/blob/e7b2a4fd289b328fba79a8ed6d3b6800d52c810a/packages/input/src/standard-schema.ts#L18)

The vendor name of the schema library.

***

### version

> `readonly` **version**: `1`

Defined in: [packages/input/src/standard-schema.ts:16](https://github.com/sprucepad/convoker/blob/e7b2a4fd289b328fba79a8ed6d3b6800d52c810a/packages/input/src/standard-schema.ts#L16)

The version number of the standard.
