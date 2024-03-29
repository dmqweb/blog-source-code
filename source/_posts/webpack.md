---
title: webpack笔记
date: 2023-10-21 12:24:4
categories:
- webpack
tags:
- webpack
- 前端工程化
---
# babel

*//官网：  https://babeljs.io/setup*

######   1执行编译的命令*

在package.json文件中添加执行babel的命令

（在scripts中添加："build":"babel src -d dist"）

* `babel src --out-dir dist*`

###### 2.Babel的配置文件

* 安装配置文件  `npm install @babel/preset-env@7.11.0--save-dev`

* 创建配置文件.babelrc,并配置

`{`

`"presets":["@babel/preset-env"]*`

`}`

###### 3 .npm run build进行打包

# webpack

## 【1】 webpack是什么

`const { webpack } = require("webpack")`

*webpack是静态模块打包器，当webpack处理应用程序时，会将所有这些模块打包成一个或多个文件*

处理  js  css  图片  图标字体  静态文件

## 【2】使用webpack

1  初始化项目   `npm init`

2  安装webpack 需要的包

`npm install --save-dev webpack-cli@3.3.12 webpack@4.44.1`

3  配置webpack (创建webpack.config.js)

创建配置信息(官网查找)

4  package.json的script中配置webpack命令

 `"webpack": "webpack --config webpack.config.js"`

5  npm run webpack

## 【3】output 和 entry(webpack.config.js中配置)

1  entry指定入口文件

entry中配置多个入口文件 :

 `entry: {`

 `main: './src/index.js'`,

 `search: './src/search.js`

 `}`

2  output中配置多个出口文件

单个出口:

`output: {`

`path: path.resolve(__dirname, 'dist'),  //出口文件夹路径`

  `filename: 'bundle.js'   //出口文件名称`

`}`

*// 注意如果配置了多个入口,但是只配置了一个出口,会报错*

*// 此时采用动态输出名指定输出文件: 使用[name]指定动态输出文件*

`output: {`

`path: path.resolve(__dirname, 'dist'),`

 `filename: '[name].js'`

 `}`

## 【4】loader （ 将webpack和其他工具进行联通 ）

1  什么是loader (加载器,webpack本身是用来打包js ,要想打包css 图片等静态资源和模块 ,必须要使用loader)

2  babel-loader( webpack中使用 babel ,先用babel将ES6代码转成ES5的代码 , 然后再交给webpack进行打包)

 (1) 安装:

`npm install--save - dev babel - loader@8.1.0 @babel/core@7.11.0 @babel/preset - env@7.11.0`

(2)  创建babel配置文件

.babelrc 文件，并且配置

`{`

`"presets":["@babel/preset-env"]*`

`}`

(3)  配置loader  再webpack.config.js中，再原有的基础之上

`module: {`

   `配置多个loader规则`

`rules: {`

 `//匹配需要处理的文件类型`

`test: /\.js$/,`

`//排除不需要打包的的文件类型(node modules`

  `exclude:/node_modules/,`

`// 联通webpack和babel ,处理文件`

 `loader: 'babel-loader'`

  `}`

`}`

 (4)  但是这样也只是转义了语法，ES6代码中的一些新的API无法转成ES5，此时需要引入模块，然后使用API

*// 这也就是babel/polyfill的作用*

## 【6】 使用babel/polyfill （ core-js ）

(1)  安装

npm install --save-dev core-js@3.6.5

(2)  在需要处理的js文件中引入core-js稳定版

 `import 'core-js/stable'  (在要处理的js文件中引入)`

（3）npm run webpack 进行打包处理

## 【7】plugins

1  plugins介绍，插件，loader被用于转成某些类型的模块，而插件则可以用于执行范围更广的任务

 需要什么功能就使用对应功能的插件

2  举例应用：html-webpack-plugin插件

 html中需要在html中手动添加js文件 ， 此插件可以直接将js的引入嵌入html文件中

 (1)安装

 `npm install --save-dev html-webpack-plugin@4.3.0`

(2)配置html-webpack-plugin插件 （在webpack.config.js中引入）

```js
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: {
    // 单入口
    // index: './src/index.js'
    
    // 多入口
    index: './src/index.js',
    search: './src/search.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js'
  },
  plugins: [
    // 单入口
    // new HtmlWebpackPlugin({
    //   template: './index.html'
    // })
    
    // 多入口
    new HtmlWebpackPlugin({
      template: './index.html',
      filename: 'index.html',
      chunks: ['index'],
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
      }
    }),
    new HtmlWebpackPlugin({
      template: './search.html',
      filename: 'search.html',
      chunks: ['search']
    })
  ]
};
```



## 【8】webpack处理css文件 （可以在js中引入css文件 ，webpack将css文件当成模块）

####  一  css-loader

*//1  js中  import '/src/index.css'*

*// 2  安装css-loader*

*//  npm install --save-dev css-loader@4.1.1*

*// 3  webpack.config.js中配置 module*

```js
module: {
  rules: [
    {
      test: /\.css$/,
      loader: 'css-loader'
    }
  ]
}
```

*// 此时css-loader帮助webpack认识了css文件，然后引入，但是不会生效(因为没有style标签)*

*// 此时还需要一个style-loader*

#### 二  style-loader

*// (1)  安装*

`npm install --save-dev style-loader@1.2.1`

*// (2)  配置style-loader（webpack.config.js中）*

```js
module: {
  rules: [
    {
      test: /\.css$/,
      //  loader:'css-loader'
      use: ['style-loader', 'css-loader']  //注意会从右向左的顺序执行
    }
  ]
}
```

*// 三  如果不想直接使用css文件，而是想要用link标签引入外部css文件，需要用到一个插件*

mini-css-extract-plugin

*// (1) 安装*

`npm install --save-dev mini-css-extract-plugin@0.9.0`

*// （2）在webpack.config.js中导入*

```js
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
```

*// （3）在webpakc.config.js中配置（ rules中use和plugins）*

```js
// webpack.config.js

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    filename: 'js/[name].js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        // loader: 'css-loader'
        use: ['MiniCssExtractPlugin.loader', 'css-loader']  //注意会从右向左的顺序执行
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html',
      filename: 'index.html'
    }),
    new MiniCssExtractPlugin({
      filename: 'css/[name].css'
    })
  ]
};
```

## 【9】使用loader处理图片问题

### 四  使用file-loader处理CSS文件中的图片

*// webpack只能处理内部的资源，外部的远程图片不用考虑webpack*

*// webpack不认识png等格式结尾的文件，此时就需要使用 file-loader*

*// (1)  安装file-loader：*

 `npm install --save-dev file-loader@6.0.0`

*// (2)  在webpack.config.js的rules中配置file-loader*

```js
// webpack.config.js

const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    filename: 'js/[name].js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: '../'
            }
          },
          'css-loader'
        ]
      },
      {
        test: /\.(jpg|png|gif)$/,
        use: {
          loader: 'file-loader',
          options: {
            name: 'img/[name].[ext]' //指定图片名称
          }
        }
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/[name].css'
    })
  ]
};
```

*// （注意file-loader处理的图片会放到新的目录，此时需要和minicss插件配合使用）*

### 五  使用html-withimg-loader处理HTML图片  （处理html中使用的图片）

*// （1）安装*

`npm install --save-dev html-withimg-loader@0.1.16`

*// （2）webpack.config.js的module的rules中配置文件*

```js
 {
   test: /\.(html|html)$/,  //待处理文件
loader: 'html-withimg-loader'
}
```

*// （3）npm run webpack进行打包*

*// 但是注意他与 file-loader的配合使用，过程中会将图片当成模块，解决方法在module中rules中配置*

```js
// webpack.config.js

const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    filename: 'js/[name].js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
    {
      test: /\.css$/,
      use: [
        {
          loader: MiniCssExtractPlugin.loader,
          options: {
            publicPath: '../'
          }
        },
        'css-loader'
      ]
    },
    {
      test: /\.(jpg|png|gif)$/,
      use: {
        loader: 'file-loader',
        options: {
          name: 'img/[name].[ext]',
          esModule: false //不将html中引入的图片当成模块处理
        }
      }
    }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/[name].css'
    })
  ]
};
```

### 六  使用file-loader处理js图片

*// 将js中引入的图片的地址更换成打包后的图片的地址*

*// 在webpack.config.js的module中的rules中进行配置*

```js
// webpack.config.js

const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    filename: 'js/[name].js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
    {
      // 匹配图片文件
      test: /\.(jpg|png|gif)$/,
      use: {
        // 使用file-loader处理
        loader: 'file-loader',
        options: {
          name: 'img/[name].[ext]', // 指定输出文件的名称和路径
          esModule: false // 不将html中引入的图片当成模块处理
        }
      }
    }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/[name].css'
    })
  ]
};
```

###  七  使用url-loader处理图片

*// （ file-loader的功能过于单一 ，url功能更加全面，但其底层是由file-loader来封装的，配置时，只需要配置url-loader即可）*

*// （1）安装 url-loader*

 `npm install --save-dev url-loader@4.1.0`

*// （2）配置url-loader*

*// webpack中的module中的rules下进行配置*

```js
{
  test: /\.(jpg|png|gif)$/,
  use: {
    loader: 'url-loader',
    options: {
      name: 'img/[name].[ext]',   // 设置文件夹名称和文件名称
      esModule: false,   // 设置其引入不是一个路径
      limit: 3000   // 将3kb以内的图片转成base64格式，存到js中
    }
  }
}
```

*// 使用url-loader的前提时要引入file-loader（url-loader是由file-loader封装而来）*

### 八  使用webpack-dev-server搭建开发环境

*// 比如：自动打包（打包热启动），当修改文件内容时，自动进行打包处理（打包之后的文件不会生成在磁盘中，而是存在内存里）*

*// （1）安装：*

  `npm install --save-dev webpack-dev-server@3.11.0`

*// (2) 配置命令（在package.json的scripts中配置）*

```js
"scripts": {
  "test": "echo \"Error: no test specified\" && exit 1",   // 测试命令
  "webpack": "webpack",   // 运行 webpack 命令
  "dev": "webpack-dev-server"   // 运行 webpack-dev-server 命令
  // "dev": "webpack-dev-server --open chrome"  //重新打包，并且打包之后自动开启 Chrome 浏览器
}
```

*//  （3）使用命令进行启动*