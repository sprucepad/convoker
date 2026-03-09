---
editUrl: false
next: false
prev: false
title: "Theme"
---

Defined in: [theme.ts:7](https://github.com/sprucepad/convoker/blob/e7b2a4fd289b328fba79a8ed6d3b6800d52c810a/packages/theme/src/theme.ts#L7)

A theme.

## Properties

### styles?

> `optional` **styles**: `object`

Defined in: [theme.ts:84](https://github.com/sprucepad/convoker/blob/e7b2a4fd289b328fba79a8ed6d3b6800d52c810a/packages/theme/src/theme.ts#L84)

Optional styles.

#### bold()?

> `optional` **bold**(`a`): `string`

Wraps a string in a bold ANSI code.

##### Parameters

###### a

`string`

The string to wrap.

##### Returns

`string`

#### italic()?

> `optional` **italic**(`a`): `string`

Wraps a string in an italic ANSI code.

##### Parameters

###### a

`string`

The string to wrap.

##### Returns

`string`

#### underline()?

> `optional` **underline**(`a`): `string`

Wraps a string in an underline ANSI code.

##### Parameters

###### a

`string`

The string to wrap.

##### Returns

`string`

***

### symbols?

> `optional` **symbols**: `object`

Defined in: [theme.ts:58](https://github.com/sprucepad/convoker/blob/e7b2a4fd289b328fba79a8ed6d3b6800d52c810a/packages/theme/src/theme.ts#L58)

Set of symbols for logging.

#### error

> **error**: `string`

Error message symbol.

#### fatal

> **fatal**: `string`

Fatal error message symbol.

#### info?

> `optional` **info**: `string`

Information message symbol.

#### success

> **success**: `string`

Success message symbol.

#### warning

> **warning**: `string`

Warning message symbol.

## Methods

### accent()?

> `optional` **accent**(`a`): `string`

Defined in: [theme.ts:32](https://github.com/sprucepad/convoker/blob/e7b2a4fd289b328fba79a8ed6d3b6800d52c810a/packages/theme/src/theme.ts#L32)

Wraps a string in a accent ANSI code.

#### Parameters

##### a

`string`

The string to wrap.

#### Returns

`string`

***

### background()?

> `optional` **background**(`a`): `string`

Defined in: [theme.ts:12](https://github.com/sprucepad/convoker/blob/e7b2a4fd289b328fba79a8ed6d3b6800d52c810a/packages/theme/src/theme.ts#L12)

Wraps a string in a background ANSI code.

#### Parameters

##### a

`string`

The string to wrap.

#### Returns

`string`

***

### error()

> **error**(`a`): `string`

Defined in: [theme.ts:48](https://github.com/sprucepad/convoker/blob/e7b2a4fd289b328fba79a8ed6d3b6800d52c810a/packages/theme/src/theme.ts#L48)

Wraps a string in a error ANSI code.

#### Parameters

##### a

`string`

The string to wrap.

#### Returns

`string`

***

### foreground()?

> `optional` **foreground**(`a`): `string`

Defined in: [theme.ts:17](https://github.com/sprucepad/convoker/blob/e7b2a4fd289b328fba79a8ed6d3b6800d52c810a/packages/theme/src/theme.ts#L17)

Wraps a string in a foreground ANSI code.

#### Parameters

##### a

`string`

The string to wrap.

#### Returns

`string`

***

### info()?

> `optional` **info**(`a`): `string`

Defined in: [theme.ts:53](https://github.com/sprucepad/convoker/blob/e7b2a4fd289b328fba79a8ed6d3b6800d52c810a/packages/theme/src/theme.ts#L53)

Wraps a string in a info ANSI code.

#### Parameters

##### a

`string`

The string to wrap.

#### Returns

`string`

***

### primary()

> **primary**(`a`): `string`

Defined in: [theme.ts:22](https://github.com/sprucepad/convoker/blob/e7b2a4fd289b328fba79a8ed6d3b6800d52c810a/packages/theme/src/theme.ts#L22)

Wraps a string in a primary ANSI code.

#### Parameters

##### a

`string`

The string to wrap.

#### Returns

`string`

***

### secondary()

> **secondary**(`a`): `string`

Defined in: [theme.ts:27](https://github.com/sprucepad/convoker/blob/e7b2a4fd289b328fba79a8ed6d3b6800d52c810a/packages/theme/src/theme.ts#L27)

Wraps a string in a secondary ANSI code.

#### Parameters

##### a

`string`

The string to wrap.

#### Returns

`string`

***

### success()

> **success**(`a`): `string`

Defined in: [theme.ts:38](https://github.com/sprucepad/convoker/blob/e7b2a4fd289b328fba79a8ed6d3b6800d52c810a/packages/theme/src/theme.ts#L38)

Wraps a string in a success ANSI code.

#### Parameters

##### a

`string`

The string to wrap.

#### Returns

`string`

***

### warning()

> **warning**(`a`): `string`

Defined in: [theme.ts:43](https://github.com/sprucepad/convoker/blob/e7b2a4fd289b328fba79a8ed6d3b6800d52c810a/packages/theme/src/theme.ts#L43)

Wraps a string in a warning ANSI code.

#### Parameters

##### a

`string`

The string to wrap.

#### Returns

`string`
