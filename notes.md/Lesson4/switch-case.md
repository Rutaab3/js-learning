> <h1><center>switch case
*`switch case` is a logic pattern where you check for multiple conditions and execute different blocks of code based on which condition is true. It is used inside block.*
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
    default:
        console.log("answer7");
}
```

> **MORE COMPLEX EXAMPLE:**

```js
// Karachi Cafe Order System

// .toUpperCase() ensures the logic works even if input is "xl" or "Xl" (Bulletproofing)
let sizeCode = "xl".toUpperCase(); 
let wantsSugar = false;

switch(sizeCode) {
    
    case "S":
        console.log("Small Tea - 50 PKR");
        break; // break stops the code from "bleeding" into the next case

    case "M":
        console.log("Medium Tea - 100 PKR");
        break;

    case "L":
        console.log("Large Tea - 150 PKR");
        // Nesting logic: A Ternary operator handles a sub-condition inside a case
        wantsSugar ? console.log("Adding extra sugar...") : false;
        break;

    // FALL-THROUGH LOGIC: 
    // Since there is no code or break under "XXL", it "falls through" to "XL".
    // This allows multiple cases to share the same outcome.
    case "XL":
    case "XXL":   
        console.log("Family pot - 500 PKR");
        break;

    default:
        // Acts like the "else" in an if-statement for unknown inputs
        console.log("Invalid Size Selection");
}
```
> **EXPLANATION:**
- The `switch` statement evaluates the `sizeCode` variable and compares it against each `case`.
- If `sizeCode` is "S", it logs "Small Tea - 50 PKR" and then `break` prevents further cases from executing.
- If `sizeCode` is "M", it logs "Medium Tea - 100 PKR" and then `break` prevents further cases from executing.
- If `sizeCode` is "L", it logs "Large Tea - 150 PKR" and then checks if `wantsSugar` is true to log "Adding extra sugar...". The `break` then prevents further cases from executing.
- If `sizeCode` is "XXL" or "XL", it logs "Family pot - 500 PKR" and then `break` prevents further cases from executing.
- If `sizeCode` does not match any of the cases, the `default` case executes, logging "Invalid Size Selection".