> 字符串(ASCII--unicode--UTF)
- 字符串最早期是：使用一个字节表示的ASCII码，表示常用的字符足够了，但是表示不了全球的其他语言与字符，后来就出现了定长的unicode编码，使用2个或4个字节表示，由于扩大了只用英语的国家的字符串占用，现如今常使用变长的unicode编码：如UTF-8、UTF-16等，特点是兼容ASCII码
- charCodeAt和codePointAt：对于定长的一个码元的字符（常常是UTF-16编码的字符），使用charCodeAt就足够了，但是对于不定长的需要两个码元表示的字符（UTF-8编码的、需要两个码元表示的），这时候使用charCodeAt只能返回第一个码元，需要使用codePointAt才能正常显示
> js语言类型
- js通常被归类为解释型语言,但事实上它是一门编译型语言，同时也是一门动态（变量类型可变）弱类型（隐式类型转换）语言。
> js解析步骤
- 词法分析---语法分析---目标代码生成---编译为机器码执行
> 词法作用域
- eval函数会修改其所处的词法作用域,with声明会根据对象创建一个全新的词法作用域,严格模式下被禁用,两者不推荐使用,会影响性能
- 词法作用域是由函数声明的位置来决定的,在编译阶段词法作用域就已经基本确定
- 基于作用域的隐藏方法是依据于最小特权原则或者叫最小授权原则,意思是应该最小限度地暴露必要的内容,而将其他内容隐藏起来,防止预期之外的调用
- 根据最小授权原则,三方库通常只会暴露一个对象,所有待使用的api都在这个对象地内部,这个对象会被作为这些api的命名空间
> 变量提升
- let和const声明的变量也会进行变量提升,但在初始化赋值之前调用这个变量时会抛出一个异常,社区通常称之为: 暂时性死区和块级作用域
> 类
- 类可以被赋值多次,实例化一个对象就意味着将类的行为复制到物理对象中去
> this指向
- 除箭头函数之外,需要谨慎使用this来引用一个词法作用域内部的变量,因为this是在函数调用时发生的绑定,`this与函数的调用方式相关,函数的作用域链和函数的声明位置相关`
- 箭头函数没有this和arguments等面向对象的内容,箭头函数的出现是为了解决函数的二义性问题
- this的绑定优先级: new绑定 > bind等显示绑定 > 隐式绑定(实例调用) > 默认绑定(浏览器环境是window,严格模式下是undefined,node环境是空对象)
- javaScript中函数是一等公民,因为函数本质上和普通对象一样,可以像操作其他对象一样操作函数(比如赋值,传参,返回等)
- js中数据类型设计为:类型二进制表示如果前三位都是0的话会被判断为object类型,null的二进制表示全是0,所以会被判断为object类型
- 部分内建函数:Number、String和Boolean等当作为函数调用时会返回字面量,当使用new调用时会返回对应类型的对象,其余内建函数如:Object、Array、Function、RegExp和Error,无论怎么调用都是返回对象,null和undefined只有文字形式,没有构造方法
- 内建函数Array传递一个参数时,会被当作数组的长度而非一个元素
- 对象中的属性名永远都是字符串,即使是数字也不例外
- 数组中仍然可以像对象一样存其他类型的属性
> 对象的属性描述符
- ES5开始,所有的对象上的属性都具备了属性描述符,可以通过Object.getOwnPropertyDescriptors获取,有:value(值)、writable(是否可以被赋值)、configurable(是否可以使用Object.defineProperty或delete)和enumerable(是否可以被枚举)四个属性
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
- js中有近似类的语法，但是js的机制似乎一致在阻止我们使用类设计模式
> 原型链
- 构造函数的prototype是其实例的原型、父类的实例
- 使用new调用构造函数产生的实例,其原型链继承于父类,而直接调用构造函数所产生的实例,其原型链指向Object,相当于由Object所构造(this.key=value的形式)
> constructor
- 实例的constructor根据调用方式和构造函数的prototype有关，但是一旦实例构造出来之后，其constructor便不会再被更改
- 构造函数不使用new调用时,其实例的constructor是Object,使用new调用时,其实例的cosntructor是构造函数prototype的constructor
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
- 类数组对象可迭代可枚举,并具有lenth属性,但是类数组对象并没有数组那些原型上改变自身的方法
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
- js中的 &&和|| 被成为选择器运算符更合适,因为它的返回值是两个操作数中的一个,而不是布尔值
- 逻辑运算符存在短路机制,得到想要的结果时就不会继续执行,例如可以: say && say()
> 双等判断
- 为什么[] == ![]
```js
// 原因在于: 显示类型转换和隐式类型转换的规则不同,切勿混淆,例如:
console.log(Boolean([])); //true
console.log(true==[]); //false
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
> 比较运算符(>和<)
- 如果双方都是字符串,则按照字母顺序逐个字符进行比较,直到比较出大小
> 返回值
- 代码块的返回值就是最后一个语句/表达式的返回值
- 赋值表达式也是有返回值的,可以利用这个特性进行连续赋值(链式赋值)
> 循环标志
- 循环可以打上标志,并且配合continue和break等关键字使用
> 运算符优先级
- &&优先级大于||的优先级,两者大于三元表达式的优先级
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
- await后面需要跟Promise对象,不然就没有意义,并且await后面的Promise对象不必写then,因为await的作用之一就是获取到后面Promise对象成功状态传递出来的参数
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
