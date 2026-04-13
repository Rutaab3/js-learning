> <h1> <center>SCOPES


*Scope defines the variables nature i.e `global, block, functional`*

`GLOBAL`        **Can be accessed any where in the code**<br>
`BLOCK`         **Can only be accessed inside a block**<br>
`FUNCTIONAL`    **Can only be accessed inside a function**

| Variable | Global | Block | Functional |
|----------|--------|-------|------------|
| Var      | yes    | no    | yes        |
| Let      | yes    | yes   | yes        |
| Const    | yes    | yes   | yes        |


> <h2> Note:

1. *There is no difference between the **block** and **functional** scope. Both have variable inside block {curly braces}.* 

2. *We won't use **var** in examples you will learn that in the final part.*


> <p> This snippet will help you to understand what how are scopes defined.

```js
let a = 20;                   //global
{
     let a = 10;              //blocked
     console.log(a);
}
console.log(a);

//The output for this snippet is

10   //the variable is fetched from block
20   //the variable is fetched from global
```

> <p> This snippet will help you to understand what happen when you call a variable globally thats intialize and declared inside block.

```js
{
   let a = 10;
   console.log(a);
}
console.log(a);


//The output for this snippet is

10                                              //the variable is fetched from block
Uncaught ReferenceError: a is not defined the  // variable is fetched from global
```

**Same happens with *const* too the variable created in block is only used inside block and can't be fetched globally**


> <h2> <center> Why not to use var

__Var__ `donot respect the block. It is functional scoped using it can cause serious bugs e.g declaring a variable at start of the program and inside a block for example if-else statement we need the block variable to be used in block and the global variable to be used globally or where needed later but var ignores that and when its called it fetches the nearest one.`

```js
var a = 20;
{
    var a = 3
    if (a > 3) {
        console.log("a is smaller")
    } else {
        console.log("a is bigger")
    }
}
console.log(a);

//The output for this snippet 

a is bigger     //the variable is fetched from block
3               //the variable is fetched from block
```

`(both values fetched from block that is a bug)`
