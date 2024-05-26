---
title: Blob、File和FileReader
tags: 
- Blob
- FileReader
categories: Blob
date: 2024-05-17 10:22:13
---



# Blob

Blob的全称为：binary larget object（二进制大对象），blob的本质是一个js对象，里面可以存储大量的二进制编码的数据。

### 特点：

- 不可修改
- 只能使用FileReader读取内容
- 存储大量二进制数据的 js 对象

### 使用：

**new Blob(array,options)**

- array是由ArrayBuffer、ArrayBufferView、Blob和DOMString对象构成的，将对被放进blob中

- options配置项有：

  - type：默认值为：” “，表示将会被放入到blob中的数组内容的MIME类型。

  - endings：默认值为：”transparent“，用于指定包含行结束符\n的字符串如何被写入，不常用。

    | MIME类型         | 描述           |
    | ---------------- | -------------- |
    | text/plain       | 纯文本文档     |
    | text/html        | HTML文档       |
    | text/javascript  | JavaScript文档 |
    | text/css         | CSS文件        |
    | application/json | JSON文件       |
    | application/pdf  | pdf文件        |
    | application/xml  | XML文件        |
    | image/jpeg       | JPEG文件       |
    | image/png        | PNG文件        |
    | image/gif        | GIF文件        |
    | image/svg+xml    | SVG+XML文件    |
    | audio/mpeg       | MP3文件        |
    | video/mpeg       | MP4文件        |

    

```js
let blob = new Blob(['hello world'],{type:"text/plain"});
```

### 分片：

Blob 对象内置了 slice() 方法用来将 blob 对象分片

其有三个参数：

start：设置切片的起点，即切片开始位置。默认值为 0，这意味着切片应该从第一个字节开始；

end：设置切片的结束点，会对该位置之前的数据进行切片。默认值为blob.size；

contentType：设置新 blob 的 MIME 类型。如果省略 type，则默认为 blob 的原始值。

```js
let blob = new Blob(['hello world'],{type:"text/plain"});
let blob1 = blob.slice(0,2,"text/plain");
```

### 读取：

blob对象只能通过FileReader读取内容。

```js
let blob = new Blob(['hello world'],{type:"text/plain"});
let reader = new fileReader();
reader.readAsText(blob);
console.log(reader.result);
```

# File

### 介绍：

File对象是特殊的Blob对象。是基于Blob对象的进一步封装，js中主要有两种方式获得FIle对象：

1. input元素选择后返回的FileList对象（通过change事件的event.target.files获取）
2. 文件拖放操作生成的DataTransfer对象（通过ondrop事件的event.dataTransfer.files获取）

# FileReader

### 介绍：

FileReader用于读取Blob对象（包含File对象）内容的方法，通过result属性获取。

- readAsArrayBuffer方法：读取为ArrayBuffer

- readAsDataURL方法：读取为data:URL的Base64字符串表示文件内容

- readAsText方法：读取为原始text文件内容

- readAsBinaryString方法：读取为原始二进制数据

  但是直接使用此方法还是会得到原始的文本内容，因为二进制数据需要使用ArrayBuffer对象来进行处理。

# ArrayBuffer

### 介绍：

ArrayBuffer可以理解为一个特殊的数组，其本身是一个黑盒，不能直接读写所存储的数据，需要借助视图对象来读写。它只是一个用于存储二进制数据的缓冲区，创建时只能传一个空间大小biteLength。

**读写ArrayBuffer的方式：**

1. TypedArray
2. DataView
3. TextDecoder
4. 用Blob存储，然后用FileReader读写

### 方法：

ArrayBuffer提供了一个slice方法用于切片。参数为：开始位置，结束位置和解析类型。

### 使用：

```js
const buffer = new ArrayBuffer(32);
buffer.slice(0,4,'text/plain');
```

# TypedArray

TypedArray只是一个概念，提供了一种机制来解读ArrayBuffer中的数据（相当于一个视图，将ArrayBuffer中的数据进行展示和操作），实际上是那九个类型对象（每个类型对应一个特定的数据类型和大小）：

- `Int8Array`：8位有符号整数
- `Uint8Array`：8位无符号整数
- `Int16Array`：16位有符号整数
- `Uint16Array`：16位无符号整数
- `Int32Array`：32位有符号整数
- `Uint32Array`：32位无符号整数
- `Float32Array`：32位浮点数
- `Float64Array`：64位浮点数

### 使用：

```js
const buffer = new ArrayBuffer(32);
const slice = buffer.slice(0,4,'text/plain');
const sliceView = new Int8Array(slice);
sliceView.set([10,20,30]);
sliceView.forEach((value,index)=>{
    console.log(value,index);
})
```

# DataView

### 读取：

DataView数据视图可以用于读写buffer,DataView实例提供了许多方法来读取内存，他们呢的参数都是一个字节序号。表示开始读取的字节位置：

- getInt8：读取1个字节，返回一个8位整数
- getUint8：读取1个字节，返回一个无符号8位整数
- getInt16：读取2个字节，返回一个16位整数
- getUnit16：读取2个字节，返回一个无符号16位整数
- getInt32：读取4个字节，返回一个32位整数
- getUnit32：读取4个字节，返回一个无符号32位整数
- getFloat32：读取4个字节，返回一个32位浮点数
- getUnit64：读取8个字节，返回一个64位浮点数

### 写入：

DataView实例提供以下方法写入内存，他们都接受两个参数，第一个参数表示开始写入数据的字节序号，第二个参数为写入的数据：

- setInt8：写入1个字节的8位整数
- setUint8：写入1个字节的8位无符号整数
- setInt16：写入2个字节的16位整数
- setUint16：写入2个字节的16位无符号整数
- setInt32：写入4个字节的32位整数
- setUnit32：写入4个字节的32位无符号整数
- setFloat32：写入4个字节的32位浮点数
- setFloat64：写入8个自己的64位浮点数

# Object URL

Object URL是一个用于表示File Object或者Blob Object的URL，可以将**Blob对象（包括File对象）**变为一个URL地址。

### 使用：

使用URL.createObjectURL来创建。

```js
const blob = new Blob(['你好世界'],{type:'text/plain'});
const newUrl = URL.createObjectURL(blob);
```

# base64编码

### 介绍：

base64是一个保存二进制数据的工具，将多种形式的二进制数据或其构成的文件**以ASCII的形式保存**，因为很多地方不支持直接的二进制文件保存或呈现，比如可以将图片直接转换成base64码嵌入HTML文档中，而避免使用网络http加载图片。另外，将数据编码为 base64 进行传输，然后解码获得数据，可以一定程度上保证数据的完整并且不用在传输过程中修改这些数据，避免在传输过程中可能出现的问题；

### 组成：

`A-Z a-z 0-9 + /` 共64个字符组成;

### 使用：

JS中有两个函数用于base64格式（ASCII码）的转换:

- btoa()：编码（Binary To ASCII  二进制转ASCII）

  该函数用于将二进制转为Base64字符串（ASCII码）

- atob()：解码（ASCII To Binary  ASCII码转二进制）

  该函数用于将Base64字符串（ASCII码）解码为二进制

### 注意：

btoa和atob方法有个弊端就是只能处理拉丁字符集内的字符，其不包括中文或非西欧语言的字符（**只能处理单字节字符**）。要处理多字节字符需要使用TextEncoder API将字符串转为Uint8Array，然后手动将这些字节转为一个字符串（String.fromCharCode）。

# TextEncoder

### 介绍：

TextEncoder构造函数创建一个编码器，encode方法用于将字符串编码为一个UTF-8编码文本的Uint8Array视图。

### 使用：

```js
const encoder = new TextEncoder();
const view = encoder.encode("$");
console.log(view)
```

