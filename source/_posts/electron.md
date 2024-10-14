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
# 源代码保护
> electron等编写的程序的源代码需要对代码进行加固加密，以避免被解包、篡改、二次打包和二次分发等，主要有以下解决方案：
- Uglify / Obfuscator： 通过对 JS 代码进行丑化和混淆，尽可能降低其可读性。
- Native 加密： 通过 XOR 或 AES 对构建产物进行加密，封装到 Node Addon 中，并在运行时由 JS 解密。
- ASAR 加密： 将 Electron ASAR 文件进行加密，并修改 Electron 源代码，在读取 ASAR 文件之前对其解密后再运行。
- V8 字节码： 通过 Node 标准库里的 vm 模块，可以从 script 对象中生成其缓存数据（参考）。该缓存数据可以理解为 v8 的字节码，该方案通过分发字节码的形式来达到源代码保护的目的。

# 最近有些忙，未完待续哈