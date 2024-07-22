/**
 * 手写一个axios
 */

/**
 * 手写Promise
 */

/**
 * 手写new函数
 */
function Example(name) {
    if(!new.target) throw new TypeError("该函数应该使用new来调用");
    this.name = name
}
Object.definePropertie(Example.prototype,"init",{
    enumerable:false,
    value: function () {
        'use strict';
        if(new.target) throw new Error("init函数不能使用new来调用");
        let fn = function () {
            console.log(this.name);
        }
        fn.call(this);
    }
})
/**
 * 把一个函数进行柯里化
 */
// fn(a,b,c,d) => fn(a)(b)(c)(d)
function curried(fn) {
    return function curried(...args) {
        //递归到终点，执行函数
        if(args.length >= fn.length){
            return fn.apply(this,args);
        }else{
            // 递归返回函数，将之前传入的参数和之后传入的参数合并
            return function (...args2) {
                return curried.apply(this,args.concat(args2));
            }
        }
    }
}