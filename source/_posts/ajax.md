---
title: ajax
date: 2023-1-8 12:24:4
categories:
- ajax
tags:
- ajax
---
# HTTP协议请求报文、响应

一个HTTP请求报文可以由请求行、请求头、空行和请求体4个部分组成。
一个HTTP响应报文是由响应行、响应头、空行和响应体4个部分组成。
（报文(message)是网络中交换与传输的数据单元）

https://zhuanlan.zhihu.com/p/533284035  （超详细的HTTP协议请求报文、响应报文教程）

# 

# JSON

## 什么是json

 JSON是一种轻量级的数据交互格式。可以按照JSON指定的格式去组织和封装数据

JSON本质上是一个带有特定格式的字符串

主要功能：json就是一种在各个编程语言中流通的数据格式，负责不同编程语言中的数据传递和交互. 类似于：
国际通用语言-英语
中国56个民族不同地区的通用语言-普通话

## json有什么用

各种编程语言存储数据的容器不尽相同,在Python中有字典dict这样的数据类型, 而其它语言可能没有对应的字典。
为了让不同的语言都能够相互通用的互相传递数据，JSON就是一种非常良好的中转数据格式。

## json格式数据转化

```json
# json数据的格式可以是： 
{"name":"admin","age":18}  是{}括起来的键值对
# 也可以是：  
[{"name":"admin","age":18},{"name":"root","age":16},{"name":"张三","age":20}] 
是[]括起来的元素
可以嵌套
```

```java
<!-- https://mvnrepository.com/artifact/com.alibaba/fastjson -->
        <dependency>
            <groupId>com.alibaba</groupId>
            <artifactId>fastjson</artifactId>
            <version>2.0.39</version>
        </dependency>
```

Java中：java转json字符串

```java
String jsonStr = JSON.toJSONString(objs);
```

JS中：json字符串转JavaScript对象

```java
  JSON.parse(this.responseText)
```

# 

# Ajax

Ajax（Asynchronous JavaScript And XML）即异步 JavaScript 和 XML，是一组用于在网页上进行异步数据交换的Web开发技术，可以在不刷新整个页面的情况下向服务器发起请求并获取数据，然后将数据插入到网页中的某个位置。这种技术能够实现增量式更新页面，提高用户交互体验，减少响应时间和带宽的消耗。

### 优点

- 提升用户体验（通过减少页面的重载和刷新，使得网站变得更加灵活和的动态）
- 减轻服务器压力（通过Ajax可以有效减少服务器接收到的请求次数和需要响应的数据量）
- 提高响应速度（异步获得数据并更新页面）
- 增加交互性（页面变得动态性和交互性）

### 缺点

- Ajax对SEO（搜索引擎优化不友好）
- 使用Ajax时，需要考虑数据安全性和网络安全性，并采取相应的措施防范

# 

# XMLHttpRequest

### 使用

使用 `XMLHttpRequest` 可以通过 JavaScript 发起HTTP请求，接收来自服务器的响应，并动态地更新网页中的内容。这种异步通信方式不会阻塞用户界面，有利于增强用户体验。

```javascript
// 发送get请求
const xhr = new XMLHttpRequest();
xhr.open('GET', 'http://localhost:3000/api/txt')
xhr.onload = function() {
  if (xhr.status === 200) {
        document.querySelector('#result').innerText = xhr.responseText;
    }
    else {
       console.log('Request failed.  Returned status of ' + xhr.status);
   }
};
xhr.send(null);
// 发送post请求
const xhr = new XMLHttpRequest();
xhr.open('POST', 'http://localhost:3000/api/post')
xhr.setRequestHeader('Content-Type', 'application/json');
xhr.onload = function() {
  if (xhr.status === 200) {
        document.querySelector('#result').innerText = xhr.responseText;
    }
    else {
       console.log('Request failed.  Returned status of ' + xhr.status);
   }
};
xhr.send(JSON.stringify({name: 'zhangsan', age: 18}));
```

### 中断请求

xhr通过addEventListener事件监听的机制来进行请求的中断和超时处理。

```javascript
xhr.addEventListener('abort', function (event) {
    console.log('我被中断了');
});
```

### 超时时间

```javascript
xhr.addEventListener('timeout', function (event) {
     console.log('超时啦');
});
```

### 监听进度

xhr中的监听进度可以获得全过程的进行进度，这是fetch这个api所没有的

```javascript
xhr.addEventListener('progress', function (event) {
document.querySelector('#progress').innerText = `${(event.loaded / event.total * 100).toFixed(2)}%`;
});
```

# 

# Fetch

### 使用

**fetch返回格式：**

- text(): 将响应体解析为纯文本字符串并返回。

- json(): 将响应体解析为JSON格式并返回一个JavaScript对象。

- blob(): 将响应体解析为二进制数据并返回一个Blob对象。

- arrayBuffer(): 将响应体解析为二进制数据并返回一个ArrayBuffer对象。

- formData(): 将响应体解析为FormData对象。

```javascript
// get请求
fetch('http://localhost:3000/api/txt').then(res => {
    console.log(res);
    return res.text()
}).then(res => {
    console.log(res);
})
// post请求
fetch('http://localhost:3000/api/post',{
    method:'POST',
    headers:{
        'Content-Type':'application/json'
    },
    body:JSON.stringify({
        name:'zhangsan',
        age:18
    })
}).then(res => {
    console.log(res);
    return res.json()
}).then(res => {
    console.log(res);
})
```

### 中断请求

使用 `AbortController` 的 `abort`方法中断

```javascript
const abort = new AbortController()
fetch('http://localhost:3000/api/post',{
    method:'POST',
    headers:{
        'Content-Type':'application/json'
    },
    signal:abort.signal,
    body:JSON.stringify({
        name:'zhangsan',
        age:18
    })
}).then(res => {
    console.log(res);
    return res.json()
}).then(res => {
    console.log(res);
})

document.querySelector('#stop').addEventListener('click', () => {
        console.log('stop');
        abort.abort()
})
```

### 获取进度

使用data.clone()方法复制了响应对象data，然后使用getReader()方法获取数据流中的reader对象，接着通过读取数据流并计算已加载字节数，实现了一个基于原生JavaScript的进度条功能。

```javascript
const btn = document.querySelector('#send')
const sendFetch = async () => {
    const data = await fetch('http://localhost:3000/api/txt',{
        signal:abort.signal
    })
    //fetch 实现进度条
    const response = data.clone()
    const reader = data.body.getReader()
    const contentLength = data.headers.get('Content-Length')
    let loaded = 0
    while (true) {
        const { done, value } = await reader.read()
        if (done) {
            break
        }
        loaded += value?.length || 0;
        const progress = document.querySelector('#progress')
        progress.innerHTML = (loaded / contentLength * 100).toFixed(2) + '%'
    }
    const text = await response.text()
    console.log(text);
}
btn.addEventListener('click', sendFetch)
```

### 携带cookie

```javascript
const data = await fetch('http://localhost:3000/api/txt',{
    signal:abort.signal,
    //cookie
    credentials:'include',
})
```

# Fetch和XMLHTTPRequest对比

`fetch` 和 `XMLHttpRequest`（XHR）都是前端与服务器进行数据交互的常用方式，它们各有优缺点，下面是它们的比较：

- API 设计和使用方式

`fetch` 的 API 设计更加现代化、简洁和易于使用，使用起来更加直观和方便。相比之下，XHR 的 API 设计比较繁琐，需要进行多个参数的配置和回调函数的处理。

- 支持的请求方法

`fetch` API 默认只支持 GET 和 POST 请求方法，而 XHR 则支持所有标准的 HTTP 请求方法。

- 请求头部

在 `fetch` 中设置请求头部的方式更加清晰和直接，可以通过 `Headers` 对象进行设置，而 XHR 的方式相对较为繁琐。

- 请求体

在发送 POST 请求时，`fetch` API 要求将请求体数据作为参数传递给 `fetch` 方法中的 `options` 对象，而 XHR 可以直接在 `send()` 方法中设置请求体数据。

- 支持的数据类型

在解析响应数据时，`fetch` API 提供了多种方法，包括 `.json()`, `.blob()`, `.arrayBuffer()` 等，而 XHR 只支持文本和二进制数据两种数据类型。

- 跨域请求

在进行跨域请求时，`fetch` API 提供了一种简单而强大的解决方案——使用 CORS（跨域资源共享）头部实现跨域请求，而 XHR 则使用了一个叫做 `XMLHttpRequest Level 2` 的规范，在代码编写上相对较为繁琐。

总的来说，`fetch` API 与 XHR 各有优缺点，具体选择哪种方式还需要根据具体情况进行考虑。平时开发中使用较多的是 `fetch` ，因为它使用方便、API 简洁、语法清晰，同时也支持了大多数常用的功能，可以有效地简化前端开发流程。

# 

# axios

专注与网络请求的库
相比于原生的XMLHttpRequest对象，axios简单易用
相比与jQuery，axios更加轻量化，只专注与网络数据请求

## **axios发起GET请求：**

```javascript
var url=''
var paramsObj={name:'zs',age:20}
axios.get(url,{params:paramsObj})
	.then(function(res){
		console.log(res)
		//res.data 服务器响应的数据
		console.log(res.data)
	})
```

## **axios发起POST请求：**

```javascript
var url='http://'
var dataObj={location:'Beijing',address:'haidian'}
axios.post(url,dataObj)
	.then(function(res){
		console.log(res)
		//res.data 服务器响应的数据
		console.log(res.data)
	})
```

## **直接使用axios发起请求：**

axios页提供了类似于jQuery中的$.ajax()的函数，语法如下：

```javascript
axios({
	method:'GET'
	url:''
	//GET参数要通过params属性提供
	params:{name:'zs',age:20}
})
	.then(function(res){
		console.log(res.data)
	})
-------------------------------------
axios({
	method:'POST'
	url:''
	//POST参数要通过data属性提供
	data:{bookname:'thinking java',price:20}
})
	.then(function(res){
		console.log(res.data)
	})
```

# 

# navigator.sendBeacon

```javascript
//性能中继器，使用不同指标来衡量和分析应用程序的性能
//当页面上任何指标值完成计算时，将传递计算出的结果并触发这个函数
//可以使用它将结果记录到控制台或者发送到特定端点
function sendTo(metric){
    const content = JSON.stringify(metric);
    if(navigator.sendBeacon){
        navigator.sendBeacon('http://test',content); //navigator.sendBeacon的作用是
    }else{
        fetch('http://test.com',{
        content,
        method:'POST',
        keepAlive:true //fetch中的keepAlice保证了即使页面刷新或者关闭，发出的请求仍然存在并进行，而不是进行到一半的请求突然停止
    }).then(()=>{
    console.log('发送成功');
    }).catch((e)=>{
        console.error(e);
    })
    }
}
reportWebVitals(sendTo); //每一次得到计算结果都会执行一次
```

### 对比 Ajax fetch

##### 优点

1. **不受页面卸载过程的影响，确保数据可靠发送**。
2. **异步执行，不阻塞页面关闭或跳转**。
3. **能够发送跨域请求**。

##### 缺点

1. fetch 和 ajax 都可以发送任意请求 而 sendBeacon **只能发送POST**
2. fetch 和 ajax 可以传输任意字节数据 而 **sendBeacon 只能传送少量数据**（64KB 以内）
3. fetch 和 ajax 可以定义任意请求头 而  **sendBeacon 无法自定义请求头**
4. sendBeacon 只能传输 [`ArrayBuffer`](https://link.juejin.cn?target=https%3A%2F%2Fdeveloper.mozilla.org%2Fzh-CN%2Fdocs%2FWeb%2FJavaScript%2FReference%2FGlobal_Objects%2FArrayBuffer)、[`ArrayBufferView`](https://link.juejin.cn?target=https%3A%2F%2Fdeveloper.mozilla.org%2Fzh-CN%2Fdocs%2FWeb%2FJavaScript%2FReference%2FGlobal_Objects%2FTypedArray)、[`Blob`](https://link.juejin.cn?target=https%3A%2F%2Fdeveloper.mozilla.org%2Fzh-CN%2Fdocs%2FWeb%2FAPI%2FBlob)、[`DOMString`](https://link.juejin.cn?target=https%3A%2F%2Fdeveloper.mozilla.org%2Fzh-CN%2Fdocs%2FWeb%2FJavaScript%2FReference%2FGlobal_Objects%2FString)、[`FormData`](https://link.juejin.cn?target=https%3A%2F%2Fdeveloper.mozilla.org%2Fzh-CN%2Fdocs%2FWeb%2FAPI%2FFormData) 或 [`URLSearchParams`](https://link.juejin.cn?target=https%3A%2F%2Fdeveloper.mozilla.org%2Fzh-CN%2Fdocs%2FWeb%2FAPI%2FURLSearchParams) 类型的数据
5. `如果处于危险的网络环境，或者开启了广告屏蔽插件 此请求将无效`

### 应用场景

1. 发送心跳包：可以使用 `navigator.sendBeacon` 发送心跳包，以保持与服务器的长连接，避免因为长时间没有网络请求而导致连接被关闭。
2. 埋点：可以使用 `navigator.sendBeacon` 在页面关闭或卸载时记录用户在线时间，pv uv，以及错误日志上报 按钮点击次数。
3. 发送用户反馈：可以使用 `navigator.sendBeacon` 发送用户反馈信息，如用户意见、bug 报告等，以便进行产品优化和改进
