---
title: new关键字
date: 2023-8-10 12:24:4
categories:
- JS
tags:
- new
- JS
---
```js
const mynew = function(constroctor,...argus){
    const obj = Object.create(constroctor.prototype)
    const res = obj.apply(obj,argus);
    return (res && typeof res === 'object') ?res:obj;
}
```

