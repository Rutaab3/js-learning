>  <h1><center>Comparison Operators

`Comparison operators compare two values and return a boolean (true or false) based on the comparison. They are commonly used in conditional statements to control the flow of a program.`

```java
==   //Loose Equality
===  //Strict Equality
!=   //Loose not equal   
!==  //Strictly not equal.
>    //Greater than 
<    //Less than.
>=   //Refers to Greater than or equal to / Less than or equal to.
```

`Comparison operators can be categorized into two types:`

1. *equality operators* 
2. *relational operators*

> **Equality operators**

Equality operators compares values for equality. 
There are 2 equality operators `(==) equal too` and `(===) strict equal to.`

```js   
5 == '5';   // true (type coercion occurs)

//== just check if the value is equal and ignores their type
```
```js
5 === '5';  // false (no type coercion, different types)

//=== check both the value and type for equality
``` 

>Conclusion:
- Use `===` for strict equality checks to avoid unexpected type coercion and bugs.


> **Relational Operators**

Relational operators `(>, <, >=, <=)` compare values based on their order. They return true or false depending on the relationship between the values.

```js
5 > 3;    // true

// > Check if first value is greater than second value
```
```js
5 < 3;    // false  

// < Check if first value is less than second value
```
```js
5 >= 5;   // true

// >= Check if first value is greater than or equal to second value
```
```js
5 <= 4;  // false

// <= Check if first value is less than or equal to second value
```

> **Inequality Operators**

These `(!=) not equal to` and `(!==) strictly not equal to` operators checks if values are not equal. 
- `!=` checks if values are not equal after type coercion, while 
- `!==` checks if values are not equal without type coercion *(i.e., they are of different types or have different values).*

```js
5 != '5';   // false (type coercion occurs)
```
```js
5 !== '5';  // true (no type coercion, different types)
```

`Note:` *The output of the `inequality operators` are always opposite of the `equality operators`.*

```js   
5 == '5';   // true 
5 != '5';   // false 
```
```js
5 === '5';   // true 
5 !== '5';   // false 
``` 

`Conclusion:` `!==` is always preferred in modern JavaScript to avoid unexpected type coercion.
