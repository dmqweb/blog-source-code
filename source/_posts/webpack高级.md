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
# 知识点
> 开发模式下,只要引入模块就会将模块打包进构建结果
> 生产模式下,会进行tree-shaking,如果引入了但不使用就不会被打包进构建结果

# webpack.config.js配置示例
```js
const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
// MiniCssExtractPlugin插件用于单独生成css文件,而不是嵌入到html中
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
// HTMLInlineCSSWebpackPlugin插件用于在html中内联css文件
const HTMLInlineCSSWebpackPlugin = require("html-inline-css-webpack-plugin");
// CleanWebpackPlugin插件用于清除dist目录
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
// stats-webpack-plugin插件用于生成webpack构建的详细信息
const StatsPlugin = require('stats-webpack-plugin');
// progress-bar-webpack-plugin插件用于生成一个进度条,用于显示构建的进度
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
// webpack-manifest-plugin为构建后的文件生成一个manifest.json文件,用于记录文件名和文件路径的映射关系，对SPA应用友好
const ManifestPlugin = require('webpack-manifest-plugin');
// webpack-md5-hash为文件名添加一个MD5哈希值，从而保证文件名的唯一性
const WebpackMd5Hash = require('webpack-md5-hash');
const webpack = require("webpack");
const {
  WebpackBundleSizeAnalyzerPlugin,
} = require('webpack-bundle-size-analyzer');
module.exports = {
    entry:"./src/index.js",
    output:{
        path:path.resolve(__dirname,"dist2"),
        filename:"[name]_[hash].js"
    },
    mode:"development",
// 注意pitch loader是从前往后执行，normal loader从后往前执行（洋葱模型，loaderIndex指针控制）
    module:{
        strictExportPresence: true, //导出一个内容没有导出时报错而不是警告
        rules:[
            {
                test:/\.html/,
// inline-html-loader的作用是将图片和css等资源内嵌到html中,而不是引用的方式使用
                use:"inline-html-loader"
            },
            {
                test:/\.css$/,
                use:[
                    // {
                    //     loader:"style-loader"
                    // },
                    // 用于单独生成css文件
                    MiniCssExtractPlugin.loader,
                    {
                        loader:"css-loader"
                    },
// 用于将css中的px单位转为rem单位
                    {
                        loader:"px2rem-loader",
                        options:{
                            remUnit:75,
                            remPrecision:8
                        }
                    },
// 使用postcss-loader将css文件进行转换
                    {
// postcss-loader用于将css文件进行转换,例如添加前缀等操作
                        loader:"postcss-loader",
                        options:{
                            plugins:() => [
                                require('autoprefixer')({
                                  //指定兼容的浏览器版本,可以用browserlist文件代替 
                                  overrideBrowserslist: ['last 100 version', 'ios 7'],
                                }),
                            ],
                        }
                    }
                ]
            },
            {
                test:/\.less$/,
                use:["style-loader","css-loader","less-loader"]
            },
            {
                test:/\.scss$/,
                use:["style-loader","css-loader","sass-loader"]
            },
// svg-inline-loader的作用是将svg文件内联到html中,而不是引用的方式使用
            {
                test:/\.svg/,
                use:[{loader:"svg-inline-loader"}]
            },
            {
                test:/\.(png|jpg|gif|jpeg)$/,
                use:[
                    {
                        loader:"file-loader",
                        options:{
                            name:"[name].[ext]",
// file-loader中的limit配置用于配置指定的文件大小限制,如果文件大小超出了这个限制
// file-loader会将文件转换为base64格式存在Js文件中
                            limit:200 * 1024
                        }
                    }
                ]
            },
            {
                test:/\.j|tsx?$/,
                use:[{
// 使用babel-loader配置jsx语法,也可以在.babelrc文件中配置
                        loader:"babel-loader",
                        options:{
                            presets:["@babel/preset-env","@babel/preset-react"]
                        }
                    },
// eslint-loader用于将eslint集成到webpack构建流程中,用于在代码中发现错误并强制执行代码规范
                    {
                        loader:"eslint-loader",
                        // 通常使用eslint配置文件进行配置
                        options:{
                            fix:true
                        }
                    }
                ],
                include:path.resolve(__dirname,'src')
            },
            {
                test:/.(woff|woff2|eot|tff|otf)$/,
                use:[
                    {
                        loader:"file-loader",
                        options:{
                            name:"[name].[ext]",
// file-loader用于限制大小,超过这个大小就会将文件存在js之中
                            limit: 30 * 1024 * 1024
                        }
                    }
                ]
            }
        ]
    },
    plugins:[
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            // 配置内联资源,和HTMLInlineCSSWebpackPlugin一起使用
            inlineSource:".css$",
            template: "src/index.html",
            inject:true,
            minify:{
                html5:true,
                collapseWhitespace: true,
                preserveLineBreaks: false,
                minifyCSS: true,
                minifyJS: true,
                removeComments: false,
            }
        }),
        new HTMLInlineCSSWebpackPlugin(),
// 插件也可以是一个函数,webpack会在构建时进行执行,注册对应的事件
        function () {
            this.hooks.done.tap("done",(stats) => {
                // 如果构建过程中报错,直接退出
                if (stats.compilation.errors && stats.compilation.errors.length && process.argv.indexOf('--watch') == -1) {
                    console.log('webpack.config.js: build error');
                    process.exit(1);
                  } else {
                    console.log('webpack.config.js: build done');
                  }
            })
        },
// HtmlWebpackExternalsPlugin插件用于排除项目中希望从外部引入的资源,而不是将它们打包到bundle中
// 配置HtmlWebpackExternalsPlugin之后，需要删除掉项目中import或者require的资源，否则会构建两次
        new HtmlWebpackExternalsPlugin({
            externals: [
                {
                  module: 'react',
                  entry: {
                    path: 'https://cdn.bootcdn.net/ajax/libs/react/16.13.1/umd/react.production.min.js',
                    attributes: {
                      crossorigin: 'crossorigin',
                    },
                  },
                  global: 'React',
                },
                {
                  module: 'react-dom',
                  entry: {
                    path: 'https://cdn.bootcdn.net/ajax/libs/react-dom/16.13.1/umd/react-dom.production.min.js',
                    attributes: {
                      crossorigin: 'crossorigin',
                    },
                  },
                  global: 'ReactDOM',
                },
              ],
        }),
        new StatsPlugin("stats.json",{
            chunkModules:true,
            exclude:[/node_modules/],
        }),
        new ManifestPlugin(),//创建manifest.json文件，包含项目中所有资源和最终输出路径，对SPA应用非常有用
        new WebpackMd5Hash(),//为生成的文件添加md5加密后的hash值
        new WebpackBundleSizeAnalyzerPlugin('./bundle-size-analyzer.log'),//分析打包后文件的大小
        new ProgressBarPlugin(),//
// webpack.BannerPlugin插件用于为输出的文件顶部添加一个横幅注释，通常包含版权声明、作者信息等
        new webpack.BannerPlugin({
            banner:`这是 BannerPlugin 注入的内容
            https://github.com/ShenBao
            Copyright 2016 - Present`,
            raw: true, //表示banner字符串将被原样处理，不进行任何处理
            entryOnly:true, //表示只在入口文件处添加banner
        }),
    ],
// 用于配置构建过程中的优化项
    optimization: {
        minimize:true, //webpack会自动选择合适的插件来压缩代码
        minimizer: [
// OptimizeCSSAssetsPlugin插件用于压缩css文件,需要配合MiniCssExtractPlugin使用
        //   new OptimizeCSSAssetsPlugin({
        //     assetNameRegExp: /\.css$/g,
        //     cssProcessor: require('cssnano'),
        //   }),
        new TerserPlugin({
            include:/\.min\.js$/,
        })
        ],
        splitChunks: {
            chunks: 'async',
            minSize: 30000,
            maxSize: 0,
            minChunks: 1,
            maxAsyncRequests: 2,
            maxInitialRequests: 2,
            automaticNameDelimiter: '-', // 文件名连接符
            name: true,
            cacheGroups: {
              vendors: {
                test: /[\\/]node_modules[\\/]/,
                priority: -10, // 优先级
                filename: 'vendors.js',
              },
              default: {
                minChunks: 2,
                priority: -20,
                reuseExistingChunk: true, // 已经被打包过的使用之前的
                filename: 'common.js',
              },
            },
          },
    },
// 配置信息量,errors-only表示只有当出错时才会输出
    stats: "errors-only",
    devServer:{
        contextBase:"./dist",
        host:true,
    },
    devtool: "source-map",
    resolveLoader:{
        modules:["node_modules","./MyLoaders"] //自定义查找loader的文件夹
    },
    bail:true, // 如果构建过程中出现错误，立即停止构建过程
}
```

