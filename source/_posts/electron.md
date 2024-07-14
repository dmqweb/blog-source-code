---
title: electron
tags: 
- electron
categories: electron
date: 2024-05-21 19:35:27
---
**Electron中preload模块最为重要，它的源码逻辑如下：**
- 首先electron中封装了c++模块对接node.js的addon模块,方法是：在头文件中标注了：#include <node/addon.h>
- 此c++模块将app实例绑定(linkedBinding)到process上，app实例中有`exposeAPIInWorld`方法
- 接着`contextBridge`中的`expostInMainWorld`方法返回的是`process.linkedBinding.exposeAPIInWorld`方法。
![Electron.pdf](https://dmqweb.cn/images/Electron.pdf)
[Electron pdf笔记](https://dmqweb.cn/images/Electron.pdf)
