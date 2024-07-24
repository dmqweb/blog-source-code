---
title: forEach
date: 2023-7-2 12:24:4
categories:
- JS
tags:
- JS
- forEach
---

手动实现一个类似forEach的效果:
前端开发过程中经常会遇到使用forEach的场景,那么它的原理究竟是什么呢?下面我手动写了一个类似的效果,不同的是函数可能会改变原始值.

代码如下:

```javascript
function myEach(obj,fn,context=window){
    //类型判断
    if(typeof obj !== 'object'){
        throw ('必须要是对象')
    }
    if(obj === null){
        throw ('必要不为空对象')
    }
    if(typeof fn !== 'function'){
        throw ('第二个参数，必须要是函数')
    }
    //如果是数组
    if(isArrayLike(obj)){
        for(let i=0;i<obj.length;i++){
            let res = fn.call(context,obj[i],i);
            //res为什么会为false（如果函数内部return了，那么这里就需要跳出循环）
            if(res===false){
                break;
            }
            //如果返回值不是undefined,有返回值,就替换掉这一项
            if(res !== undefined){
                obj[i] = res;                
            }
        }
    }else{
        //如果是对象
        for(let key in obj){
            if(!obj.hasOwnProperty(key)) break;
            const res = fn.call(context,obj[key],key);
            if(res ===false){
                break;
            }
            if(res !==undefined){
                obj[key] = res;
            }
        }
    }
    return obj;
}
```