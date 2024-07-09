---
title: NaN历史遗留问题
date: 2023-12-8 12:24:4
categories:
- JS
tags:
- JS
- NaN问题
---

#NaN历史遗留问题
由于历史遗留问题，NaN的内部做了hash处理，使得每一次NaN返回的结果都不同。
```js
NaN === NaN //false;
Object.is(NaN,NaN) //true
//除此之外，延申:
+0 === -0 //返回true
Object.is(+0 , -0) //返回false
```