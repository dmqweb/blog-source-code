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
/**
 * 状态模式,状态模式允许一个对象在其内部改变的时候去改变它的行为，对象看起来修改了它的类
 */
class State{
    constructor(state){
        this.state=state;
    }
    handle(context){
        // State的handle方法，改变灯光状态
        console.log(`this is ${this.state} light`);
        context.setState(this);
    }
}
class Context{
    constructor(){
        this.state = null;
    }
    getState(){
        return this.state
    }
    setState(){
        this.state = state;
    }
}
