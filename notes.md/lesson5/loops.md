> <h1><center>Loops

`Loops` are a way to execute the code muliple times without writing it multiple times, like if we want to print (1-10) we dont have to write from 1-10 instaed we will use loops to do that. 
```js
//print 1-10 (without using loops)
console.log(1);
console.log(2);
console.log(3);
console.log(4);
console.log(5);
console.log(6);
console.log(7);
console.log(8);
console.log(9);
console.log(10);
output: 1 2 3 4 5 6 7 8 9 10

//print 1-10 (using loops)
for (let i = 1; i <= 10; i++) {
    console.log(i);
}
output: 1 2 3 4 5 6 7 8 9 10

//Q. Now why the loops is best?
//A. Imagine we were given to write 1 - 10. We wrote it without loops. Its okay right! Until its said that you have to write to 1 - 1000. NOw thats a problem. This is why we use loops, by just altering the 2 points "starting" abd "ending" we are good to go.
```

>Examples
- for
- while
- do while
- foreach
- for in
- for of

> `for loop`
is a loop that is used to execute the block of code when these conditions are met.
- we know the starting point.
- we know the ending point.
- we know that how will it proceed from starting to ending point. (increment or decrement)
```js
for(start; end; increment/decrement) {
    // code to be executed
}
```

> `while-loop`
is a loop that is used to execute the block of code when these conditions are met.
- we know the starting point.
- we don't know the ending point or to stop on a certain cndition that we don't know when will be met.
- we know that how will it proceed from starting to ending point. (increment or decrement) 
```js
start
while (condition) {
    // code to be executed
    increment/decrement
}
```

> `do while loop`