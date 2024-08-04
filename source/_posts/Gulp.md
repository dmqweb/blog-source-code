---
title: Gulp
tags: Gulp
categories: Gulp
date: 2024-08-03 15:38:34
---
# 介绍
> gulp是前端开发过程中对代码进行构建的工具，是自动化项目的理器，能在开发过程中做很多重复的任务，并使用工具自动完成，可以大大提高我们的工作效率
> glup对工程化的作用：自动压缩JS文件 。自动压缩CSS文件。自动合并文件。自动编译sass。自动压缩图片。自动刷新浏览器 等
# 安装
> 使用gulp命令需要安装对应的脚手架工具
# 使用
> 根目录下创建一个gulpfile.js文件，在文件中定义具体流程（可以使用各种插件），导出的就是一个个任务。
# API
> gulp常用的API有：
- Task：这个API用来创建任务，在命令下可以输入gulp test来执行test任务。
- Watch: 这个API用来监听任务。
- Src: 这个API设置需要处理的文件的路径，可以是多个文件以数组的形式[main.scss，vender.scss],也可以是正则表达式/**/*.scss。
- Dest: 这个API设置生成文件的路径，一个任务可以有多个生成路径，一个可以输出未压缩的版本，另一个可以输出压缩后的版本

# 工作方式
> gulp的使用流程一般是：
- 首先通过`gulp.src()`方法获取到想要处理的文件流，
- 然后把文件流通过`pipe方法`导入到gulp的插件中，
- 最后把经过插件处理后的流再通过pipe方法导入到`gulp.dest()`中，gulp.dest()方法则把流中的内容写入到文件中
```js
const gulp = require("gulp");
gulp.src("script/jquery.js") //获取流的API,也可以传正则表达式
    .pipe(gulp.dest("dist/foo.js")); //写放文件的API
```
# 示例
> 需要先安装对应的使用到的插件
```js
const gulp = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const rename = require('gulp-rename');
const cleanCSS = require('gulp-clean-css');
const jshint = require('gulp-jshint');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const notify = require('gulp-notify');
gulp.task('styles', function() {  
//编译sass
  return gulp.src('src/styles/main.scss')
    .pipe(sass({ style: 'expanded' }))
//添加前缀
    .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
//保存未压缩文件到我们指定的目录下面
    .pipe(gulp.dest('dist/assets/css'))
//给文件添加.min后缀
    .pipe(rename({suffix: '.min'}))
//压缩样式文件
    .pipe(minifycss())
//输出压缩文件到指定目录
    .pipe(gulp.dest('dist/assets/css'))
//提醒任务完成
    .pipe(notify({ message: 'Styles task complete' }));
});
//发布任务
gulp.task("scripts",function(){
     //js代码校验
     return gulp.src("javascripts/*.js")
     .pipe(jshint())
     .pipe(jshint.reporter("default"))
     //js代码合并
     .pipe(concat("all.js"))
     //给文件添加.min后缀
     .pipe(rename({suffix:".min"}))
     //压缩脚本文件
     .pipe(uglify())
     //输出压缩文件到指定目录
     .pipe(gulp.dest("assets"))
     //提醒任务完成
     .pipe(notify({message : "Scripts task complete"}));
});
// 默认任务，运行 styles 和 scripts 任务
gulp.task('default', gulp.parallel('styles', 'scripts'));
```