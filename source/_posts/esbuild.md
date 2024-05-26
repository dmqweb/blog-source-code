---
title: esbuild
categories: esbuild
date: 2024-05-17 09:14:12
tags: 
- esbuild
- 打包工具
---



关于打包工具：esbuild、webpack和rollup三者的介绍推荐[这里](https://juejin.cn/post/7224098422939254821)：

简单来说就是esbuild打包更快；rollup打包产物更纯净、体积更小，但不支持热更新；webpack功能更全，生态更完善，支持文件类型更多。

# 介绍

Esbuild是一个类webpack的打包工具，速度是webpack的几十倍。其底层基于go语言进行编写，不使用AST，优化了构建流程。js是单线程串行，esbuild是新开了一个进程，使用多线程并行，充分发挥了多核的优势。

# 作用

esbuild最显著的作用就是：快。它也是vite和snowpack底层的打包工具。同时也可以将esbuild打包工具集成到webpack中（使用plugin）。之所以esbuild没有流行起来是因为它绕过了AST，而直接进行构建，使没有很好的过渡到基于babel-loader这样通过AST进行打包的上层工具中。

# 使用

```js
const esbuild = require('esbuild');
/**
 * 利用esbuild生成文件
 */
esbuild.buildSync({
    entryPoints:['vite.config.js'],
    outfile: 'out.js'
})
/**
 * 利用esbuild处理jsx语法
 */
console.log(
    esbuild.transformSync('<div>利用esbuild处理jsx语法</div>',{
        jsxFragment:'Fragment',
        loader:'jsx'
    })
);
/**
 * 利用esbuld压缩代码体积
 */
console.log(
    esbuild.transformSync('const a = "你好世界"',{
        minify: true
    })
);
/**
 * esbuild内置了一些loader，使用时会根据文件后缀自动执行loader，也可以手动确定loader
 * 支持：js,jsx,ts,tsx,css,text,binary,dataurl,file
 */
console.log(
    esbuild.buildSync({
        entryPoints: ['vite.config.js'],
        bundle:true,
        loader: {'.js':'jsx'}, //默认使用js loader，手动改为jsx-loader
        outfile: 'out.js',
    })
);
/**
 * 使用esbuild启动一个web server用于调试（热更新）
 */
esbuild.serve({},{
    entryPoints: ['vite.config.js'],
    bundle: true,
    outfile: 'bundle.js',
}).then(serve=>{
    serve.stop();
})
```

