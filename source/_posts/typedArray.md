---
title: JS中类型化数组typedArray
date: 2023-12-11 12:24:4
categories:
- JS
tags:
- JS
- typedArray
---

#JS中类型化数组（typed array）
JavaScript 的类型化数组是一种特殊的数组，可以存储和操作固定类型的数据，如整数、浮点数、字节等。相比于普通的 JavaScript 数组，类型化数组有以下几个优点：

更加高效：类型化数组在内存中是连续存储的，这意味着它们可以更快地被读取和写入。此外，它们还允许我们直接访问底层的二进制数据，而不需要进行类型转换或拷贝操作。
更加节省空间：由于类型化数组只能存储固定类型的数据，因此它们使用的内存空间可以更加紧凑。例如，使用 Int8Array 数组可以将每个元素压缩为 1 个字节，而使用普通的 JavaScript 数组则需要至少 8 个字节来存储一个数字。
更加易于处理二进制数据：类型化数组可以帮助我们更加方便地处理二进制数据，如音频、视频、图像等。这些数据通常以二进制格式存储，而类型化数组可以直接读取和操作这些数据，而不需要进行复杂的解析和转换操作。
总之，类型化数组可以带来更高效、更紧凑、更直接的二进制数据处理体验，是 JavaScript 中处理二进制数据时非常有用的工具。虽然普通的 JavaScript 数组也可以存储二进制数据，但它们没有类型化数组那样的高效和直接性。因此，在需要处理大量二进制数据时，使用类型化数组会更加合适。

Int8Array:
①只能存储8位有符号整数（-128到127），②使用固定大小的内存来存储数据，每个元素占用一个字节（8位）③元素连续存储
```javascript
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
还有：Uint8Array等类型
forEach的回调函数中不传参数
```javascript
const dfs = function(root){
    console.log(root.val,'还好');
    root.children.forEach(dfs);//forEach回调不传参数，默认传的参数就是item项
}
```