---
editUrl: false
next: false
prev: false
title: "Option"
---

Defined in: [packages/input/src/input.ts:100](https://github.com/sprucepad/convoker/blob/e7b2a4fd289b328fba79a8ed6d3b6800d52c810a/packages/input/src/input.ts#L100)

An option.

## Type Parameters

### TKind

`TKind` *extends* [`Kind`](/api/convoker/input/type-aliases/kind/)

### TRequired

`TRequired` *extends* `boolean` = `true`

### TList

`TList` *extends* `boolean` = `false`

## Constructors

### Constructor

> **new Option**\<`TKind`, `TRequired`, `TList`\>(`kind`, `names`): `Option`\<`TKind`, `TRequired`, `TList`\>

Defined in: [packages/input/src/input.ts:139](https://github.com/sprucepad/convoker/blob/e7b2a4fd289b328fba79a8ed6d3b6800d52c810a/packages/input/src/input.ts#L139)

Creates a new option.

#### Parameters

##### kind

`TKind`

The type of this option.

##### names

`string`[]

The names of this option.

#### Returns

`Option`\<`TKind`, `TRequired`, `TList`\>

## Properties

### $default

> **$default**: [`TypeOf`](/api/convoker/input/type-aliases/typeof/)\<`TKind`\> \| `undefined`

Defined in: [packages/input/src/input.ts:120](https://github.com/sprucepad/convoker/blob/e7b2a4fd289b328fba79a8ed6d3b6800d52c810a/packages/input/src/input.ts#L120)

The default value of this option.

***

### $description

> **$description**: `string` \| `undefined`

Defined in: [packages/input/src/input.ts:116](https://github.com/sprucepad/convoker/blob/e7b2a4fd289b328fba79a8ed6d3b6800d52c810a/packages/input/src/input.ts#L116)

The description of this option.

***

### $kind

> **$kind**: `TKind`

Defined in: [packages/input/src/input.ts:108](https://github.com/sprucepad/convoker/blob/e7b2a4fd289b328fba79a8ed6d3b6800d52c810a/packages/input/src/input.ts#L108)

The kind of this option.

***

### $list

> **$list**: `TList`

Defined in: [packages/input/src/input.ts:128](https://github.com/sprucepad/convoker/blob/e7b2a4fd289b328fba79a8ed6d3b6800d52c810a/packages/input/src/input.ts#L128)

If this option is a list.

***

### $names

> **$names**: `string`[]

Defined in: [packages/input/src/input.ts:112](https://github.com/sprucepad/convoker/blob/e7b2a4fd289b328fba79a8ed6d3b6800d52c810a/packages/input/src/input.ts#L112)

The aliases of this option.

***

### $required

> **$required**: `TRequired`

Defined in: [packages/input/src/input.ts:124](https://github.com/sprucepad/convoker/blob/e7b2a4fd289b328fba79a8ed6d3b6800d52c810a/packages/input/src/input.ts#L124)

If this option is required.

***

### $separator

> **$separator**: `string` \| `undefined`

Defined in: [packages/input/src/input.ts:132](https://github.com/sprucepad/convoker/blob/e7b2a4fd289b328fba79a8ed6d3b6800d52c810a/packages/input/src/input.ts#L132)

A separator if this option is a list.

## Methods

### default()

> **default**(`value`): `this`

Defined in: [packages/input/src/input.ts:177](https://github.com/sprucepad/convoker/blob/e7b2a4fd289b328fba79a8ed6d3b6800d52c810a/packages/input/src/input.ts#L177)

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

Defined in: [packages/input/src/input.ts:187](https://github.com/sprucepad/convoker/blob/e7b2a4fd289b328fba79a8ed6d3b6800d52c810a/packages/input/src/input.ts#L187)

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

> **list**(`separator?`): `Option`\<`TKind`, `TRequired`, `true`\>

Defined in: [packages/input/src/input.ts:148](https://github.com/sprucepad/convoker/blob/e7b2a4fd289b328fba79a8ed6d3b6800d52c810a/packages/input/src/input.ts#L148)

Makes this option a list.

#### Parameters

##### separator?

`string`

#### Returns

`Option`\<`TKind`, `TRequired`, `true`\>

this

***

### optional()

> **optional**(): `Option`\<`TKind`, `false`, `TList`\>

Defined in: [packages/input/src/input.ts:167](https://github.com/sprucepad/convoker/blob/e7b2a4fd289b328fba79a8ed6d3b6800d52c810a/packages/input/src/input.ts#L167)

Makes this option optional.

#### Returns

`Option`\<`TKind`, `false`, `TList`\>

this

***

### required()

> **required**(): `Option`\<`TKind`, `true`, `TList`\>

Defined in: [packages/input/src/input.ts:158](https://github.com/sprucepad/convoker/blob/e7b2a4fd289b328fba79a8ed6d3b6800d52c810a/packages/input/src/input.ts#L158)

Makes this option required.

#### Returns

`Option`\<`TKind`, `true`, `TList`\>

this
