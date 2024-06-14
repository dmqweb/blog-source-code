---
title: 手写JS源码
date: 2023-6-2 12:24:4
categories:
- 手写JS源码
tags:
- 手写JS源码
- JS底层
---
# new关键字

**new关键字实现分为三步：**

1、根据构造函数的原型创建新的对象
2、执行构造函数，绑定this指向为新对象，传入参数
3、返回执行后的结果
```js
function myNew(constructor,...args){
    //创建对象，原型为构造函数的原型对象
    const obj = Object.create(constructor.prototype);
    //执行构造函数，传入创建的对象和参数
    const res = constructor.apply(obj,args); //注意apply方法是函数对象的方法，普通对象不可用
    return (res && typeof res === 'object')?res:obj;    
}
function A (){
    this.name='sdjf'
}
const ab = myNew(A)
console.log(ab);
```

# bind方法

```js
//实现bind函数,bind函数将this绑定到指定对象上,返回一个新的函数
Function.prototype.myBind = function () {
  const args = Array.prototype.slice.call(arguments,0); //arguments形参数组是类数组对象
  const targetObj = args.shift();
  const self = this;
  return function () {
    return self.apply(targetObj,args)
  }
}
```

# 闭包的简单使用

```js
//闭包隐藏数据,只提供API操作
function createCache() {
  const cache = {};
  return {
    get(key){
      return cache[key]
    },
    set(key,val){
      cache[key] = val;
    }
  }
}
```

