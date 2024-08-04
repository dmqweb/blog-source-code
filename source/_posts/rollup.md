---
title: rollup
tags: rollup
categories: rollup
date: 2024-08-03 15:54:39
---
# 介绍
> rollup是一个ES模块化打包工具，可以帮助我们编译小的代码到一个大的、负责的代码中，比如一个库或者一个应用程序
# 对比
> 我们会发现Rollup的定义、定位和webpack非常的相似：
- Rollup也是一个模块化的打包工具，但是Rollup主要是针对ES Modulej进行打包的；
- 另外webpacki通常可以通过各种loader处理各种各样的文件，以及处理它们的依赖关系；
- rollup更多时候是专注于处理JavaScript代码的（当然也可以处理css、font、vue等文件
- 另外rollup的配置和理念相对于webpack来说，更加的简洁和容易理解；
- 在早期webpack不支持tree shaking时，rollup.具备更强的优势：
> 目前webpack和rollup分别应用在什么场景呢？
- 通常在实际项目开发过程中，我们都会使用webpack(比如vue、react、angularI项目都是基于webpack的)
- 在对库文件进行打包时，我们通常会使用rollup(比如vue、react、.dayjs源码本身都是基于rollupl的)；
# 优点
- rollup开发JavaScript库文件时，通常使用rollup进行打包构建
- rollup的优势在于：配置少，输出纯净，没有多余复杂的配置和功能
- rollup可以创建更小的bundle，从而提升页面的加载速度，优化性能
- rollup具有良好的兼容性，尽管rollup原生支持ES模块，但是通过配置也可以生成CommonJS、IIFE、UMD和AMD等模块
- rollup可以很方便的打包各种模块化规范（iife、es、amd、umd等）
# 安装
```bash
npm i -g rollup
```
# 命令
```bash
rollup --init # 生成配置文件
rollup src/main.js --config rollup.config.js # 使用rollup.config.js打包main.js文件
rollup src/main.js --config rollup.config.js --watch # --watch热启动打包
rollup src/main.js --config rollup.config.js --output dist/bundle.js #指定输出文件名称
```
# rollup.config.js
```js
const commonjs = require("@rollup/plugin-commonjs") //需要进行安装
const resolve = require("@rollup/plugin-node-resolve")
const babel = require("@babel/core");
export default {
    input: "./src/main.js",
    output: [
      {
        format:"umd",
        name:"test", //name指明了导出到全局的变量名
        file:"dist/test.umd.js",
        globals:{ //globals指明了外部依赖得变量，也就是我们库所依赖的外部模块
            "react":"React",
            "react-dom":"ReactDOM"
        } 
      },{
        format:"es",
        file:"dist/test.es.js"
      },{
        format:"iife",
        file:"dist/test.iife.js"
      }
    ],
    plugins:[
        commonjs(),
        resolve(),
        babel({
            babelHelpers: "bundled"
        })
    ]
}
```
