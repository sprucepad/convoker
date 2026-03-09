---
editUrl: false
next: false
prev: false
title: "Config"
---

Defined in: [packages/log/src/index.ts:10](https://github.com/sprucepad/convoker/blob/e7b2a4fd289b328fba79a8ed6d3b6800d52c810a/packages/log/src/index.ts#L10)

Log configuration.

## Properties

### format

> **format**: `"text"` \| `"json"`

Defined in: [packages/log/src/index.ts:14](https://github.com/sprucepad/convoker/blob/e7b2a4fd289b328fba79a8ed6d3b6800d52c810a/packages/log/src/index.ts#L14)

The configuration format.

***

### jsonSpace

> **jsonSpace**: `number`

Defined in: [packages/log/src/index.ts:27](https://github.com/sprucepad/convoker/blob/e7b2a4fd289b328fba79a8ed6d3b6800d52c810a/packages/log/src/index.ts#L27)

How much space in the JSON output of objects.
This does not change spacing in JSON logs, only for objects passed into log functions.

***

### stderr

> **stderr**: `Writable`

Defined in: [packages/log/src/index.ts:22](https://github.com/sprucepad/convoker/blob/e7b2a4fd289b328fba79a8ed6d3b6800d52c810a/packages/log/src/index.ts#L22)

Standard error output.

***

### stdout

> **stdout**: `Writable`

Defined in: [packages/log/src/index.ts:18](https://github.com/sprucepad/convoker/blob/e7b2a4fd289b328fba79a8ed6d3b6800d52c810a/packages/log/src/index.ts#L18)

Standard output.
