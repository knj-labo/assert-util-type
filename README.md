# assert-util-types
[![npm version](https://badge.fury.io/js/assert-util-types.svg)](https://badge.fury.io/js/assert-util-types)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
<span class="badge-npmdownloads"><a href="https://npmjs.org/package/badges" title="View this project on NPM"><img src="https://img.shields.io/npm/dt/assert-util-types.svg" alt="NPM downloads" /></a></span>
[![assert util types release](https://github.com/knj-labo/assert-util-type/actions/workflows/release.yml/badge.svg)](https://github.com/knj-labo/assert-util-type/actions/workflows/release.yml)  
TypeScript verifies that your program uses the right type as you write code, avoiding potential issues at runtime.
but, By using any, you expose yourself to issues that are difficult to trace and debug, especially once the code is deployed in production.

when we cannot determine the type because we don’t know the result of that library and fetched data.
we need to use any type for them.

So, if you dont want to use any type. **you can use assert-util-types**.

## ⚙️ Installation

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

## 📝 Usage

#### case.1 
nominal types is preventing confusion between two types. In regular Typescript you run into this problem:
```typescript
type User = {
    id: number
    name: string
}

type Admin = {
    id: number
    name: string
}

const mike: Admin = {
    id: 1,
    name: 'mike'
}
const introduceMe = (props: User):string => {
    const {id, name} = props;
    return `No.${id}, User is ${name} !`
}
// oh... compilation was successful.
introduceMe(mike); // we can use User and Admin　in the same way.
```
but Nominal type solve this problem

```typescript
import { Nominal } from 'assert-util-types';

type userId = Nominal<number, 'userId'>
type adminId = Nominal<number, 'adminId'>

type User = {
    id: userId
    name: string
}

type Admin = {
    id: adminId
    name: string
}

const mike = {
    id: 1,
    name: 'mike'
} as Admin


const introduceMe = (props: User):string => {
    const {id, name} = props;
    return `No.${id}, User is ${name} !`
}

// That's great! get an error! 
introduceMe(mike); // Argument of type 'Admin' is not assignable to parameter of type 'User'.
```

#### case2.
`asSomething` functions
to create the more complex type checks.

this functions passed the value in a value field upon success, or provides detailed error messages upon failure.
```typescript
import { asString } from 'assert-util-types';

// Success
console.log(asString('This is String type', 'string')) // return 'This is String type'

// Failure
console.log(asString(['This is Array'], 'sample')) // get the error message "sample should be string`"
```

## Licence
MIT
