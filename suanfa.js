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
    
})