# assert-util-types
[![npm version](https://badge.fury.io/js/assert-util-types.svg)](https://badge.fury.io/js/assert-util-types)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
<span class="badge-npmdownloads"><a href="https://npmjs.org/package/badges" title="View this project on NPM"><img src="https://img.shields.io/npm/dt/assert-util-types.svg" alt="NPM downloads" /></a></span>

TypeScript verifies that your program uses the right type as you write code, avoiding potential issues at runtime.
but, By using any, you expose yourself to issues that are difficult to trace and debug, especially once the code is deployed in production.

when we cannot determine the type because we don’t know the result of that library and fetched data.
we need to use any type for them.

So, if you dont want to use any type. **you can use assert-util-types**.

## Installation

case: use npm
```zsh
$ npm install assert-util-types
```

case: use yarn
```zsh
$ yarn add assert-util-types
```

case: use pnpm
```zsh
$ pnpm install assert-util-types
```

## Usage

```typescript
import { Nominal, assertFilledString } from "assert-util-types";
```

## Licence
MIT
