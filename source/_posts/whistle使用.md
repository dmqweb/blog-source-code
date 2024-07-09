---
title: whistle抓包
categories: whistle
date: 2024-05-17 09:14:12
tags: 
- whistle
- 抓包工具
sticky: true
---

# whistle简单使用

### whistle安装启动

安装：npm i -g whistle

使用：w2 start

访问：访问对应的页面

作用：

- 任何的链接都会经过工具转发一下，并记录下来
- 使用前需要配置代理到whistle服务的地址和端口上（设置代理如下）

### 使用步骤

设置代理：

- 手机端省略
- 电脑端：
  - 网络偏好设置---高级---代理---网页代理、安全网页代理
  - 配置代理的ip地址和端口号（8899）

确认证书：

一般会自动下载，也可以打开8899端口找到证书下载并确认信任

**查看抓包情况和设置代理转发：**

打开127.0.0.1:8899端口进行设置

# whistle高级

### mock数据

设置线上地址转发到本地json文件（使用file路径），模拟请求数据。

### 部分文件请求转发（重要）

例如线上环境有某个文件报错，生产环境无法复现，可以将该文件地址转发到本地的js文件（使用file路径），方便进行调试，提高调试效率。

### 请求转发

可以作为跨域的一种方案，将本地的请求转发到线上的路径，这样就不会发生跨域问题

### 注入html、css和 js

whistle会自动根据响应内容的类型，判断是否注入相应的文本以及如何注入（是否用标签包裹）

例如：

```yaml
https://www.baidu.com  css:///Users/dmq/Desktop/test.css
```

这将会在百度的官网注入自定义的css样式。

###### 举例：

向百度网站注入vconsole.js源码，方便调试打印日志。

1. 下载vconsole到本地或者直接复制源码到whistle中的values中

2. 本地js文件创建VConsole实例，或者直接在whistle的values中创建js文件，文件中创建vconsole实例。

3. 在rules中向百度网站注入两个js文件（以whistle中配置values为示例）

   ```yaml
   www.baidu.com  jsPrepend://{vConsole.min.js}  #引入源码
   www.baidu.com  jsPrepend://{vconsole.js}  #引入实例化js
   www.baidu.com  log://  #在whistle中也打印log
   ```

### 同步抓包日志

在rules中配置网站的输出，可以将抓包的log日志同步到whistle中的log面板，配置例如：

```yaml
www.baidu.com   log:// #同步日志
```

### 解决跨域问题

可以单独设置网站允许跨域访问，例如在rules中配置：

```yaml
https://localhost:5500/list   resCors://*  #表示该网站允许跨域访问
```

或者使用前端转发代理来处理跨域：

```yaml
https://localhost:8080/list   https://localhost:5500/list  
#将请求的网址代理到同域名同端口的网址，就不会发生跨域。
```



[本文学习自b站，原文档地址](https://blog.csdn.net/qq_35577655/article/details/119283028)