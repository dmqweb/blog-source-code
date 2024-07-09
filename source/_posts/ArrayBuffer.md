---
title: ArrayBuffer
date: 2023-9-2 12:24:4
categories:
- JS
tags:
- JS
- ArrayBuffer
---

# ArrayBuffer:
ArrayBuffer 是 JavaScript 中用于表示通用的固定长度的二进制数据缓冲区的对象。它可以在内存中分配一块连续的内存空间，用于存储二进制数据。

ArrayBuffer 对象本身只是一个占用了一定字节数的内存块，它没有提供直接的方法来读取或写入数据。为了操作 ArrayBuffer 中的数据，我们需要使用不同的视图（如 TypedArray 或 DataView）来读取、写入和操作底层的二进制数据。

在内存中，ArrayBuffer 对象以连续的字节序列表示。这意味着存储在 ArrayBuffer 中的数据是紧密排列的，没有额外的空隙或填充。每个字节都有一个唯一的地址，我们可以通过偏移量来访问和操作特定位置的字节。

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

需要注意的是，ArrayBuffer 的长度是固定的，一旦分配了特定大小的内存空间，就无法改变它的大小。如果我们需要更改数据的长度，我们需要创建一个新的 ArrayBuffer，并将旧数据拷贝到新的 ArrayBuffer 中。

总之，ArrayBuffer 提供了一种在 JavaScript 中操作底层二进制数据的机制，它在内存中以连续的字节序列表示，可以用于存储和操作各种类型的二进制数据。