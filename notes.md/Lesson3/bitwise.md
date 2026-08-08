> <h1><center>BITWISE OPERATORS (Know-How Only)

*Bitwise operators work on the binary (bit) representation of numbers — the 0s and 1s underneath the number itself, not the number's value directly.*

> **NOTE:** *this is just a **know-how** topic, not something to master right now. Goal: recognize it if you see it in someone else's code — that's it.*

```js
5   // binary: 101
1   // binary: 001
```

**Bitwise operators — very rarely used in everyday JavaScript**

```js
&    //Bitwise AND
|    //Bitwise OR
^    //Bitwise XOR
~    //Bitwise NOT
<<   //Left shift
>>   //Right shift
>>>  //Unsigned right shift
```

> **Where you might actually see them**

`Mostly in permission/flag systems, low-level performance code, or certain game/graphics and algorithm-heavy code. Everyday web dev (sites, apps, APIs) can go a long time without ever needing one.`

> **Don't confuse with Logical Operators**

`& and | look almost identical to && and || (Lesson 3 — Logical Operators), but they are NOT the same thing.`

```js
true && false   // logical AND -> false
5 & 1           // bitwise AND -> 1 (binary math, not true/false)
```

`Pro-tip:` if you spot a single `&` or `|` in real code, pause — it's likely bitwise, not logical. Context will tell you.

> **Takeaway**

`You don't need to memorize any of this yet. Just remember these symbols exist, they operate on binary — not true/false logic — and you can look them up properly whenever a real need for them shows up.`