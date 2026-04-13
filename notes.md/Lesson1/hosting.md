> <h1> <center>HOSITING


`when javascirpt runs a program/code it prepares memory and moves all declarations to the top or it breakes the eqaution in 2 parts. The decleared path goes to top and the intialized part remains at its place.`


> <h2> <center>EXAMPLE

**So this is a simple example**<br>
```js
console.log(a);    //ignore this here
var a = 20;
```

**This equations breaks into two parts**<br>
```js
var a = undefined;
a = 20;
```



**So when we call the varaible before its written this happens**<br>
```js
var a = undefined;     //the decleared part moves to the top
conosle.log(a);        //we call varibale 'a' here
a = 20;                //varible's value remains at the same place
```


> <h2> <center>EXAMPLES

> <h2> VAR

*When you write*
```js
console.log(a);
var a = 20;
```

`its show undefined.`
```js
var a = undefined;     //the decleared part moves to the top
conosle.log(a);        //we call varibale a here
a = 20;                //varible's value remains at the same place
```


> <h2> LET

*When you write*
```js
console.log(a);
let a = 20;
```

`its show script.js:17 Uncaught ReferenceError: Cannot access 'a' before initialization`
```js
let a = undefined;      //the decleared part moves to the top
conosle.log(a);         //we call varibale a here
a = 20;                 //varible's value remains at the same place
```


> <h2> CONST

`When you write`
```js
console.log(a);
const a = 20;
```

`its show script.js:17 Uncaught ReferenceError: Cannot access 'a' before initialization`
```js
let a = undefined;      //the decleared part moves to the top
conosle.log(a);         //we call varibale a here
a = 20;                 //varible's value remains at the same place
```


> <h2> CONCLUSION

**Const, Let, Var**
`Just be careful not to call the the variable before intilaization thats it. Don't use Var.`
