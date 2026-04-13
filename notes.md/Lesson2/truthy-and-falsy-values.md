> <h1><center>Truthy and Falsy Values


`Falsy have value of = 0`
`Truthy have value of = 1`


> <h2>Falsy values

1.	0	            `Number`
2.	0	            `Number`
3.	0n	            `BigInt`
4.	""	            `String`
5.	null	        `Object`
6.	FALSE	        `Boolean`
7.	undefined       `Undefined`
8.	NaN	            `Number`
9.  document.all    `undefined` *itz actually an object it lies about it type*


`Everything else is truthy, including:`
__"0" , "false" , [ ] , { } , function( ){ }__

`"0" is a number specially 0 = falsy`

```js
if (0) {
console.log("Runs");
}
```

`"0" is a non-empty string = truthy`

```js
if ("0") {
console.log("Runs");
}
```

`Bonus: Use !! to find whether the value is truthy or falsy`

```js
!!  0   = false 
!! "0"  = true
```



> <h2>Q. Why does this `document.all` exist?

`A.`  **This is a "willful violation" of the JavaScript specification to maintain backward compatibility with the "Browser Wars" era (Internet Explorer vs. Netscape).**

1. *`The History:` Back in the day, document.all was a proprietary way for Internet Explorer to access DOM elements.*
2. *`The Conflict:` Developers would write code like if **(document.all) { IE code } else { standard code }** to detect if the user was on IE.*
3. *`The Fix:` When modern browsers started supporting document.all to be compatible with old websites, they didn't want to trigger those old "IE-only" code paths.*
4. *`The Result:` Browsers made document.all falsy so that those old if checks would fail, forcing the browser to use the modern, standard code instead.*
