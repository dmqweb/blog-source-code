> 字符串(ASCII--unicode--UTF)
- 字符串最早期是：使用一个字节表示的ASCII码，表示常用的字符足够了，但是表示不了全球的其他语言与字符，后来就出现了定长的unicode编码，使用2个或4个字节表示，由于扩大了只用英语的国家的字符串占用，现如今常使用变长的unicode编码：如UTF-8、UTF-16等，特点是兼容ASCII码
- charCodeAt和codePointAt：对于定长的一个码元的字符（常常是UTF-16编码的字符），使用charCodeAt就足够了，但是对于不定长的需要两个码元表示的字符（UTF-8编码的、需要两个码元表示的），这时候使用charCodeAt只能返回第一个码元，需要使用codePointAt才能正常显示
> js运算规则
> js语言类型
- js通常被归类为解释型语言,但事实上它是一门编译型语言，同时也是一门动态（变量类型可变）弱类型（隐式类型转换）语言。
> js解析步骤
- 词法分析---语法分析---目标代码生成---编译为机器码执行
> 词法作用域
- eval函数会修改其所处的词法作用域,with声明会根据对象创建一个全新的词法作用域,严格模式下被禁用,两者不推荐使用,会影响性能。
- 词法作用域是由函数声明的位置来决定的,在编译阶段词法作用域就已经基本确定。
- 基于作用域的隐藏方法是依据于最小特权原则或者叫最小授权原则,意思是应该最小限度地暴露必要的内容,而将其他内容隐藏起来,防止预期之外的调用
- 根据最小授权原则,三方库通常只会暴露一个对象,所有待使用的api都在这个对象地内部,这个对象会被作为这些api的命名空间。
> 变量提升
- let和const声明的变量也会进行变量提升,但在初始化赋值之前调用这个变量时会抛出一个异常,社区通常称之为: 暂时性死区和块级作用域
> 类
- 类可以被赋值多次,实例化一个对象就意味着将类的行为复制到物理对象中去
> this指向
- 除箭头函数之外,需要谨慎使用this来引用一个词法作用域内部的变量,因为this是在函数调用时发生的绑定,`this与函数的调用方式相关,函数的作用域链和函数的声明位置相关`。
- 箭头函数没有this和arguments等面向对象的内容,箭头函数的出现是为了解决函数的二义性问题。
- this的绑定优先级: new绑定 > call、apply、bind等显示绑定 > 隐式绑定(实例调用) > 默认绑定(浏览器环境是window,严格模式下是undefined,node环境是空对象)。
- javaScript中函数是一等公民,因为函数本质上和普通对象一样,可以像操作其他对象一样操作函数(比如赋值,传参,返回等)。
- js中数据类型设计为:类型二进制表示如果前三位都是0的话会被判断为object类型,null的二进制表示全是0,所以会被判断为object类型。
- 部分内建函数:Number、String和Boolean等当作为函数调用时会返回字面量,当使用new调用时会返回对应类型的对象,其余内建函数如:Object、Array、Function、RegExp和Error,无论怎么调用都是返回对象,null和undefined只有文字形式,没有构造方法。
- 内建函数Array传递一个参数时,会被当作数组的长度而非一个元素。
- 对象中的属性名永远都是字符串,即使是数字也不例外,不过数字字符串会被作为排序属性。（Symbol也可以作为属性名）
- 数组中仍然可以像对象一样存其他类型的属性。
> 对象的属性描述符
- ES5开始,所有的对象上的属性都具备了属性描述符,可以通过Object.getOwnPropertyDescriptors获取,有:
- - value(值)、
- - writable(是否可以被赋值)、
- - configurable(是否可以被配置:-----可以使用Object.defineProperty或delete)
- - enumerable(是否可以被枚举) 四个属性描述符
> 对象的不可变设置
- 对象不可变设置
- - 针对对象的某一个属性,可以使用writable和configurable这两个属性描述符,就可以创建一个真正的常量属性
- - 阻止扩展: 对象禁止扩展(禁止添加属性但是可以删除!!),使用Object.preventExtensions
- - 密封: 对象禁止扩展或删除属性(但是可以修改),使用Object.seal
- - 冻结: 对象禁止扩展删除和修改(冻结是js对象最高级别的不可变设置),使用Object.freeze
> 对象的访问描述符
- getter和setter，通过getter和setter我们可以获得到对象的访问描述符，精细化定义对象对应属性被访问和被修改时的集体操作。
> 迭代器
- 对象默认没有内置迭代器（Symbol.iterator属性），数组和Map、Set等集合内置了迭代器属性
> 面向对象
- 面向对象强调的是数据和操作数据的行为本质上是相互关联的，类并不是编程的继承，而是一个可选的代码抽象
- js中有近似类的语法，但是js的机制似乎一直在阻止我们使用类设计模式
> 原型链
- 构造函数的prototype是其实例的原型、父类的实例
- 使用new调用构造函数产生的实例,其原型链继承于父类,而直接调用构造函数所产生的实例,其原型链指向Object,相当于由Object所构造(this.key=value的形式)
> 改变原型链
- 内置的构造函数改变prototype无效，其实例改变__proto__会改变原型链，但仍然可以使用原来的方法，不过原型链新的同名方法会进行覆盖；
- 自己写的构造函数改变prototype会导致：实例的constructor指向其原型的constructor,其实例改变__proto__会改变原型链，但原来方法仍然可以使用，不过同名方法不会覆盖原来的方法。
> constructor
- 实例的constructor根据调用方式和构造函数的prototype有关，但是一旦实例构造出来之后，其constructor便不会再被更改
- 构造函数不使用new调用时,其实例的constructor是Object,使用new调用时,其实例的constructor是构造函数prototype的constructor
```js
function Foo() {
    this.name = ""
    return this
}
// const a = Foo();
const a = new Foo();
console.log(a.constructor);
```
- 当改变构造函数的prototype时，使用new构造的实例就失去了默认的constructor属性，而会将构造函数prototype的constrcutor作为其实例的constructor
```js
function Foo() {}
//改变构造函数的原型链时，会使得子实例失去默认的constructor，而将构造函数prototype的constructor作为实例的constrcutor
Foo.prototype = {}; 
var a1 = new Foo();
console.log(a1.constructor);
console.log(
a1.constructor === Foo.prototype.constructor
);
```
> class类
- class并不会像传统面向类的语言一样在声明时静态复制所有的行为,class基本上只是现有委托机制(prototype)的一种语法糖.
- ES6的class和extends关键字实现继承的方式是一种寄生组合式继承
> typeof安全防范
- typeof 一个未定义的变量时不会报错,而是会返回undefined
> 类数组
- 类数组对象可迭代可枚举,并具有length属性,但是类数组对象并没有数组那些原型上改变自身的方法
- 类数组对象设计的初衷是只用于被遍历和读取,而不需要我们使用方法去修改它,没有数组原型上的方法从而使得自身更加安全
- 数组和字符串也都属于类数组,除此之外,还有:arguments、NodeList、HTMLCollection
> 字符串
- js中字符串是不可变的,数组是可变的
- 字符串不可变是指字符串的成员函数不会改变其原始值,而是创建并返回一个新的字符串,而数组的成员函数都是在原始值上进行操作
- 由于字符串的不可变性,因此它没有数组原型上reverse等改变自身的方法
> 数字
- js中数字类型采用的是64位双精度浮点数来进行存储的
- 0.2 + 0.1 由于精度丢失结果约为0.30000000000000004,而不等于0.3
- js设置了一个误差范围值Number.EPSILON,为2^-52大小,在误差值范围内就认定两个值相等
- Infinity/Infinity为NaN,有穷正数除以Infinity为0
- +0 和 -0相等,这时可以使用Object.is区分两者
> NaN
- typeof NaN返回number
- NaN !== NaN
- isNaN()用于检查是否是NaN,但是有个缺陷:传入undefined和非空字符串时也为true,其他为false,通常使用Number.isNaN,这个方法不会存在这样的问题,或者使用Object.is方法
> 值和引用
- js中除了import导入的东西是引用复制之外,其他任何操作包括对象赋值都是将当前变量指向堆中的数据,而不是复制一个引用
- 标量基本类型值是不可更改的(字符串和布尔值也是如此)
> Symbol
- Symbol作为属性时,不可以被枚举
- Symbol可以通过Object.getOwnPropertySymbols()进行公开
> 强制类型转换和隐式类型转换
- Object.prototype.toString返回内部属性[[Class]]的值,如:"[object Object]"
- 如果对象有toString方法,字符串化时,就会调用该方法,并返回其返回值
- JSON.stringify并非严格意义上的强制类型转换,因为它总是返回字符串
- 不安全JSON值是指:JSON转换时会被忽略或丢失的值, undefined、function和symbol和包含循环引用的对象都是不安全JSON值
- 对对象使用JSON转换时,首先会尝试调用它的toJSON方法,先转换为一个安全的JSON值,然后再被转换为字符串
- JSON.stringify第二个参数可以是一个数组或对象,用于指定哪些属性应该被处理
- JSON.stringify第三个参数是一个正整数或字符串,用于指定每一级缩进的字符数或字符
> toBoolean
- 返回false的值有:undefined、null、false、+0、-0、NaN和""
- 由于历史原因,存在一些假值对应比如:document.all得到的对象,也会被转为false
> 隐式类型转换
- 例如==或者if判断时或者不同类型之间进行数学运算时会进行转换
> 显示类型转换
- 例如Number、toNumber、String、toString、Boolean和+、~、|、^、>>等位运算
- 使用~~或者>>0 可以截断数字的小数部分
- 允许Symbol类型到字符串类型的显示类型转换,而对其的隐式类型转换会产生错误
- ""转换为数字是0
- []转换为字符串是"",准换为数字是0
> Symbol类型转换
- Symbol类型转换到Boolean类型: 可以强制类型转换,也可以隐式类型转换
- Symbol类型转换到String类型: 可以强制类型转换,不能隐式类型转换
- Symbol类型转换到Number类型: 不能强制类型转换,也不能隐式类型转换
> 数字的二进制表示:补码表示法
- ~-1等于0
- 一个数的负数是通过取该数的反码然后加 1 得到的。反码是通过将一个数的二进制表示中的每个 0 变为 1，每个 1 变为 0 得到的。
- 补码系统中的加减法可以使用相同的硬件电路,因为减法可以看作加法的特殊情况(加上负数)
- js没有采用反码表示法:利用首位表示正负,其余部分与正数相同。因为反码表示法进行加减法时很麻烦,并且没有溢出检测等
> parseInt类型转换
- parseInt(1/0,19)返回18,原因是1/0是Infinity,然后被转为:"Infinity",当以19为基数时,I是18,n由于是NaN,因此停止解析,返回18
> 进制转换
- 进制转换可以使用:Number.parseInt(string, radix),或者使用:Number.prototype.toString(radix)
> 逻辑运算符(选择器运算符)
- js中的 && 和 || 被成为选择器运算符更合适,因为它的返回值是两个操作数中的一个,而不是布尔值
- 逻辑运算符存在短路机制,得到想要的结果时就不会继续执行,例如可以: say && say()
> 双等判断
- 为什么[] == ![]
```js
// 原因在于: 显示类型转换和隐式类型转换的规则不同,切勿混淆,例如:
console.log(Boolean([])); //true
console.log(true == []); //false
// 首先![]会被进行显示类型转换变为false,而不是隐式类型转换
// 接着[]和false进行判断,[]调用valueOf和toString最终变为""
// 然后""和false进行判断,false会被转为0
// 最后""和0进行判断,""会被转为0,两者相等
```
- 注意隐式类型转换和显示类型转换的规则不同,例如:[]因为是对象,显示类型转换是true,但是隐式类型转换之后是false
- 当布尔值与其他类型进行双等判断时,会调用内部toNumber操作,将boolean转换为number类型,再进行判断
- 建议永远不要使用布尔值的双等判断,因为较差的可读性可能会导致潜在的问题
- null==undefined,内部判断null和undefined时,会调用toBoolean抽象操作进行判断
- boolean被转换时,要被转换为数字,string和number转换时,也要将string转换为数字
> 比较运算符( > 和 < )
- 如果双方都是字符串,则按照字母顺序逐个字符进行比较Unicode,直到比较出大小
> 返回值
- 代码块的返回值就是最后一个语句 / 表达式的返回值
- 赋值表达式也是有返回值的,可以利用这个特性进行连续赋值(链式赋值)
> 循环标志
- 循环可以打上标志,并且配合continue和break等关键字使用
> 运算符优先级
- && 优先级大于 || 的优先级,两者大于三元表达式的优先级
- 逻辑运算符表达式是左关联表达式,三元表达式是右关联表达式
> ASI自动分号插入
- 有时js会自动为代码行补上缺失的分号
> try catch finally
- finally中的返回值会覆盖try和catch中的返回值
- finally中省略return相当于返回try和catch中的返回值,而不是返回undefined
> 浏览器环境特性
- 浏览器环境中创建全局变量会在global对象上创建一个同名属性
- 浏览器环境中带有id属性的DOM元素会创建同名的全局变量
> 事件循环
- 事件循环在整个js运行过程中一直存在,用于将异步队列中的异步任务放在执行栈中执行
- 事件循环队列通常被成为微任务队列,是js语法的一部分,任务队列又叫做宏任务队列,通常由js的运行环境所实现
> 回调地狱
- 回调地狱的缺点并不是简单的因为难以阅读,它还会导致异步数据流的跟踪异常困难
- 回调函数同时会受到控制反转的影响,因为回调暗中将控制权交给第三方(通常是不受控制的第三方工具),来调用,这种控制权转移会导致一系列的信任问题,比如回调函数调用的次数是否会超出预期
> Promise
- Promise是用于解决回调地狱问题的
- 判断一个值是否是Promise使用instanceOf存在一些弊端:其他窗口接收到的Promise可能和当前窗口的Promise不同,因此这样的检查无法识别Promise实例,可以通过鸭子类型来进行判断,即:拥有then方法
- Promise的执行器函数会捕获错误，将自身的状态变为rejected。

> 生成器函数
- 生成器函数是一种状态机切换的行为模式,底层使用一个寄存器去监控迭代器实例的状态,从而根据状态返回对应的值
- 生成器函数返回值是一个迭代器对象(具有next方法的对象)
- ES6之前几乎都存在一个普遍依赖的设定: 一个函数一旦开始执行,就会运行到结束,但是生成器函数打破了这种设定
- 生成器函数的yield和迭代器对象的next相互组合,构成了一个双向的消息传递系统
- 迭代器对象的next方法中传入的参数会在下一次赋值给yield表达式
```js
function* gen(x) {
    let y = x * (yield);
    const res = (yield y) * 100;
    return res;
};
const iter = gen(6);
// 遇到yield关键字会暂停执行
console.log(iter.next());
// 第二个next调用时,会将参数传递给yield表达式,继续执行
// 第三次next调用时,会将参数传递给yield表达式
console.log(iter.next(10).value);
console.log(iter.next(1).value);
```
- 同一个生成器函数创建的迭代器实例之间可以同时运行,并且可以彼此交互
- 迭代器委托: 生成器中可以使用yield关键字委托给另一个生成器,从而实现生成的迭代具有yield部分的拼接效果
```js
function* foo1() {
    yield "a1";
    yield *foo2();
    yield "a2";
}
function* foo2() {
    yield "b1";
    yield "b2";
}
const iter = foo1();
let res = iter.next();
while (!res.done) {
    console.log(res.value);
    res = iter.next();
}
```
- 生成器函数内部有着看似完全同步的代码,除了yield关键字本身,yield一个函数执行结果时,函数内部的运行也可以完全异步
- 最巧妙地地方在于: 可以在生成器函数中使用yield去抛出Promise,由于这种模式十分好用,后来便出现了async await关键字
> async await
- async函数的返回值一定是一个Promise,如果是值会被封装为Promise.resolve()
- 使用async标记函数之后,函数就是一个异步函数,在异步函数内部可以使用await关键字来暂停函数的执行,去等待后面Promise的resolve结果(不是promise的会被包装为promise.resolve),异步函数中在await后面的部分会被作为这个promise的.then回调进行执行
- await后面需要跟Promise对象(不是promise的话会被封装为promise),不然就没有意义,并且await后面的Promise对象不必写then,因为await的作用之一就是获取到后面Promise对象成功状态传递出来的参数
> async函数的返回值
- async函数会默认对返回值进行包装处理，对不同类型的返回值进行包装，开启不同数目的微任务，等待指定个数的微任务执行完之后再将任务放入微任务回调中。
- return结果值：非thenable、非promise（不等待）
- return结果值：thenable（等待一个then的时间）
- return结果值：promise（等待两个then的时间）
```js
async function testC () {
    return new Promise((resolve, reject) => { //async函数返回promise时，会嵌套两层微任务
        resolve()
    })
} 
testC().then(() => console.log(1));
Promise.resolve()
    .then(() => console.log(2))
    .then(() => console.log(3))
    .then(() => console.log(4))
// 2 3 1 4 ，async函数返回promise，则嵌套两次微任务之后执行回调
async function testB () {
    return {
        then (cb) {
            cb();
        }
    };
}
testB().then(() => console.log(1));
Promise.resolve()
    .then(() => console.log(2))
    .then(() => console.log(3));
//  2 1 3 ，async函数返回thenable，则嵌套一次微任务之后执行回调
async function test () {
    console.log(1);
    await 123
    console.log(2);
}
test();
console.log(3);
Promise.resolve()
    .then(() => console.log(4))
// 1 3 2 4，async函数返回非thenable，不等待执行放入微任务队列中
```
> async函数中使用await等待跟返回值一样，非thenable不会嵌套，thenable会嵌套一层，但是await一个promise时，不会嵌套（TC39优化）
```js
async function test () {
    console.log(1);
    await { //等待的thenable会嵌套一层微任务后执行
        then:(cb)=>{
            cb()
        }
    }
    console.log(2);
}
test();
console.log(3);
Promise.resolve()
    .then(() => console.log(4))
    .then(() => console.log(5))
    .then(() => console.log(6))
    .then(() => console.log(7));
// 1 3 4 2 5 6 7
```
> async函数await等待promise时，直接放入微任务队列中，没有微任务嵌套。
- TC39优化：为了获得更快的async函数和promise，当await后面等待promise时，会移除多余的两个微任务嵌套。
```js
async function test () {
    console.log(1);
    await new Promise((resolve, reject) => {
        resolve()
    })
    console.log(2);
}
test();
console.log(3);
Promise.resolve()
    .then(() => console.log(4))
    .then(() => console.log(5))
    .then(() => console.log(6))
    .then(() => console.log(7));
// 1 3 2 4 5 6 7
```
> await下面的代码
- await下面书写的代码会被封装为微任务回调，当await的promise的最后一个.then执行时，推入到微任务队列中。
```js
function func () {
    // 方式一：5 3 6 7 ，返回undefined的过程是同步执行
    // Promise.resolve()
    //     .then(() => console.log(5))
    //     .then(() => console.log(6))
    //     .then(() => console.log(7))
    // 方式二：5 6 7 3，
    return Promise.resolve()
        .then(() => console.log(5))
        .then(() => console.log(6))
        .then(() => console.log(7))
}
async function test () {
    await func();
    console.log(3); //await下面的代码会被封装为回调，当await的promise的所有.then回调执行完毕后执行
}
test();
```
> Worker
- 在Worker内部是无法访问主程序的任何资源的,意味着你不能访问它的任何全局变量,也不能访问页面的DOM或者其他资源,他是一个完全独立的线程
- 应用场景:
- - 处理密集型数学计算
- - 大数据集排序
- - 数据处理(压缩、音频分析、图像处理等等)
- - 高流量网络通信
- worker之间的通信常使用strcturedClone方法,这样就不用付出性能损失了,另一个好的选择(尤其是针对大数据集而言)就是使用Transferable对象,这样数据的所有权也会转移
- SharedWorker可以创建一个整个站点或app的所有页面实例都可以共享的中心Worker,这个Worker需要通过某种方式来得知消息来自于哪个程序,这个唯一标识符成为端口
> SIMD
- SIMD 打算把CPU 级的并行数学运算映射到JavaScript API，以获得高性能的数据并行运算，比如在大数据集上的数字处理
> TCO尾调用
- 尾调用就是一个出现在另一个函数结尾处的函数调用,调用结束之后就没有其余事情要做了
```js
function foo(x) {
    return x;
}
function bar(y) {
    return foo( y + 1 ); // 尾调用
}
function baz() {
    return 1 + bar( 40 ); // 非尾调用
}
baz();
```
- 尾调用会避免创建多余的帧栈,这在嵌套层级很深的递归调用中作用就更加重要
> 模板字面量函数调用
- 函数的模板字面量调用方式的第一个参数是模板字符数组，后续参数是模板字符串的变量
```js
const person = "人";
const age = 28;
function myTag(strings, personExp, ageExp) {
  console.log(strings,'模板字符被分割数组');
  console.log(strings.raw,'raw方法会保留转义字符的内容');
  console.log(personExp,'模板变量1');
  console.log(ageExp,'模板变量2');
}
const output = myTag`That \n ${person} is a ${age}.`;
```
> 计算机执行
- 计算机的执行是先进行赋值再参与计算
```js
function sum(num1, num2 = num1) {
    console.log(num1 + num2); //20
}
sum(10);
```
- 表达式赋值的优先级高于运算符
```js
let a = 10;
// 11 + 11 + 12 先对表达式进行赋值，再进行计算
console.log(++a + a++ + a);
```
> 输出题
- 注意赋值引用和赋值堆地址
```js
let person = { name: "Lydia" };
const members = [person]; //相当于将对象引用地址赋值给数组第0个索引
person = null; //这里将null赋值给了person的引用地址，当数组0处不变
console.log(members); //{name:"Lydia"}
```
- 执行顺序
```js
console.log(3 + 4 + "5"); // "75"
```
- parseInt遇到非数字会停止解析
```js
const num = parseInt("7*6", 10); // 7
```
- 捕获到错误后不会执行余下内容
```js
function greeting() {
    throw "出错了";
}
function sayHi() {
    try {
        const data = greeting();
        console.log("捕获错误后不会执行", data);
    } catch (e) {
        console.log("捕获到错误", e);
    }
}
sayHi();
```
- 顶层直接赋值相当于在globalThis上绑定属性
```js
(() => {
    let x = y = 10;
})();
console.log(x); // 报错：x未定义
console.log(y); // y=10会在globalThis中绑定y属性
```
> ESM和CommonJS
- CommonJs模块输出的是值的拷贝，也就是说，一旦输出一个值，模块内部的变化不会影响到这个值.
- ESM 模块是动态引用，并且不会缓存，模块里面的变量绑定其所有的模块，而是动态地去加载值，并且不能重新赋值。
- ES6 输入的模块变量，只是一个“符号连接符”，所以这个变量是只读的，对它进行重新赋值会报错。如果是引用类型，变量指向的地址是只读的，但是可以为其添加属性或成员。
> 基本数据类型作为函数变量传入时,是一份栈的拷贝
```js
let num = 10;
const increaseNumber = () => num++;
// 注意基本数据类型作为变量传入时，是一份赋值拷贝而不会影响原赋值
const increasePassedNumber = number => number++;
// num1:10 num:11
const num1 = increaseNumber();
// num2:10 num1:10 num:11
const num2 = increasePassedNumber(num1);
console.log(num1);
console.log(num2);
```
> 对象解构时,只会解构并拷贝最外层,当最外层是基本数据类型时相当于一份新的数据
```js
const value = { number: 10 };
//解构赋值,对于外层的基本数据类型直接拷贝了一份新的
const multiply = (x = { ...value }) => {
  console.log(x.number *= 2);
};
multiply(); //20
multiply(); //20
multiply(value); // 20
multiply(value); // 40
```
> reduce方法的第二个参数
- Array.prototype.reduce方法,当不存在第二个参数initialValue时,会将0号元素作为初始值,从第一个元素开始迭代
```js
[1, 2, 3, 4].reduce((x, y) => console.log(x, y));
```
> ESM中静态导入的模块会被提升并且先执行,CommonJs中的模块是函数,调用了才会执行.
```js
// index.js
console.log("在模块之后执行");
import { sum } from './sum.js';
console.log("最后执行");
// sum.js
console.log('静态提升并且先执行');
export const sum = (a, b) => a + b;
```
- String.prototype.padStart/padEnd第一个参数是pad后的长度,第二个参数是pad添加的字符.
- String.prototype.raw用于获取一个模板字符串的原始字符串(保留了\和\n等转义字符)
> this指向
- 关于this指向,普通函数调用时,会根据调用方式绑定this,不过箭头函数没有自己的this,会沿着作用域链向上进行查找,直到找到this
- 对象的属性是字符串或symbol
```js
const obj = {
    1:"你好"
}
// 对象的属性只能是字符串或者symbol
// 但使用[]或者hasOwnProperty等api时, 会将传入的变量转换为字符串
console.log(obj['1'] === obj[1]); // true
console.log(obj.hasOwnProperty('1')); // true
console.log(obj.hasOwnProperty(1)); // true
```
# Object.defineProperty传入属性描述符
> `Object.defineProperty()`的第三个参数以及`Object.defineProperities()`和`Object.create()`的第二个参数传入的是属性描述符，而不是普通对象！。
# typeof 和 instanceof 
> typeof是底层的操作，用于读取某个变量或字面量的标记类型的。八种数据类型基本对应（`typeof 数组会返回：object`），但由于历史遗留问题：`对于typeof null 会返回object`。
> instanceof仅用于操作对象，用于判断该对象的原型链上是否包含某个构造函数的prototype。
# forEach中操作原数组
> forEach中操作原数组无影响
# ol标签type属性和start属性
> type指定类型，start指定从类型中哪一个开始
# 设计模式基本类型
创建型 结构型 行为型
# $符号可以作为变量名
` var $$a = '' `
# arr的splice方法的第二个参数是删除个数，后面的参数是添加到startIndex位置的元素们。
# js引擎对于变量提升（函数声明和变量定义）只会提升一层
```javascript
console.log(test); //报错
console.log(window.test); //undefined
function name(params) {
   return function test(params) {}
}
name();
console.log(test); //报错
```
# 具名函数
```javascript
var func =  function test() {}
console.log(typeof test); //undefined
console.log(typeof test()); //报错

```
# Number()调用
> Number、String等如果直接调用会返回值类型，如果被用于new 调用的话会返回对应类型的对象，当使用Object(item)时，如果item是对象直接返回对象，如果item是数字则会返回数字对象（new Number(item)），其他类型同理。
# this指向
```js
// const obj = {
//     name() {
//         this.name = "你好"
//     }
// }
// // 绑定this指向
// const res = new obj.name(); //报错：没有contructor

function call() {
    this.name = "张三"
}
const obj = {
    name: call.bind(globalThis)
}
const res = new obj.name(); //正常
console.log(res);
```
# bind链式绑定以第一个为准
```js
function foo() {
    console.log( this.a );
} 
var obj1 = {
    a: 'obj1'
}; 
var obj2 = {
    a: 'obj2'
}
var tmp = foo.bind(obj1).bind(obj2) //输出第一个obj1
```
# 当显示绑定null或者undefined时,this直接绑定到window上
```js
function log() {
    console.log(this);
}
const fn = log.bind(undefined) //显示绑定undefined时,相当于直接绑定到window上
const obj = {
    fn
}
console.log(
    obj.fn() //this指向window
);
```
# var和let const的区别
- var不存在块级作用域，let const存在块级作用域
- let const 存在暂时性死区，在初始化之前调用会抛出异常
- var声明在非strict模式下相当于在window上挂载元素
