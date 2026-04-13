> <h1><center>(typeof) OPERATOR


*To determine datatype of any value in javascript we use typeof operator.*


> <h2>Examples

1. _typeof "Rutaab"_                `string`
2. _typeof 99_                      `number`
3. _typeof true_                    `boolean`
4. _typeof undefined_               `undefined`
5. _typeof null_                    `object â† known bug`
6. _typeof [  ]_                    `object`
7. _typeof {  }_                    `object`
8. _typeof function(  ){  }_        `function`


> <h3>Here is a small snippet to show how it works!

**variables**
```js
let a = "Rutaab"
let a = 99
let a = true
```

**check typeof**
```js
console.log(typeof a)
console.log(typeof b)
console.log(typeof c)
```

**output**
```js
a = string
b = number
c = boolean
```
