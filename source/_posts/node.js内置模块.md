---
title: node.js内置模块
date: 2024-1-2 2:24:4
categories:
- node.js
tags:
- node.js
---
# 05 【nodejs内置模块（上）】

## nodejs 的官方API文档

- Node.js 的API文档（英文）： https://nodejs.org/docs/latest-v8.x/api/index.html
- Node.js 的API文档（中文）：http://nodejs.cn/api/

关于 Node.js 的内置模块和常见API，可以看官方文档。

查阅文档时，稳定指数如下：

- 红色：废弃。
- 橙色：实验。表示当前版本可用，其他版本不确定。也许不向下兼容，建议不要在生产环境中使用该特性。
- 绿色：稳定。与 npm 生态系统的兼容性是最高的优先级。

## nodejs 中模块的分类

Node.js 应用由模块组成，采用 CommonJS 模块规范。Node.js中的模块分为三种：

- 内置模块
- 第三方模块
- 自定义模块

下面简单介绍一下。

### 内置模块

```js
const process = require('process');
const path = require('path');

console.log(process.version);
console.log(path.resolve('../'));
```

require方法用于加载模块。

常见的内置模块包括：

- FS：文件系统模块
- path：路径模块
- OS：操作系统相关
- net：网络相关
- http
- ...

你可能会有疑问：Node.js 这么牛吗？还能直接和操作系统做交互？

带着这个疑问，我们不妨简单看看 Node.js 的源码，以 os 模块举例：

- 打开os模块的源码：https://github.com/nodejs/node/blob/master/lib/os.js，翻到最底部，找到 `cpus`这个方法
- 进而找到 `getCPUs()`
- internalBinding('os')：通过 internalBinding 可以调用系统底层的方法。internalBinding 主要是 JS 虚拟机在做的事情。
- `internalBinding('os')` 的实现，在 https://github.com/nodejs/node/blob/master/src/node_os.cc 里，里面都是 C++ 的代码。比如有一个`getCPUs`方法。

现在你知道了，JS本身是没有能力获取底层系统资源的，这一切都是 JS虚拟机在和底层做交互，然后通过 JS 的表现形式，暴露给应用层。

另外，还有很多库，是直接使用C/++编写的，通过编译之后，再提供给 JS 应用层调用，或者直接提供给 Node.js层使用。

**所有的编程语言底层都会回归C/C++**，甚至是汇编语言。

### require 加载第三方包的机制

```js
const express = require('express');
```

require 加载第三方包的机制：

（1）第三方包安装好后，这个包一般会存放在当前项目的 node_modules 文件夹中。我们找到这个包的 package.json 文件，并且找到里面的main属性对应的入口模块，这个入口模块就是这个包的入口文件。

（2）如果第三方包中没有找到package.json文件，或者package.json文件中没有main属性，则默认加载第三方包中的index.js文件。

（3）如果在 node_modules 文件夹中没有找到这个包，或者以上所有情况都没有找到，则会向上一级父级目录下查找node_modules文件夹，查找规则如上一致。

（4）如果一直找到该模块的磁盘根路径都没有找到，则会报错：can not find module xxx。

### 自定义模块（module）

每个文件就是一个模块，有自己的作用域。在一个文件里面定义的变量、函数、类，都是私有的，对其他文件不可见。

举例：

```js
var example = require('./example.js');
console.log(example.x); // 5
console.log(example.addX(1)); // 6
```

## 网络服务 http

### http模块概览

大多数nodejs开发者都是冲着开发web server的目的选择了nodejs。正如官网所展示的，借助http模块，可以几行代码就搞定一个超迷你的web server。

在nodejs中，`http`可以说是最核心的模块，同时也是比较复杂的一个模块。上手很简单，但一旦深入学习，不少初学者就会觉得头疼，不知从何入手。

本文先从一个简单的例子出发，引出`http`模块最核心的四个实例。看完本文，应该就能够对http模块有个整体的认识。

### 一个简单的例子

在下面的例子中，我们创建了1个web服务器、1个http客户端

- 服务器server：接收来自客户端的请求，并将客户端请求的地址返回给客户端。
- 客户端client：向服务器发起请求，并将服务器返回的内容打印到控制台。

代码如下所示，只有几行，但包含了不少信息量。下一小节会进行简单介绍。

```js
var http = require('http');

// http server 例子
var server = http.createServer(function(serverReq, serverRes){
    var url = serverReq.url;
    serverRes.end( '您访问的地址是：' + url );
});

server.listen(3000);

// http client 例子
var client = http.get('http://127.0.0.1:3000', function(clientRes){
    clientRes.pipe(process.stdout);
});
```

### 例子解释

在上面这个简单的例子里，涉及了4个实例。大部分时候，serverReq、serverRes 才是主角。

- server：http.Server实例，用来提供服务，处理客户端的请求。
- client：http.ClientReques实例，用来向服务端发起请求。
- serverReq/clientRes：其实都是 http.IncomingMessage实例。serverReq 用来获取客户端请求的相关信息，如request header；而clientRes用来获取服务端返回的相关信息，比如response header。
- serverRes：http.ServerResponse实例

### 关于http.IncomingMessage、http.ServerResponse

先讲下 http.ServerResponse 实例。作用很明确，服务端通过http.ServerResponse 实例，来个请求方发送数据。包括发送响应表头，发送响应主体等。

接下来是 http.IncomingMessage 实例，由于在 server、client 都出现了，初学者难免有点迷茫。它的作用是

在server端：获取请求发送方的信息，比如请求方法、路径、传递的数据等。 在client端：获取 server 端发送过来的信息，比如请求方法、路径、传递的数据等。

http.IncomingMessage实例 有三个属性需要注意：method、statusCode、statusMessage。

- method：只在 server 端的实例有（也就是 serverReq.method）
- statusCode/statusMessage：只在 client 端 的实例有（也就是 clientRes.method）

## 网络服务 http res

### 概览

http模块四剑客之一的`res`，应该都不陌生了。一个web服务程序，接受到来自客户端的http请求后，向客户端返回正确的响应内容，这就是`res`的职责。

返回的内容包括：状态代码/状态描述信息、响应头部、响应主体。下文会举几个简单的例子。

```js
var http = require('http');
var server = http.createServer(function(req, res){
    res.end('ok');
});
server.listen(3000);
```

### 例子

在下面的例子中，我们同时设置了 状态代码/状态描述信息、响应头部、响应主体，就是这么简单。

```js
var http = require('http');

// 设置状态码、状态描述信息、响应主体
var server = http.createServer(function(req, res){
    res.writeHead(200, 'ok', {
        'Content-Type': 'text/plain'
    });
    res.end('hello');
});

server.listen(3000);
```

### 设置状态代码、状态描述信息

`res`提供了 res.writeHead()、res.statusCode/res.statusMessage 来实现这个目的。

举例，如果想要设置 200/ok ，可以

```js
res.writeHead(200, 'ok');
```

也可以

```js
res.statusCode = 200;
res.statusMessage = 'ok';
```

两者差不多，差异点在于

1. res.writeHead() 可以提供额外的功能，比如设置响应头部。
2. 当响应头部发送出去后，res.statusCode/res.statusMessage 会被设置成已发送出去的 状态代码/状态描述信息。

### 设置响应头部

`res`提供了 res.writeHead()、response.setHeader() 来实现响应头部的设置。

举例，比如想把 `Content-Type` 设置为 `text-plain`，那么可以

```js
// 方法一
res.writeHead(200, 'ok', {
    'Content-Type': 'text-plain'
});

// 方法二
res.setHeader('Content-Type', 'text-plain');
```

两者的差异点在哪里呢？

1. res.writeHead() 不单单是设置header。
2. 已经通过 res.setHeader() 设置了header，当通过 res.writeHead() 设置同名header，res.writeHead() 的设置会覆盖之前的设置。

关于第2点差异，这里举个例子。下面代码，最终的 `Content-Type` 为 `text/plain`。

```js
var http = require('http');

var server = http.createServer(function(req, res){
    res.setHeader('Content-Type', 'text/html');
    res.writeHead(200, 'ok', {
        'Content-Type': 'text/plain'
    });
    res.end('hello');
});

server.listen(3000);
```

而下面的例子，则直接报错。报错信息为 `Error: Can't set headers after they are sent.`。

```js
var http = require('http');

var server = http.createServer(function(req, res){    
    res.writeHead(200, 'ok', {
        'Content-Type': 'text/plain'
    });
    res.setHeader('Content-Type', 'text/html');
    res.end('hello');
});

server.listen(3000);
```

### 其他响应头部操作

增、删、改、查 是配套的。下面分别举例说明下，例子太简单就直接上代码了。

```js
// 增
res.setHeader('Content-Type', 'text/plain');

// 删
res.removeHeader('Content-Type');

// 改
res.setHeader('Content-Type', 'text/plain');
res.setHeader('Content-Type', 'text/html');  // 覆盖

// 查
res.getHeader('content-type');
```

其中略显不同的是 res.getHeader(name)，name 用的是小写，返回值没做特殊处理。

```js
res.setHeader('Content-Type', 'TEXT/HTML');
console.log( res.getHeader('content-type') );  // TEXT/HTML

res.setHeader('Content-Type', 'text/plain');
console.log( res.getHeader('content-type') );  // text/plain
```

此外，还有不那么常用的：

- res.headersSent：header是否已经发送；
- res.sendDate：默认为true。但为true时，会在response header里自动设置Date首部。

### 设置响应主体

主要用到 res.write() 以及 res.end() 两个方法。

res.write() API的信息量略大，建议看下[官方文档](https://nodejs.org/api/http.html#http_response_write_chunk_encoding_callback)。

#### response.write(chunk[, encoding][, callback])

- chunk：响应主体的内容，可以是string，也可以是buffer。当为string时，encoding参数用来指明编码方式。（默认是utf8）
- encoding：编码方式，默认是 utf8。
- callback：当响应体flushed时触发。（TODO 这里想下更好的解释。。。）

使用上没什么难度，只是有些注意事项：

1. 如果 res.write() 被调用时， res.writeHead() 还没被调用过，那么，就会把header flush出去。
2. res.write() 可以被调用多次。
3. 当 res.write(chunk) 第一次被调用时，node 会将 header 信息 以及 chunk 发送到客户端。第二次调用 res.write(chunk) ，node 会认为你是要streaming data（WTF，该怎么翻译）。。。

> Returns true if the entire data was flushed successfully to the kernel buffer. Returns false if all or part of the data was queued in user memory. 'drain' will be emitted when the buffer is free again.

#### response.end([data][, encoding][, callback])

掌握了 res.write() 的话，res.end() 就很简单了。res.end() 的用处是告诉nodejs，header、body都给你了，这次响应就到这里吧。

有点像个语法糖，可以看成下面两个调用的组合。至于callback，当响应传递结束后触发。

```js
res.write(data, encoding);
res.end()
```

### 超时处理

接口：response.setTimeout(msecs, callback)

关于 timeout 事件的说明，同样是言简意赅（WTF），话少信息量大，最好来个demo TODO

> If no 'timeout' listener is added to the request, the response, or the server, then sockets are destroyed when they time out. If you assign a handler on the request, the response, or the server's 'timeout' events, then it is your responsibility to handle timed out sockets.

### 事件 close/finish

- close：response.end() 被调用前，连接就断开了。此时会触发这个事件。
- finish：响应header、body都已经发送出去（交给操作系统，排队等候传输），但客户端是否实际收到数据为止。（这个事件后，res 上就不会再有其他事件触发）

### 其他不常用属性/方法

- response.finished：一开始是false，响应结束后，设置为true。
- response.sendDate：默认是true。是否自动设置Date头部。（按HTTP协议是必须要的，除非是调试用，不然不要设置为false）
- response.headersSent：只读属性。响应头部是否已发送。
- response.writeContinue()：发送 HTTP/1.1 100 Continue 消息给客户端，提示说服务端愿意接受客户端的请求，请继续发送请求正文（body)。（TODO 做个demo啥的是大大的好）

## 网络服务 http req

### 概览

本文的重点会放在`req`这个对象上。前面已经提到，它其实是http.IncomingMessage实例，在服务端、客户端作用略微有差异

- 服务端处：获取请求方的相关信息，如request header等。
- 客户端处：获取响应方返回的相关信息，如statusCode等。

服务端例子：

```js
// 下面的 req
var http = require('http');
var server = http.createServer(function(req, res){
    console.log(req.headers);
    res.end('ok');
});
server.listen(3000);
```

客户端例子

```js
// 下面的res
var http = require('http');
http.get('http://127.0.0.1:3000', function(res){
    console.log(res.statusCode);
});
```

### 属性/方法/事件 分类

http.IncomingMessage的属性/方法/事件 不是特别多，按照是否客户端/服务端 特有的，下面进行简单归类。可以看到

- 服务端处特有：url
- 客户端处特有：statusCode、statusMessage

| 类型 |     名称      | 服务端 | 客户端 |
| :--- | :-----------: | :----: | :----: |
| 事件 |    aborted    |   ✓    |   ✓    |
| 事件 |     close     |   ✓    |   ✓    |
| 属性 |    headers    |   ✓    |   ✓    |
| 属性 |  rawHeaders   |   ✓    |   ✓    |
| 属性 |  statusCode   |   ✕    |   ✓    |
| 属性 | statusMessage |   ✕    |   ✓    |
| 属性 |  httpVersion  |   ✓    |   ✓    |
| 属性 |      url      |   ✓    |   ✕    |
| 属性 |    socket     |   ✓    |   ✓    |
| 方法 |  .destroy()   |   ✓    |   ✓    |
| 方法 | .setTimeout() |   ✓    |   ✓    |

### 服务端的例子

#### 例子一：获取httpVersion/method/url

下面是一个典型的HTTP请求报文，里面最重要的内容包括：HTTP版本、请求方法、请求地址、请求头部。

```http
GET /hello HTTP/1.1
Host: 127.0.0.1:3000
Connection: keep-alive
Cache-Control: no-cache
```

那么，如何获取上面提到的信息呢？很简单，直接上代码

```js
// getClientInfo.js
var http = require('http');

var server = http.createServer(function(req, res){
    console.log( '1、客户端请求url：' + req.url );
    console.log( '2、http版本：' + req.httpVersion );
    console.log( '3、http请求方法：' + req.method );
    console.log( '4、http请求头部' + JSON.stringify(req.headers) );

    res.end('ok');
});

server.listen(3000);
```

效果如下：

```bash
1、客户端请求url：/hello
2、http版本：1.1
3、http请求方法：GET
4、http headers：{"host":"127.0.0.1:3000","connection":"keep-alive","cache-control":"no-cache","user-age
```

#### 例子二：获取get请求参数

服务端代码如下：

```js
// getClientGetQuery.js
var http = require('http');
var url = require('url');
var querystring = require('querystring');

var server = http.createServer(function(req, res){
    var urlObj = url.parse(req.url);
    var query = urlObj.query;
    var queryObj = querystring.parse(query);
    
    console.log( JSON.stringify(queryObj) );
    
    res.end('ok');
});

server.listen(3000);
```

访问地址 http://127.0.0.1:3000/hello?nick=chyingp&hello=world

服务端输出如下

```bash
{"nick":"chyingp","hello":"world"}
```

#### 例子三：获取post请求参数

服务端代码如下

```js
// getClientPostBody.js
var http = require('http');
var url = require('url');
var querystring = require('querystring');

var server = http.createServer(function(req, res){
    
    var body = '';  
    req.on('data', function(thunk){
        body += thunk;
    });

    req.on('end', function(){
        console.log( 'post body is: ' + body );
        res.end('ok');
    }); 
});

server.listen(3000);
```

通过curl构造post请求：

```bash
curl -d 'nick=casper&hello=world' http://127.0.0.1:3000
```

服务端打印如下：

```bash
post body is: nick=casper&hello=world
```

备注：post请求中，不同的`Content-type`，post body有不小差异，感兴趣的同学可以研究下。

本例中的post请求，HTTP报文大概如下

```http
POST / HTTP/1.1
Host: 127.0.0.1:3000
Content-Type: application/x-www-form-urlencoded
Cache-Control: no-cache

nick=casper&hello=world
```

## 网络服务 https

### 模块概览

这个模块的重要性，基本不用强调了。在网络安全问题日益严峻的今天，网站采用HTTPS是个必然的趋势。

在nodejs中，提供了 https 这个模块来完成 HTTPS 相关功能。从官方文档来看，跟 http 模块用法非常相似。

本文主要包含两部分：

1. 通过客户端、服务端的例子，对https模块进行入门讲解。
2. 如何访问安全证书不受信任的网站。（以 12306 为例子）

篇幅所限，本文无法对 HTTPS协议 及 相关技术体系 做过多讲解，有问题欢迎留言交流。

### 客户端例子

跟http模块的用法非常像，只不过请求的地址是https协议的而已，代码如下：

```js
var https = require('https');

https.get('https://www.baidu.com', function(res){
    console.log('status code: ' + res.statusCode);
    console.log('headers: ' + JSON.stringify(res.headers));

    res.on('data', function(data){
        process.stdout.write(data);
    });
}).on('error', function(err){
    console.error(err);
});
```

### 服务端例子

对外提供HTTPS服务，需要有HTTPS证书。如果你已经有了HTTPS证书，那么可以跳过证书生成的环节。如果没有，可以参考如下步骤

#### 生成证书

**1.创建个目录存放证书。**

```bash
mkdir cert
cd cert
```

**2.生成私钥。**

```text
openssl genrsa -out chyingp-key.pem 2048
```

**3.生成证书签名请求（csr是 Certificate Signing Request的意思）。**

```text
openssl req -new \
  -sha256
  -key chyingp-key.key.pem \
  -out chyingp-csr.pem \
  -subj "/C=CN/ST=Guandong/L=Shenzhen/O=YH Inc/CN=www.chyingp.com"
```

**4.生成证书。**

```text
openssl x509 \
  -req -in chyingp-csr.pem \
  -signkey chyingp-key.pem \
  -out chyingp-cert.pem
```

#### HTTPS服务端

代码如下：

```js
var https = require('https');
var fs = require('fs');

var options = {
    key: fs.readFileSync('./cert/chyingp-key.pem'), // 私钥
    cert: fs.readFileSync('./cert/chyingp-cert.pem') // 证书
};

var server = https.createServer(options, function(req, res){
    res.end('这是来自HTTPS服务器的返回');
});

server.listen(3000);
```

由于我并没有 www.chyingp.com 这个域名，于是先配置本地host

```text
127.0.0.1 www.chyingp.com
```

启动服务，并在浏览器里访问 [http://www.chyingp.com:3000](http://www.chyingp.com:3000/)。注意，浏览器会提示你证书不可靠，点击 信任并继续访问 就行了。

## URL 接口(代替内置模块url使用)

> nodejs内置模块`url`有些方法要被废弃，我们使用`URL类`代替

浏览器原生提供`URL()`接口，它是一个构造函数，用来构造、解析和编码 URL。一般情况下，通过`window.URL`可以拿到这个构造函数。

### 7.1 对比`url模块`和URL类

| 属性     | url模块 | URL类 |
| -------- | ------- | ----- |
| protocol | `✅`     | `✅`   |
| host     | `✅`     | `✅`   |
| port     | `✅`     | `✅`   |
| hostname | `✅`     | `✅`   |
| search   | `✅`     | `✅`   |
| query    | `✅`     | `-`   |
| path     | `✅`     | `-`   |
| pathname | `✅`     | `✅`   |
| href     | `✅`     | `✅`   |
| hash     | `✅`     | `✅`   |
| origin   | -       | `✅`   |

可以看出来，只有三个字段不同，分别是`query`,`path`,`origin`

```js
打印两个对象的输出

// url模块，url.parse('link')
{
  protocol: 'https:',
  slashes: true,
  auth: null,
  host: 'm.shop.com',
  port: null,
  hostname: 'm.shop.com',
  hash: '#detail',
  search: '?id=4433&name=%E6%9D%8E%E5%A4%87&directCompanyId=&mobile=18951431099',
  query: 'id=4433&name=%E6%9D%8E%E5%A4%87&directCompanyId=&mobile=18951431099',
  pathname: '/home/share',
  path: '/home/share?id=4433&name=%E6%9D%8E%E5%A4%87&directCompanyId=&mobile=18951431099',
  href: 'https://m.shop.com/home/share?id=4433&name=%E6%9D%8E%E5%A4%87&directCompanyId=&mobile=18951431099#detail'
}
// new URL()
{
  href: 'https://m.shop.com/home/share?id=4433&name=%E6%9D%8E%E5%A4%87&directCompanyId=&mobile=18951431099#detail',
  origin: 'https://m.shop.com',
  protocol: 'https:',
  username: '',
  password: '',
  host: 'm.shop.com',
  hostname: 'm.shop.com',
  port: '',
  pathname: '/home/share',
  search: '?id=4433&name=%E6%9D%8E%E5%A4%87&directCompanyId=&mobile=18951431099',
  searchParams: URLSearchParams {
    'id' => '4433',
    'name' => '李备',
    'directCompanyId' => '',
    'mobile' => '18951431099' },
  hash: '#detail'
}
```

### 构造函数

`URL()`作为构造函数，可以生成 URL 实例。它接受一个表示 URL 的字符串作为参数。如果参数不是合法的 URL，会报错。

```js
var url = new URL('http://www.example.com/index.html');
url.href
// "http://www.example.com/index.html"
```

上面示例生成了一个 URL 实例，用来代表指定的网址。

除了字符串，`URL()`的参数也可以是另一个 URL 实例。这时，`URL()`会自动读取该实例的`href`属性，作为实际参数。

如果 URL 字符串是一个相对路径，那么需要表示绝对路径的第二个参数，作为计算基准。

```js
var url1 = new URL('index.html', 'http://example.com');
url1.href
// "http://example.com/index.html"

var url2 = new URL('page2.html', 'http://example.com/page1.html');
url2.href
// "http://example.com/page2.html"

var url3 = new URL('..', 'http://example.com/a/b.html')
url3.href
// "http://example.com/"
```

上面代码中，返回的 URL 实例的路径都是在第二个参数的基础上，切换到第一个参数得到的。最后一个例子里面，第一个参数是`..`，表示上层路径。

### 实例属性

URL 实例的属性与`Location`对象的属性基本一致，返回当前 URL 的信息。

- URL.href：返回整个 URL
- URL.protocol：返回协议，以冒号`:`结尾
- URL.hostname：返回域名
- URL.host：返回域名与端口，包含`:`号，默认的80和443端口会省略
- URL.port：返回端口
- URL.origin：返回协议、域名和端口
- URL.pathname：返回路径，以斜杠`/`开头
- URL.search：返回查询字符串，以问号`?`开头
- URL.searchParams：返回一个`URLSearchParams`实例，该属性是`Location`对象没有的
- URL.hash：返回片段识别符，以井号`#`开头
- URL.password：返回域名前面的密码
- URL.username：返回域名前面的用户名

```js
var url = new URL('http://user:passwd@www.example.com:4097/path/a.html?x=111#part1');

url.href
// "http://user:passwd@www.example.com:4097/path/a.html?x=111#part1"
url.protocol
// "http:"
url.hostname
// "www.example.com"
url.host
// "www.example.com:4097"
url.port
// "4097"
url.origin
// "http://www.example.com:4097"
url.pathname
// "/path/a.html"
url.search
// "?x=111"
url.searchParams
// URLSearchParams {}
url.hash
// "#part1"
url.password
// "passwd"
url.username
// "user"
```

这些属性里面，只有`origin`属性是只读的，其他属性都可写，并且会立即生效。

```js
var url = new URL('http://example.com/index.html#part1');

url.pathname = 'index2.html';
url.href // "http://example.com/index2.html#part1"

url.hash = '#part2';
url.href // "http://example.com/index2.html#part2"
```

上面代码中，改变 URL 实例的`pathname`属性和`hash`属性，都会实时反映在 URL 实例当中。

## URLSearchParams 对象(代替内置模块querystring使用)

> 1. nodejs内置模块`querystring`有些方法要被废弃，我们使用`URLSearchParams API `构造代替
>
> 2. 如果你的nodejs版本大于18，可以使用`const querystring= require('node:querystring')`
>    ``querystring`比`URLSearchParams`性能更高，但不是 标准化的 API。使用`URLSearchParams`当性能不重要或 当需要与浏览器代码兼容时。
> 3. 还可以安装`qs`模块，使用方式和`querystring`一样

### 概述

`URLSearchParams`对象是浏览器的原生对象，用来构造、解析和处理 URL 的查询字符串（即 URL 问号后面的部分）。

它本身也是一个构造函数，可以生成实例。参数可以为查询字符串，起首的问号`?`有没有都行，也可以是对应查询字符串的数组或对象。

```js
// 方法一：传入字符串
var params = new URLSearchParams('?foo=1&bar=2');
// 等同于
var params = new URLSearchParams(document.location.search);

// 方法二：传入数组
var params = new URLSearchParams([['foo', 1], ['bar', 2]]);

// 方法三：传入对象
var params = new URLSearchParams({'foo' : 1 , 'bar' : 2});
```

`URLSearchParams`会对查询字符串自动编码。

```js
var params = new URLSearchParams({'foo': '你好'});
params.toString() // "foo=%E4%BD%A0%E5%A5%BD"
```

上面代码中，`foo`的值是汉字，`URLSearchParams`对其自动进行 URL 编码。

浏览器向服务器发送表单数据时，可以直接使用`URLSearchParams`实例作为表单数据。

```js
const params = new URLSearchParams({foo: 1, bar: 2});
fetch('https://example.com/api', {
  method: 'POST',
  body: params
}).then(...)
```

上面代码中，`fetch`命令向服务器发送命令时，可以直接使用`URLSearchParams`实例。

`URLSearchParams`可以与`URL()`接口结合使用。

```js
var url = new URL(window.location);
var foo = url.searchParams.get('foo') || 'somedefault';
```

上面代码中，URL 实例的`searchParams`属性就是一个`URLSearchParams`实例，所以可以使用`URLSearchParams`接口的`get`方法。

`URLSearchParams`实例有遍历器接口，可以用`for...of`循环遍历。

```js
var params = new URLSearchParams({'foo': 1 , 'bar': 2});

for (var p of params) {
  console.log(p[0] + ': ' + p[1]);
}
// foo: 1
// bar: 2
```

`URLSearchParams`没有实例属性，只有实例方法。

### URLSearchParams.toString()

`toString`方法返回实例的字符串形式。

```js
var url = new URL('https://example.com?foo=1&bar=2');
var params = new URLSearchParams(url.search);

params.toString() // "foo=1&bar=2'
```

那么需要字符串的场合，会自动调用`toString`方法。

```js
var params = new URLSearchParams({version: 2.0});
window.location.href = location.pathname + '?' + params;
```

上面代码中，`location.href`赋值时，可以直接使用`params`对象。这时就会自动调用`toString`方法。

### URLSearchParams.has()

`has()`方法返回一个布尔值，表示查询字符串是否包含指定的键名。

```js
var params = new URLSearchParams({'foo': 1 , 'bar': 2});
params.has('bar') // true
params.has('baz') // false
```

### URLSearchParams.get()，URLSearchParams.getAll()

`get()`方法用来读取查询字符串里面的指定键。它接受键名作为参数。

```js
var params = new URLSearchParams('?foo=1');
params.get('foo') // "1"
params.get('bar') // null
```

两个地方需要注意。第一，它返回的是字符串，如果原始值是数值，需要转一下类型；第二，如果指定的键名不存在，返回值是`null`。

如果有多个的同名键，`get`返回位置最前面的那个键值。

```js
var params = new URLSearchParams('?foo=3&foo=2&foo=1');
params.get('foo') // "3"
```

上面代码中，查询字符串有三个`foo`键，`get`方法返回最前面的键值`3`。

`getAll()`方法返回一个数组，成员是指定键的所有键值。它接受键名作为参数。

```js
var params = new URLSearchParams('?foo=1&foo=2');
params.getAll('foo') // ["1", "2"]
```

上面代码中，查询字符串有两个`foo`键，`getAll`返回的数组就有两个成员。

### URLSearchParams.keys()，URLSearchParams.values()，URLSearchParams.entries()

这三个方法都返回一个遍历器对象，供`for...of`循环遍历。它们的区别在于，`keys`方法返回的是键名的遍历器，`values`方法返回的是键值的遍历器，`entries`返回的是键值对的遍历器。

```js
var params = new URLSearchParams('a=1&b=2');

for(var p of params.keys()) {
  console.log(p);
}
// a
// b

for(var p of params.values()) {
  console.log(p);
}
// 1
// 2

for(var p of params.entries()) {
  console.log(p);
}
// ["a", "1"]
// ["b", "2"]
```

如果直接对`URLSearchParams`进行遍历，其实内部调用的就是`entries`接口。

```js
for (var p of params) {}
// 等同于
for (var p of params.entries()) {}
```

## qs模块

qs是一个npm仓库所管理的包,可通过npm install qs命令进行安装.

1. qs.parse()将URL解析成对象的形式
2. qs.stringify()将对象 序列化成URL的形式，以&进行拼接

```javascript
const qs = require('qs');

1.qs.parse()
const str = "username='admin'&password='123456'";
console.log(qs.parse(str)); 
// Object { username: "admin", password: "123456" }

2.qs.stringify()
const a = qs.stringify({ username: 'admin', password: '123456' });
console.log(a); 
// username=admin&password=123456
```

```js
qs.stringify() 和JSON.stringify()有什么区别?

var a = {name:'hehe',age:10};
qs.stringify序列化结果如
name=hehe&age=10
--------------------
而JSON.stringify序列化结果如下：
"{"a":"hehe","age":10}"
```
# 06 【nodejs内置模块（中）】

## 1.路劲处理模块 path

### 1.1 模块概览

在nodejs中，path是个使用频率很高，但却让人又爱又恨的模块。部分因为文档说的不够清晰，部分因为接口的平台差异性。

将path的接口按照用途归类，仔细琢磨琢磨，也就没那么费解了。

### 1.2 获取路径/文件名/扩展名

- 获取路径：path.dirname(filepath)
- 获取文件名：path.basename(filepath)
- 获取扩展名：path.extname(filepath)

#### 1.2.1 获取所在路径

例子如下：

```javascript
var path = require('path');
var filepath = '/tmp/demo/js/test.js';

// 输出：/tmp/demo/js
console.log( path.dirname(filepath) );
```

#### 1.2.2 获取文件名

严格意义上来说，path.basename(filepath) 只是输出路径的最后一部分，并不会判断是否文件名。

但大部分时候，我们可以用它来作为简易的“获取文件名“的方法。

```javascript
var path = require('path');

// 输出：test.js
console.log( path.basename('/tmp/demo/js/test.js') );

// 输出：test
console.log( path.basename('/tmp/demo/js/test/') );

// 输出：test
console.log( path.basename('/tmp/demo/js/test') );
```

如果只想获取文件名，单不包括文件扩展呢？可以用上第二个参数。

```javascript
// 输出：test
console.log( path.basename('/tmp/demo/js/test.js', '.js') );
```

#### 1.2.3 获取文件扩展名

简单的例子如下：

```javascript
var path = require('path');
var filepath = '/tmp/demo/js/test.js';

// 输出：.js
console.log( path.extname(filepath) );
```

更详细的规则是如下：（假设 path.basename(filepath) === B ）

- 从B的最后一个`.`开始截取，直到最后一个字符。
- 如果B中不存在`.`，或者B的第一个字符就是`.`，那么返回空字符串。

直接看[官方文档](https://nodejs.org/api/path.html#path_path_extname_path)的例子

```javascript
path.extname('index.html')
// returns '.html'

path.extname('index.coffee.md')
// returns '.md'

path.extname('index.')
// returns '.'

path.extname('index')
// returns ''

path.extname('.index')
// returns ''
```

### 1.3 路径组合

- path.join([...paths])
- path.resolve([...paths])

#### 1.3.1 path.resolve() 生成完成的绝对路径

语法格式：

```js
path.resolve([...myPaths])
```

解释：

- 将路径或路径片段的序列解析为绝对路径。
- 返回的路径是**从右往左**处理，后面的每个 myPath 被依次解析，直到构造出一个完整的绝对路径。

> 你可以想象现在你在shell下面，从左到右运行一遍`cd path`命令，最终获取的绝对路径/文件名，就是这个接口所返回的结果了。

代码举例：

```js
const path = require('path');

let arr1 = ['/foo1/foo2', 'dselegent', 'foo3'];
let result1 = path.resolve(...arr1);
console.log(result1); // 打印结果：/foo1/foo2/dselegent/foo3

let arr2 = ['/foo1/foo2', '/dselegent', 'foo3'];
let result2 = path.resolve(...arr2);
console.log(result2); // 打印结果：/dselegent/foo3

```

```javascript
const path = require('path');

// 假设当前工作路径是 /Users/a/Documents/git-code/nodejs-learning-guide/examples/2016.11.08-node-path

// 输出 /Users/a/Documents/git-code/nodejs-learning-guide/examples/2016.11.08-node-path
console.log( path.resolve('') )

// 输出 /Users/a/Documents/git-code/nodejs-learning-guide/examples/2016.11.08-node-path
console.log( path.resolve('.') )

// 输出 /foo/bar/baz
console.log( path.resolve('/foo/bar', './baz') );

// 输出 /foo/bar/baz
console.log( path.resolve('/foo/bar', './baz/') );

// 输出 /tmp/file
console.log( path.resolve('/foo/bar', '/tmp/file/') );

// 输出 /Users/a/Documents/git-code/nodejs-learning-guide/examples/2016.11.08-node-path/www/js/mod.js
console.log( path.resolve('www', 'js/upload', '../mod.js') );
```

#### 1.3.2 path.join() 将多个路径进行拼接

如果是我们手动拼接路径，容易出错。这个时候，可以利用 path.join() 方法将路径进行拼接。

语法格式：

```js
path.join([...paths]);
```

解释：使用平台特定的分隔符作为定界符将所有给定的 path 片段连接在一起，然后规范化生成的路径。

代码举例：

```js
const path = require('path');

const result1 = path.join(__dirname, './app.js');
console.log(result1); // 返回：/Users/smyhvae/dselegent/app.js

const result2 = path.join('/foo1', 'foo2', './foo3');
console.log(result2); // 返回：/foo1/foo2/foo3

const result3 = path.join('/foo1', 'foo2', '/foo3');
console.log(result3); // 返回：/foo1/foo2/foo3
```

#### 1.3.3 path.resolve 和 path.join 区别

path.resolve 和 path.join 都是属于 path 核心模块下的方法，用来拼接路径。

都可以拼接成一个完整路径.

```js
const path = require("path");

var dirname = '/User/Desktop';
var basename = 'abc.txt';

path.join(dirname, basename);  // /User/Desktop/abc.txt

path.resolve(dirname, basename);  // /User/Desktop/abc.txt
```

如果 dirname 是以 ./ 、../、不加 / 开头的话，那么 resolve 会找到磁盘下的根目录

```javascript
const path = require("path");
 
var dirname = '../User/Desktop';
var basename = 'abc.txt';
 
path.join(dirname, basename);  // ../User/Desktop/abc.txt
 
path.resolve(dirname, basename);  // /Users/Desktop/node/User/Desktop/abc.txt
```

如果 basename 是以 / 开头的，那么 resolve 就会直接返回 basename 

```javascript
const path = require("path");
 
var dirname = '/User/Desktop';
var basename = '/abc.txt';
 
path.join(dirname, basename);  // /User/Desktop/abc.txt
 
path.resolve(dirname, basename);  // /abc.txt
```

### 1.4 几个常见路径

- `__dirname`：这是一个常量，表示：当前执行文件所在**完整目录**。
- `__filename`：这是一个常量。表示：当前执行文件的**完整目录 + 文件名**。
- `process.cwd`：获取当前执行 Node命令 时的目录名。

代码举例：

```js
console.log(__dirname);

console.log(__filename);

console.log(process.cwd());
```

运行结果：

```bash
$ node app.js

/Users/smyhvae/dselegent
/Users/smyhvae/dselegent/app.js
/Users/smyhvae/dselegent
```

## 2.本地文件操作模块 fs

> ### Node.js 中的同步和异步的区别
>
> fs模块对文件的几乎所有操作都有同步和异步两种形式。例如：readFile() 和 readFileSync()。
>
> 区别：
>
> - 同步调用会阻塞代码的执行，异步则不会。
> - 异步调用会将 读取任务 下达到任务队列，直到任务执行完成才会回调。
> - 异常处理方面：同步必须使用 try catch 方式，异步可以通过回调函数的第一个参数。【重要】

### 2.1 文件读取

**同步读取**

```javascript
var fs = require('fs');
var data;

try{
    data = fs.readFileSync('./fileForRead.txt', 'utf8');
    console.log('文件内容: ' + data);
}catch(err){
    console.error('读取文件出错: ' + err.message);
}
```

输出如下：

```bash
/usr/local/bin/node readFileSync.js
文件内容: hello world
```

**异步读取**

```javascript
var fs = require('fs');

fs.readFile('./fileForRead.txt', 'utf8', function(err, data){
    if(err){
        return console.error('读取文件出错: ' + err.message);
    }
    console.log('文件内容: ' + data);
});
```

输出如下

```bash
/usr/local/bin/node readFile.js
文件内容: hello world
```

> **fs/promises 从 Node.js 14 开始可用**
> 从 Node.js 14 开始，fs 模块提供了两种使用基于 promises 的文件系统的方法。这些 promises 可以通过 `require('fs').promises` 或 `require('fs/promises') `获得。

```js
import { readFile } from 'fs/promises';

try {
  const contents = await readFile(filePath, { encoding: 'utf8' });
  console.log(contents);
} catch (err) {
  console.error(err.message);
}
```

### 2.2 文件写入

备注：以下代码，如果文件不存在，则创建文件；如果文件存在，则覆盖文件内容；

**异步写入**

```javascript
var fs = require('fs');

fs.writeFile('./fileForWrite.txt', 'hello world', 'utf8', function(err){
    if(err) throw err;
    console.log('文件写入成功');
});
```

**同步写入**

```javascript
var fs = require('fs');

try{
    fs.writeFileSync('./fileForWrite1.txt', 'hello world', 'utf8');
    console.log('文件写入成功');
}catch(err){
    throw err;
}
```

**promises**

```js
import { writeFile } from 'fs/promises';

try {
  const contents = await writeFile('message.txt', 'hello world', { encoding: 'utf8' });
  console.log(contents);
} catch (err) {
  // When a request is aborted - err is an AbortError
  console.error(err);
}
```

### 2.3 文件是否存在

`fs.exists()`已经是`deprecated`状态，现在可以通过下面代码判断文件是否存在。

**异步本**

```js
const fs = require('fs')

//检查文件是否存在于当前目录中
fs.access('package.json', fs.constants.F_OK, err => {
    if(err) {
        console.log('package.json不存在于当前目录中')
        return
    }
    console.log('package.json存在于当前目录中')
})

fs.access('index.js', fs.constants.F_OK, err => {
    if(err) {
        console.log('index.js不存在于当前目录中')
        return
    }
    console.log('index.js存在于当前目录中')
})
```

`fs.access()`除了判断文件是否存在（默认模式），还可以用来判断文件的权限。

备忘：`fs.constants.F_OK`等常量无法获取（node v6.1，mac 10.11.4下，`fs.constants`是`undefined`）

**同步**

````js
import { accessSync, constants } from 'fs';

try {
  accessSync('etc/passwd', constants.R_OK );
  console.log('can read');
} catch (err) {
  console.error('no access!');
}
````

**promises**

```js
import { access, constants } from 'node:fs/promises';

try {
  await access('/etc/passwd', constants.R_OK);
  console.log('can access');
} catch {
  console.error('cannot access');
}
```

### 2.4 删除文件

**异步版本**

```javascript
var fs = require('fs');

fs.unlink('./fileForUnlink.txt', function(err){
    if(err) throw err;
    console.log('文件删除成功');
});
```

**同步版本**

```js
import { unlinkSync } from 'fs';

try {
  unlinkSync('/tmp/hello');
  console.log('successfully deleted /tmp/hello');
} catch (err) {
  // handle the error
}
```

**promises**

```js
import { unlink } from 'fs/promises';

try {
  await unlink('/tmp/hello');
  console.log('successfully deleted /tmp/hello');
} catch (err) {
  // handle the error
}
```

### 2.5 创建目录

**异步版本**（如果目录已存在，会报错）

```javascript
// fs.mkdir(path[, mode], callback)
var fs = require('fs');

fs.mkdir('sub', function(err){
    if(err) throw err;
    console.log('创建目录成功');
});
```

**同步版本**

```javascript
// fs.mkdirSync(path[, mode])
var fs = require('fs');

try{
    fs.mkdirSync('hello');
    console.log('创建目录成功');
}catch(e){
    throw e;
}
```

**promises**

```js
import { mkdir } from 'fs/promises';

try {
  const createDir = await mkdir(projectFolder, { recursive: true });
  console.log(`created ${createDir}`);
} catch (err) {
  console.error(err.message);
}
```

### 2.6 遍历目录

同步版本，注意：`fs.readdirSync()`只会读一层，所以需要判断文件类型是否目录，如果是，则进行递归遍历。

```js
// fs.readdirSync(path[, options])

var fs = require('fs');
var path = require('path');

var getFilesInDir = function(dir){

    var results = [ path.resolve(dir) ];
    var files = fs.readdirSync(dir, 'utf8');

    files.forEach(function(file){

        file = path.resolve(dir, file);

        var stats = fs.statSync(file);

        if(stats.isFile()){
            results.push(file);
        }else if(stats.isDirectory()){
            results = results.concat( getFilesInDir(file) );
        }
    });

    return results;
};

var files = getFilesInDir('../');
console.log(files);
```

### 2.7 读取目录

```js
import { readdir } from 'fs/promises';

try {
  const files = await readdir(path);
  for (const file of files)
    console.log(file);
} catch (err) {
  console.error(err);
}
```

### 2.8 删除目录

```js
// 删除目录(前提没有文件在里面)
fs.rmdir('./avatar', err => {
  if (err && err.code === 'ENOENT') {
    console.log('目录不存在');
  }
});
```

### 2.9 删除整个目录

```js
//1
const fs = require("fs")
fs.("./avatar",(err,data)=>{
    // console.log(data)
    data.forEach(item=>{
        fs.unlinkSync(`./avatar/${item}`)
    })

    fs.rmdir("./avatar",(err)=>{
        console.log(err)
    })
})

//2
const fs = require('fs')
fs.readdir("./avatar").then(async (data)=>{
    let arr = []
    data.forEach(item=>{
        arr.push(fs.unlink(`./avatar/${item}`))
    })
    await Promise.all(arr)
    fs.rmdir("./avatar")
})

//3
const fs = require('fs').promises;
fs.readdir('./image2').then(async data => {
  await Promise.all(data.map(item => fs.unlink(`./image2/${item}`)));
  await fs.rmdir('./image2');
});
```

### 2.10 文件重命名

**异步版本**

```javascript
// fs.rename(oldPath, newPath, callback)
var fs = require('fs');

fs.rename('./hello', './world', function(err){
    if(err) throw err;
    console.log('重命名成功');
});
```

**同步版本**

````js
// fs.renameSync(oldPath, newPath)
var fs = require('fs');

fs.renameSync('./world', './hello');
````

**promises**

```js
import { rename } from 'fs/promises';

try {
  await rename('./world', './hello');
  console.log(`rename`);
} catch (err) {
  console.error(err.message);
}
```

### 2.11 获取文件状态

1.异步：fs.stat(path,callback):
  path是一个表示路径的字符串,callback接收两个参数(err,stats),其中stats就是fs.stats的一个实例；

2.同步：fs.statSync(path)
  只接收一个path变量，fs.statSync(path)其实是一个fs.stats的一个实例；

方法

- stats.isFile() -- 是否文件
- stats.isDirectory() -- 是否目录

```js
// Node.js program to demonstrate the 
// fs.statSync() method 
  
// Import the filesystem module 
const fs = require('fs'); 
  
// Getting information for a file 
statsObj = fs.statSync("test_file.txt"); 
  
console.log(statsObj);  
console.log("Path is file:", statsObj.isFile()); 
console.log("Path is directory:", statsObj.isDirectory()); 
  
// Getting information for a directory 
statsObj = fs.statSync("test_directory"); 
  
console.log(statsObj); 
console.log("Path is file:", statsObj.isFile()); 
console.log("Path is directory:", statsObj.isDirectory());
```

输出：

```js
Stats {
  dev:3229478529,
  mode:33206,
  nlink:1,
  uid:0,
  gid:0,
  rdev:0,
  blksize:4096,
  ino:1970324837039946,
  size:0,
  blocks:0,
  atimeMs:1582306776282,
  mtimeMs:1582482953967,
  ctimeMs:1582482953968.2532,
  birthtimeMs:1582306776282.142,
  atime:2020-02-21T17:39:36.282Z,
  mtime:2020-02-23T18:35:53.967Z,
  ctime:2020-02-23T18:35:53.968Z,
  birthtime:2020-02-21T17:39:36.282Z
}
Path is file:true
Path is directory:false
Stats {
  dev:3229478529,
  mode:16822,
  nlink:1,
  uid:0,
  gid:0,
  rdev:0,
  blksize:4096,
  ino:562949953486669,
  size:0,
  blocks:0,
  atimeMs:1582482965037.8445,
  mtimeMs:1581074249467.7114,
  ctimeMs:1582482964979.8303,
  birthtimeMs:1582306776288.1958,
  atime:2020-02-23T18:36:05.038Z,
  mtime:2020-02-07T11:17:29.468Z,
  ctime:2020-02-23T18:36:04.980Z,
  birthtime:2020-02-21T17:39:36.288Z
}
Path is file:false
Path is directory:true
```

### 2.12 追加文件内容

> fs.appendFile(file, data[, options], callback)

- file：可以是文件路径，也可以是文件句柄。（还可以是buffer？）
- data：要追加的内容。string或者buffer。
- options
  - encoding：编码，默认是`utf8`
  - mode：默认是`0o666`
  - flag：默认是`a`

注意：如果`file`是文件句柄，那么

- 开始追加数据前，file需要已经打开。
- file需要手动关闭。

```javascript
var fs = require('fs');

fs.appendFile('./extra/fileForAppend.txt', 'hello', 'utf8', function(err){
    if(err) throw err;
    console.log('append成功');
});
```

## 3.事件机制模块 events

Node.js 有多个内置的事件，我们可以通过引入 events 模块，并通过实例化 EventEmitter 类来绑定和监听事件，如下实例：

```javascript
// 引入 events 模块
var EventEmitter = require('events');
// 创建 eventEmitter 对象
var event = new EventEmitter();
```

以下程序绑定事件处理程序：

```javascript
// 绑定事件及事件的处理程序
eventEmitter.on('eventName', eventHandler);
```

我们可以通过程序触发事件：

```javascript
// 触发事件
eventEmitter.emit('eventName');
```

`EventEmitter `的每个事件由一个事件名和若干个参数组成，事件名是一个字符串，通常表达一定的语义。对于每个事件，`EventEmitter `支持 若干个事件监听器。

当事件触发时，注册到这个事件的事件监听器被依次调用，事件参数作为回调函数参数传递。

让我们以下面的例子解释这个过程：

```javascript
// 引入 events 模块
var EventEmitter = require('events');
// 创建 eventEmitter 对象
var event = new EventEmitter();
event.on('someEvent', function(arg1, arg2) { 
    console.log('listener1', arg1, arg2); 
}); 
event.on('someEvent', function(arg1, arg2) { 
    console.log('listener2', arg1, arg2); 
}); 
event.emit('someEvent', 'arg1 参数', 'arg2 参数'); 
```

执行以上代码，运行的结果如下：

```bash
$ node event.js 
listener1 arg1 参数 arg2 参数
listener2 arg1 参数 arg2 参数
```

以上例子中，event 为事件 someEvent 注册了两个事件监听器，然后触发了 someEvent 事件。

运行结果中可以看到两个事件监听器回调函数被先后调用。 这就是`EventEmitter`最简单的用法。

`EventEmitter `提供了多个属性，如 **on** 和 **emit**。**on** 函数用于绑定事件函数，**emit** 属性用于触发一个事件

# 07 【nodejs内置模块（下）】

## 1.stream 模块

`stream`是Node.js提供的又一个仅在服务区端可用的模块，目的是支持“流”这种数据结构。

什么是流？流是一种抽象的数据结构。想象水流，当在水管中流动时，就可以从某个地方（例如自来水厂）源源不断地到达另一个地方（比如你家的洗手池）。我们也可以把数据看成是数据流，比如你敲键盘的时候，就可以把每个字符依次连起来，看成字符流。这个流是从键盘输入到应用程序，实际上它还对应着一个名字：标准输入流（stdin）。

如果应用程序把字符一个一个输出到显示器上，这也可以看成是一个流，这个流也有名字：标准输出流（stdout）。流的特点是数据是有序的，而且必须依次读取，或者依次写入，不能像Array那样随机定位。

有些流用来读取数据，比如从文件读取数据时，可以打开一个文件流，然后从文件流中不断地读取数据。有些流用来写入数据，比如向文件写入数据时，只需要把数据不断地往文件流中写进去就可以了。

在Node.js中，流也是一个对象，我们只需要响应流的事件就可以了：`data`事件表示流的数据已经可以读取了，`end`事件表示这个流已经到末尾了，没有数据可以读取了，`error`事件表示出错了。

### 1.1 读取流

```javascript
const fs = require('fs');

//创建读取流
let rs = fs.createReadStream('hello.txt', 'utf-8');

rs.on('open', function () {
  console.log('读取的文件已打开');
}).on('close', function () {
  console.log('读取流结束');
}).on('error', err => {
  console.log(err);
}).on('data', function (chunk) {
  //每一批数据流入完成
  console.log('单批数据流入:' + chunk.length);
  console.log(chunk);
});
```

要注意，`data`事件可能会有多次，每次传递的`chunk`是流的一部分数据。

**读取视频**

```javascript
const fs = require('fs');

//创建读取流
let rs = fs.createReadStream('video.mp4');

//每一批数据流入完成
rs.on('data', function (chunk) {
  console.log('单批数据流入:' + chunk.length);
  console.log(chunk);
});
```

![](https://tva1.sinaimg.cn/large/0074UQWJgy1h3eigfl898j31750iztjs.jpg)

### 1.2 写入流

要以流的形式写入文件，只需要不断调用`write()`方法，最后以`end()`结束：

```javascript
const fs = require('fs');

//创建写入流
let ws = fs.createWriteStream('hello.txt', 'utf-8');

//监听文件打开事件
ws.on('open', function () {
  console.log('文件打开');
});

//监听文件关闭事件
ws.on('close', function () {
  console.log('文件写入完成，关闭');
});

//文件流式写入
ws.write('helloworld1!', function (err) {
  if (err) {
    console.log(err);
  } else {
    console.log('内容1流入完成');
  }
});
ws.write('helloworld2!', function (err) {
  if (err) {
    console.log(err);
  } else {
    console.log('内容2流入完成');
  }
});

//文件写入完成
ws.end(function () {
  console.log('文件写入关闭');
});
```

`pipe` 就像可以把两个水管串成一个更长的水管一样，两个流也可以串起来。一个`Readable`流和一个`Writable`流串起来后，所有的数据自动从`Readable`流进入`Writable`流，这种操作叫`pipe`。

在Node.js中，`Readable`流有一个`pipe()`方法，就是用来干这件事的。

让我们用`pipe()`把一个文件流和另一个文件流串起来，这样源文件的所有数据就自动写入到目标文件里了，所以，这实际上是一个复制文件的程序：

```javascript
const fs = require('fs');

//创建读取流
let rs = fs.createReadStream('video.mp4');
let ws = fs.createWriteStream('b.mp4');

rs.on('close', function () {
  console.log('读取流结束');
});

rs.pipe(ws);
```

**pipe原理**

```javascript
const fs = require('fs');

//创建读取流
let rs = fs.createReadStream('video.mp4');
let ws = fs.createWriteStream('b.mp4');

rs.on('close', function () {
  ws.end();
  console.log('读取流结束');
});

//每一批数据流入完成
rs.on('data', function (chunk) {
  console.log('单批数据流入:' + chunk.length);
  ws.write(chunk, () => {
    console.log('单批输入流入完成');
  });
});
```

## 2.资源压缩模块 zib

### 2.1 概览

做过web性能优化的同学，对性能优化大杀器**gzip**应该不陌生。浏览器向服务器发起资源请求，比如下载一个js文件，服务器先对资源进行压缩，再返回给浏览器，以此节省流量，加快访问速度。

浏览器通过HTTP请求头部里加上**Accept-Encoding**，告诉服务器，“你可以用gzip，或者defalte算法压缩资源”。

> Accept-Encoding:gzip, deflate

那么，在nodejs里，是如何对资源进行压缩的呢？答案就是**Zlib**模块。=

### 2.2 压缩的例子

非常简单的几行代码，就完成了本地文件的gzip压缩。

```javascript
var fs = require('fs');
var zlib = require('zlib');

var gzip = zlib.createGzip();

var readstream = fs.createReadStream('./extra/fileForCompress.txt');
var writestream = fs.createWriteStream('./extra/fileForCompress.txt.gz');

readstream.pipe(gzip).pipe(writestream);
```

### 2.3 解压的例子

同样非常简单，就是个反向操作。

```javascript
var fs = require('fs');
var zlib = require('zlib');

var gunzip = zlib.createGunzip();

var readstream  = fs.createReadStream('./extra/fileForCompress.txt.gz');
var writestream  = fs.createWriteStream('./extra/fileForCompress1.txt');

readstream.pipe(gunzip).pipe(writestream);
```

### 2.4 服务端gzip压缩

首先判断 是否包含 **accept-encoding** 首部，且值为**gzip**。

- 否：返回未压缩的文件。
- 是：返回gzip压缩后的文件。

```js
var http = require('http');
var zlib = require('zlib');
var fs = require('fs');
var filepath = './extra/fileForGzip.html';

var server = http.createServer(function(req, res){
    var acceptEncoding = req.headers['accept-encoding'];
    var gzip;
    
    if(acceptEncoding.indexOf('gzip')!=-1){ // 判断是否需要gzip压缩
        
        gzip = zlib.createGzip();
        
        // 记得响应 Content-Encoding，告诉浏览器：文件被 gzip 压缩过
        res.writeHead(200, {
            'Content-Encoding': 'gzip'
        });
        fs.createReadStream(filepath).pipe(gzip).pipe(res);
    
    }else{

        fs.createReadStream(filepath).pipe(res);
    }

});

server.listen('3000');

```

**将js大文件返回**

```javascript
const fs = require('fs');
const zlib = require('zlib');//这两个要写在fs模块后面
const gzip = zlib.createGzip();
const http = require('http');

http
  .createServer((req, res) => {
    let rs = fs.createReadStream('hello.js');
    res.writeHead(200, {
      'Content-Type': 'application/x-javascript;charset=utf-8',
      'Content-Encoding': 'gzip',
    });
    rs.pipe(gzip).pipe(res);
  })
  .listen(3000, () => {
    console.log('server start');
  });
```

### 2.5 服务端字符串gzip压缩

代码跟前面例子大同小异。这里采用了 **zlib.gzipSync(str)** 对字符串进行gzip压缩。

```javascript
var http = require('http');
var zlib = require('zlib');

var responseText = 'hello world';

var server = http.createServer(function(req, res){
    var acceptEncoding = req.headers['accept-encoding'];
    if(acceptEncoding.indexOf('gzip')!=-1){
        res.writeHead(200, {
            'content-encoding': 'gzip'
        });
        res.end(zlib.gzipSync(responseText) );
    }else{
        res.end(responseText);
    }

});

server.listen('3000');
```

## 3.数据加密模块 crypto

crypto模块的目的是为了提供通用的加密和哈希算法。用纯JavaScript代码实现这些功能不是不可能，但速度会非常慢。Nodejs用C/C++实现这些算法后，通过cypto这个模块暴露为JavaScript接口，这样用起来方便，运行速度也快。

### 3.1 hash例子

hash.digest([encoding])：计算摘要。encoding可以是`hex`、`latin1`或者`base64`。如果声明了encoding，那么返回字符串。否则，返回Buffer实例。注意，调用hash.digest()后，hash对象就作废了，再次调用就会出错。

hash.update(data[, input_encoding])：input_encoding可以是`utf8`、`ascii`或者`latin1`。如果data是字符串，且没有指定 input_encoding，则默认是`utf8`。注意，hash.update()方法可以调用多次。

```js
var crypto = require('crypto');
var fs = require('fs');

var content = fs.readFileSync('./test.txt', {encoding: 'utf8'});
var hash = crypto.createHash('sha256');
var output;

hash.update(content);

output = hash.digest('hex'); 

console.log(output);
// 输出内容为：
// b94d27b9934d3e08a52e52d7da7dabfac484efe37a5380ee9088f7ace2efcde9
```

也可以这样：

```js
var crypto = require('crypto');
var fs = require('fs');

var input = fs.createReadStream('./test.txt', {encoding: 'utf8'});
var hash = crypto.createHash('sha256');

hash.setEncoding('hex');

input.pipe(hash).pipe(process.stdout)

// 输出内容为：
// b94d27b9934d3e08a52e52d7da7dabfac484efe37a5380ee9088f7ace2efcde9
```

hash.digest()后，再次调用digest()或者update()

```js
var crypto = require('crypto');
var fs = require('fs');

var content = fs.readFileSync('./test.txt', {encoding: 'utf8'});
var hash = crypto.createHash('sha256');
var output;

hash.update(content);
hash.digest('hex'); 

// 报错：Error: Digest already called
hash.update(content);

// 报错：Error: Digest already called
hash.digest('hex');
```

### 3.2 HMAC例子

HMAC的全称是Hash-based Message Authentication Code，也即在hash的加盐运算。

具体到使用的话，跟hash模块差不多，选定hash算法，指定“盐”即可。

例子1：

```js
var crypto = require('crypto');
var fs = require('fs');

var secret = 'secret';
var hmac = crypto.createHmac('sha256', secret);
var input = fs.readFileSync('./test.txt', {encoding: 'utf8'});

hmac.update(input);

console.log( hmac.digest('hex') );
// 输出：
// 734cc62f32841568f45715aeb9f4d7891324e6d948e4c6c60c0621cdac48623a
```

例子2：

```js
var crypto = require('crypto');
var fs = require('fs');

var secret = 'secret';
var hmac = crypto.createHmac('sha256', secret);
var input = fs.createReadStream('./test.txt', {encoding: 'utf8'});

hmac.setEncoding('hex');

input.pipe(hmac).pipe(process.stdout)
// 输出：
// 734cc62f32841568f45715aeb9f4d7891324e6d948e4c6c60c0621cdac48623a
```

### 3.3 MD5例子

MD5（Message-Digest Algorithm）是计算机安全领域广泛使用的散列函数（又称哈希算法、摘要算法），主要用来确保消息的完整和一致性。常见的应用场景有密码保护、下载文件校验等。

**特点**

1. 运算速度快：对`jquery.js`求md5值，57254个字符，耗时1.907ms
2. 输出长度固定：输入长度不固定，输出长度固定（128位）。
3. 运算不可逆：已知运算结果的情况下，无法通过通过逆运算得到原始字符串。
4. 高度离散：输入的微小变化，可导致运算结果差异巨大。
5. 弱碰撞性：不同输入的散列值可能相同。

**应用场景**

1. 文件完整性校验：比如从网上下载一个软件，一般网站都会将软件的md5值附在网页上，用户下载完软件后，可对下载到本地的软件进行md5运算，然后跟网站上的md5值进行对比，确保下载的软件是完整的（或正确的）
2. 密码保护：将md5后的密码保存到数据库，而不是保存明文密码，避免拖库等事件发生后，明文密码外泄。
3. 防篡改：比如数字证书的防篡改，就用到了摘要算法。（当然还要结合数字签名等手段）

```javascript
var crypto = require('crypto');
var md5 = crypto.createHash('md5');

var result = md5.update('a').digest('hex');

// 输出：0cc175b9c0f1b6a831c399e269772661
console.log(result);
```

### 3.4 例子：密码保护

前面提到，将明文密码保存到数据库是很不安全的，最不济也要进行md5后进行保存。比如用户密码是`123456`，md5运行后，得到`输出：e10adc3949ba59abbe56e057f20f883e`。

这样至少有两个好处：

1. 防内部攻击：网站主人也不知道用户的明文密码，避免网站主人拿着用户明文密码干坏事。
2. 防外部攻击：如网站被黑客入侵，黑客也只能拿到md5后的密码，而不是用户的明文密码。

示例代码如下：

```javascript
var crypto = require('crypto');

function cryptPwd(password) {
    var md5 = crypto.createHash('md5');
    return md5.update(password).digest('hex');
}

var password = '123456';
var cryptedPassword = cryptPwd(password);

console.log(cryptedPassword);
// 输出：e10adc3949ba59abbe56e057f20f883e
```

**单纯对密码进行md5不安全**

前面提到，通过对用户密码进行md5运算来提高安全性。但实际上，这样的安全性是很差的，为什么呢？

稍微修改下上面的例子，可能你就明白了。相同的明文密码，md5值也是相同的。

```javascript
var crypto = require('crypto');

function cryptPwd(password) {
    var md5 = crypto.createHash('md5');
    return md5.update(password).digest('hex');
}

var password = '123456';

console.log( cryptPwd(password) );
// 输出：e10adc3949ba59abbe56e057f20f883e

console.log( cryptPwd(password) );
// 输出：e10adc3949ba59abbe56e057f20f883e
```

也就是说，当攻击者知道算法是md5，且数据库里存储的密码值为`e10adc3949ba59abbe56e057f20f883e`时，理论上可以可以猜到，用户的明文密码就是`123456`。

事实上，彩虹表就是这么进行暴力破解的：事先将常见明文密码的md5值运算好存起来，然后跟网站数据库里存储的密码进行匹配，就能够快速找到用户的明文密码。（这里不探究具体细节）

那么，有什么办法可以进一步提升安全性呢？答案是：密码加盐。

**密码加盐**

“加盐”这个词看上去很玄乎，其实原理很简单，就是在密码特定位置插入特定字符串后，再对修改后的字符串进行md5运算。

例子如下。同样的密码，当“盐”值不一样时，md5值的差异非常大。通过密码加盐，可以防止最初级的暴力破解，如果攻击者事先不知道”盐“值，破解的难度就会非常大。

```javascript
var crypto = require('crypto');

function cryptPwd(password, salt) {
    // 密码“加盐”
    var saltPassword = password + ':' + salt;
    console.log('原始密码：%s', password);
    console.log('加盐后的密码：%s', saltPassword);

    // 加盐密码的md5值
    var md5 = crypto.createHash('md5');
    var result = md5.update(saltPassword).digest('hex');
    console.log('加盐密码的md5值：%s', result);
}

cryptPwd('123456', 'abc');
// 输出：
// 原始密码：123456
// 加盐后的密码：123456:abc
// 加盐密码的md5值：51011af1892f59e74baf61f3d4389092

cryptPwd('123456', 'bcd');
// 输出：
// 原始密码：123456
// 加盐后的密码：123456:bcd
// 加盐密码的md5值：55a95bcb6bfbaef6906dbbd264ab4531
```
# 09 【原生nodejs路由、获取参数、静态目录】

## 1.路由

**index.js**

```js
// 启动服务
const server = require('./server.js');
//路由模块
const route = require('./route.js');
//api
const apiRouter = require('./api.js');

server.use(route);
server.use(apiRouter);
server.start();

```

**server.js**

```js
const http = require('http');

//创建一个大对象存储所有的路由和api
const route = {};

// 将所有路由和api合并的函数
function use(routeObj) {
  Object.assign(route, routeObj);
}

function start() {
  http
    .createServer(async (req, res) => {
      const url = new URL(req.url, 'http://127.0.0.1');
      route[url.pathname](res);
    })
    .listen(3000, () => {
      console.log('启动成功');
    });
}

module.exports = {
  use,
  start,
};

```

**route.js**

```js
const fs = require('fs');

function render(res, path, type = '') {
  res.writeHead(200, { 'Content-Type': `${type ? type : 'text/html'};charset=utf8` });
  res.write(fs.readFileSync(path), 'utf-8');
  res.end();
}

const route = {
  '/login'(res) {
    render(res, './static/login.html');
  },
  '/home'(res) {
    render(res, './static/home.html');
  },
  '/favicon.ico'(res) {
    render(res, './static/favicon.ico', 'image/x-icon');
  },
  '/404'(res) {
    res.writeHead(404, { 'Content-Type': 'text/html;charset=utf8' });
    res.write(fs.readFileSync('./static/404.html'), 'utf-8');
    res.end();
  },
};

module.exports = route;

```

**api.js**

```js
function render(res, data, type = '') {
  res.writeHead(200, { 'Content-Type': `${type ? type : 'application/json'};charset=utf8` });
  res.write(data);
  res.end();
}

const apiRouter = {
  '/api/login'(res) {
    render(res, '{ ok: 1 }');
  },
};

module.exports = apiRouter;

```

## 2.获取参数

**api.js**

```js
function render(res, data, type = '') {
  res.writeHead(200, { 'Content-Type': `${type ? type : 'application/json'};charset=utf8` });
  res.write(data);
  res.end();
}

const apiRouter = {
    //get请求
  '/api/login'(req, res) {
    const url = new URL(req.url, 'http://127.0.0.1');
    const data = {};
    let username = url.searchParams.get('username');
    let password = url.searchParams.get('password');
    if (username === 'ds' && password === '123') {
      Object.assign(data, {
        ok: 1,
      });
    } else {
      Object.assign(data, {
        ok: 0,
      });
    }
    render(res, JSON.stringify(data));
  },
    //post请求
  '/api/loginpost'(req, res) {
    const url = new URL(req.url, 'http://127.0.0.1');
    let data = '';
      //这里使用最原始的方法获取post请求参数
      // 通过req的data事件监听函数，每当接受到请求体的数据，就累加到post变量中
    req.on('data', chunk => {
      data += chunk;
    });
       // 在end事件触发后，通过querystring.parse将post解析为真正的POST请求格式，然后向客户端返回。
    req.on('end', () => {
      data = JSON.parse(data);
      if (data.username === 'ds' && data.password === '123') {
        render(res, JSON.stringify({ ok: 1 }));
      } else {
        render(res, JSON.stringify({ ok: 0 }));
      }
    });
  },
};

module.exports = apiRouter;

```

**请求.js**

```js
 login.onclick = () => {
        //get请求
        fetch(`/api/login?username=${username.value}&password=${password.value}`)
          .then(res => res.text())
          .then(res => {
            console.log(res);
          });
      };
  loginpost.onclick = () => {
    //post请求
    fetch(`/api/loginpost`, {
      method: 'POST',
      body: JSON.stringify({
        username: username.value,
        password: password.value,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(res => res.text())
      .then(res => {
        console.log(res);
      });
```

## 3.静态目录

**server.js**

```js
const http = require('http');

const route = {};

function use(routeObj) {
  Object.assign(route, routeObj);
}

function start() {
  http
    .createServer(async (req, res) => {
      const url = new URL(req.url, 'http://127.0.0.1');
      try {
        route[url.pathname](req, res);
          //使所有匹配不到的路径走404网页
      } catch (err) {
        route['/404'](req, res);
      }
    })
    .listen(3000, () => {
      console.log('启动成功');
    });
}

module.exports = {
  use,
  start,
};

```

**route.js**

```js
const fs = require('fs');
const path = require('path');
//根据文件后缀名自动获取响应头中content-type
const mime = require('mime');

function render(res, path, type = '') {
  res.writeHead(200, { 'Content-Type': `${type ? type : 'text/html'};charset=utf8` });
  res.write(fs.readFileSync(path), 'utf-8');
  res.end();
}

const route = {
  '/login'(req, res) {
    render(res, './static/login.html');
  },
  '/home'(req, res) {
    render(res, './static/home.html');
  },
  '/404'(req, res) {
    const url = new URL(req.url, 'http://127.0.0.1');
     /*
     <link href='/css/index.css'></link>根路径访问，就等于127.0.0.1:3000/css/index.css。
     这里将项目文件夹F://项目+static+/css/index.css合并成文件路径，如果存在就读取该文件返回
     */
    let pathname = path.join(__dirname, 'static', url.pathname);
    if (readStaticFile(res, pathname)) {
      return;
    }
    res.writeHead(404, { 'Content-Type': 'text/html;charset=utf8' });
    res.write(fs.readFileSync('./static/404.html'), 'utf-8');
    res.end();
  },
};

function readStaticFile(res, pathname) {
  let houzhui = pathname.split('.');
    //如果存在这些静态资源就用fs的写入方法返回回去，不走404
  if (fs.existsSync(pathname)) {
      //mime.getType(css)
    render(res, pathname, mime.getType(houzhui[houzhui.length - 1]));
    return true;
  } else {
    return false;
  }
}

module.exports = route;
```

