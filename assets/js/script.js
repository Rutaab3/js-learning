// var a = 1;
// let b = 2;
// const c = 3;

// console.log(a);
// console.log(b);
// console.log(c);

// let e = 4;
// f = 6;
// g = 7;

// console.log(e);
// console.log(f);
// console.log(g);

// const h = 20; 
// i = 30; 
// console.log(h);
// console.log(i);



// let j = 20;  // global scope

// {
//    if(j < 6){
//     console.log("a is smaller")
//    }else{
//     console.log("a is bigger")
//    }
// }


// var k = 20;  
// {
//     var k = 3
//     if (k > 3) {
//         console.log("a is smaller")
//     } else {
//         console.log("a is bigger")
//     }
// }
// console.log(k);

// let l = 20;
// {
//    let l = 10;
//    if(l < 11){
//     console.log("a is smaller")
//    }else{
//     console.log("a is bigger")
//    }
// }
// console.log(l);

// const m = 20;
// {
//    const m = 10;
//    if(m < 11){
//     console.log("a is smaller")
//    }else{
//     console.log("a is bigger")
//    }
// }
// console.log(m);

// {
//    let n = 10; 
//    if(n < 6){
//     console.log("a is smaller")
//    }else{
//     console.log("a is bigger")
//    }
// }
// // console.log(n);


// const name = "jammo";
// console.log("name: " + name);

// const student = { name: "Ali" , age: 34 };
// // student = {}; 
// console.log(student);

// {
//  var x = 5;
//  let y = 10;
//  const z = 15;
// }
// console.log(x); // ✅ 5
// console.log(y); // ❌ ReferenceError
// console.log(z); // ❌ ReferenceError

// let a = 10;
// let b = a;
// a = a + 2;
// console.log("a: " + a);
// console.log("b: " + b);

// let a = null;
// console.log("null: " + a);
// a = 10;
// console.log("value1: " + a);
// a = 20;
// console.log("value2: " + a);
// a = a + 2;
// console.log("value3: " + a);

// console.log(a);    //ignore this here
// var a = 20;

// var a = undefined;
// a = 20;

// var a = undefined;     //the decleared part moves to the top
// conosle.log(a);        //we call varibale 'a' here
// a = 20;                //varible's value remains at the same place

// console.log(a);
// var a = 20;

// var a = undefined;     //the decleared part moves to the top
// conosle.log(a);        //we call varibale a here
// a = 20;                //varible's value remains at the same place

// console.log(a);
// let a = 20;

// let a = undefined;      //the decleared part moves to the top
// conosle.log(a);         //we call varibale a here
// a = 20;                 //varible's value remains at the same place

// console.log(a);
// const a = 20;

// let a = undefined;      //the decleared part moves to the top
// conosle.log(a);         //we call varibale a here
// a = 20;                 //varible's value remains at the same place

// var a = 20; //
// var a = 30; //
// var a = 40; //

// console.log(a);
// output = 40;

// let a = 20; 
// let a = 30; 

// console.log(a);
// output = `Uncaught SyntaxError: Identifier 'a' has already been declared;`

// let a = 20; 
// a = 30; 

// console.log(a);
// output = 30;

// const a = 20; 
// const a = 30; 
// const a = 50;

// console.log(a);
// output = `Uncaught SyntaxError: Identifier 'a' has already been declared`

// const a = 20; 
// a = 30; 

// console.log(a);
// output = `Uncaught TypeError: Assignment to constant variable;`

// const student = { name: "Ali" };
// console.log(student);
// output = {name: 'Ali'}

// const student = { name: "Ali" };
// student.name = "Bilal";
// console.log(student);
// output = {name: 'Bilal'}

// const student = { name: "Ali" , age: 34 };
// student.name = "Bilal";
// console.log(student);
// output = {name: 'Bilal', age: 34}

// const student = { name: "Ali" };
// student = {};

// //redeclaration

// console.log(student);

// output = `Uncaught TypeError: Assignment to constant variable.`

// let a = 20;                   //global
// {
//      let a = 10;              //blocked
//      console.log(a);
// }
// console.log(a);

// //The output for this snippet is

// 10   //the variable is fetched from block
// 20   //the variable is fetched from global

// {
//    let a = 10;
//    console.log(a);
// }
// console.log(a);


// //The output for this snippet is

// 10                                              //the variable is fetched from block
// Uncaught ReferenceError: a is not defined the  // variable is fetched from global

// var a = 20;
// {
//     var a = 3
//     if (a > 3) {
//         console.log("a is smaller")
//     } else {
//         console.log("a is bigger")
//     }
// }
// console.log(a);

// //The output for this snippet 

// a is bigger     //the variable is fetched from block
// 3               //the variable is fetched from block

// console.log(a);       //start of scope
// //temporal dead zone
// //temporal dead zone
// //temporal dead zone
// let a = 10;           //declaration of variable

// let a = "Rutaab"          //string
// a = 99                    //number
// a = true                  //boolean
// a = undefined             //undefined
// a = null                  //object Ã¢â€ Â known bug
// a = [ ]                   //object
// a = { }                   //object
// a = function( ){ }        //function

// NaN === NaN           // `returns`     false
// [] + []                //`returns`     ""
// {} + []               // `returns`     0
// true + true           // `returns`     2
// null == undefined     // `returns`     true
// 0.1 + 0.2 !== 0.3     // `returns`     true
// typeof NaN           //  `returns`     "number"
// [] == ![]             // `returns`     true
// 3 > 2 > 1             // `returns`     false
// 1(!+[]+[]+![]).length  //`returns`     9

// if (0) {
// console.log("Runs");
// }

// if ("0") {
// console.log("Runs");
// }

// "5" + 1
// Output: "51" 
// //number converted to string

// "5" - 1
// Output: 4 
// //string converted to number

// true + 1
// Output: 2
// //value of true is 1

// null + 1
// Output: 1
// //value of null is 0

// undefined + 1
// Output: NaN
// //undefined is not a number hence NaN

// let a = "Rutaab"
// let a = 99
// let a = true

// console.log(typeof a)
// console.log(typeof b)
// console.log(typeof c)

// a = string
// b = number
// c = boolean

// let a = 9007199254740991;
// console.log("value: " + a);
// a = a + 1;
// console.log("add 1: " + a);
// a = a + 2;
// console.log("add 2: " + a);
// a = a + 3;
// console.log("add 3: " + a);
// a = a + 4;
// console.log("add 4: " + a);
// a = a + 5;
// console.log("add 5: " + a);

// let a = 9007199254740991n;
// console.log("value: " + a);
// add1 = a + 1n;
// console.log("value: " + add1);
// add2 = a + 2n;
// console.log("value: " + add2);
// add3 = a + 3n;
// console.log("value: " + add3);
// add4 = a + 4n;
// console.log("value: " + add4);
// add5 = a + 5n;
// console.log("value: " + add5);

// let a = { name: "Ali",}
// console.log(a);
// a.name = "Ahmet";
// console.log(a);

// let a = 12;
// let b = "rutaab";
// console.log(a - b);

// let a = 3
// let b = "3"
// console.log(a + b); // "33"
// console.log(a - b); // 0
// console.log(a * b); // 9
// console.log(a / b); // 1

// let a = { name: "Ali", age: 34 };
// Symbol("name");

// console.log(a);    //ignore this here
// var a = 20;

// var a = undefined;
// a = 20;

// var a = undefined;     //the decleared part moves to the top
// conosle.log(a);        //we call varibale 'a' here
// a = 20;                //varible's value remains at the same place

// console.log(a);
// var a = 20;

// var a = undefined;     //the decleared part moves to the top
// conosle.log(a);        //we call varibale a here
// a = 20;                //varible's value remains at the same place

// console.log(a);
// let a = 20;

// let a = undefined;      //the decleared part moves to the top
// conosle.log(a);         //we call varibale a here
// a = 20;                 //varible's value remains at the same place

// console.log(a);
// const a = 20;

// let a = undefined;      //the decleared part moves to the top
// conosle.log(a);         //we call varibale a here
// a = 20;                 //varible's value remains at the same place

// var a = 20; //
// var a = 30; //
// var a = 40; //

// console.log(a);
// output = 40;

// let a = 20; 
// let a = 30; 

// console.log(a);
// output = `Uncaught SyntaxError: Identifier 'a' has already been declared;`

// let a = 20; 
// a = 30; 

// console.log(a);
// output = 30;

// const a = 20; 
// const a = 30; 
// const a = 50;

// console.log(a);
// output = `Uncaught SyntaxError: Identifier 'a' has already been declared`

// const a = 20; 
// a = 30; 

// console.log(a);
// output = `Uncaught TypeError: Assignment to constant variable;`

// const student = { name: "Ali" };
// console.log(student);
// output = {name: 'Ali'}

// const student = { name: "Ali" };
// student.name = "Bilal";
// console.log(student);
// output = {name: 'Bilal'}

// const student = { name: "Ali" , age: 34 };
// student.name = "Bilal";
// console.log(student);
// output = {name: 'Bilal', age: 34}

// const student = { name: "Ali" };
// student = {};

// //redeclaration

// console.log(student);

// output = `Uncaught TypeError: Assignment to constant variable.`

// let a = 20;                   //global
// {
//      let a = 10;              //blocked
//      console.log(a);
// }
// console.log(a);

// //The output for this snippet is

// 10   //the variable is fetched from block
// 20   //the variable is fetched from global

// {
//    let a = 10;
//    console.log(a);
// }
// console.log(a);


// //The output for this snippet is

// 10                                              //the variable is fetched from block
// Uncaught ReferenceError: a is not defined the  // variable is fetched from global

// var a = 20;
// {
//     var a = 3
//     if (a > 3) {
//         console.log("a is smaller")
//     } else {
//         console.log("a is bigger")
//     }
// }
// console.log(a);

// //The output for this snippet 

// a is bigger     //the variable is fetched from block
// 3               //the variable is fetched from block

// console.log(a);       //start of scope
// //temporal dead zone
// //temporal dead zone
// //temporal dead zone
// let a = 10;           //declaration of variable

// let a = "Rutaab"          //string
// a = 99                    //number
// a = true                  //boolean
// a = undefined             //undefined
// a = null                  //object Ã¢â€ Â known bug
// a = [ ]                   //object
// a = { }                   //object
// a = function( ){ }        //function

// NaN === NaN           // `returns`     false
// [] + []                //`returns`     ""
// {} + []               // `returns`     0
// true + true           // `returns`     2
// null == undefined     // `returns`     true
// 0.1 + 0.2 !== 0.3     // `returns`     true
// typeof NaN           //  `returns`     "number"
// [] == ![]             // `returns`     true
// 3 > 2 > 1             // `returns`     false
// 1(!+[]+[]+![]).length  //`returns`     9

// if (0) {
// console.log("Runs");
// }

// if ("0") {
// console.log("Runs");
// }

// "5" + 1
// Output: "51" 
// //number converted to string

// "5" - 1
// Output: 4 
// //string converted to number

// true + 1
// Output: 2
// //value of true is 1

// null + 1
// Output: 1
// //value of null is 0

// undefined + 1
// Output: NaN
// //undefined is not a number hence NaN

// let a = "Rutaab"
// let a = 99
// let a = true

// console.log(typeof a)
// console.log(typeof b)
// console.log(typeof c)

// a = string
// b = number
// c = boolean

// let age = 17.9;
// let canVote = age >= 18 ? "Yes" : "No";
// console.log(canVote); // Output: "No"


// let a = 10;
// let b = a++; // Postfix increment: b gets the value of a (10), then a is incremented to 11
//  of true is 1

// null + 1
// Output: 1
// //value of null is 0

// undefined + 1
// Output: NaN
// //undefined is not a number hence NaN

// let a = "Rutaab"
// let a = 99
// let a = true

// console.log(typeof a)
// console.log(typeof b)
// console.log(typeof c)

// a = string
// b = number
// c = boolean

// let age = 17.9;
// let canVote = age >= 18 ? "Yes" : "No";
// console.log(canVote); // Output: "No"


// let a = 10;
// let b = a++; // Postfix increment: b gets the value of a (10), then a is incremented to 11
//  of true is 1

// null + 1
// Output: 1
// //value of null is 0

// undefined + 1
// Output: NaN
// //undefined is not a number hence NaN

// let a = "Rutaab"
// let a = 99
// let a = true

// console.log(typeof a)
// console.log(typeof b)
// console.log(typeof c)

// a = string
// b = number
// c = boolean

// let age = 17.9;
// let canVote = age >= 18 ? "Yes" : "No";
// console.log(canVote); // Output: "No"


// let a = 10;
// let b = a++; // Postfix increment: b gets the value of a (10), then a is incremented to 11
//  of true is 1

// null + 1
// Output: 1
// //value of null is 0

// undefined + 1
// Output: NaN
// //undefined is not a number hence NaN

// let a = "Rutaab"
// let a = 99
// let a = true

// console.log(typeof a)
// console.log(typeof b)
// console.log(typeof c)

// a = string
// b = number
// c = boolean

// let age = 17.9;
// let canVote = age >= 18 ? "Yes" : "No";
// console.log(canVote); // Output: "No"


// let a = 10;
// let b = a++; // Postfix increment: b gets the value of a (10), then a is incremented to 11
//  of true is 1

// null + 1
// Output: 1
// //value of null is 0

// undefined + 1
// Output: NaN
// //undefined is not a number hence NaN

// let a = "Rutaab"
// let a = 99
// let a = true

// console.log(typeof a)
// console.log(typeof b)
// console.log(typeof c)

// a = string
// b = number
// c = boolean

// let age = 17.9;
// let canVote = age >= 18 ? "Yes" : "No";
// console.log(canVote); // Output: "No"

// let a = 10;
// let b = a++; // Postfix increment: b gets the value of a (10), then a is incremented to 11

// if (0) {
//     console.log("Runs");
// } if ("0") {
//     console.log("Runs");
// } if (true) {
//     console.log("Runs");
// } else {
//     console.log("Does not run");
// }

// if (0) {
//     console.log("Runs");
// } else if ("0") {
//     console.log("Runs");
// } else if (true) {
//     console.log("Runs");
// } else {
//     console.log("Does not run");
// }

// function controlflowfinalthought() {
//     if ("code inside block but no function") {
//         return "use else-if ";
//     } else if ("code inside block with function") {
//         return "use if else with return";
//     }
// }

// {
// if code 
// }




