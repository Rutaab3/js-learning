> <h1><center>Reassignmet/Reinitialization & Redeclarations

> <h3>VAR


`You can redeclare the same value mulitple time and it won't give you an error instead will show the latest value declared that can be crucial `

> **if var variable is declared it can be redecleared easily. Thats why it best to not use var.**

```js
var a = 20; //✅
var a = 30; //✅
var a = 40; //✅
```

```js
console.log(a);
output = 40;
```

> <h3>LET


`You can reinitialize it but can't redeclare the same value mulitple time`

> **if let variable is declared it can't be redecleared.**

```js
let a = 20; //❌
let a = 30; //❌
```
`(it will underline both 'a' as error bcz it can't be redeclared)`

```js
console.log(a);
output = `Uncaught SyntaxError: Identifier 'a' has already been declared;`
```

**another approch to redeclear a variable.**

```js
let a = 20; ✅
a = 30; ✅
```
`(you can again reintilze the value according to your needs)`

```js
console.log(a);
output = 30;
```

> <h3>CONST


`You use const when you know the value of a variable remains same throughout the entire program`

> **if const variable is declared it can't be redecleared.**

```js
const a = 20; //❌
const a = 30; //❌
```
`(it will underline both 'a' as error bcz it can't be redeclared)`

```js
console.log(a);
output = `Uncaught SyntaxError: Identifier 'a' has already been declared`
```

**another approch to redeclear a variable.**

```js
const a = 20; ✅
a = 30; ✅
```
`(it won't underline both 'a' as error but will throw TypeError on compilation as it cannot be reinitialize(reassigned) again)`

```js
console.log(a);
output = `Uncaught TypeError: Assignment to constant variable;`
```
> **if const contain a object/array you can still change its value.**

*Simple here const holds an object name: Ali*
```js
const student = { name: "Ali" };
console.log(student);
output = {name: 'Ali'}
```

*we can change the object name: Ali to name: Bilal*
```js
const student = { name: "Ali" };
student.name = "Bilal";
console.log(student);
output = {name: 'Bilal'}
```

*another exapmle there are 2 objects but i need to change the name only*
```js
const student = { name: "Ali" , age: 34 };
student.name = "Bilal";
console.log(student);
output = {name: 'Bilal', age: 34}
```
*if you try to redeclare the variable its not allowed*

```js
const student = { name: "Ali" };
student = {};

//redeclaration

console.log(student);

output = `Uncaught TypeError: Assignment to constant variable.`
```