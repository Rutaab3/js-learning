> <h1><center>VARIABLES


`Variables are containers that hold data. They help us store, reuse, and update information in JavaScript — from simple values like numbers to complex data like arrays and objects. Think of a variable as a box with a name on it. You can put something inside it (a value), and later check or change what's inside.`
_In JavaScript, you create these boxes using keywords: `var , let , or const`._


> <h3>Keywords

1. `var`
2. `let`
3. `const`


> <h3>NOTE:

`These 2 words will be used later`

1. **hoisted** *Find reference for hoisted in [[hositing.md](hosting.md)]. Before reading temporal deadzone understand this concept.*
2. **temporal dead zone(tdz)** *Find reference for tdz in [[tdz.md](tdz.md)].*


> <h3>VAR

1. _part ES5js_  
2. _function scoped_ 
3. _can be redeclared and reassigned_
4. _hoisted to top with `undefined` value._


> <h3>LET

1. _part of latest ES6js features_ 
1. _block scoped_
1. _can be reassigned but can't be redeclared_
1. _hoisted but stays in `temporal dead zone(tdz)`_


> <h3>CONST

1. _part of latest ES6js features_ 
1. _block scoped_
1. _can't be reassigned but cant be redeclared_
1. _hoisted but stays in `temporal dead zone(tdz)`_


> <h3>CONCLUSION

*Use `Const` as much as possible.* <br>
*Use `Let` only when you plan to redeclare the value again.* <br> 
*Avoid `Var` its part of old ES script and creates bug.*


