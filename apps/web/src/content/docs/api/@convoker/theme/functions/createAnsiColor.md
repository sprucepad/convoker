---
editUrl: false
next: false
prev: false
title: "createAnsiColor"
---

> **createAnsiColor**(`open`, `close`): (`input`) => `string`

Defined in: [color.ts:60](https://github.com/sprucepad/convoker/blob/e7b2a4fd289b328fba79a8ed6d3b6800d52c810a/packages/theme/src/color.ts#L60)

Creates a function that wraps a string in ANSI codes.

## Parameters

### open

`number`

The opening ANSI code.

### close

`number`

The closing ANSI code.

## Returns

A function that wraps the string in ANSI codes.

> (`input`): `string`

### Parameters

#### input

`any`

### Returns

`string`
