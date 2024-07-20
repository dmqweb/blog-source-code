---
title: JS手写题
date: 2023-6-2 12:24:4
categories:
- JS手写题
tags:
- JS手写题
- 手写JS源码
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
# 判断数据类型
 ```js
function myTypeOf(obj) {
    // 使用toString
        const typeMap = {
            "[object Object]": "Object",
            "[object Array]": "Array",
            "[object String]": "String",
            "[object Number]": "Number",
            "[object Boolean]": "Boolean",
            "[object Function]": "Function",
            "[object Null]": "Null", // 注意这里是 "Null" 而不是 "null"
            "[object Undefined]": "Undefined", // 注意这里是 "Undefined" 而不是 "undefined"
            "[object Symbol]": "Symbol",
            "[object BigInt]": "BigInt"
        };
    return typeMap[Object.prototype.toString.call(obj)];
    // 或者根据类型进行判断
    switch (typeof obj) {
        case "object":
            if(Array.isArray(obj)) return "Array"
            if(obj === "null") return "null";
            return "Object";
        case "number":
            return "Number";
        case "string":
            return "String";
        case "undefined":
            return "undefined";
        case "bigint":
            return "BigInt";
        case "boolean":
            return "Boolean";
        case "function":
            return "Function";
        case "symbol":
            return "Symbol";
        default:
            return "unknown"
    }
}
```
# 数组去重
 ```js
function unique(arr) {
    return new Array(...new Set(arr))
}
```
# 数组扁平化(扁平一层)
 ```js
function arrFlat(arr) {
    if(arr.flat){
      return arr.flat(); //Array.flat方法默认扁平一层
    }
    // 兼容es5版本：
    const res = [];
    arr.forEach(item=>{
        if(Array.isArray(item)) res.push(...item);
        else res.push(item) 
    })
    return res;
}
```
# 手写对象的[Symbol.iterator]迭代器协议（普通对象不内置迭代器）
 ```js
  // 内置迭代器的异质对象有：Array，String，Set，Map
Symbol.myIterator = Symbol('myIterator');
Object.prototype[Symbol.myIterator] = function () {
    const iterKeys = Object.keys(this);
    let iterIndex = 0;
    return {
        next: ()=> {
            if (iterIndex < iterKeys.length) {
                return {
                    value: this[iterKeys[iterIndex++]],
                    done: false
                };
            } else {
                return {
                    value: undefined,
                    done: true
                };
            }
        }
    }
}
```
# 手写for of循环（for of便利前提是对象内置迭代器）
 ```js
function myForOf(obj,fn) {
    if(!obj[Symbol.iterator]) throw new TypeError('obj不存在迭代器')
    const myIterator = obj[Symbol.iterator]();
    let cur = myIterator.next();
    while (!cur.done) {
        fn(cur.value);
        cur = myIterator.next();
    }
}
```
# 手写for in循环（for in的前提是对象属性可被枚举，Object.keys也是）
 ```js
function myForIn(obj,fn) {
    const keys = Object.keys(obj);
    keys.forEach(item=>{
        fn({[item]:obj[item]});
    })
}
```
# 浅拷贝，返回新的对象，丢失原型链
 ```js
function shallowClone(objLike) {
    if(typeof objLike !== 'object') return objLike;
    const res = Array.isArray(objLike)?[]:{};
    for(let item in objLike){
        if(objLike.hasOwnProperty(item)){
            res[item] = objLike[item];
        }
    }
    return res;
}
```
# 手写深拷贝
 ```js
// 是否是对象类型
const isObject = (obj) => typeof obj === 'object' || typeof obj === 'function' && obj !== null;
function deepClone(target,map = new WeakMap()) {
    if(structuredClone) return structuredClone(target);
    // 兼容structuredClone,因为要进行递归处理，所以需要增加默认参数
    if(map.get(target)) return target;
    let constructor = target.constructor; //获取到constructor
    // 如果是日期或者正则，就新创建一个实例
    if(/^(RegExp|Date)$/i.test(constructor.name)){
        return new constructor(target);
    }
    if(isObject(target)){
        map.set(target,true);
        const cloneTarget = Array.isArray(target) ? []:{};
        for(let prop in target){
            if(target.hasOwnProperty(prop)){
                cloneTarget[prop] = deepClone(target[prop],map);
            }
        }
        return cloneTarget;
    }else {
        return target;
    }
}
// > 注意：1、原型链不能形成闭环（报错），2、__proto__的值只能是对象或者null，3、一个对象只能又一个[[Prorotype]]，4、__proto__是内部[[Prototype]]的getter/setter。
```
# 手写全局事件总线
 ```js
class EventEmitter{
    #cache = {};
    constructor(){}
    on(name,fn){
        if(this.#cache[name]){
            this.#cache[name].push(fn);
        }else{
            this.#cache[name] = [fn]
        }
    }
    off(name,fn){
        if(!this.#cache[name]) return;
        this.#cache[name] = this.#cache[name].filter(item=>{
           return item !== fn;
        })
    }
    emit(name){
        this.#cache[name].forEach(item=>{
            item();
        })
    }
}
// 复习CustomEvent、Event和EventTarget（dispatchEvent和addEventListener）
const sayHiEvent = new CustomEvent('sayHi',{
    detail:{
        name:"sayHi事件"
    }
})
const eventTarget = new EventTarget();
eventTarget.addEventListener('sayHi',(e)=>{
    console.log(e.detail,'e.detail');
})
// eventTarget.dispatchEvent(sayHiEvent)

//深度思考：为什么eventTarget使用dispatchEvent时，要传入Event事件，而不是type类型？
//因为一个DOM同一事件不能重复，并且同一事件类型一般要创建很多个事件（用于不同的DOM，因此不能复用同一事件），此时用类型很难对其标识
```
# 遍历输出构造类
 ```js
function consoClass(classFn) {
    let a = Object.getPrototypeOf(classFn);
    while (a !== null) {
        console.log(a);
        a = Object.getPrototypeOf(a);
    }
}
// HTMLElement--Element--Node--EventTarget--Object--null
consoClass(HTMLElement)
```
# 图片懒加载
 ```js
const imgList = [...document.querySelectorAll("image")];
const imgLength = imgList.length;
const imgLazyLoad = (function () {
    let count = 0;
    return function () {
        let deleteIndexList = [];
        //遍历图片列表
        imgList.forEach((item,index)=>{
            let rect = item.getBoundingClientRect();
            // 如果rect.top小于window.innerHeight，代表以及进入视野之内
            if(rect.top < 0){
                item.src = item.dataset.src;
                deleteIndexList.push(index);
            }
        })
        imgList = imgList.filter((item,index)=>!deleteIndexList.includes(index));
    }
})()

document.addEventListener("scroll",imgLazyLoad);
```
# 函数防抖（多次执行，重新计时）
 ```js
function debounce(fn,time) {
    let timer = null;
    return function () {
        const bindFn = fn.bind(this,...arguments)
        clearTimeout(timer);
        setTimeout(() => {
            bindFn();
        }, time);
    }
}
```
# 函数节流（固定时间只执行一次）
 ```js
function th(fn,time) {
    let timer = null;
    return function () {
        if(timer) return;
        const bindFn = fn.bind(this,...arguments)
        timer = setTimeout(() => {
            bindFn();
            clearTimeout(timer);
        }, time);
    }
}
```
# 函数柯里化
 ```js
function curry(fn) {
    //将fn函数进行柯里化
    return function curried(...args) {
        if(args.length >= fn.length){
            return fn.apply(this,args);
        }else{
            return function (...args2) {
                return curried.apply(this,args.concat(args2))
            }
        }
    }
}
```
# 函数偏函数化
 ```js
function partial(fn,...args) {
    return (...arg) => {
        return fn(...args,...arg);
    }
}
```
# 使用jsonp进行跨域get请求
 ```js
const jsonp = ({ url, params, callbackName }) => {
    const generateUrl = () => {
        let dataSrc = ''
        for (let key in params) {
            if (params.hasOwnProperty(key)) {
                dataSrc += `${key}=${params[key]}&`
            }
        }
        dataSrc += `callback=${callbackName}`
        return `${url}?${dataSrc}`
    }
    return new Promise((resolve, reject) => {
        const scriptEle = document.createElement('script')
        scriptEle.src = generateUrl()
        document.body.appendChild(scriptEle)
        window[callbackName] = data => {
            resolve(data)
            document.removeChild(scriptEle)
        }
    })
}
```
# AJAX封装get请求JSON数据
 ```js

function getJSON(url) {
    return new Promise((resolve,reject)=>{
        const xhr = new XMLHttpRequest();
        xhr.open("GET",url,false);
        xhr.setRequestHeader("Accept","application/json");
        xhr.onreadystatechange = function () {
            if(xhr.status !== 4) return;
            if(xhr.status === 200 || xhr.status === 304) {
                resolve(xhr.responseText);
            }else {
                reject(new Error(xhr.responseText));
            }
        }
        xhr.send();
    })
}
```
# 实现forEach
 ```js
Array.prototype.myForEach = function (callback,thisArg) {
    if(this === null) throw new TypeError("this is null or not defined");
    // 如果回调不是函数
    if(typeof  callback !== 'function') throw new TypeError(callback + "is not a function");
    const superThis = Object(this); //将this进行兼容，确保不是null或undefined
    const len = superThis.length >>> 0; //确保该函数的参数是正整数或0
    let k = 0;
    while (k < len) { //当k小于0进行遍历
        if(k in superThis){
            callback.call(thisArg,superThis[k],k,superThis);
        }
        k++;
    }
}
```
# 实现map
 ```js
Array.prototype.myMap = function (callback,thisArg) {
    if(this.null) throw new TypeError("this is null or defined");
    if(typeof callback !== "function") throw new TypeError(callback.name + "is not a function");
    const thisObj = Object(this); //保证thisObj不是null或undefined，使用Object可以传入数组，使用Array需要列出来
    const len = thisObj.length >>> 0; //无符号右移0，内部全部流程：valueOf、toString、Number，然后无符号左移（去小数）
    let k =0;res = []
    while (k < len) {
        if(k in thisObj){
            res[k]=callback.call(thisArg,thisObj[k],k,thisObj);
        }
        k++;
    }
    return res;
}
```
# 实现filter
 ```js

Array.prototype.myFilter = function (callback,thisArg) {
    if(this == null) return new TypeError("this is null or undefined")
    if(typeof callback !== "function") return new TypeError(callback.name + "is not a function")
    // 处理filter
    const thisObj = Object(this);
    const len = thisObj.length >>> 0;
    let res = [],k = 0;
    while (k < len) {
        if(k in thisObj){
            if(callback.call(thisArg,thisObj[k],k,thisObj)){
                res.push(thisObj[k]);
            }
        }
        k++;
    }
    return res;
}
```
# 实现some
 ```js
Array.prototype.mySome = function (callback,thisArg) {
    if(this == null) return new TypeError("this is null or undefined");
    if(typeof callback !== "function") return new TypeError(callback.name + "is not a function")
    const thisObj = Object(this);
    let len = thisObj.length,k = 0;    
    while (k < len) {
        if(k in thisObj){
            if(callback.call(thisArg,thisObj[k],k,thisObj)){
                return true;
            }
        }
        k++;
    }
    return false;
}
```
# 实现reduce
 ```js
Array.prototype.myReduce = function (callback,initialValue) {
    if(this == null) return new TypeError("this is null or undefined");
    if(typeof callback !== "function") return TypeError(callback.name + "is not a function");
    const thisObj = Object(this); //防止null或者undefined
    const len = thisObj.length;
    let res,k=0;
    while (k < len) {
        if(k in thisObj){
            //进行执行
            initialValue = callback(initialValue,thisObj[k]);
        }
        k++;
    }
    return initialValue;
}
```
# 手写call、apply 和 bind
```js
Function.prototype.myCall = function (thisContext) {
    // 将this（函数），绑定this,传入参数
    thisContext = thisContext || window; //this默认为window
    const fn = Symbol(thisContext);
    thisContext[fn] = this; //将this函数挂载到thisContext环境中
    let args = [...arguments].slice(1);
    thisContext[fn](...args); //用对象[属性]的方式使用函数（绑定this）
    delete thisContext[fn]; //最后删除属性
}
//小结：使用call绑定this的关键就在于：将this（也就是函数）挂载到thisContext（需要绑定的this上），使用对象[属性]的方式进行执行，从而自动绑定this

Function.prototype.myApply = function (thisContext) {
    const fn = Symbol("myApply");
    // 将fn绑定到黄经中
    thisContext[fn] = this;
    //执行
    const args = [...arguments].slice(1);
    thisContext[fn](args);
    delete thisContext[fn]; //删除属性之后，垃圾回收机制自动回收fn
}

Function.prototype.myBind = function (thisContext) {
    // 函数绑定
    //返会一个函数,绑定this指向，到固定的函数上
    const thisFn = this;
    const arg = [...arguments].slice(1); //保存传入的参数
    return function () {
        const newArg = [...arguments];
        return thisFn.apply(thisContext,[...arg,...newArg])
    }
}
```