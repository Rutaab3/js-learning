// Try to write a script where you use an Early Return to catch "Garbage Input" (like if the user types "banana" instead of "rock"). If you can handle the "Stupid User" input gracefully, you move to a 10/10.
//  my version 
// let user = "rockr";
// let computer = "paper";
// function rps() {
//     if(user === "rock" && computer === "scissor") return "user";
//     if(user === "paper" && computer === "rock") return "user";
//     if(user === "scissor" && computer === "paper") return "user";
//     if(computer === "rock" && user === "scissor") return "computer";
//     if(computer === "paper" && user === "rock") return "computer";
//     if(computer === "scissor" && user === "paper") return "computer";
//     if(user === computer) return "tie";
//     else return "stupid user";
// }
// console.log("winner: " + rps());
// gemni version 
// const user = "paper";
// const computer = "scissor";
// function rps() {
//     // 1. The Guard: Check for "rockr" or other typos
//     const beats = {
//         rock: "scissor",
//         paper: "rock",
//         scissor: "paper"
//     };
//     if (!beats[user]) return "Error: Stupid User (Invalid Move)"; // Input check
//     // 2. The Tie: Catch it early
//     if (user === computer) return "It's a tie!";
//     // 3. The "Magic" Line: No more multiple 'if' statements!
//     // We just check if the computer's move is the one the user beats.
//     if (beats[user] === computer) {
//         return "User wins!";
//     }
//     return "Computer wins!";
// }
// console.log(rps());

// let user = "rock";
// let computer = "paper"
// function rps(user, computer) {
//     // 1. Guard Clause: Use Logical Operators to catch bad input here
//     if (user != "rock" && user !== "paper" && user !== "scissor") return "stupid user!";
//     // 2. Tie Pattern: Handle user === computer
//     if (user === computer) return "tie";
//     // 3. Win Patterns: Use your early returns
//     if (user === "rock" && computer === "scissor") return user;
//     if (user === "paper" && computer === "rock") return user;
//     if (user === "scissor" && computer === "paper") return user;
//     else return computer
// }
// console.log("winner: " + rps(user,computer));

// Input: Two variables: score (0-100) and attendance (0-100).
// Guard Clause: If score is greater than 100 or less than 0, return "Invalid Score".
// The "Pass" Logic: To pass, a student needs a score of 50 or higher AND attendance of 75 or higher.
// The "Incentive" Logic: If they have a score of 90 or higher, they pass regardless of attendance (Early Return).
// Output: Return "Pass", "Fail", or "Invalid Score".
// Your Requirements:
// Wrap this in a function called checkStatus(score, attendance).
// Call the function using variables and console.log the result.
// Brutal Requirement: Use the Logical NOT (!) or Comparison Operators correctly so you don't repeat the || mistake from the RPS game.
// Show me the code. Be careful with your parameters—don't leave the parentheses empty when you call it!
// const score = 90;
// const attendance = 74;
// function school() {
//     if(score < 0 || score > 100) return "invalid score";
//     if(attendance < 0 || attendance > 100) return "invalid attandance";
//     if(score >= 90 ) return "pass";
//     if(score >= 50 && attendance >= 75) return "pass";
//     else return "fail"
// }
// console.log(score,attendance);
// console.log(school(score,attendance));

// The Task: The "VIP Club Entry"
// You are writing a function for a club's security system.
// The Rules:
// Function Name: checkEntry(age, hasTicket, isVip)
// Guard Clause: If age is less than 0 or greater than 120, return "Invalid Age".
// The "Early Return" VIP: If isVip is true, return "Access Granted: VIP" (They don't need a ticket and age doesn't matter for VIPs in this club).
// The "Standard" Rule: To enter, a person must be 18 or older AND have a ticket (hasTicket === true).
// The Output: Return "Access Granted", "Access Denied", or "Invalid Age".
// console.log("VIP Club");
// let isvip = true;
// let age = 17;
// let ticket = true; 
// function club(isvip,age,ticket){
//     if (age <= 18) return "minor";
//     if (isvip === true) return "Access granted";
//     if (age < 0 || age > 120) return "in-valid age";
//     if (age >= 18 && ticket === true) return "Access granted";
//     else return "i am a begineer";
// }
// console.log(club(isvip,age,ticket));

// stone paper scissor game
// let user = "rock";
// let computer = "rock";
// function sps() {
//     if (user === computer) return "tie";
//     if(user === "rock" && computer === "scissor") return "user";
//     if(user === "paper" && computer === "rock") return "user";
//     if(user === "scissor" && computer === "paper") return "user";
//     else return "computer";
// }
// console.log(sps());
// // stone paper scissor game
// let user1 = "paper";
// let computer1 = "rock";
// function sps1() {
//     if (user1 === computer1) return "tie";
//     if(user1 === "rock" && computer1 === "scissor") return "user1";
//     if(user1 === "paper" && computer1 === "rock") return "user1";
//     if(user1 === "scissor" && computer1 === "paper") return "user1";
//     else return "computer1";
// }
// console.log(sps1());
// // stone paper scissor game
// let user2 = "scissor";
// let computer2 = "rock";
// function sps2() {
//     if (user2 === computer2) return "tie";
//     if(user2 === "rock" && computer2 === "scissor") return "user2";
//     if(user2 === "paper" && computer2 === "rock") return "user2";
//     if(user2 === "scissor" && computer2 === "paper") return "user2";
//     else return "computer2";
// }
// console.log(sps2());

// 1. The Logic (The "Brain")
// function checkEntry(isVip, age, hasTicket) {
//     // Validation: Catch crazy numbers first
//     if (age < 0 || age > 120) return "❌ Invalid Age";
//     // Special Rule: VIPs skip the lines
//     if (isVip === "yes") return "✅ Access Granted: Welcome VIP!";
//     // Standard Rule: 18+ and must have a ticket
//     if (age >= 18 && hasTicket === "yes") {
//         return "✅ Access Granted: Enjoy the party!";
//     } else {
//         return "🚫 Access Denied: You must be 18+ and have a ticket.";
//     }
// }
// // 2. The Inputs (The "Console" Prompts)
// // We use prompt() to get data from the user
// let userAge = prompt("How old are you?");
// let userVipStatus = prompt("Are you a VIP? (yes/no)").toLowerCase();
// let userTicketStatus = prompt("Do you have a ticket? (yes/no)").toLowerCase();
// // 3. The Execution (Connecting the dots)
// // We "feed" the prompt answers into our function
// let result = checkEntry(userVipStatus, userAge, userTicketStatus);
// // 4. The Output
// console.log("Status:", result);
// alert(result); // This shows a pop-up with the final answer

/* LEARNING NOTES:
   1. Validation: Use OR (||) to catch any single out-of-bounds error.
   2. Range: Use > 100 instead of >= 100 to allow the perfect score of 100.
   3. DRY Principle: Calculate percentage once at the top to save memory/space.
*/

// let lab = 2;
// let score = 40;
// let attendance = 100;
// let total = score + attendance;
// let percentage = (total / 200) * 100 + "%";

// // Check Location first
// if (lab !== 2) {
//     console.log("You are in the wrong lab");
// } 
// // Catch invalid Attendance (Using OR)
// else if (attendance < 0 || attendance > 100) {
//     console.log("invalid attendance(0-100) Attendance: " + attendance);
// } 
// // Catch invalid Score (Using OR)
// else if (score < 0 || score > 100) {
//     console.log("invalid score(0-100) score: " + score);
// } 
// // Requirement: Both must be low for a direct F
// else if (score <= 40 && attendance <= 40) {
//     console.log("Grade:F " + "Marks:" + total + " Percentage:" + percentage);
// } 
// // Grading Hierarchy (Top to Bottom)
// else if (total >= 190) {
//     console.log("Grade:A++ " + " Marks:" + total + " Percentage:" + percentage);
// } 
// else if (total >= 175) {
//     console.log("Grade:A+ " + " Marks:" + total + " Percentage:" + percentage);
// } 
// else if (total >= 155) {
//     console.log("Grade:B " + " Marks:" + total + " Percentage:" + percentage);
// } 
// else if (total >= 135) {
//     console.log("Grade:C " + " Marks:" + total + " Percentage:" + percentage);
// } 
// else if (total >= 99) {
//     console.log("Grade:D " + " Marks:" + total + " Percentage:" + percentage);
// } 
// // Fallback
// else {
//     console.log("Grade:E " + " Marks:" + total + " Percentage:" + percentage);
// }

// let aloo = 3;
// let timatar = 4;
// let pyaz = 5;

// if(aloo === 3){
//     if(timatar === 4){
//         if(pyaz === 5){
//             console.log("aloo is 3, timatar is 4, pyaz is 5");
//         }
//     }
// }else{
//     console.log("aloo is not 3, timatar is not 4, pyaz is not 5");
// }

// Write a program for an ATM machine. You need to handle a withdrawal request based on these specific rules:
// Variables to start with:
// balance = 1000
// isAccountActive = true
// withdrawalAmount = 200 (This is the amount the user wants)
// enteredPin = 1234
// correctPin = 1234
// The Rules:
// First, check if the PIN is correct. If not, stop and say "Wrong PIN."
// Check if the Account is active. If not, stop and say "Account deactivated."
// Check if the Withdrawal Amount is a positive number (greater than 0). If not, say "Invalid amount."
// Check if the user has Enough Money in their balance. If not, say "Insufficient funds."
// If all conditions are met:
// Deduct the money from the balance.
// Log: "Success! New balance is: [remaining balance]"
// Constraints:

// let balance = 1000;
// let isAccountActive = true;
// let withdrawalAmount = 200;
// let enteredPin = 1234;
// let correctPin = 1234;

// function atm(balance,isAccountActive,withdrawalAmount,enteredPin,correctPin){
// if(correctPin !== enteredPin) return "Wrong Pin";
// if(withdrawalAmount < 0) return "Invalid amount"
// if(balance <  withdrawalAmount) return "Insufficient funds";
// if(isAccountActive === false) return "Account deactivated";
// else return "Success! New balance is: Rs" + (balance - withdrawalAmount);
// }

// console.log(atm(balance,isAccountActive,withdrawalAmount,enteredPin,correctPin))


// Understood. Let's combine everything: nested if/else and logical operators (&&, ||).
// This task is designed to be a perfect addition to your notes.
// 🏆 The Challenge: The "University Admission Bot"
// You are writing the logic for an automated university admission system. It decides if a student is Accepted, Waitlisted, or Rejected.
// Variables to start with:
// gpa = 3.5;
// testScore = 1200;
// isExtraCurricular = true;
// The Rules:
// The Elite Check: If the gpa is 3.8 or higher AND the testScore is 1400 or higher, the student is Accepted.
// The Standard Check: If the student didn't meet the Elite Check, you must check this:
// If the gpa is 3.0 or higher AND (testScore is 1100 or higher OR isExtraCurricular is true), the student is Waitlisted.
// The Default: In all other cases, the student is Rejected.
// let gpa = 3.8;
// let testScore = 1000;
// let isExtraCurricular = true;
// if (gpa >= 3.8 && testScore >= 1400) {
//     console.log("the student is accepted")
// }
// else {
//     if (gpa >= 3.0 && (testScore >= 1100 || isExtraCurricular === true)) {
//         console.log("the student is waitlisted")
//     }
//     else
//         console.log("the student is rejected");
//     }


// The Variables
// hasKeycard (boolean)
// passcode (number)
// isHacker (boolean)
// securityLevel (1, 2, or 3) — 1 is lowest, 3 is highest.
// The Brutal Rules
// Hacker Check: If isHacker is true, return "ALARM: Security Breach!" immediately.
// Keycard Check: If they don't have a keycard, return "Access Denied: No Keycard".
// Passcode Check: The correct passcode is 9999. If it's wrong, return "Access Denied: Wrong Passcode".
// Level Check (The Logic Puzzle):
// If their securityLevel is 3, they get in no matter what (as long as the PIN was right).
// If their securityLevel is 2, they only get in if the passcode is correct AND it is daytime (isDaytime = true).
// If their securityLevel is 1, they are always rejected from this specific vault, even if everything else is perfect.
// The Constraints for your Brain:
// Use the Early Return Pattern (no long if/else/else/else chains).
// Make the "Success" message the very last line.
// let hasKeycard = true;
// let passcode = 9999;
// let isHacker = false;
// let isDaytime = true;
// let securityLevel = 3;
// function vault(hasKeycard,passcode,isHacker,isDaytime,securityLevel) {
//     if (isHacker) return "ALARM: Security Breach!";
//     if (!hasKeycard) return "Access Denied: No Keycard";
//     if (passcode !== 9999) return "Access Denied: Wrong Passcode";
//     if (securityLevel === 1) return "Access Denied LVL1"
//     if (securityLevel === 2 && !isDaytime === true) return "Access Granted LVL2"
//     return "Access Granted"
// }
// console.log(vault(hasKeycard,passcode,isHacker,isDaytime,securityLevel));

// The Scenario
// You are coding the automated switch for a house in Central. The house has Solar, a Generator, and the Main Grid (K-Electric).
// The Variables
// isGridOn (boolean)
// solarBatteryLevel (number, 0 to 100)
// isGeneratorFueled (boolean)
// currentTemp (number)
// The Brutal Rules (Use Early Return!)
// Safety First: If currentTemp > 45, the system is too hot. Return "SYSTEM OVERHEAT: Shutting down all power".
// The Priority: * If isGridOn is true, return "Power Source: K-Electric (Saving Battery)".
// If Grid is OFF, check Solar: If solarBatteryLevel is above 20, return "Power Source: Solar".
// If Grid is OFF AND Solar is below 20, check Generator: If isGeneratorFueled is true, return "Power Source: Generator".
// The Failure: If the Grid is off, Battery is dead (<=20), and Generator has no fuel, return "TOTAL BLACKOUT".
// let isGridOn = false;
// let voltage = "220v";
// let solarBatteryLevel = 30;
// let isGeneratorFueled = true;
// let generatorFuel = 10;
// let currentTemp = 34;
// function power(isGeneratorFueled,isGridOn,solarBatteryLevel,currentTemp){
//     if (currentTemp > 45) return "SYSTEM OVERHEAT: Shutting down all power";
//     if (isGridOn) return  "POWER SOURCE: K-Electric (Saving Battery)";
//     if (!isGridOn && solarBatteryLevel > 20) return "POWER SOURCE: Solar " + solarBatteryLevel + "%";
//     if (!isGridOn && isGeneratorFueled ) return "POWER SOURCE: Generator";
//     return "TOTAL BLACKOUT";
// }
// console.log(power(isGeneratorFueled,isGridOn,solarBatteryLevel,currentTemp));

// let Flavour = "FL00297";

// switch (Flavour) {
//     case "FL00356":
//         console.log("Chocolate");
//         break;
//     case "FL00893":
//         console.log("Strawberry");
//         break;
//     case "FL00396":
//         console.log("Vanilla");
//         break;
//     case "FL00948":
//         console.log("Pista");
//         break;
//     case "FL00297":
//         console.log("Chocolate & Strawberry");
//         break;
//     case "FL00925":
//         console.log("Chocolate & Vanilla");
//         break;
//     case "FL003f56":
//         console.log("Chocolate & Pista");
//         break;
//     default:
//         console.log("Flavour unavaiable");
// }

// The Task: The "Karachi Cafe" Order System
// You are coding the touch-screen for a cafe. You need to handle the order based on a Size Code.
// Variables to use:
// sizeCode (String)
// wantsSugar (Boolean)
// The Rules (Use Switch Case):
// "S": Log "Small Tea - 50 PKR".
// "M": Log "Medium Tea - 100 PKR".
// "L": Log "Large Tea - 150 PKR".
// "XL" AND "XXL": Group these together (Fall-through) to log "Family Pot - 500 PKR".
// Default: Log "Invalid Selection".
// The "Elite" Twist (Boolean Check):
// Inside the "L" (Large) case only, add one simple line that checks wantsSugar.
// If true, log "Adding extra sugar...".
// (You can use a simple if or a ternary here, since it's a specific check inside that one case).
// Go for it. No hints this time. show me how you handle the "Family Pot" grouping!

