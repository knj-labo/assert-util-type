# assert-util-types
[![npm version](https://badge.fury.io/js/assert-util-types.svg)](https://badge.fury.io/js/assert-util-types)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
<span class="badge-npmdownloads"><a href="https://npmjs.org/package/badges" title="View this project on NPM"><img src="https://img.shields.io/npm/dt/assert-util-types.svg" alt="NPM downloads" /></a></span>

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

### Nominal 
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

### user defined type guard
`asSomething` functions to create the more complex type checks.
this functions passed the value in a value field upon success, or provides detailed error messages upon failure.

#### isString
```typescript
import { isString } from 'assert-util-types';

isString('hello');  // true
isString(1);    // false
```

#### assertString
```typescript
import { assertString } from 'assert-util-types';

assertString('hello', 'target'); // ok
assertString(1, 'target'); // throw error
```

#### asString
```typescript
import { asString } from 'assert-util-types';

asString('hello', 'target'); // 'hello'
asString(1, 'target'); // error message is "target should be string"
```

#### isFilledString
```typescript
import { isFilledString } from 'assert-util-types';

isFilledString('hello'); // true 
isFilledString(''); // false 
isFilledString(1); // false
```

#### assertFilledString
```typescript
import { asFilledString } from 'assert-util-types';

asFilledString('hello', 'target'); // ok 
asFilledString('', 'empty string'); // error message is "empty string should have least 1 character" 
asFilledString(1, 'target'); // error message is "target should have least 1 character"
```

#### asFilledString
```typescript
import { asFilledString } from 'assert-util-types';

asFilledString('hello', 'target'); // 'hello'

asFilledString('', 'empty string'); // error message is "empty string should have least 1 character" 
asFilledString(1, 'target'); // error message is "target should have least 1 character"
```

#### isNumber
```typescript
import { isNumber } from 'assert-util-types';

isNumber(1); // true
isNumber(NaN) // false
isNumber('1'); // false
```

#### assertNumber
```typescript
import { assertNumber } from 'assert-util-types';

assertNumber(1, 'target'); // ok
assertNumber(NaN, 'NaN'); // error message is "NaN should be number"
```

#### asNumber
```typescript
import { asNumber } from 'assert-util-types';

asNumber(1, 'target'); // 1
asNumber(true, 'target'); // 1 
asNumber('hello', 'NaN'); // TypeError: Cannot convert hello to number
```

#### isFilledArray
```typescript
import { isFilledArray } from 'assert-util-types';

isFilledArray(['string', 'number']); // true
isFilledArray([]); // false
isFilledArray(1); // false
```

#### assertFilledArray
```typescript
import { assertFilledArray } from 'assert-util-types';

assertFilledArray(['string', 'number'], 'target'); // ok
assertFilledArray([], 'empty array'); // error message is "empty array should have least 1 item"
```

#### isObject
```typescript
import { isObject } from 'assert-util-types';

isObject({}); // true
isObject([]); // false
isObject(1); // false
```

#### assertObject
```typescript
import { assertObject } from 'assert-util-types';

assertObject({}); // ok
assertObject([], 'array'); // error message is "array should be object"
```

#### assertMatchedType
```typescript
import { assertMatchedType } from 'assert-util-types';

type User = {
  id?: any;
  name?: string;
  email: string;
};

const obj: unknown = { id: 1, name: "foo" };

assertMatchedType<User>(obj, ["email"]); // throws error
```
## Licence
MIT
