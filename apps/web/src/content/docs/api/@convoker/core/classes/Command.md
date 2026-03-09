---
editUrl: false
next: false
prev: false
title: "Command"
---

Defined in: [packages/core/src/command.ts:107](https://github.com/sprucepad/convoker/blob/e7b2a4fd289b328fba79a8ed6d3b6800d52c810a/packages/core/src/command.ts#L107)

A command.

## Type Parameters

### T

`T` *extends* [`Input`](/api/convoker/core/namespaces/i/interfaces/input/) = [`Input`](/api/convoker/core/namespaces/i/interfaces/input/)

## Constructors

### Constructor

> **new Command**\<`T`\>(`names`, `desc?`, `version?`): `Command`\<`T`\>

Defined in: [packages/core/src/command.ts:163](https://github.com/sprucepad/convoker/blob/e7b2a4fd289b328fba79a8ed6d3b6800d52c810a/packages/core/src/command.ts#L163)

Creates a new command.

#### Parameters

##### names

The names (aliases).

`string` | `string`[]

##### desc?

`string`

The description.

##### version?

`string`

The version.

#### Returns

`Command`\<`T`\>

## Properties

### $allowSurpassArgLimit

> **$allowSurpassArgLimit**: `boolean` = `false`

Defined in: [packages/core/src/command.ts:139](https://github.com/sprucepad/convoker/blob/e7b2a4fd289b328fba79a8ed6d3b6800d52c810a/packages/core/src/command.ts#L139)

If you should be able to surpass the amount of positional arguments defined in the input.

***

### $allowUnknownOptions

> **$allowUnknownOptions**: `boolean` = `false`

Defined in: [packages/core/src/command.ts:135](https://github.com/sprucepad/convoker/blob/e7b2a4fd289b328fba79a8ed6d3b6800d52c810a/packages/core/src/command.ts#L135)

If this command allows unknown options.

***

### $children

> **$children**: `Map`\<`string`, [`CommandAlias`](/api/convoker/core/interfaces/commandalias/)\<[`Input`](/api/convoker/core/namespaces/i/interfaces/input/)\>\>

Defined in: [packages/core/src/command.ts:127](https://github.com/sprucepad/convoker/blob/e7b2a4fd289b328fba79a8ed6d3b6800d52c810a/packages/core/src/command.ts#L127)

The children of this command.

***

### $description

> **$description**: `string` \| `undefined`

Defined in: [packages/core/src/command.ts:115](https://github.com/sprucepad/convoker/blob/e7b2a4fd289b328fba79a8ed6d3b6800d52c810a/packages/core/src/command.ts#L115)

The description of this command.

***

### $errorFn

> **$errorFn**: [`ErrorFn`](/api/convoker/core/type-aliases/errorfn/)\<`T`\> \| `undefined` = `undefined`

Defined in: [packages/core/src/command.ts:155](https://github.com/sprucepad/convoker/blob/e7b2a4fd289b328fba79a8ed6d3b6800d52c810a/packages/core/src/command.ts#L155)

The error handler of this command.

***

### $fn

> **$fn**: [`ActionFn`](/api/convoker/core/type-aliases/actionfn/)\<`T`\> \| `undefined` = `undefined`

Defined in: [packages/core/src/command.ts:147](https://github.com/sprucepad/convoker/blob/e7b2a4fd289b328fba79a8ed6d3b6800d52c810a/packages/core/src/command.ts#L147)

The action function of this command.

***

### $input

> **$input**: `T`

Defined in: [packages/core/src/command.ts:143](https://github.com/sprucepad/convoker/blob/e7b2a4fd289b328fba79a8ed6d3b6800d52c810a/packages/core/src/command.ts#L143)

The input this command takes.

***

### $middlewares

> **$middlewares**: [`MiddlewareFn`](/api/convoker/core/type-aliases/middlewarefn/)\<`T`\>[] = `[]`

Defined in: [packages/core/src/command.ts:151](https://github.com/sprucepad/convoker/blob/e7b2a4fd289b328fba79a8ed6d3b6800d52c810a/packages/core/src/command.ts#L151)

The middlewares associated with this command.

***

### $names

> **$names**: `string`[]

Defined in: [packages/core/src/command.ts:111](https://github.com/sprucepad/convoker/blob/e7b2a4fd289b328fba79a8ed6d3b6800d52c810a/packages/core/src/command.ts#L111)

The names (aliases) of this command.

***

### $parent

> **$parent**: `Command`\<`any`\> \| `undefined`

Defined in: [packages/core/src/command.ts:131](https://github.com/sprucepad/convoker/blob/e7b2a4fd289b328fba79a8ed6d3b6800d52c810a/packages/core/src/command.ts#L131)

The parent of this command.

***

### $theme

> **$theme**: [`Theme`](/api/convoker/namespaces/theme/interfaces/theme/) \| `undefined`

Defined in: [packages/core/src/command.ts:119](https://github.com/sprucepad/convoker/blob/e7b2a4fd289b328fba79a8ed6d3b6800d52c810a/packages/core/src/command.ts#L119)

The theme of this command

***

### $version

> **$version**: `string` \| `undefined`

Defined in: [packages/core/src/command.ts:123](https://github.com/sprucepad/convoker/blob/e7b2a4fd289b328fba79a8ed6d3b6800d52c810a/packages/core/src/command.ts#L123)

The version of this command.

## Methods

### action()

> **action**(`fn`): `this`

Defined in: [packages/core/src/command.ts:225](https://github.com/sprucepad/convoker/blob/e7b2a4fd289b328fba79a8ed6d3b6800d52c810a/packages/core/src/command.ts#L225)

Sets the action function for this command.

#### Parameters

##### fn

[`ActionFn`](/api/convoker/core/type-aliases/actionfn/)\<`T`\>

The action.

#### Returns

`this`

this

***

### add()

> **add**(...`commands`): `this`

Defined in: [packages/core/src/command.ts:245](https://github.com/sprucepad/convoker/blob/e7b2a4fd289b328fba79a8ed6d3b6800d52c810a/packages/core/src/command.ts#L245)

Adds existing commands to this.

#### Parameters

##### commands

...`Command`\<`any`\>[]

The commands.

#### Returns

`this`

this

***

### alias()

> **alias**(...`aliases`): `this`

Defined in: [packages/core/src/command.ts:174](https://github.com/sprucepad/convoker/blob/e7b2a4fd289b328fba79a8ed6d3b6800d52c810a/packages/core/src/command.ts#L174)

Adds a set of aliases to this command.

#### Parameters

##### aliases

...`string`[]

The aliases to add.

#### Returns

`this`

this

***

### allowSurpassArgLimit()

> **allowSurpassArgLimit**(): `this`

Defined in: [packages/core/src/command.ts:504](https://github.com/sprucepad/convoker/blob/e7b2a4fd289b328fba79a8ed6d3b6800d52c810a/packages/core/src/command.ts#L504)

Allows surpassing the amount of arguments specified.

#### Returns

`this`

this

***

### allowUnknownOptions()

> **allowUnknownOptions**(): `this`

Defined in: [packages/core/src/command.ts:296](https://github.com/sprucepad/convoker/blob/e7b2a4fd289b328fba79a8ed6d3b6800d52c810a/packages/core/src/command.ts#L296)

Allows unknown options.

#### Returns

`this`

this

***

### defaultErrorScreen()

> **defaultErrorScreen**(`errors`): `void`

Defined in: [packages/core/src/command.ts:528](https://github.com/sprucepad/convoker/blob/e7b2a4fd289b328fba79a8ed6d3b6800d52c810a/packages/core/src/command.ts#L528)

The default error screen.

#### Parameters

##### errors

`Error`[]

The errors.

#### Returns

`void`

***

### description()

> **description**(`desc`): `this`

Defined in: [packages/core/src/command.ts:185](https://github.com/sprucepad/convoker/blob/e7b2a4fd289b328fba79a8ed6d3b6800d52c810a/packages/core/src/command.ts#L185)

Adds a description to this command.

#### Parameters

##### desc

`string`

The description.

#### Returns

`this`

this

***

### error()

> **error**(`fn`): `this`

Defined in: [packages/core/src/command.ts:235](https://github.com/sprucepad/convoker/blob/e7b2a4fd289b328fba79a8ed6d3b6800d52c810a/packages/core/src/command.ts#L235)

Sets the error function for this command.

#### Parameters

##### fn

[`ErrorFn`](/api/convoker/core/type-aliases/errorfn/)\<`T`\>

The error handler.

#### Returns

`this`

this

***

### fullCommandPath()

> **fullCommandPath**(): `string`

Defined in: [packages/core/src/command.ts:513](https://github.com/sprucepad/convoker/blob/e7b2a4fd289b328fba79a8ed6d3b6800d52c810a/packages/core/src/command.ts#L513)

Gets the full command path (name including parents).

#### Returns

`string`

The full command path.

***

### handleErrors()

> **handleErrors**(`errors`, `input?`): `Promise`\<`Command`\<`T`\>\>

Defined in: [packages/core/src/command.ts:624](https://github.com/sprucepad/convoker/blob/e7b2a4fd289b328fba79a8ed6d3b6800d52c810a/packages/core/src/command.ts#L624)

Handles a set of errors.

#### Parameters

##### errors

`Error`[]

The errors to handle.

##### input?

`Partial`\<[`InferInput`](/api/convoker/core/namespaces/i/type-aliases/inferinput/)\<`T`\>\>

The parsed input, if possible.

#### Returns

`Promise`\<`Command`\<`T`\>\>

this

***

### input()

> **input**\<`TInput`\>(`input`): `Command`\<`TInput`\>

Defined in: [packages/core/src/command.ts:205](https://github.com/sprucepad/convoker/blob/e7b2a4fd289b328fba79a8ed6d3b6800d52c810a/packages/core/src/command.ts#L205)

Sets the input for this command.

#### Type Parameters

##### TInput

`TInput` *extends* [`Input`](/api/convoker/core/namespaces/i/interfaces/input/)

#### Parameters

##### input

`TInput`

#### Returns

`Command`\<`TInput`\>

this

***

### parse()

> **parse**(`argv`): `Promise`\<[`ParseResult`](/api/convoker/core/interfaces/parseresult/)\<`T`\>\>

Defined in: [packages/core/src/command.ts:306](https://github.com/sprucepad/convoker/blob/e7b2a4fd289b328fba79a8ed6d3b6800d52c810a/packages/core/src/command.ts#L306)

Parses a set of command-line arguments.

#### Parameters

##### argv

`string`[]

The arguments to parse.

#### Returns

`Promise`\<[`ParseResult`](/api/convoker/core/interfaces/parseresult/)\<`T`\>\>

A parse result.

***

### run()

> **run**(`argv?`): `Promise`\<`Command`\<`T`\>\>

Defined in: [packages/core/src/command.ts:647](https://github.com/sprucepad/convoker/blob/e7b2a4fd289b328fba79a8ed6d3b6800d52c810a/packages/core/src/command.ts#L647)

Runs a command.

#### Parameters

##### argv?

`string`[]

The arguments to run the command with. Defaults to your runtime's `argv` equivalent.

#### Returns

`Promise`\<`Command`\<`T`\>\>

this

***

### subCommand()

#### Call Signature

> **subCommand**(`names`, `builder`): `this`

Defined in: [packages/core/src/command.ts:262](https://github.com/sprucepad/convoker/blob/e7b2a4fd289b328fba79a8ed6d3b6800d52c810a/packages/core/src/command.ts#L262)

Creates a new subcommand and adds it.

##### Parameters

###### names

The aliases of the subcommand.

`string` | `string`[]

###### builder

[`Builder`](/api/convoker/core/type-aliases/builder/)

A builder to create the command.

##### Returns

`this`

#### Call Signature

> **subCommand**(`names`, `desc?`, `version?`): `Command`\<`any`\>

Defined in: [packages/core/src/command.ts:269](https://github.com/sprucepad/convoker/blob/e7b2a4fd289b328fba79a8ed6d3b6800d52c810a/packages/core/src/command.ts#L269)

Creates a new subcommand and adds it.

##### Parameters

###### names

The aliases of the subcommand.

`string` | `string`[]

###### desc?

`string`

The description of the subcommand.

###### version?

`string`

The version of the subcommand.

##### Returns

`Command`\<`any`\>

***

### use()

> **use**(...`fns`): `this`

Defined in: [packages/core/src/command.ts:215](https://github.com/sprucepad/convoker/blob/e7b2a4fd289b328fba79a8ed6d3b6800d52c810a/packages/core/src/command.ts#L215)

Adds a chain of middlewares.

#### Parameters

##### fns

...[`MiddlewareFn`](/api/convoker/core/type-aliases/middlewarefn/)\<`T`\>[]

The middlewares to use.

#### Returns

`this`

this

***

### version()

> **version**(`version`): `this`

Defined in: [packages/core/src/command.ts:195](https://github.com/sprucepad/convoker/blob/e7b2a4fd289b328fba79a8ed6d3b6800d52c810a/packages/core/src/command.ts#L195)

Adds a version to this command.

#### Parameters

##### version

`string`

The version.

#### Returns

`this`

this
