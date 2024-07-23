/**
 * new关键字
 */
function myNew() {
    let obj = {};
    let Constructor = [].shift.call(arguments);
    Object.setPrototypeOf(obj,Constructor.prototype);
    let res = Constructor.apply(obj,arguments);
    return typeof res === 'object' ? res || obj : obj; //res || obj考虑了构造函数显示返回null
}
/**
 * instanceof
 */
function myInstanceOf(left,right) {
    //判断left是不是right的子类，遍历left的原型链，看是否有right
    if(typeof left !== "object") throw new TypeError("Left-hand side of myInstanceOf is not an object");
    if(typeof right !== "object") throw new TypeError("Right-hand side of myInstanceOf is not an object");
    while (Object.getPrototypeOf(left)) {
        left = Object.getPrototypeOf(left);
        if(left === Object.getPrototypeOf(right)){
            return true;
        }
    }
    return false;
}
/**
 * 实现Object.create
 */
// 参数一：proto 二：属性对象
Object.myCreate = function (proto,propertyObj) {
    
}
