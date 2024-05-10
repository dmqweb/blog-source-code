# new关键字实现分为三步：
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