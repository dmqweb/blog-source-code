---
title: 杂记
date: 2023-6-2 12:24:4
categories:
- 杂记
tags:
- 杂记
---
# learn

## node.js高级

## react

## vue源码

## 项目架构

## 数据结构和算法

## 设计模式

## 协议

## NaN历史遗留问题

由于历史遗留问题，NaN的内部做了hash处理，使得每一次NaN返回的结果都不同。

```js
NaN === NaN //false;
Object.is(NaN,NaN) //true
//除此之外，延申:
+0 === -0 //返回true
Object.is(+0 , -0) //返回false
```

### 原型

构造函数的prototype（原型对象）就是其实例的原型（__proto_ _）*-*

```js
new Object().__proto__===Object.prototype
```

【原型链图解】

```js
obj.__proto__------Object.prototype-------null
func.__proto__--------Function.prototype-------Object.prototype----------null
（其中：func.__proto__.__proto__ === Object.prototype   ； func也是Object的实例（instanceof））
arr.__proto__ -------------Array.prototype---------Object.prototype---------null
```

![image-20240123164938769](C:\Users\44676\Desktop\md\assets\链表.png)

## [运算符优先级](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Operator_precedence)

## [产品上线流程](https://zhuanlan.zhihu.com/p/399705201)

# plop.js:微型生成器框架

plop.js可以通过命令行生成，处理文件模板代码等

# JS中字符串的存储:

JS字符串以Unicode编码的方式进行存储，当声明一个字符串并赋值给一个变量时，js引擎会为该字符串创建一个对象，并将字符串的内容存储在对象内部的属性中，这个对象被称为字符串对象，然而为了提高性能和减少内存的占用，当字符串是常量时，JS引擎会将其存储在一个字符串字面量池中，而不是每一次都创建新的字符串对象。当对字符串执行修改操作时，实际上是创建了一个新的字符串对象，并将修改之后的字符串存储在新的对象中，原始字符串不变。

# Blob:

**Blob（Binary Large Object）对象是 JavaScript 中用来表示二进制数据的对象，通常用于存储和操作文件或其他类型的二进制数据。Blob 对象可以表示大型数据对象，比如图像、视频、音频文件等。**

**Blob 对象通常由两部分组成：数据和数据的类型。数据部分包含实际的二进制数据，而类型部分描述了数据的 MIME 类型，例如 "image/png" 或 "application/pdf"。**

**Blob 对象可以通过 `new Blob()` 构造函数创建，传入一个数组作为参数，数组中包含要存储的二进制数据。另外，你还可以通过传入一个可选的对象参数，来指定数据的 MIME 类型。例如：**

```js
javascriptCopy Codevar binaryData = [0x48, 0x65, 0x6c, 0x6c, 0x6f]; // 用十六进制表示的字符串 "Hello"
var blob = new Blob([binaryData], { type: "text/plain" });
```

**在上面的例子中，我们使用 `new Blob()` 创建了一个包含 "Hello" 文本数据的 Blob 对象，并指定了它的 MIME 类型为 "text/plain"。**

**Blob 对象可以被用于多种用途，比如：**

1. **通过 URL.createObjectURL() 方法创建一个临时的 URL，用于在页面中显示或下载文件,一般配置a标签（download属性）。**
2. **作为 XMLHttpRequest 的响应数据类型，用于接收和处理文件或二进制数据。**
3. **作为 FormData 对象的值，用于将二进制数据发送到服务器。**

**总之，Blob 对象在 JavaScript 中提供了一种方便的方式来处理和操作二进制数据，特别适合于文件操作和网络通信中的数据传输**

# ArrayBuffer:

**ArrayBuffer 是 JavaScript 中用于表示通用的固定长度的二进制数据缓冲区的对象。它可以在内存中分配一块连续的内存空间，用于存储二进制数据。**

**ArrayBuffer 对象本身只是一个占用了一定字节数的内存块，它没有提供直接的方法来读取或写入数据。为了操作 ArrayBuffer 中的数据，我们需要使用不同的视图（如 TypedArray 或 DataView）来读取、写入和操作底层的二进制数据。**

**在内存中，ArrayBuffer 对象以连续的字节序列表示。这意味着存储在 ArrayBuffer 中的数据是紧密排列的，没有额外的空隙或填充。每个字节都有一个唯一的地址，我们可以通过偏移量来访问和操作特定位置的字节。**

以下是一个示例，展示了如何创建和使用 ArrayBuffer：

```js
javascriptCopy Code// 创建一个包含 16 字节的 ArrayBuffer
const buffer = new ArrayBuffer(16);

// 使用一个 Int32Array 视图来读取和写入数据
const int32Array = new Int32Array(buffer);

// 写入数据
int32Array[0] = 42;
int32Array[1] = 99;

// 读取数据
console.log(int32Array[0]); // 输出 42
console.log(int32Array[1]); // 输出 99
```

在上述示例中，我们创建了一个长度为 16 字节的 ArrayBuffer。然后，我们使用 Int32Array 视图来操作这个 ArrayBuffer，将数据写入到数组中，并通过下标直接访问和读取数据。在内存中，这些数据被紧密排列在连续的字节中。

**需要注意的是，ArrayBuffer 的长度是固定的，一旦分配了特定大小的内存空间，就无法改变它的大小。如果我们需要更改数据的长度，我们需要创建一个新的 ArrayBuffer，并将旧数据拷贝到新的 ArrayBuffer 中。**

总之，ArrayBuffer 提供了一种在 JavaScript 中操作底层二进制数据的机制，它在内存中以连续的字节序列表示，可以用于存储和操作各种类型的二进制数据。

# DataView视图：

DataView 是 JavaScript 中的一个类型化数组视图，用于以不同的字节序（如大端序或小端序）和不同的数据类型（如整数、浮点数等）来读取和写入 ArrayBuffer 中的二进制数据。与 TypedArray 不同，DataView 可以指定任意的字节偏移量和长度，可以更加灵活地操作二进制数据。

以下是一个使用 DataView 读取 ArrayBuffer 中的二进制数据的示例：

```js
javascriptCopy Code// 创建一个包含 8 字节的 ArrayBuffer
const buffer = new ArrayBuffer(8);

// 使用一个 DataView 视图来读取和写入数据
const dataView = new DataView(buffer);

// 写入数据
dataView.setInt16(0, 42); // 在第 1 和第 2 个字节中写入 42
dataView.setInt32(2, -100); // 在第 3 到第 6 个字节中写入 -100

// 读取数据
console.log(dataView.getInt16(0)); // 输出 42
console.log(dataView.getInt32(2)); // 输出 -100
```

在上述示例中，我们创建了一个长度为 8 字节的 ArrayBuffer。然后，我们使用一个 DataView 视图来操作这个 ArrayBuffer，分别在前两个字节和后四个字节中写入两个不同的数据，然后通过 DataView 的方法来读取这些数据。

需要注意的是，DataView 的方法名都以数据类型名称开头，并以字节偏移量作为第一个参数。例如，`setInt16(offset, value)` 方法将一个 16 位整数值写入到指定偏移量处，而 `getInt32(offset)` 方法则从指定偏移量处读取一个 32 位整数值。这些方法还可以接受一个可选的第二个参数，用于指定字节序，以帮助正确地解释二进制数据。

总之，DataView 提供了一种灵活和可定制的方式来读取和写入 ArrayBuffer 中的二进制数据，可以指定不同的字节序和数据类型，并支持任意偏移量和长度。

# JS中类型化数组（typed array）：

**JavaScript 的类型化数组是一种特殊的数组，可以存储和操作固定类型的数据，如整数、浮点数、字节等。相比于普通的 JavaScript 数组，类型化数组有以下几个优点：**

1. **更加高效：类型化数组在内存中是连续存储的，这意味着它们可以更快地被读取和写入。此外，它们还允许我们直接访问底层的二进制数据，而不需要进行类型转换或拷贝操作。**
2. **更加节省空间：由于类型化数组只能存储固定类型的数据，因此它们使用的内存空间可以更加紧凑。例如，使用 Int8Array 数组可以将每个元素压缩为 1 个字节，而使用普通的 JavaScript 数组则需要至少 8 个字节来存储一个数字。**
3. **更加易于处理二进制数据：类型化数组可以帮助我们更加方便地处理二进制数据，如音频、视频、图像等。这些数据通常以二进制格式存储，而类型化数组可以直接读取和操作这些数据，而不需要进行复杂的解析和转换操作。**

**总之，类型化数组可以带来更高效、更紧凑、更直接的二进制数据处理体验，是 JavaScript 中处理二进制数据时非常有用的工具。虽然普通的 JavaScript 数组也可以存储二进制数据，但它们没有类型化数组那样的高效和直接性。因此，在需要处理大量二进制数据时，使用类型化数组会更加合适。**

##### Int8Array:

①只能存储8位有符号整数（-128到127），②使用固定大小的内存来存储数据，每个元素占用一个字节（8位）③元素连续存储

```js
// 以长度参数构造对象
var int8 = new Int8Array(2);
int8[0] = 42;
console.log(int8[0]); // 42
console.log(int8.length); // 2
console.log(int8.BYTES_PER_ELEMENT); // 数组所占用的字节数
// 以数组构造对象
var arr = new Int8Array([21, 31]);
console.log(arr[1]); // 31
// 从另一数组构造对象
var x = new Int8Array([21, 31]);
var y = new Int8Array(x);
console.log(y[0]); // 21
// 从 ArrayBuffer 构造对象
var buffer = new ArrayBuffer(8);
var z = new Int8Array(buffer, 1, 4);
```

##### 还有：Uint8Array等类型

### forEach的回调函数中不传参数

```js
const dfs = function(root){
    console.log(root.val,'还好');
    root.children.forEach(dfs);//forEach回调不传参数，默认传的参数就是item项
}
```

forEach回调函数中不传参数，默认将item项作为变量进行传递

## 不常见html标签：

dialog弹窗

![image-20240122101335456](C:\Users\44676\AppData\Roaming\Typora\typora-user-images\image-20240122101335456.png)

details详细

![image-20240122101339487](C:\Users\44676\AppData\Roaming\Typora\typora-user-images\image-20240122101339487.png)

刻度尺

![image-20240122101344976](C:\Users\44676\AppData\Roaming\Typora\typora-user-images\image-20240122101344976.png)

进度条

![image-20240122101352284](C:\Users\44676\AppData\Roaming\Typora\typora-user-images\image-20240122101352284.png)

时间

![image-20240122101359606](C:\Users\44676\AppData\Roaming\Typora\typora-user-images\image-20240122101359606.png)

高亮文本

![image-20240122102818128](C:\Users\44676\AppData\Roaming\Typora\typora-user-images\image-20240122102818128.png)

注解发音

![image-20240122102837759](C:\Users\44676\AppData\Roaming\Typora\typora-user-images\image-20240122102837759.png)

数据列表

![image-20240122102908520](C:\Users\44676\AppData\Roaming\Typora\typora-user-images\image-20240122102908520.png)

上标，下标

![image-20240122102926938](C:\Users\44676\AppData\Roaming\Typora\typora-user-images\image-20240122102926938.png)

虚线标识的

![image-20240122102943236](C:\Users\44676\AppData\Roaming\Typora\typora-user-images\image-20240122102943236.png)

地图标签

![image-20240122103024494](C:\Users\44676\AppData\Roaming\Typora\typora-user-images\image-20240122103024494.png)

# vue3中通过位运算进行类型判断

性能提高，可读性减小：

1. 快速判断：位运算是底层的二进制操作，比起其他逻辑运算符，如逻辑与 `&&`、逻辑或 `||`，位运算更加高效。在某些场景下，使用位运算可以对多个类型进行快速判断，避免了复杂的条件判断和函数调用。
2. 位运算的特性：位运算的特性使得它可以用较少的存储空间表示和处理多个状态或标志位。通过将多个类型的判断压缩到一个整数中，可以节省内存空间，并且减少了不必要的变量声明和赋值操作，从而提升了性能。

# 自增运算在属性中的运用

```js
let a = [1,2]
let index = 0
a[index++]=a[index] 
//相当于a[1]=a[0],自增运算符优先级大于赋值运算符，代码可以拆分为：
//左边=a[index] index++ 左边=a[index](第二次index自增过了)
console.log(a);
```

# 类的私有属性

**js中可以通过#标识私有属性，但是不是全部的js运行环境都支持。**

**ts中通过private关键字来标识私有属性，可以通过ts转为兼容性代码。**

```js
class ClassWithPrivateField {
    #pricateField;
    constructor(){
        this.#pricateField=1
    }
  }
  const aaa = new ClassWithPrivateField()
  console.log(aaa.#pricateField); //报错：属性在类的外部不可访问
```

# 图片上传：

**input标签中file（accetp接受类型） 、**

**fileList（change事件的e.target.files[0]） 、**

**Blob（二进制格式数据）、**

**FileReader（将文本文件file转为字符串或者URL）、**

**URL scheme 、**

**拖拽事件：dragenter、dragover、drop**

# new关键字的实现：

```js
const mynew = function(constroctor,...argus){
    const obj = Object.create(constroctor.prototype)
    const res = obj.apply(obj,argus);
    return (res && typeof res === 'object') ?res:obj;
}
```

