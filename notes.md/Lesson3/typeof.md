> <h1><center>typeof Operator

> `typeof` is a unary operator that returns a string indicating the type of a variable or expression. It is commonly used to check the type of a value before performing operations on it. For example:

```js
let num = 5;
console.log(typeof num); // returns "number"

let str = "Hello";
console.log(typeof str); // returns "string"

let bool = true;
console.log(typeof bool); // returns "boolean"

let obj = {};
console.log(typeof obj); // returns "object"

let und = undefined;
console.log(typeof und); // returns "undefined"

let nul = null;
console.log(typeof nul); // returns "object" (this is a known quirk in JavaScript)
```

> The `typeof` operator is particularly useful when you need to ensure that a value is of the expected type before performing operations on it. It helps prevent runtime errors that might occur if you try to perform an operation on a value of an unexpected type.