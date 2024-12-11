# 知识点
## CSS属性值计算过程
### 概念
> 任何html元素，从所有css属性都没有值到所有css属性都有值，中间要经历的计算过程叫CSS属性值的计算过程
### 过程
> 1、确定声明值
- 首先确定作者样式表和默认样式表（h1元素在默认样式表下display为block，是块盒），作者样式表大于默认样式表。
- 没有冲突的直接使用（相对单位变为绝对单位，颜色变为rgb）
> 2、层叠
对于有冲突的比较重要性、特定性和原次序去层叠。
- ①比较重要性（important作者样式 > important默认样式 > 作者样式 > 默认样式）
- ②比较特定性（style行内 > id选择器 > 属性选择器 > 元素选择器）
- ③比较源次序（靠后的覆盖靠前的）
> 3、继承
- 仍然还没有值的属性，如果可以继承则使用继承的样式（visibility和文字颜色、文本对齐方式等属性可以继承）。
> 4、使用默认值
- 使用最后的默认值。
## [视觉格式化模型](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Visual_formatting_model)
> 盒模型研究的是单个盒子的排列规则，而视觉格式化模型研究的是页面中多个盒子的排列规则。
- 视觉格式化模型会根据CSS盒模型将文档中的元素转换为一个个盒子，视觉格式化模型是一套规则，用于计算元素转换为盒子的规则，页面的布局都是由这些盒子所处的位置组合而成的。
- 盒子的尺寸：精确指定、由约束条件指定或没有指定。
- 盒子的类型：行内盒子、块盒子和行内块盒子。
- 定位方案：普通流定位、浮动定位和绝对定位。
- 文档树中的其他元素：当前盒子的子元素或兄弟元素。
- 视窗尺寸与位置。
- 所包含的图片的尺寸。
- 其他的某些外部因素。
#### 块
> 块是一个抽象的概念，一个块在文档流上占据一个独立地区域，默认情况下块与块之间在垂直方向上按照顺序依次堆叠。
#### 包含块
> 包含块是指包含其他盒子的块
- 盒子的定位和大小都是参考一个矩形边缘来计算，这个矩形就是元素的包含块。
- 根元素就是一个初始包含块。
- 如果元素的position是relative或static,则其包含块就是由离它最近的容器父元素或创建了一个格式化上下文的父级元素生成。
- 如果元素设置了position:fixed，则它的包含块一般由视窗生成。
- 如果元素设置了position:absolute，则它的包含块就由设置了position值为relative、absolute或fixed的最近父元素生成，直至根元素。
- transform属性值为非none的元素会生成一个容器块，其fixed的子元素会以此定位。
#### 盒子
> 盒子（Box），一个抽象的概念，由 CSS 引擎根据文档中的内容所创建，主要用于文档元素的定位、布局和格式化等用途。盒子与元素并不是一一对应的，有时多个元素会合并一个盒子，有时一个元素会生成多个盒子（比如匿名盒子）。

## margin和padding百分比
> margin和padding的百分比
- `margin`和`padding`的`百分比`是相对于`父元素的宽度而言的`,可以将元素的`with`和`margin-bottom`都设置为百分比来画一个自适应的正方形。
> flex
- 父元素`使用align-items之后`,`子元素使用flex:1时,align-items方向上的(宽/高)就会坍塌为0` .(这可以理解为align-items和flex相冲突,设置之后必须要手动指定align-items方向上的宽/高)。
# 面试题
## 自适应正方形水平垂直居中
```html
<!-- 绝对定位 + margin:auto -->
    <style>
        .outer{
            background-color: pink;
            height: 400px;
            position: relative;
        }
        .inner{
            width: 20%;
            height: 0;
            padding-bottom: 20%;
            background-color: blue;
            position: absolute;
            top: 0;
            bottom: 0;
            left: 0;
            right: 0;
            margin:auto auto;
        }
    </style>
</head>
<body>
    <div class="outer">
        <div class="inner"></div>
    </div>
</body>
<!-- 绝对定位 + transform -->
    <style>
        .outer{
            background-color: pink;
            height: 400px;
            position: relative;
        }
        .inner{
            width: 20%;
            height: 0;
            padding-bottom: 20%;
            background-color: blue;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%,-50%);
        }
    </style>
</head>
<body>
    <div class="outer">
        <div class="inner"></div>
    </div>
</body>
<!-- flex -->
    <style>
        .outer{
            background-color: pink;
            height: 400px;
            display: flex;
            justify-content: center;
            align-items: center;
        }
        .inner{
            width: 20%;
            height: 0;
            padding-bottom: 20%;
            background-color: blue;
        }
    </style>
</head>
<body>
    <div class="outer">
        <div class="inner"></div>
    </div>
</body>
```
## 垂直居中,且高度永远是宽度的一半
```html
    <style>
        html, body{
            height: 100%;
        }
        .outer{
            height: 100%;
            width: 400px;
            background-color: pink;
            display: flex;
            align-items: center;
        }
        .inner{
            flex: 1;
            width: 100%;
            height: 0;
            padding-bottom: 50%;
            background-color: #fff;
        }
    </style>
</head>
<body>
    <div class="outer">
        <div class="inner">
        </div>
    </div>
</body>
```
## 宽度为父元素一半的正方形
```html
    <style>
      .outer {
        width: 400px;
        height: 600px;
        background: red;
      }

      .inner {
        width: 50%;
        /* padding的百分比是按照父元素的宽度来定的 */
        padding-bottom: 50%;
        background: blue;
      }
    </style>
  </head>
  <body>
    <div class="outer">
      <div class="inner"></div>
    </div>
  </body>
```
## 两栏布局
```html
<!-- 使用auto或者计算 -->
    <style>
      .outer {
        height: 100px;
        background-color: pink;
      }
      .left{
        float: left;
        width: 100px;
        height: 100%;
        background-color: yellow;
      }
      .right{
        width: auto;
        margin-left: 100px;
        /* 或者使用:  */
        /* float: right; */
        /* width: calc(100% - 100px); */

        height: 100%;
        background-color: blue;
      }
    </style>
  </head>
  <body>
    <div class="outer">
      <div class="left"></div>
      <div class="right"></div>
    </div>
  </body>
  <!-- 或者使用flex布局 -->
   <style>
      .outer{
        height: 100px;
        background-color: pink;
        display: flex;
      }
      .left{
        width: 100px;
        height: 100%;
        background-color: yellow;
      }
      .right{
        flex: 1;
        background-color: blue;
      }
    </style>
  </head>
  <body>
    <div class="outer">
      <div class="left"></div>
      <div class="right"></div>
    </div>
  </body>
```
## 三栏布局
```html
    <style>
        .container{
            height: 200px;
            background-color: pink;
            display: flex;
        }
        .left,.right{
            background-color: red;
            width: 100px;
            height: 100%;
        }
        .center{
            flex: 1;
            background-color: blue;
            height: 100%;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="left"></div>
        <div class="center"></div>
        <div class="right"></div>
    </div>
</body>

```
## 绘制三角形
```html
    <style>
        div{
            width: 0;
            height: 0;
            border: 30px solid red;
            border-color: red transparent transparent transparent;
        }
    </style>
</head>
<body>
    <div>
    </div>
</body>
```
## 绘制扇形
```html
    <style>
        div{
            width: 0;
            height: 0;
            border: 30px solid red;
            border-radius: 50%;
            border-color: red  transparent transparent transparent;
        }
    </style>
</head>
<body>
    <div>
    </div>
</body>
```
## 画0.5px的线
```html
    <style>
        div{
            height: 0.5px;
            background-color: black;
            /* 设置小于12px的字体也采用这种方式 */
            transform: scale(50%,50%);
        }
    </style>
</head>
<body>                           
    <div></div>
</body>
<!-- 或者采用meta viewport的方式 -->
<meta name="viewport" content="width=device-width, initial-scale=0.5, minimum-scale=0.5, maximum-scale=0.5"/>
<!-- 这样就能缩放0.5倍数,但是viewport只针对于移动端,只有在移动端上才能看到效果 -->
```
## 两栏布局
```html
    <style>
      .container{
        height: 400px;
      }
      .aside{
        float: left;
        width: 300px;
        height: 100%;
        background-color: yellow;
      }
      .main{
        /* 左边float之后,右边宽度默认盛满剩下的 */
        margin-left: 300px;
        height: 100%;
        background-color: rgb(3, 2, 2);
      }
    </style>
  </head>
  <body>
    <div class="container">
        <div class="aside"></div>
        <div class="main"></div>
    </div>
  </body>
  <!-- 圣杯布局实现 -->
      <style>
      .container {
        display: flex;
      }
      .left {
        float: left;
        width: 100%;
        background: #0f0;
      }
      .right {
        float: left;
        width: 300px;
        margin-left: -300px;
        background: #00f;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="left">你好</div>
      <div class="right">我好</div>
    </div>
  </body>
```
## flex画麻将
## 一筒
```html
        <style>
        .container{
            width: 300px;
            height: 300px;
            box-shadow: 10px 10px 30px gray;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        .item{
            width: 100px;
            height: 100px;
            border-radius: 50%;
            background-color: black;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="item"></div>
    </div>
</body>
```
## 二筒
```html
    <style>
        .container{
            width: 300px;
            height: 300px;
            box-shadow: 10px 10px 30px gray;
            display: flex;
            align-items: center;
            justify-content: space-around;
        }
        .item{
            width: 100px;
            height: 100px;
            border-radius: 50%;
            background-color: black;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="item"></div>
        <div class="item"></div>
    </div>
</body>
```
## 三筒
```html
    <style>
        .container{
            width: 300px;
            height: 300px;
            box-shadow: 10px 10px 30px gray;
            display: flex;
            align-items: center;
            justify-content: space-around;
        }
        .item{
            width: 80px;
            height: 80px;
            border-radius: 50%;
            background-color: black;
        }
        .item:first-child{
            align-self: flex-start;
        }
        .item:last-child{
            align-self: flex-end;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="item"></div>
        <div class="item"></div>
        <div class="item"></div>
    </div>
</body>
```
## 四筒
```html
    <style>
        .container{
            width: 300px;
            height: 300px;
            box-shadow: 10px 10px 30px gray;
            display: flex;
            align-items: center;
            justify-content: space-around;
        }
        .container > div{
            background-color: pink;
        }
        .container .item{
            margin: 15px;
            height: 80px;
            width: 80px;
            border-radius: 50%;
            background-color: black;
        }
    </style>
</head>
<body>
    <div class="container">
        <div>
            <div class="item"></div>
            <div class="item"></div>
        </div>
        <div>
            <div class="item"></div>
            <div class="item"></div>
        </div>
    </div>
</body>
```
## 五筒
```html
    <style>
        .container{
            width: 300px;
            height: 300px;
            box-shadow: 10px 10px 30px gray;
            flex-direction: column;
            display: flex;
            justify-content: space-around;
        }
        .container > div{
            justify-content: space-around;
            background-color: pink;
            display: flex;
        }
        .container .item{
            width: 80px;
            height: 80px;
            background-color: black;
            border-radius: 50%;
        }
    </style>
</head>
<body>
    <div class="container">
        <div>
            <div class="item"></div>
            <div class="item"></div>
        </div>
        <div>
            <div class="item"></div>
            <!-- 加上就是六点 -->
            <!-- <div class="item"></div> -->
        </div>
        <div>
            <div class="item"></div>
            <div class="item"></div>
        </div>
    </div>
</body>
```
## 六筒
> 六筒和五筒类似
## 七筒
```html
    <style>
        .container{
            width: 300px;
            height: 300px;
            box-shadow: 10px 10px 30px gray;
            display: flex;
            flex-direction: column;
            overflow: hidden;
        }
        .top , .bottom{
            background-color: pink;
            display: flex;
            justify-content: space-around;
        }
        .top>div{
            display: flex;
            height: 140px;
        }
        .top>div:first-child{
            align-items: flex-end;
        }
        .top>div:nth-child(2){
            align-items: center;
        }
        .container .item{
            margin: 15px;
            width: 60px;
            height: 60px;
            background-color: black;
            border-radius: 50%;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="top">
            <div>
                <div class="item"></div>
            </div>
            <div>
                <div class="item"></div>
            </div>
            <div>
                <div class="item"></div>
            </div>
        </div>
        <div class="bottom">
            <div>
                <div class="item"></div>
                <div class="item"></div>
            </div>
            <div>
                <div class="item"></div>
                <div class="item"></div>
            </div>
        </div>
    </div>
</body>
```
