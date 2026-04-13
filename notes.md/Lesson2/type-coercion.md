> <h1><center>Type Coercion (Auto-Conversion)


*JavaScript auto-converts types in some operations as*


> <h2>Examples

```js 
"5" + 1
Output: "51" 
//number converted to string
```

__this happens bcz the `+` operator has two operations to perform and when it detects any `"string"` on either side it performs concatenation instead of addition__

```js
"5" - 1
Output: 4 
//string converted to number
```
__now here the `-` operator has only one operation to perform so it convert `"string"` to number and perform the substraction__

```js
true + 1
Output: 2
//value of true is 1
```

```js
null + 1
Output: 1
//value of null is 0
```

```js
undefined + 1
Output: NaN
//undefined is not a number hence NaN
```