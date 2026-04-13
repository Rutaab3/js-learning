> <h1><center>Logic Patterns

`Logic pattrens` is a way to create an order or a set of rules for a program to give the perfect outcome with managing steep edge cases where multiple outcomes are possible, 
1. What you need according to the situation/data/input,   
2. What you need to the show as an output according situation/data/input,   
3. What you need to run or execute according situation/data/input,
its like a trafic light contorlling the flow of the program

>Examples

- if else
- else-if
- switch case
- return early pattern

> `if else`
it is a simple logic pattern where you check for a condition and if it is true you execute a block of code, otherwise you execute another block of code
```js   
if (condition) {
    console.log("answer1"); // Execute this block of code if the condition is true
} else {
    console.log("answer2"); // Execute this block of code if the condition is false
}
```

> `else-if`
it is a logic pattern where you check for multiple conditions and execute different blocks of code based on which condition is true. It is used inside block.
```js   
if (condition) {
    console.log("answer");
} else if (condition1) {
    console.log("answer1");
} else if (condition2) {
    console.log("answer2");
} else if (condition3) {
    console.log("answer3");
} else {
    console.log("answer4");
}
```

> `switch case`
it is a logic pattern where you check for multiple conditions and execute different blocks of code based on which condition is true. It is used inside block.
```js
switch (condition) {
    case 1:
        console.log("answer");
        break;
    case 2:
        console.log("answer1");
        break;
    case 3:
        console.log("answer2");
        break;
    case 4:
        console.log("answer3");
        break;
    case 5:
        console.log("answer4");
        break;
    case 6:
        console.log("answer5");
        break;
    case 7:
        console.log("answer6");
        break;
    default:
        console.log("answer7");
}
```

> `return early pattern`
it is a logic pattern where you check for a condition and if it is true you return a
value or exit the function early, otherwise you continue with the rest of the code. It is used to avoid nested if statements and to make the code more readable.
```js
function (condition) {
    if (condition) {
        return true; // Return early if the condition is true
    }
    return false; // Return false if the condition is false
}
```

> `PRO-TIPS:`

- `if-else:` Best for binary choices (Yes/No). Works for any data type.

- `else-if:` Best for ranges or complex logic (e.g., score > 90).

- `switch:` Best for specific, fixed values (e.g., color === "red"). Much cleaner than long else-if chains.

- `return early:` A function-only pattern. Catch errors/edge cases at the top to keep the main logic "flat" and readable.