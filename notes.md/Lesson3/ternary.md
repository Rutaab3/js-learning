>  <h1><center>Ternary Operator

> `The ternary operator is a simple way to write an if-else statement. It takes three operands:` 
- `a condition` 
- `a value to return if the condition is true.`   
- `a value to return if the condition is false.`

```js
condition ? valueIfTrue : valueIfFalse
```

`Example:`

```js
let age = 20;
let canVote = age >= 18 ? "Yes" : "No";
```
```js
//the condition is 

age >= 18

//If this condition is 
true (which it is, since age is 20) 
//it will return "Yes". 

//If the condition were 
false (for example, if age were 16) 
//it would return "No".
```
> *The ternary operator is often used for simple conditional assignments and can make code more concise and readable when used appropriately. However, for more complex conditions or multiple branches, traditional if-else statements may be clearer.*
