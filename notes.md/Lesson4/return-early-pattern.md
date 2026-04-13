> <h1><center> Return early Pattern
*`Return early Pattern` logic pattern where you check for a condition and if it is true you return a value or exit the function early, otherwise you continue with the rest of the code. It is used to avoid nested if statements and to make the code more readable. It only works inside a function.*

```js
function (condition) {
    if (condition1) return true; // Return early if the condition1 is true
    if (condition2) return true; // Return early if the condition2 is true
    return false; // Return false if the condition1 & condition2 is false
}
```

> **MORE COMPLEX EXAMPLE:**

```js
// AUTOMATED ELECTRIC SWITCH FOR HOUSE

//  Independent Variables (The "Roots")
let isGridOn = false;
let solarBatteryLevel = 50;
let isGeneratorFueled = true;
let currentTemp = 34;

// Creating a simple function
function power(isGeneratorFueled,isGridOn,solarBatteryLevel,currentTemp){
    // The guard clause as safety first priority
    if (currentTemp > 45) return "SYSTEM OVERHEAT: Shutting down all power";
    // Using grid for power 
    if (isGridOn) return "POWER SOURCE: K-Electric (Saving Battery)";
    // If grid has no power switch to solar if the battery > 20%
    if (!isGridOn && solarBatteryLevel > 20) return "POWER SOURCE: Solar " + solarBatteryLevel + "%";
    // If sola fails switch to generator if it has fuel
    if (!isGridOn && isGeneratorFueled ) return "POWER SOURCE: Generator";
    // If all condition fails return
    return "TOTAL BLACKOUT";
}
console.log(power(isGeneratorFueled,isGridOn,solarBatteryLevel,currentTemp));
```

> **EXPLANATION:**
- The first `if` checks for the if the temperature of the electrical system is not > 45, if greater safety clause triggers imediately.
- The second `if` check if the grid is on, if true the electricty switches to K-Electric imediately.
- The third `if` check if the grid is off, if true it then checks solar battery level > 20% switches to Solar imediately.
- The fourth `if` check if the grid is off, if true it then checks generator and if it has fuel switches to Generator imediately.
- If the Grid is off, Battery is dead (<=20), and Generator has no fuel, return "TOTAL BLACKOUT".