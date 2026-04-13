> <h1><center>Unary Operators

`Unary operators works on one value at a time only. They perform various operations such as negation, incrementing, and decrementing. Unary operators can be used in both prefix and postfix forms.`

```java
+        //unary plus 
-        //unary negation 
typeof   //type operator
++       //increment
--       //decrement
```

> `unary plus` is used to convert a `value to a number`. If the operand is not already a number, it will attempt to convert it to one. For example:

```js
let a = "5";
let b = +a; // b is now the number 5
```

> `unary negation` is used to negate a `number`. It changes the sign of the operand. For example:

```js
let a = 5;
let b = -a; // b is now -5
```

> `typeof` is a type operator that `returns a string` indicating the `type of the operand`. It can be used to check the type of a `variable` or `expression`. For example:

```js
let a = 5;
console.log(typeof a); // returns "number"
let b = "Hello";
console.log(typeof b); // returns "string"
```

**`increment` and `decrement` operators have two forms:**

> `prefix` form: 
- The operator is placed before the operand e.g., `++a` or `--a`. 
- Its increments or decrements the value of the operand before it is used in an expression.

```js
let a = 5;
let b = ++a; // a is now 6, b gets the value of a (6)
console.log(a,b); // returns 6 6
```

```js
let a = 5;
let b = --a; // a is now 4, b gets the value of a (4)
console.log(a,b); // returns 4 4
```

> `postfix` form 

- The operator is placed after the operand (e.g., `a++` or `a--`). 
- It increments or decrements the value of the operand after it is used in an expression.

```js
let a = 5;
let b = a++; // Postfix increment: b gets the value of a (5), then a is incremented to 6
console.log(a,b); // returns 6 5
```

```js
let a = 5;
let b = a--; // Postfix decrement: b gets the value of a (5), then a is decremented to 4
console.log(a,b); // returns 4 5
```

NOW let's see the difference between prefix and postfix increment in a more complex expression:

```js   
let a = 5;
let b = ++a + a++; // Prefix increment: a becomes 6, then b gets 6 + 6 (12), then a becomes 7   
console.log(a,b); // returns 7 12
```

> In this example 
- The prefix `++a` is `incrementing` `a` to `6` before it is used in the expression,
- Then the value of `a` `(which is now 6)` is used in the expression for the `postfix` `increment` `a++`. 
- After the expression is evaluated, a is `incremented` to `7`. Therefore, `b` gets the value of `12 (6 + 6)` and `a` ends up being `7` after both increments are applied.

> **`CONCLUSION`:**
*in simple words `prefix` imediately perfoems the `increment` or `decrement` while `postfix` performs the `increment` or `decrement` after the current value is used in the expression.*