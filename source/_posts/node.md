---
title: Node学习笔记
tags: node.js
categories: Node.js
date: 2024-05-24 17:02:28
---

# Node.js

## 介绍

- Node.js并不是JavaScript应用，也不是编程语言，而是JavaScript的运行时。
- Node.js是构建在V8引擎之上的，V8引擎由C / C++编写，因此JavaScript语言需要编译为C / C++代码之后才能执行。
- Node.js采用异步IO和事件驱动的设计理念，可以高效的处理大量并发请求，提供了非阻塞IO接口和事件循环机制，使其可以编写出高性能、高扩展的应用程序。（异步IO通过libuv库来实现）
- Node.js使用npm作为包管理工具
- Node.js适合做一些IO密集型应用，不适合做一些CPU密集型应用（事件循环机制和异步IO使得Node.js有很强的处理能力，但是因为Node.js单线程的原因，容易造成CPU占用率过高）
- 如果非要用Node.js做CPU密集型应用，需要编写C++插件，或者Node提供的cluster模块。

## npm

- npm是Node.js的包管理工具，它基于命令行，用于帮助开发者在自己的项目中安装、升级、移除和管理依赖项。
- [npm命令大全](https://jiaxiaoxiao.netlify.app/2019/07/30/node/node-npm/)
- [package.json配置详解](https://juejin.cn/post/7145759868010364959)

#### npm install

执行`npm install`时，npm会通过广度优先遍历算法遍历依赖树，npm会首先处理项目根目录下的依赖，然后逐层处理每个依赖包的依赖，直到所有的依赖被处理完成。在处理每个依赖时，npm会检查该依赖的版本号是否符合依赖树中其他依赖的版本要求，如果不符合，则会尝试安装适合的版本。

![images](/images/Snipaste_2024-05-28_18-35-31.png)

#### .npmrc文件

```bash
registry=http://registry.npmjs.org/
# 定义npm的registry，即npm的包下载源
proxy=http://proxy.example.com:8080/
# 定义npm的代理服务器，用于访问网络
https-proxy=http://proxy.example.com:8080/
# 定义npm的https代理服务器，用于访问网络
strict-ssl=true
# 是否在SSL证书验证错误时退出
cafile=/path/to/cafile.pem
# 定义自定义CA证书文件的路径
user-agent=npm/{npm-version} node/{node-version} {platform}
# 自定义请求头中的User-Agent
save=true
# 安装包时是否自动保存到package.json的dependencies中
save-dev=true
# 安装包时是否自动保存到package.json的devDependencies中
save-exact=true
# 安装包时是否精确保存版本号
engine-strict=true
# 是否在安装时检查依赖的node和npm版本是否符合要求
scripts-prepend-node-path=true
# 是否在运行脚本时自动将node的路径添加到PATH环境变量中
```

#### package-lock.json

文件的作用：

- 锁定版本号、记录依赖树详细信息

- package-lock.json帮我们做了缓存，他会通过 `name + version + integrity` 信息生成一个唯一的key，这个key能找到对应的index-v5 下的缓存记录 （npm cache 文件夹下），如果发现有缓存记录，就会找到tar包的hash值，然后将对应的二进制文件解压到node_modeules

#### npm run 

读取package.json的scripts对应的脚本命令，查找的规则是：

1. 当前项目node_modules/.bin查找
2. 全局node_modules/.bin查找
3. 环境变量查找
4. 找不到，报错

node_modules/.bin中有三个文件（Node作为跨平台工具，需要处理平台兼容性）

- .sh文件是给Linux unix Macos 使用
- .cmd 给windows的cmd使用
- .ps1 给windows的powerShell 使用

#### npm 生命周期

在package.json中的scripts字段中，我们可以利用npm脚本命名规范使用npm的生命周期特性，例如：

```json
    "pretest": "node prev.js",
    "test": "node index.js",
    "posttest": "node post.js"
```

则执行：npm run test时，会最先执行pretest，最后执行posttest。

#### npx

npx是一个命令行工具，它是npm 5.2.0版本中新增的功能。它允许用户在不安装全局包的情况下，运行已安装在本地项目中的包或者远程仓库中的包。

npx的作用是在命令行中运行node包中的可执行文件，而不需要全局安装这些包。这可以使开发人员更轻松地管理包的依赖关系，并且可以避免全局污染的问题。它还可以帮助开发人员在项目中使用不同版本的包，而不会出现版本冲突的问题。

**npx 的优势**

1. 避免全局安装：`npx`允许你执行npm package，而不需要你先全局安装它。
2. 总是使用最新版本：如果你没有在本地安装相应的npm package，`npx`会从npm的package仓库中下载并使用最新版。
3. 执行任意npm包：`npx`不仅可以执行在`package.json`的`scripts`部分定义的命令，还可以执行任何npm package。
4. 执行GitHub gist：`npx`甚至可以执行GitHub gist或者其他公开的JavaScript文件。

**npm 和 npx 区别**

- `npx`侧重于执行命令的，执行某个模块命令。虽然会自动安装模块，但是重在执行某个命令

- `npm`侧重于安装或者卸载某个模块的。重在安装，并不具备执行某个模块的功能。

#### npm私服

**优势：**

- **可以离线使用**，你可以将npm私服部署到内网集群，这样离线也可以访问私有的包。
- **提高包的安全性**，使用私有的npm仓库可以更好的管理你的包，避免在使用公共的npm包的时候出现漏洞。
- **提高包的下载速度**，使用私有 npm 仓库，你可以将经常使用的 npm 包缓存到本地，从而显著提高包的下载速度，减少依赖包的下载时间。这对于团队内部开发和持续集成、部署等场景非常

**搭建：**

- 可以克隆npm或cnpm仓库，更改yaml配置文件为自己想要的设置即可
- 使用[verdaccio工具](https://verdaccio.org/zh-cn/)
  - `npm install verdaccio -g`
  - `verdaccio`
  - 访问localhost:4873
  - 使用npm操作时，加上`--registry http://localhost:4873`

## Node模块化

#### CommonJS

- 支持引入内置模块例如 `http` `os` `fs` `child_process` 等nodejs内置模块

- 支持引入第三方模块`express` `md5` `koa` 等

- 支持引入自己编写的模块 ./ ../ 等

- 支持引入addon C++扩展模块 .node文件

#### ESM

- import静态导入需要在顶层调用
- import导入json文件需要添加断言（低版本node不可用）
- 支持函数式动态导入

#### 对比

1. CommonJS基于运行时的同步加载，ESM基于编译时的异步加载
2. CommonJS是可以修改值的，ESM值并且不可修改（可读的）
3. CommonJS不可以tree shaking，ESM支持tree shaking
4. CommonJS中顶层的this指向这个模块本身，而ESM中顶层this指向undefined

#### require执行顺序

1. .js文件，调用compile函数进行执行。
2. .json文件，读取文件内容，调用JSON.parse方法处理。
3. .node文件，通过process.dlopen方法进行处理。

## 全局变量

#### global

- 浏览器端的全局对象是window
- Node环境的全局对象是global
- global上定义的变量在当前环境执行任何文件时都可以访问到
- ES2020推出globalThis用于兼容window和global（自动切换）

#### __dirname

当前模块所在目录的绝对路径

#### __filename

当前模块文件所在的绝对路径，包括文件名和文件扩展名

#### require

#### module

#### process

- `process.argv`
  - 第一个参数是当前执行环境的路径
  - 第二个参数是当前执行的文件的路径
  - 剩余的参数是传递给脚本文件的命令行参数

- `process.env`环境变量
- `process.cwd()`返回当前工作目录路径
- `process.on(event,listener)`，监听进程变化
- `process.exit([code])`，退出Node进程，提供退出码
- `process.pid`返回进程id

#### Buffer类

Node.js 6.0版本开始，`Buffer`构造函数的使用已被弃用，推荐使用`Buffer.alloc()`、`Buffer.from()`等方法来创建`Buffer`实例。

#### DOM、BOM

Node环境中无法操作DOM和BOM，不过可以借助一些工具进行模拟，例如：`jsdom`

```js
const fs = require('node:fs')
const { JSDOM } = require('jsdom') // jsdom模拟浏览器环境
const dom = new JSDOM(`<!DOCTYPE html><div id='app'></div>`)
const document = dom.window.document
const window = dom.window
fetch('https://api.thecatapi.com/v1/images/search?limit=10&page=1').then(res => res.json()).then(data => {
    const app = document.getElementById('app')
    data.forEach(item=>{
       const img =  document.createElement('img')
       img.src = item.url
       img.style.width = '200px'
       img.style.height = '200px'
       app.appendChild(img)
    })
    fs.writeFileSync('./index.html', dom.serialize())
})
```

## path模块

path模块在windows和posix系统中是有差异的。

- posix表示可移植操作系统接口，也就是定义了一套标准，遵守这套标准的操作系统有(unix,like unix,linux,macOs,windows wsl)，用于多个平台间相互兼容
- Windows 并没有完全遵循 POSIX 标准，在 Windows 系统中，路径使用反斜杠（`\`）作为路径分隔符。这与 POSIX 系统使用的正斜杠（`/`）是不同的

**差异举例：**

```
path.basename('C:\temp\myfile.html'); 
// 在posix中 返回: 'C:\temp\myfile.html'
// 在windows中 返回 empmyfile.html
```

- path.basename返回文件名（包括后缀）

```js
path.basename('C:/fs/dmq/MI/index.html') //返回index.html
```

- `path.extname`返回扩展名
- `path.join`路径拼接（路径拼接）
- `path.resolve`解析绝对路径并且返回绝对路径（路径解析）
- `path.parse`将路径解析为对象
- `path.format`将对象解析为路径

## os模块

|      | API                        | 作用                                                         |
| ---- | -------------------------- | ------------------------------------------------------------ |
| 1    | **os.type()**              | 它在 Linux 上返回 `'Linux'`，在 macOS 上返回 `'Darwin'`，在 Windows 上返回 `'Windows_NT'` |
| 2    | **os.platform()**          | 返回标识为其编译 Node.js 二进制文件的操作系统平台的字符串。 该值在编译时设置。 可能的值为 `'aix'`、`'darwin'`、`'freebsd'`、`'linux'`、`'openbsd'`、`'sunos'`、以及 `'win32'` |
| 3    | **os.release()**           | 返回操作系统的版本例如10.xxxx win10                          |
| 4    | **os.homedir()**           | 返回用户目录 例如c:\user\xiaoman 原理就是 windows `echo %USERPROFILE% `posix $HOME |
| 5    | **os.arch()**              | 返回cpu的架构  可能的值为 `'arm'`、`'arm64'`、`'ia32'`、`'mips'`、`'mipsel'`、`'ppc'`、`'ppc64'`、`'s390'`、`'s390x'`、以及 `'x64'` |
| 6    | **os.cups()**              | 获取`cpu线程`和cpu详细信息                                   |
| 7    | **os.networkInterfaces()** | 获取`网络信息`                                               |

## process模块



- `process.argv`
  - 第一个参数是当前执行环境的路径
  - 第二个参数是当前执行的文件的路径
  - 剩余的参数是传递给脚本文件的命令行参数

- `process.env`环境变量
- `process.cwd()`返回当前工作目录路径
- `process.on(event,listener)`，监听进程变化
- `process.exit([code])`，退出Node进程，提供退出码
- `process.pid`返回进程id
- `process.arch`返回操作系统CPU架构
- `process.memoryUsage`获取当前进程内存使用情况
- `process.kill(process.pid)`用于杀死一个进程

## child_process模块

子进程是Nodejs核心API，如果你会shell命令，他会有非常大的帮助，或者你喜欢编写前端工程化工具之类的，他也有很大的用处，以及处理CPU密集型应用。

#### 创建子进程

Nodejs创建子进程共有`7个`API Sync同步API ，不加是异步API

1. spawn  执行命令
2. exec   执行命令
3. execFile   执行可执行文件
4. fork   创建node子进程
5. `execSync` 执行命令 同步执行
6. `execFileSync` 执行可执行文件 同步执行
7. `spawnSync` 执行命令 同步执行

## [ffmpeg工具](https://ffmpeg.p2hp.com/download.html)

FFmpeg 是一个开源的跨平台多媒体处理工具，可以用于处理音频、视频和多媒体流。它提供了一组强大的命令行工具和库，可以进行视频转码、视频剪辑、音频提取、音视频合并、流媒体传输等操作。

## events模块

Node.js的事件模型采用发布订阅的设计思想，将发布者和订阅者之间解耦合，使得双方能够独立地扩展自己。

```js
const EventEmitter = require('events');
const event = new EventEmitter()
//监听test
event.on('test',(data)=>{
    console.log(data)
})
event.emit('test','data数据') //派发事件
```

event实例默认监听10个为上限，可以通过`setMaxListeners()`方法来设置监听上限。

```js
event.setMaxListeners(20)
```

`event.once方法`可以只订阅一次

```js
event.once('test',(data)=>{
	console.log('once取代on，只监听一次')
})
```

`event.off`方法取消订阅

```JS
event.on('test', fn) // 订阅事件
event.off('test', fn) // 取消事件订阅
```

#### SSE

- SSE（server send events）服务端推送事件

- 是一种实现服务端向客户端推送数据的技术，也被称为事件流

- 它是基于HTTP协议，利用HTTP协议长连接的优势，实现服务端向客户端推送实时数据。
- 浏览器端需要使用`EventSource`注册api地址，服务端需要对该地址的响应头中设置Content-Type为 `text/event-stream `

**node后端：**

```js
import express from 'express';
const app = express();
app.get('/api/sse', (req, res) => {
    res.writeHead(200, {
        'Content-Type': 'text/event-stream', //核心返回数据流
        'Connection': 'close'
    })
    const data = fs.readFileSync('./index.txt', 'utf8')
    const total = data.length;
    let current = 0;
    //mock sse 数据
    let time = setInterval(() => {
        console.log(current, total)
        if (current >= total) {
            console.log('end')
            clearInterval(time)
            return
        }
        //返回自定义事件名
        res.write(`event:name\n`)
        //返回数据
        res.write(`data:${data.split('')[current]}\n\n`)
        current++
    }, 300)
})
app.listen(3000, () => {
    console.log('Listening on port 3000');
});
```

**客户端：**

```js
const sse = new EventSource('http://localhost:3000/api/sse' )
if (sse.readyState === EventSource.CONNECTING) {
  console.log('正在连接服务器...');
} else if (sse.readyState === EventSource.OPEN) {
  console.log('已经连接上服务器！');
} else if (sse.readyState === EventSource.CLOSED) {
  console.log('连接已经关闭。');
}
sse.onmessage = (data)=>{
    console.log(data);
}
sse.onerror = (e)=>{
    sse.close(); //关闭连接
    console.error(e);
}
sse.addEventListener('open', (e) => {
    console.log('连接成功');
})
//对应后端nodejs自定义的事件名lol
sse.addEventListener('name', (e) => {
    console.log(e.data)
})
```

## util模块

Node.js内部提供的工具集模块，方便快速开发

- `util.promisify`将函数改为promise类型的形式
- `util.callbackify`将promise类型的api改为函数形式
- `util.format`用于格式化文本
  - `%s`: `String` 将用于转换除 `BigInt`、`Object` 和 `-0` 之外的所有值。 `BigInt` 值将用 `n` 表示，没有用户定义的 `toString` 函数的对象使用具有选项 `{ depth: 0, colors: false, compact: 3 }` 的 `util.inspect()` 进行检查。
  - `%d`: `Number` 将用于转换除 `BigInt` 和 `Symbol` 之外的所有值。
  - `%i`: `parseInt(value, 10)` 用于除 `BigInt` 和 `Symbol` 之外的所有值。
  - `%f`: `parseFloat(value)` 用于除 `Symbol` 之外的所有值。
  - `%j`: JSON。 如果参数包含循环引用，则替换为字符串 `'[Circular]'`。
  - `%o`: `Object`. 具有通用 JavaScript 对象格式的对象的字符串表示形式。 类似于具有选项 `{ showHidden: true, showProxy: true }` 的 `util.inspect()`。 这将显示完整的对象，包括不可枚举的属性和代理。
  - `%O`: `Object`. 具有通用 JavaScript 对象格式的对象的字符串表示形式。 类似于没有选项的 `util.inspect()`。 这将显示完整的对象，但不包括不可枚举的属性和代理。
  - `%c`: `CSS`. 此说明符被忽略，将跳过任何传入的 CSS。
  - `%%`: 单个百分号 (`'%'`)。 这不消费参数。

- 其他工具函数省略

## [pngquant工具](https://pngquant.org/)

`pngquant` 是一个用于压缩 PNG 图像文件的工具。它可以显著减小 PNG 文件的大小，同时保持图像质量和透明度。通过减小文件大小，可以提高网页加载速度，并节省存储空间。`pngquant` 提供命令行接口和库，可轻松集成到各种应用程序和脚本中。

## fs模块

在 Node.js 中，`fs` 模块是文件系统模块（File System module）的缩写，它提供了与文件系统进行交互的各种功能。通过 `fs` 模块，你可以执行诸如读取文件、写入文件、更改文件权限、创建目录等操作，`Node.js 核心API之一`。

#### 同步与异步

- fs支持同步和异步两种模式 增加了`Sync` fs 就会采用同步的方式运行代码，会阻塞下面的代码，不加Sync就是异步的模式不会阻塞。

- fs新增了promise版本，只需要在引入包后面增加/promise即可，fs便可支持promise回调。

- fs返回的是一个buffer二进制数据 每两个十六进制数字表示一个字节

#### api

- `fs.readFile`异步读取文件
- `fs.writeFile`异步写入文件
- `fs.appendFile`文件异步追加写入内容
- `fs.copyFile`文件异步拷贝写入
- `fs.open`异步打开文件
- `fs.close`异步关闭文件
- `fs.read`异步读取文件
- `fs.write`异步将Buffer中的数据写入文件
- `fs.access`异步检查文件是否可读可写
- `fs.stat`异步获取文件目录的stats对象（文件夹信息）
- `fs.mkdir`异步创建文件夹
- `fs.readdir`异步读取文件夹
- `fs.rmdir`异步删除目录
- `fs.unlink`异步删除文件
- 以上方法都有对应的同步执行的方法，在方法名后面加上Sync后缀即可。

#### fs/promises

node中fs模块的方法提供了Promise版本的调用形式，导入即可使用promise的使用方式调用api

#### 源码

Node.js中fs模块是由libuv来进行调度的，文件读取完成之后libuv才会将fs的结果推入V8的队列。

#### writeFileSync

- 第一个参数是要写入的文件
- 第二个参数是写入的内容
- 第三个参数是写入方式配置项，其flag有以下配置：
  - `'a'`: 打开文件进行追加。 如果文件不存在，则创建该文件。
  - `'ax'`: 类似于 `'a'` 但如果路径存在则失败。
  - `'a+'`: 打开文件进行读取和追加。 如果文件不存在，则创建该文件。
  - `'ax+'`: 类似于 `'a+'` 但如果路径存在则失败。
  - `'as'`: 以同步模式打开文件进行追加。 如果文件不存在，则创建该文件。
  - `'as+'`: 以同步模式打开文件进行读取和追加。 如果文件不存在，则创建该文件。
  - `'r'`: 打开文件进行读取。 如果文件不存在，则会发生异常。
  - `'r+'`: 打开文件进行读写。 如果文件不存在，则会发生异常。
  - `'rs+'`: 以同步模式打开文件进行读写。 指示操作系统绕过本地文件系统缓存。
  - `'w'`: 打开文件进行写入。 创建（如果它不存在）或截断（如果它存在）该文件。
  - `'wx'`: 类似于 `'w'` 但如果路径存在则失败。
  - `'w+'`: 打开文件进行读写。 创建（如果它不存在）或截断（如果它存在）该文件。
  - `'wx+'`: 类似于 `'w+'` 但如果路径存在则失败。

例如追加文件内容除了可以使用`appendFileSync`之外，还可以：

```js
fs.writeFileSync('index.txt', '追加的内容',{
    flag: 'a' //配置options中的flag
})
```

#### 可写流

```js
const fs = require('node:fs')
let verse = [
    '待到秋来九月八',
    '我花开后百花杀',
    '冲天香阵透长安',
    '满城尽带黄金甲'
]
let writeStream = fs.createWriteStream('index.txt') //创建写入流
verse.forEach(item => {
    writeStream.write(item + '\n') //写入内容
})
writeStream.end()
writeStream.on('finish',()=>{ //监听写入完成事件
    console.log('写入完成')
})
```

我们可以创建一个可写流 打开一个通道，可以一直写入数据，用于处理大量的数据写入，写入完成之后调用end 关闭可写流，监听finish 事件 写入完成

#### 硬链接、软连接

###### inode

- 文件存储在磁盘上，磁盘的最小存储单位叫做`扇区`，每个扇区存储512字节
- 操作系统读取磁盘时，不会一个扇区一个扇区地读取，这样效率太低，而是一次性连续读取多个扇区，多个扇区称之为`块`
- `块`是文件读取的最小单位
- 文件数据都存储在`块`中，因此需要一个地方存储文件的元信息，这中存储文件元信息的区域就叫做`inode`，索引节点
- 创建软链接时生成了新的`inode`，创建硬链接时没有。

![扇区、块和inode](/images/Snipaste_2024-05-29_14-07-39.png)

**inode中包含信息：**

- 文件的字节数
- 文件拥有者ID
- 文件的Group ID
- 文件读、写、执行权限
- 文件的时间戳
- 链接数
- 文件数据block的位置

每一个 `inode` 都有一个唯一的标识码 ，上面的输出信息中 `ino` 就是 `inode` 的唯一标识码，在 `linux` 系统内部使用 `inode` 的标识码来识别文件，并不使用文件名。之前系的

在 `linux` 系统中，目录也是一种文件。目录文件包含一系列目录项，每一个目录项由两部分组成：所包含文件的文件名，以及文件名对应的 `inode` 标识码。我们可以使用 `ls -i` 来列出目录中的文件以及所有的 `inde` 标识码。这里也可以解释可能小伙伴们觉得说不通的问题，仅修改目录的读权限，并不能实现读取目录下所有文件内容的原因，最后需要通过递归目录下的文件来进行修改。

###### 软链接

软链接类似于 `Window` 中的 “快捷方式” 。创建软链接会创建一个新的 `inode`，比如为文件 `a` 创建了软链接文件 b，文件 `b` 内部会指向 `a` 的 `inode`。当我们读取文件`b`的时候，系统会自动导向文件 `a` ，文件 `b` 就是文件 `a` 软连接(或者叫符号链接)。

- 访问：创建了软链接后我们就可以使用不同的文件名访问相同的内容，
- 修改：修改文件 `a` 的内容，文件 `b` 的内容也会发生改变，对文件内容的修改向放映到所有文件。
- 删除：当我们删除源文件 `a` 时，在访问软连接文件 b 是，会报错 `"No such file or directory"`

可以直接使用 `linux` 命令 `ln -s source target` 来创建软链接(注意：表示 `target` “指向” `source`）

![软链接](/images/Snipaste_2024-05-29_14-12-05.png)

###### 硬链接

一般情况，一个文件名"唯一"对应一个 `inode`。但是 `linux` 允许多个文件名都指向同一个 `inode`。表示我们可以使用不同对文件名访问同样的内容；对文件内容进行修改将放映到所有文件；删除一个文件不影响另一个文件对访问。这种机制就被称为"硬链接"

硬链接的创建 可以直接使用 `linux` 命令 `ln source target` 来创建硬链接（注意：`source` 已存在的文件，target 是将要建立的链接）

![硬链接](/images/Snipaste_2024-05-29_14-14-11.png)

###### 创建链接

```js
fs.linkSync('./index.txt', './index2.txt') //硬链接
fs.symlinkSync('./index.txt', './index3.txt' ,"file") //软连接
```

###### 用途

**硬链接的作用和用途如下：**

1. 文件共享：硬链接允许多个文件名指向同一个文件，这样可以在不同的位置使用不同的文件名引用相同的内容。这样的共享文件可以节省存储空间，并且在多个位置对文件的修改会反映在所有引用文件上。
2. 文件备份：通过创建硬链接，可以在不复制文件的情况下创建文件的备份。如果原始文件发生更改，备份文件也会自动更新。这样可以节省磁盘空间，并确保备份文件与原始文件保持同步。
3. 文件重命名：通过创建硬链接，可以为文件创建一个新的文件名，而无需复制或移动文件。这对于需要更改文件名但保持相同内容和属性的场景非常有用。

**软链接的一些特点和用途如下：**

1. 软链接可以创建指向文件或目录的引用。这使得你可以在不复制或移动文件的情况下引用它们，并在不同位置使用不同的文件名访问相同的内容。
2. 软链接可以用于创建快捷方式或别名，使得你可以通过一个简短或易记的路径来访问复杂或深层次的目录结构。
3. 软链接可以用于解决文件或目录的位置变化问题。如果目标文件或目录被移动或重命名，只需更新软链接的目标路径即可，而不需要修改引用该文件或目录的其他代码。

## crypto模块

crypto模块的目的是为了提供通用的`加密和哈希算法`。用纯JavaScript代码实现这些功能不是不可能，但速度会非常慢。nodejs用C/C++实现这些算法后，通过crypto这个模块暴露为JavaScript接口，这样用起来方便，运行速度也快。

密码学是计算机科学中的一个重要领域，它涉及到加密、解密、哈希函数和数字签名等技术。Node.js是一个流行的服务器端JavaScript运行环境，它提供了强大的密码学模块，使开发人员能够轻松地在其应用程序中实现各种密码学功能。本文将介绍密码学的基本概念，并探讨Node.js中常用的密码学API。

#### 对称加密

```js
js复制代码const crypto = require('node:crypto');

// 生成一个随机的 16 字节的初始化向量 (IV)
const iv = Buffer.from(crypto.randomBytes(16));

// 生成一个随机的 32 字节的密钥
const key = crypto.randomBytes(32);

// 创建加密实例，使用 AES-256-CBC 算法，提供密钥和初始化向量
const cipher = crypto.createCipheriv("aes-256-cbc", key, iv);

// 对输入数据进行加密，并输出加密结果的十六进制表示
cipher.update("小满zs", "utf-8", "hex");
const result = cipher.final("hex");

// 解密
const de = crypto.createDecipheriv("aes-256-cbc", key, iv);
de.update(result, "hex");
const decrypted = de.final("utf-8");

console.log("Decrypted:", decrypted);
```

对称加密是一种简单而快速的加密方式，它使用相同的密钥（称为对称密钥）来进行加密和解密。这意味着发送者和接收者在加密和解密过程中都使用相同的密钥。对称加密算法的加密速度很快，适合对大量数据进行加密和解密操作。然而，对称密钥的安全性是一个挑战，因为需要确保发送者和接收者都安全地共享密钥，否则有风险被未授权的人获取密钥并解密数据。

#### 非对称加密

```js
js复制代码const crypto = require('node:crypto')
// 生成 RSA 密钥对
const { privateKey, publicKey } = crypto.generateKeyPairSync('rsa', {
  modulusLength: 2048,
});

// 要加密的数据
const text = '小满zs';

// 使用公钥进行加密
const encrypted = crypto.publicEncrypt(publicKey, Buffer.from(text, 'utf-8'));

// 使用私钥进行解密
const decrypted = crypto.privateDecrypt(privateKey, encrypted);

console.log(decrypted.toString());
```

非对称加密使用一对密钥，分别是公钥和私钥。发送者使用接收者的公钥进行加密，而接收者使用自己的私钥进行解密。公钥可以自由分享给任何人，而私钥必须保密。非对称加密算法提供了更高的安全性，因为即使公钥泄露，只有持有私钥的接收者才能解密数据。然而，非对称加密算法的加密速度相对较慢，不适合加密大量数据。因此，在实际应用中，通常使用非对称加密来交换对称密钥，然后使用对称加密算法来加密实际的数据。

#### 哈希函数

```js
const crypto = require('node:crypto');
// 要计算哈希的数据
let text = '123456';
// 创建哈希对象，并使用 MD5 算法
const hash = crypto.createHash('md5');
// 更新哈希对象的数据
hash.update(text);
// 计算哈希值，并以十六进制字符串形式输出
const hashValue = hash.digest('hex');
console.log('Text:', text);
console.log('Hash:', hashValue);
```

哈希函数具有以下特点：

1. 固定长度输出：不论输入数据的大小，哈希函数的输出长度是固定的。例如，常见的哈希函数如 MD5 和 SHA-256 生成的哈希值长度分别为 128 位和 256 位。
2. 不可逆性：哈希函数是单向的，意味着从哈希值推导出原始输入数据是非常困难的，几乎不可能。即使输入数据发生微小的变化，其哈希值也会完全不同。
3. 唯一性：哈希函数应该具有较低的碰撞概率，即不同的输入数据生成相同的哈希值的可能性应该非常小。这有助于确保哈希值能够唯一地标识输入数据。

使用场景

1. 我们可以避免密码明文传输 使用md5加密或者sha256
2. 验证文件完整性，读取文件内容生成md5 如果前端上传的md5和后端的读取文件内部的md5匹配说明文件是完整的

## md转html

#### 工具

- ejs：模板渲染库，使用特定语法填充内容，进行模板渲染
- marked：用于将Markdown语法转为HTML
- browserSync：用于在浏览器实时预览和同步刷新

#### 使用

index.js

```js
const ejs = require('ejs'); // 导入ejs库，用于渲染模板
const fs = require('node:fs'); // 导入fs模块，用于文件系统操作
const marked = require('marked'); // 导入marked库，用于将Markdown转换为HTML
const readme = fs.readFileSync('README.md'); // 读取README.md文件的内容,直接read的结果是buffer中的数据，通过toString方法变为原始内容
const browserSync = require('browser-sync'); // 导入browser-sync库，用于实时预览和同步浏览器
const openBrowser =  () => {
    // 创建浏览器服务
    const browser = browserSync.create()
    // 初始化浏览器服务 ，传入目录和主页
    browser.init({
        server: {
            baseDir: './',
            index: 'index.html',
        }
    })
    return browser
}
// ejs模板进行渲染，传入变量
ejs.renderFile('template.ejs', {
    content: marked.parse(readme.toString()),
    title:'markdown to html'
},(err,data)=>{
    if(err){
        console.log(err)
    }
    // 将文件内容写入到index.html
    let writeStream = fs.createWriteStream('index.html')
    writeStream.write(data)
    writeStream.close()
    writeStream.on('finish',()=>{
        // index.html写入完毕之后，打开浏览器实时预览
        openBrowser()
    })
})     
```

template.ejs

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><%= title %></title>
    <link rel="stylesheet" href="./index.css">  <!-- 引入css样式 -->
</head>
<body>
    <%- content %>
</body>
</html>
```

index.css

```css
/* Markdown通用样式 */
/* 设置全局字体样式 */
body {
    font-family: Arial, sans-serif;
    font-size: 16px;
    line-height: 1.6;
    color: #333;
  }
  /* 设置标题样式 */
  h1,h2,h3,h4,h5,h6 {
    margin-top: 1.3em;
    margin-bottom: 0.6em;
    font-weight: bold;
  }
  h1 {
    font-size: 2.2em;
  }
  h2 {
    font-size: 1.8em;
  }
  h3 {
    font-size: 1.6em;
  }
  h4 {
    font-size: 1.4em;
  }
  h5 {
    font-size: 1.2em;
  }
  h6 {
    font-size: 1em;
  }
  /* 设置段落样式 */
  p {
    margin-bottom: 1.3em;
  }
  /* 设置链接样式 */
  a {
    color: #337ab7;
    text-decoration: none;
  }
  a:hover {
    text-decoration: underline;
  }
  /* 设置列表样式 */
  ul,
  ol {
    margin-top: 0;
    margin-bottom: 1.3em;
    padding-left: 2em;
  }
  /* 设置代码块样式 */
  pre {
    background-color: #f7f7f7;
    padding: 1em;
    border-radius: 4px;
    overflow: auto;
  }
  code {
    font-family: Consolas, Monaco, Courier, monospace;
    font-size: 0.9em;
    background-color: #f7f7f7;
    padding: 0.2em 0.4em;
    border-radius: 4px;
  }
  /* 设置引用样式 */
  blockquote {
    margin: 0;
    padding-left: 1em;
    border-left: 4px solid #ddd;
    color: #777;
  }
  /* 设置表格样式 */
  table {
    border-collapse: collapse;
    width: 100%;
    margin-bottom: 1.3em;
  }
  table th,
  table td {
    padding: 0.5em;
    border: 1px solid #ccc;
  }
  /* 添加一些额外的样式，如图片居中显示 */
  img {
    display: block;
    margin: 0 auto;
    max-width: 100%;
    height: auto;
  }
  /* 设置代码行号样式 */
  pre code .line-numbers {
    display: inline-block;
    width: 2em;
    padding-right: 1em;
    color: #999;
    text-align: right;
    user-select: none;
    pointer-events: none;
    border-right: 1px solid #ddd;
    margin-right: 0.5em;
  }
  /* 设置代码行样式 */
  pre code .line {
    display: block;
    padding-left: 1.5em;
  }
  /* 设置代码高亮样式 */
  pre code .line.highlighted {
    background-color: #f7f7f7;
  }
  /* 添加一些响应式样式，适应移动设备 */
  @media only screen and (max-width: 768px) {
    body {
      font-size: 14px;
      line-height: 1.5;
    }
    h1 {
      font-size: 1.8em;
    }
    h2 {
      font-size: 1.5em;
    }
    h3 {
      font-size: 1.3em;
    }
    h4 {
      font-size: 1.1em;
    }
    h5 {
      font-size: 1em;
    }
    h6 {
      font-size: 0.9em;
    }
    table {
      font-size: 14px;
    }
  }    
```

## zlib模块

#### 介绍

- Node.js中zlib模块用于对数据提供压缩和解压缩的功能，以便在应用程序中减少数据的传输大小、节省带宽和提高性能
- 该模块包含各种压缩算法，包含Deflate、Gzip和Raw Deflate等

#### 作用

- 数据压缩，减少数据的大小，这在网络传输和磁盘存储中很有用，可以节省带宽和存储空间

- 数据解压缩

- 流压缩，zlib模块支持流式的方式进行数据的压缩和解压缩，使得可以对大型文件或者网络数据流进行逐步处理，而不需要将整个数据加载到内存中。

  ```js
  // 压缩文件（以Gzip为例）
  const zlib = require('zlib')
  const fs = require('node:fs')
  const readStream = fs.createReadStream('./test.txt');
  const writeStream = fs.createWriteStream('./test.txt.gz');
  // 将readStream利用zlib进行压缩,pipe到下一个管道，最后pipe到写入流
  readStream.pipe(zlib.createGzip()).pipe(writeStream)
  // 解压缩文件
  const reStr = fs.createReadStream('./test.txt.gz');
  const wrStr = fs.createWriteStream('./t.txt');
  const gunzip = zlib.createGunzip();
  reStr.pipe(gunzip).pipe(wrStr);
  gunzip.on('error', (err) => {
      console.error('Gunzip error:', err);
  });
    reStr.on('end', () => {
      console.log('Input file has been read.');
  });
    wrStr.on('finish', () => {
      console.log('Output file has been written.');
  });
  ```

  #### 对比

  1. 压缩算法：Gzip 使用的是 Deflate 压缩算法，该算法结合了 LZ77 算法和哈夫曼编码。LZ77 算法用于数据的重复字符串的替换和引用，而哈夫曼编码用于进一步压缩数据。
  2. 压缩效率：Gzip 压缩通常具有更高的压缩率，因为它使用了哈夫曼编码来进一步压缩数据。哈夫曼编码根据字符的出现频率，将较常见的字符用较短的编码表示，从而减小数据的大小。
  3. 压缩速度：相比于仅使用 Deflate 的方式，Gzip 压缩需要更多的计算和处理时间，因为它还要进行哈夫曼编码的步骤。因此，在压缩速度方面，Deflate 可能比 Gzip 更快。
  4. 应用场景：Gzip 压缩常用于文件压缩、网络传输和 HTTP 响应的内容编码。它广泛应用于 Web 服务器和浏览器之间的数据传输，以减小文件大小和提高网络传输效率。
  5. deflate是一种过时的压缩方式，现代浏览器对其支持并不友好

**zlib模块可以用于对发送网络请求返回的数据进行压缩，节省带宽和传输速率。**

#### brotli

- 针对常见的 Web 资源内容，Brotli 的性能比 Gzip 提高了 17-25%；
- 当 Brotli 压缩级别为 1 时，压缩率比 Gzip 的最高级别 9 还要高；
- 在处理不同的 HTML 文档时，Brotli 依然能提供非常高的压缩率。
- 除了 IE 和 Opera Mini 之外，几乎所有主流浏览器都已支持 Brotli 算法。
- 尽管 Brotli 在压缩方面表现出色，但随着压缩级别的提高，Brotli 压缩所需的时间也会相应增加。换句话说，Brotli 需要更多的计算能力，这可能意味着更高的设备和软件成本。
- Brotli 要求浏览器必须支持 HTTPS 才能使用。

## http模块

#### 介绍

- http模块是Node.js中用于创建和处理HTTP服务器和客户端的核心模块
- http模块使得基于HTTP协议的应用程序更加简单和灵活
- http模块也可以用于创建代理服务器，用于转发客户端的请求到其他服务器，代理服务器可以用于负载均衡、缓存、安全过滤或跨域请求等场景。通过在代理服务器上添加逻辑，可以对请求和响应进行修改、记录或过滤。
- http模块也可以创建文件服务器，用于提供静态文件，通过读取文件并将其作为响应发送给客户端。

#### 使用

```js
const http = require('http')
const httpServer = http.createServer((req,res)=>{
    if(req.method === 'POST'){}
    else if(req.method === 'GET'){}
})
httpServer.listen(98,()=>{
    console.log('服务器启动，端口：98');
})
```

#### url模块

可以通过url模块来解析req的请求路径，来进一步精细化响应内容。

```js
const http = require('node:http'); // 引入 http 模块
const url = require('node:url'); // 引入 url 模块
// 创建 HTTP 服务器，并传入回调函数用于处理请求和生成响应
http.createServer((req, res) => {
  const { pathname, query } = url.parse(req.url, true); // 解析请求的 URL，获取路径和查询参数
  if (req.method === 'POST') { // 检查请求方法是否为 POST
    if (pathname === '/post') { // 检查路径是否为 '/post'
      let data = '';
      req.on('data', (chunk) => {
        data += chunk; // 获取 POST 请求的数据
        console.log(data);
      });
      req.on('end', () => {
        res.setHeader('Content-Type', 'application/json'); // 设置响应头的 Content-Type 为 'application/json'
        res.statusCode = 200; // 设置响应状态码为 200
        res.end(data); // 将获取到的数据作为响应体返回
      });
    } else {
      res.setHeader('Content-Type', 'application/json'); // 设置响应头的 Content-Type 为 'application/json'
      res.statusCode = 404; // 设置响应状态码为 404
      res.end('Not Found'); // 返回 'Not Found' 作为响应体
    }
  } else if (req.method === 'GET') { // 检查请求方法是否为 GET
    if (pathname === '/get') { // 检查路径是否为 '/get'
      console.log(query.a); // 打印查询参数中的键名为 'a' 的值
      res.end('get success'); // 返回 'get success' 作为响应体
    }
  }
}).listen(98, () => {
  console.log('server is running on port 98'); // 打印服务器启动的信息
});
```

## 动静分离

- 动静分离是Web服务器架构中常用的优化技术，用于提高网站的性能和可伸缩性
- 原理就是将静态资源的请求和动态内容分开处理（通过url，例如加上static后缀表示静态）
- 好处在于：
  - 性能优化（静态资源内容不变，可以利用缓存）
  - 负载均衡（动态内容请求分发到不同的服务器或服务上，平衡服务器的负载）
  - 安全性（动态内容往往涉及敏感信息，动静分离可以更好地管理访问控制和安全策略）

```js
import http from 'node:http' // 导入http模块
import fs from 'node:fs' // 导入文件系统模块
import path from 'node:path' // 导入路径处理模块
import mime from 'mime' // 导入mime模块
const server = http.createServer((req, res) => {
    const { url, method } = req
    // 处理静态资源
    if (method === 'GET' && url.startsWith('/static')) {
        const filePath = path.join(process.cwd(), url) // 获取文件路径
        const mimeType = mime.getType(filePath) // 获取文件的MIME类型
        console.log(mimeType) // 打印MIME类型
        fs.readFile(filePath, (err, data) => { // 读取文件内容
            if (err) {
                res.writeHead(404, {
                    "Content-Type": "text/plain" // 设置响应头为纯文本类型
                })
                res.end('not found') // 返回404 Not Found
            } else {
                res.writeHead(200, {
                    "Content-Type": mimeType, // 设置响应头为对应的MIME类型
                    "Cache-Control": "public, max-age=3600" // 设置缓存控制头
                })
                res.end(data) // 返回文件内容
            }
        })
    }
    // 处理动态资源
    if (url.startsWith('/api')) {
        // ...处理动态资源的逻辑
    }
})
server.listen(80) // 监听端口80
```

## 邮件服务

邮件服务可以用于给成员发送邮件、通知成员信息

**工具：**

- js-yaml：用于将yaml转为js对象
- nodemailer：用于创建邮件服务

**使用：**

```js
// node.js发送邮件
const yamlTrans = require('js-yaml');
const fs = require('fs');
const nodemailer = require('nodemailer')
const yamlCode = fs.readFileSync('./data.yaml','utf-8');
const dataObj = yamlTrans.load(yamlCode);
//nodemailer.createTransport创建transPort服务,传入auth信息和配置项
//授权码需要到对应官网生成
const transPort = nodemailer.createTransport({
    serviece:'qq',
    port:587,
    host:'smtp.qq.cmo',
    secure:true,
    auth:{
        pass:dataObj.pass, //授权码需要去官网申请生成
        user:dataObj.user
    }
})
// sendMail方法发送邮件，传入接收方信息
transPort.sendMail({
    to: send.qq.com,
    from: dataObj.user,
    subject: '邮件标题',
    text: '邮件内容'
})
```

