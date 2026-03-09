---
editUrl: false
next: false
prev: false
title: "Positional"
---

Defined in: [packages/input/src/input.ts:196](https://github.com/sprucepad/convoker/blob/e7b2a4fd289b328fba79a8ed6d3b6800d52c810a/packages/input/src/input.ts#L196)

A positional argument.

## Type Parameters

### TKind

`TKind` *extends* [`Kind`](/api/convoker/input/type-aliases/kind/)

### TRequired

`TRequired` *extends* `boolean` = `true`

### TList

`TList` *extends* `boolean` = `false`

## Constructors

### Constructor

> **new Positional**\<`TKind`, `TRequired`, `TList`\>(`kind`): `Positional`\<`TKind`, `TRequired`, `TList`\>

Defined in: [packages/input/src/input.ts:226](https://github.com/sprucepad/convoker/blob/e7b2a4fd289b328fba79a8ed6d3b6800d52c810a/packages/input/src/input.ts#L226)

Creates a new positional argument.

#### Parameters

##### kind

`TKind`

The positional argument.

#### Returns

`Positional`\<`TKind`, `TRequired`, `TList`\>

## Properties

### $default

> **$default**: [`TypeOf`](/api/convoker/input/type-aliases/typeof/)\<`TKind`\> \| `undefined`

Defined in: [packages/input/src/input.ts:208](https://github.com/sprucepad/convoker/blob/e7b2a4fd289b328fba79a8ed6d3b6800d52c810a/packages/input/src/input.ts#L208)

The default value of this argument.

***

### $description

> **$description**: `string` \| `undefined`

Defined in: [packages/input/src/input.ts:212](https://github.com/sprucepad/convoker/blob/e7b2a4fd289b328fba79a8ed6d3b6800d52c810a/packages/input/src/input.ts#L212)

The description of this argument.

***

### $kind

> **$kind**: `TKind`

Defined in: [packages/input/src/input.ts:204](https://github.com/sprucepad/convoker/blob/e7b2a4fd289b328fba79a8ed6d3b6800d52c810a/packages/input/src/input.ts#L204)

The type of this argument.

***

### $list

> **$list**: `TList`

Defined in: [packages/input/src/input.ts:220](https://github.com/sprucepad/convoker/blob/e7b2a4fd289b328fba79a8ed6d3b6800d52c810a/packages/input/src/input.ts#L220)

If this argument is a list.

***

### $required

> **$required**: `TRequired`

Defined in: [packages/input/src/input.ts:216](https://github.com/sprucepad/convoker/blob/e7b2a4fd289b328fba79a8ed6d3b6800d52c810a/packages/input/src/input.ts#L216)

If this argument is required.

## Methods

### default()

> **default**(`value`): `this`

Defined in: [packages/input/src/input.ts:262](https://github.com/sprucepad/convoker/blob/e7b2a4fd289b328fba79a8ed6d3b6800d52c810a/packages/input/src/input.ts#L262)

Sets a default value.

#### Parameters

##### value

[`TypeOf`](/api/convoker/input/type-aliases/typeof/)\<`TKind`\>

The default value.

#### Returns

`this`

this

***

### description()

> **description**(`desc`): `this`

Defined in: [packages/input/src/input.ts:272](https://github.com/sprucepad/convoker/blob/e7b2a4fd289b328fba79a8ed6d3b6800d52c810a/packages/input/src/input.ts#L272)

Sets a description.

#### Parameters

##### desc

`string`

The description.

#### Returns

`this`

this

***

### list()

> **list**(): `Positional`\<`TKind`, `TRequired`, `true`\>

Defined in: [packages/input/src/input.ts:234](https://github.com/sprucepad/convoker/blob/e7b2a4fd289b328fba79a8ed6d3b6800d52c810a/packages/input/src/input.ts#L234)

Makes this argument a list.

#### Returns

`Positional`\<`TKind`, `TRequired`, `true`\>

this

***

### optional()

> **optional**(): `Positional`\<`TKind`, `false`, `TList`\>

Defined in: [packages/input/src/input.ts:252](https://github.com/sprucepad/convoker/blob/e7b2a4fd289b328fba79a8ed6d3b6800d52c810a/packages/input/src/input.ts#L252)

Makes this argument optional.

#### Returns

`Positional`\<`TKind`, `false`, `TList`\>

this

***

### required()

> **required**(): `Positional`\<`TKind`, `true`, `TList`\>

Defined in: [packages/input/src/input.ts:243](https://github.com/sprucepad/convoker/blob/e7b2a4fd289b328fba79a8ed6d3b6800d52c810a/packages/input/src/input.ts#L243)

Makes this argument required.

#### Returns

`Positional`\<`TKind`, `true`, `TList`\>

this
