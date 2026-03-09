---
editUrl: false
next: false
prev: false
title: "validate"
---

> **validate**\<`T`\>(`entry`, `value`): `Promise`\<`T` *extends* [`StandardSchemaV1`](/api/convoker/input/interfaces/standardschemav1/)\<`any`, `Out`\> ? `Out` : `never`\>

Defined in: [packages/input/src/standard-schema.ts:83](https://github.com/sprucepad/convoker/blob/e7b2a4fd289b328fba79a8ed6d3b6800d52c810a/packages/input/src/standard-schema.ts#L83)

Validates a value.

## Type Parameters

### T

`T` *extends* [`StandardSchemaV1`](/api/convoker/input/interfaces/standardschemav1/)\<`any`, `any`\>

## Parameters

### entry

`T`

The Standard Schema validator.

### value

`any`

The value to validate.

## Returns

`Promise`\<`T` *extends* [`StandardSchemaV1`](/api/convoker/input/interfaces/standardschemav1/)\<`any`, `Out`\> ? `Out` : `never`\>

The validated value.
