---
title: Blob
date: 2023-12-7 12:24:4
categories:
- JS
tags:
- JS
- Blob
---

# Blob:
Blob（Binary Large Object）对象是 JavaScript 中用来表示二进制数据的对象，通常用于存储和操作文件或其他类型的二进制数据。Blob 对象可以表示大型数据对象，比如图像、视频、音频文件等。

Blob 对象通常由两部分组成：数据和数据的类型。数据部分包含实际的二进制数据，而类型部分描述了数据的 MIME 类型，例如 “image/png” 或 “application/pdf”。

Blob 对象可以通过 new Blob() 构造函数创建，传入一个数组作为参数，数组中包含要存储的二进制数据。另外，你还可以通过传入一个可选的对象参数，来指定数据的 MIME 类型。例如：
```js
javascriptCopy Codevar binaryData = [0x48, 0x65, 0x6c, 0x6c, 0x6f]; // 用十六进制表示的字符串 "Hello"
var blob = new Blob([binaryData], { type: "text/plain" });
```
在上面的例子中，我们使用 new Blob() 创建了一个包含 “Hello” 文本数据的 Blob 对象，并指定了它的 MIME 类型为 “text/plain”。

Blob 对象可以被用于多种用途，比如：

通过 URL.createObjectURL() 方法创建一个临时的 URL，用于在页面中显示或下载文件,一般配置a标签（download属性）。
作为 XMLHttpRequest 的响应数据类型，用于接收和处理文件或二进制数据。
作为 FormData 对象的值，用于将二进制数据发送到服务器。
总之，Blob 对象在 JavaScript 中提供了一种方便的方式来处理和操作二进制数据，特别适合于文件操作和网络通信中的数据传输