> <h1><center> if else
*`if else` is a logic pattern where you check for a condition and execute different blocks of code based on whether the condition is true or false.*
```js   
if (condition) {
    console.log("answer");
} else {
    console.log("answer1");
}
```

> **MORE COMPLEX EXAMPLE:**
```js
// --- UNIVERSITY ADMISSION LOGIC ---

//  Independent Variables (The "Roots")
let gpa = 3.8; 
let testScore = 1000;
let isExtraCurricular = true;

// The Elite Gate (High Bar)
// Logic: Needs BOTH high GPA AND high Test Score.
if (gpa >= 3.8 && testScore >= 1400) {
    console.log("the student is accepted");
} 
//  The Fallback (Safety Net)
else {
    // The Standard Gate (Nested inside the else)
    // Logic: Needs GPA of 3.0+ AND (either a good score OR activities).
    if (gpa >= 3.0 && (testScore >= 1100 || isExtraCurricular === true)) {
        console.log("the student is waitlisted");
    } 
    // The Default (If all gates are locked)
    else {
        console.log("the student is rejected");
    }
}

/* NOTE
   - This uses "Nested If/Else" to create a hierarchy.
   - The computer stops at the FIRST 'true' path it finds.
   - Independent Variables: gpa and testScore don't affect each other, 
     but the BOSS (the if statement) looks at both to decide.
*/
```
> **EXPLANATION:**
- The first `if` checks for the highest standard (Elite Gate). If true, it accepts the student immediately.
- If the first condition is false, it goes to the `else`, which contains another `if` (Standard Gate) that checks for a lower standard. If this is true, it waitlists the student.
- If both conditions are false, it goes to the final `else`, which rejects the student.
