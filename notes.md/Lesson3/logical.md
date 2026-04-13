>  <h1><center>Logical Operators

`Logical operators are used to combine multiple conditions or expressions and return a boolean value (true or false) based on the evaluation of those conditions. They are commonly used in control flow statements to make decisions based on multiple criteria.`

```java
&&   // Logical AND
||   // Logical OR
!    // Logical NOT
```

> **Logical AND (&&)**
The logical AND operator (`&&`) returns true if both operands are true, and false otherwise.

```js
true && true;   // true
true && false;  // false
```
```js
5 > 3 && 2 < 4;   // true (both conditions are true)
5 > 3 && 2 > 4;   // false (second condition is false
```

> **Logical OR (||)**
The logical OR operator (`||`) returns true if at least one of the operands is true,
and false if both operands are false.

```js
true || false;  // true
false || false; // false
```
```js
5 > 3 || 2 > 4;   // true (first condition is true)
5 < 3 || 2 > 4;   // false (both conditions are false
```

> **Logical NOT (!)**
The logical NOT operator (`!`) negates the value of a boolean expression. It returns true if the expression is false, and false if the expression is true.

```js   
!true;   // false
!false;  // true
```
```js   
!(5 > 3);   // false (5 > 3 is true, so negating it gives false)
!(5 < 3);   // true (5 < 3 is false, so negating it gives true)
```

