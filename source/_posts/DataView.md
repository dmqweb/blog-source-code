---
title: DataView
date: 2023-12-8 12:24:4
categories:
- JS
tags:
- JS
- DataView
---

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

需要注意的是，DataView 的方法名都以数据类型名称开头，并以字节偏移量作为第一个参数。例如，setInt16(offset, value) 方法将一个 16 位整数值写入到指定偏移量处，而 getInt32(offset) 方法则从指定偏移量处读取一个 32 位整数值。这些方法还可以接受一个可选的第二个参数，用于指定字节序，以帮助正确地解释二进制数据。

总之，DataView 提供了一种灵活和可定制的方式来读取和写入 ArrayBuffer 中的二进制数据，可以指定不同的字节序和数据类型，并支持任意偏移量和长度。

