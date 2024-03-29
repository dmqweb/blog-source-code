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

``` json
# json数据的格式可以是： 
{"name":"admin","age":18}  是{}括起来的键值对
# 也可以是：  
[{"name":"admin","age":18},{"name":"root","age":16},{"name":"张三","age":20}] 
是[]括起来的元素
可以嵌套
```

``` java
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

# ajax

```javascript
$.ajax({
        type: 'GET',
        url: '/getData',
        success: function (resp){
            console.log(typeof (resp));
            //字符串转换为json对象
            console.log(resp);
            var obj=JSON.parse(resp)
            //var obj = eval( "(" + resp + ")" );
            xdata=obj[0];
            console.log(xdata);
            ydata=obj[1];
            console.log(ydata);
        }
    });
```

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

