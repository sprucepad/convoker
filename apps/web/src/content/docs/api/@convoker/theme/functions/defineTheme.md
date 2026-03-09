---
editUrl: false
next: false
prev: false
title: "defineTheme"
---

> **defineTheme**(`theme`): [`Theme`](/api/convoker/theme/interfaces/theme/)

Defined in: [theme.ts:133](https://github.com/sprucepad/convoker/blob/e7b2a4fd289b328fba79a8ed6d3b6800d52c810a/packages/theme/src/theme.ts#L133)

Defines a theme.

## Parameters

### theme

The (partial) theme.

#### accent?

(`a`) => `string`

#### background?

(`a`) => `string`

#### error?

\{ \}

#### foreground?

(`a`) => `string`

#### info?

(`a`) => `string`

#### primary?

\{ \}

#### secondary?

\{ \}

#### styles?

\{ `bold?`: `string`; `italic?`: `string`; `underline?`: `string`; \}

Optional styles.

#### styles.bold?

#### styles.italic?

#### styles.underline?

#### success?

\{ \}

#### symbols?

\{ `error`: `string`; `fatal`: `string`; `info?`: `string`; `success`: `string`; `warning`: `string`; \}

Set of symbols for logging.

#### symbols.error

`string`

Error message symbol.

#### symbols.fatal

`string`

Fatal error message symbol.

#### symbols.info?

`string`

Information message symbol.

#### symbols.success

`string`

Success message symbol.

#### symbols.warning

`string`

Warning message symbol.

#### warning?

\{ \}

## Returns

[`Theme`](/api/convoker/theme/interfaces/theme/)

The theme, merged with the default theme.
