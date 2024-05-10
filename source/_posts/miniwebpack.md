---
title: 实现miniwebpack
tags: webpack,miniwebpack
categories: webpack
date: 2024-05-07 06:16:30
---

# 前置知识

我们都知道webpack是基于babel进行语法转换的，因此我们需要提前了解一些babel的使用方法：

- @babel/parser模块：用于将js代码转为抽象语法树
- @babel/traverse模块：用于遍历和操作抽象语法树（处理导入的模块）
- @babel/core模块：babel的核心模块，用于将抽象语法树转换为代码信息对象（包含重要的code属性，表示转换后生成的代码）
- @babel/preset-env模块：babel中的一个预设，可以在babel.transformFromAst中第三个参数中presets字段传入，可以根据当前环境将代码转成相应的兼容版本。

# 流程图

![miniwebpack](/images/Snipaste_2024-05-07_07-23-59.jpg)

# 开始编码

```js
const fs = require("fs");
const path = require("path");
// @babel/parser用于将js代码转化为抽象语法树
const parser = require("@babel/parser");
// @babel/traverse用于遍历和操作抽象语法树
const traverse = require("@babel/traverse").default;
// Babel 的核心功能包含在 @babel/core 模块中
const babel = require("@babel/core");
// 1. 分析依赖
function parseModules(file) {
  const entry = getModuleInfo(file);
  const temp = [entry];
  const depsGraph = {};
  getDeps(temp, entry);
  temp.forEach((moduleInfo) => { //遍历全部模块信息数组
    depsGraph[moduleInfo.file] = { //映射file路径和code、deps
      deps: moduleInfo.deps,
      code: moduleInfo.code,
    };
  });
  return depsGraph;
}
function getDeps(temp, {deps}) {
  Object.keys(deps).forEach((key) => {
    const child = getModuleInfo(deps[key]);
    temp.push(child);
    getDeps(temp, child);
  });
}
function getModuleInfo(file) {
  // 读取文件
  const body = fs.readFileSync(file, "utf-8");
  // 转化为AST
  const ast = parser.parse(body, {sourceType: "module"});
  const deps = {};
  traverse(ast, {
    // 获取import导入的模块
    ImportDeclaration({node}) {
      const dirname = path.dirname(file);
      // 获取标准化路径
      const absPath = "./" + path.join(dirname, node.source.value);
      deps[node.source.value] = absPath;
    },
  });
  const {code} = babel.transformFromAst(ast, null, {
    // 使用预设
    presets: ["@babel/preset-env"],
  });
  const moduleInfo = {file, deps, code};
  return moduleInfo;
}
// 2. 实现bundle
function bundle(file) {
  //将模块转为引用路径和映射code、deps的对象
  const depsGraph = JSON.stringify(parseModules(file));
  return `(function (graph) {
    function require(file) {
      function absRequire(realPath) {
        return require(graph[file].deps[realPath]);  //递归调用获取返回值
      }
      var exports = {};   //exports对象，用于存储模块的返回值信息
      (function (require, exports, code) {
        eval(code);   //eval函数用于执行字符串的js代码，传入require，exports和code
      })(absRequire, exports, graph[file].code);
      return exports;
    }
    require('${file}');
  })(${depsGraph});`;
}
const content = bundle("./src/index.js");
//将内容写入到输出文件 
fs.writeFileSync("./dist/bundle.js", content);
//webpack打包后的js文件就是一个立即执行函数，传入的参数是一个对象，对象的键是模块路径，值是模块函数代码
```

