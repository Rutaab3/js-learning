> <h1><center>OPERATORS

*In JavaScript, operators are symbols used to perform operations on operands (values and variables). They are the "verbs" of your code—they tell the engine to add numbers, compare values, or assign results.*

>**NOTE:** `+` *operator can perform two operations: `addition` and `concatenation`*

```js
let sum = 5 + 10; // addition, sum is 15
let greeting = "Hello" + " " + "World"; // concatenation, greeting is "Hello World"
```

**There are 7 main operators types in javascript**

1. Arithmetic Operators
2. Assignment Operators
3. Comparison Operators
4. Logical Operators
5. Unary Operators
6. Ternary Operator (Conditional)

> **Arithmetic Operators**

`These are used to perform standard mathematical calculations.`

``` java
+    //addition
-    //substraction
*    //multiplication
/    //division
%    //modulus
**   //exponentiation
 ```
> **Assignment Operators**

`These assign values to variables. The most common is =, but there are "compound" versions that perform an operation and assign the result at the same time.`
``` java
=    //assignment operator
+=   //
-=   //
*=   //
/=   //
%=   //
 ```

> **Comparison Operators**

`These evaluate a condition and return a Boolean (true or false).`


```java
==   //Loose Equality
===  //Strict Equality
!=   //Loose not equal   
!==  //Strictly not equal.
>    // Greater than 
<    //Less than.
>=   //Refers to Greater than or equal to / Less than or equal to.
```
>**Logical Operators**

`Used to determine the logic between variables or values, typically in if statements.`

```js
&&  //Logical AND
||  //Logical OR
!   //Logical NOT     
```

>**Unary Operators**

`All the operators that can be applied to single value.`

```java
+        //unary plus 
-        //unary negation 
-        //subtraction
typeof   //type operator
++       //increment
--       //decrement
```

> **Ternary Operator (Conditional)**

`This is the only operator that takes three operands. It’s a shorthand for an if-else statement.`

```js
//Syntax: condition ? valueIf True : valueIf False

let age = 20;
let status = (age >= 18) ? "Adult" : "Minor"; 
```

> <h2><center>More operators:

> **String Operators**

`The + operator isn't just for math; when used with strings, it performs concatenation (joining them together).`

```js
let greeting = "Hello" + " " + "World"; // "Hello World"
```

> **typeof Operators**

`Also a unary operator that returns a string indicating the type of the operand.`

```js
typeof: // Example: typeof "Hello" // returns "string"
```

> **instanceof Operators**

`Returns true if an object is an instance of a specific object type.`

```js
instanceof: // Example: obj instanceof Object
```

> **Bitwise Operators**

`Perform operations on the binary representations of numbers.` *very rarely used in javascript*

```js
//very rarely used in javascript

&   // Bitwise AND
|   // Bitwise OR
^   // Bitwise XOR
~   // Bitwise NOT
<<  // Left shift
>>  // Right shift
>>> // Unsigned right shift
```

`Pro-tip:` Be careful with operator precedence (the order in which they are calculated). Just like in school math, multiplication happens before addition. You can use parentheses () to force the order you want!
