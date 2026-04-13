> <h1><center>else-if

*`else-if` is a logic pattern where you check for multiple conditions and execute different blocks of code based on which condition is true. It is used inside block. It is best for ranges or complex logic (e.g., score > 90).*

```js
let score = 85;
if (score > 90) {
    console.log("A+");
} else if (score > 80) {
    console.log("B");
} else if (score > 70) {
    console.log("C");
} else if (score > 60) {
    console.log("D");
} else {
    console.log("F");
}

//OUTPUT: B
```

> **MORE COMPLEX EXAMPLE:**
```js   
//  STUDENT REPORT CARD GENERATOR

// Independent Variables (The "Roots")
let lab = 2;
let score = 40;
let attendance = 100;
let total = score + attendance;
//  DRY Principle: Calculate percentage once at the top to save memory/space. 
let percentage = (total / 200) * 100 + "%";

// Check Location first
if (lab !== 2) {
    console.log("You are in the wrong lab");
} 
// Catch invalid Attendance (Using OR)
else if (attendance < 0 || attendance > 100) {
    console.log("invalid attendance(0-100) Attendance: " + attendance);
} 
// Catch invalid Score (Using OR)
else if (score < 0 || score > 100) {
    console.log("invalid score(0-100) score: " + score);
} 
// Requirement: Both must be low for a direct F
else if (score <= 40 && attendance <= 40) {
    console.log("Grade:F " + "Marks:" + total + " Percentage:" + percentage);
} 
// Grading Hierarchy (Top to Bottom)
else if (total >= 190) {
    console.log("Grade:A++ " + " Marks:" + total + " Percentage:" + percentage);
} 
else if (total >= 175) {
    console.log("Grade:A+ " + " Marks:" + total + " Percentage:" + percentage);
} 
else if (total >= 155) {
    console.log("Grade:B " + " Marks:" + total + " Percentage:" + percentage);
} 
else if (total >= 135) {
    console.log("Grade:C " + " Marks:" + total + " Percentage:" + percentage);
} 
else if (total >= 99) {
    console.log("Grade:D " + " Marks:" + total + " Percentage:" + percentage);
} 
// Fallback
else {
    console.log("Grade:E " + " Marks:" + total + " Percentage:" + percentage);
}

//output: 
Grade:C  Marks:140 Percentage:70%
```

> **EXPLANATION:**
- The code first checks if the student is in the correct lab. If not, it outputs an error message.
- Then it validates the attendance and score using OR conditions to catch any single out-of-bounds error.
- If both score and attendance are low (<= 40), it directly assigns an F grade.
- Finally, it uses a series of else-if statements to determine the grade based on the total marks, with a fallback else for any cases that don't meet the previous conditions.

