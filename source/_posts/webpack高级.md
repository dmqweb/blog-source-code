---
title: webpack高级
date: 2023-12-21 10:24:4
categories:
- webpack高级
tags:
- webpack高级
- 前端工程化
---

# webpack
> 前端的工程化离不开webpack,它是一个现代JavaScript应用程序的静态模块打包器,用于`将适合用于开发的代码打包构建为适合用于生产的代码`
# webpack.config.js
```js
const path = require("path");
const { DefinePlugin } = require("webpack");
module.exports = {
    mode: "development", //development优化打包速度,production优化打包结果,none不做处理
    entry: "./src/main.js",
    devtool: "source-map", //开启source-map,构建后会产生source-map文件,但想要浏览器使用还需要主js文件添加对应的魔法注释
    output: {
        filename: "bundle.js",
        path: path.join(__dirname,"output")
    },
    module:{
        rules:[
            {
                test:/\.css/,
                use:[
                    {
                        loader: "style-loader",
                        optioins:{}
                    },
                    {
                        loader: "css-loader",
                        optioins:{}
                    },
                    "less-loader",
                    {
                        loader:"postcss-loader",
                        optioins: {
                            plugins: [
                                require("postcss-preset-env")
                            ]
                        }
                    }
                ]
            },
            {
                test:/\.(ttf|eot|woff2?)$/i,
                type: "asset/resource",
                generate: {
                    filename: "img/[name].[hash:6][ext]"
                }
            }
        ]
    },
    plugin:[
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            title: "webpack测试标题",
            Template: "./public/index.html"
        }),
        new DefinePlugin({
            BASE_URL: '"./"'
        }),
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: "public",
                    globalOptions:[]
                }
            ]
        })
    ]
}
```
# mode模式
> 用于配置构建模式
# entry入口
> 用于配置入口文件
# output输出
> 用于配置出口文件
# devtool工具
> 用于配置开发工具,如:source-map、eval等,它是由:inline、nosources、cheap、等的组合
> vue-cli在开发模式下直接配置的是source-map,生产环境直接不生成
> react的cra在生产环境下根据传入的配置判断是否配置source-map,开发环境下配置cheap-module-source-map
### 最佳实践
- 开发阶段: 推荐使用source-map或者cheap-module-source-map,方便本地调试
- 测试阶段: 推荐使用source-map或者cheap-module-source-map,方便定位错误
- 生成阶段: 推荐不生成source-map(配置为false或缺省不写),因为多余的source-map文件加载消耗资源,并且通过source-map文件,别人可以还原我们的代码
# optimization优化
> optimization字段用于配置优化项 , 主要有minimizer压缩、splitChunks分包、mergeDuplicateChunks合并相同模块的chunk等选项
# resolve解析
> 设置模块如何配解析,主要包括: alias别名、extensions后缀、fallback重定向模块等选项
# devServer开发服务器
> 内部使用webpack-dev-server,开发服务器,用于快速开发应用程序,主要包括: static静态文件、compress压缩、port端口、devMiddleware资源配置项、http2开启http2等选项
# cache缓存
> 配置使用缓存
# targets构建目标
> 告知 webpack 为目标(target)指定一个环境。默认值为 "browserslist"，如果没有找到 browserslist 的配置，则默认为 "web"
# watch监听
> 监听任何已解析文件的更改
# watchOptions
> 用来定制 watch 模式的选项：
# externals外部链接
> 防止将某些 import 的包(package)打包到 bundle 中，而是在运行时(runtime)再去从外部获取这些扩展依赖(external dependencies),例如一些使用cdn引用的文件
# externalsType外链类型
> 指定 externals 的默认类型。当 external 被设置为 amd，umd，system 以及 jsonp 时，output.libraryTarget 的值也应相同。例如，你只能在 amd 库中使用 amd 的 externals。
# performance
> 配置如何展示性能提示。例如，如果一个资源超过 250kb，webpack 会对此输出一个警告来通知你。
# node
> 这些选项可以配置是否 polyfill 或 mock 某些 Node.js 全局变量。
# module模块
> module字段用于配置模块(对应的loader)
# loader
> 处理对应的模块(webpack默认只支持 JS 文件)
> loader是一个函数,接收传来的代码字符串作为参数,返回处理后的代码字符串,webpack中的模块处理是以管道架构方式(也成为构造者的设计模式)来进行设计的,并且注意它的处理是逆序进行处理
# plugin插件
> plugin字段用于配置插件
# stats显示
> stats 选项让你更精确地控制 bundle 信息该怎么显示。 如果你不希望使用 quiet 或 noInfo 这样的不显示信息，而是又不想得到全部的信息，只是想要获取某部分 bundle 的信息，使用 stats 选项是比较好的折衷方式。
# 深入源码
# eval函数
> webpack当mode为`development`模式下的`devtool`默认是`eval`,这将导致打包后的文件中,JS代码是通过eval函数进行执行的,而不是直接执行的,原因是: 通过eval函数执行可以`添加上source-map对应的魔法注释`,这样当出现报错时就能准确定位到对应的文件位置
