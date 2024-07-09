---
title: eslint源码
categories: eslint
date: 2024-05-17 09:14:12
tags: 
- eslint
- 源码
---

# eslint知识点

### extends与plugins

1. plugins本质是为了加强eslint的扩展性，使我们可以直接使用别人写好的eslint规则，方便快速用于项目中。
2. 官方规定npm包的扩展必须以eslint-config-开头，插件以eslint-plugin-开头，在使用过程中可以省略这个开头。
3. eslint-config-文件是我们共享的一些配置文件，里面就是一个JS对象，其中包含一些配置信息，而eslint-plugin-文件是我们自定义的集合规则，可以导入和使用。
4. 一个插件能带来：
   - 额外的规则，如`{"rules": {"react/boolean-prop-naming": "warning"}}`。
   - 环境，如`{"env": {"jest/global": true}}`。
   - 配置，如`{"extends": ["plugin:react/recommended"]}`。
   - 预处理器，如`{"process": "a-plugin/a-processor"}`。

# [eslint配置大全](https://juejin.cn/post/6844903859488292871)

# eslint源码分析
