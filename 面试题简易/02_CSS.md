# 盒子模型

>* 标准
>
>  * width = 内容宽度
>
>  * content-box
>
>
>* 怪异
>
>  * width = 内容宽度 + padding + border
>
>  * box-sizing：border-box

# 0.5 px 边框线

* box-shadow
* after 伪元素设置高度
* transform:scale(0.5)

# 骰子

~~~html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>css flex布局-画骰子</title>
    <style>
      .box {
        margin: 20px;
        height: 100px;
        width: 100px;
        border: 2px solid grey;
        border-radius: 10px;
        padding: 10px;
        box-sizing: border-box;
        /* 容器内元素使用flex布局 */
        display: flex;
        /* 主轴（横向）相对均匀对齐（子元素间距相等，两端边缘间距为子元素间距的一半） */
        justify-content: space-between;
      }
      /* 第一个子元素，交叉轴默认起点对齐 */
      .point {
        border-radius: 50%;
        height: 20px;
        width: 20px;
        background: black;
      }

      .point:nth-child(2) {
        /* 第二个子元素，交叉轴居中对齐 */
        align-self: center;
      }
      .point:nth-child(3) {
        /* 第三个子元素，交叉轴终点对齐 */
        align-self: flex-end;
      }
    </style>
  </head>
  <body>
    <div class="box">
      <div class="point"></div>
      <div class="point"></div>
      <div class="point"></div>
    </div>
  </body>
</html>

~~~

# 内容溢出

~~~css
.content{
    overflow:hidden 超出隐藏
    text-overflow:ellipsis 显示省略号
    white-space:nowrap 防止换行
}
.content{
    overflow:hidden  超出隐藏
    text-overflow:ellipsis 显示省略号
    display:-webkit-box 设置盒子布局
    -webkit-box-orient:vertical 设置文本排列方向为垂直
    -webkit-line-clamp:3 设置最大显示行数
}
~~~

# 水平居中

* 行内级
* 块级
* 绝对定位
* flex

# 垂直居中

* 绝对定位
* flex
* transform

# 绝对居中

* flex

~~~css
    .container {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 400px;
      height: 400px;
      background-color: yellowgreen;

    }

    .box {
      width: 100px;
      height: 100px;
      background-color: #fff;
    }

~~~

* 40 absolute  margin:auto

~~~css
   .container {
      position: relative;
      height: 400px;
      height: 400px;
      background-color: yellowgreen;
    }

    .box {
      width: 100px;
      height: 100px;
      background-color: #fff;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      position: absolute;
      margin: auto;
    }

~~~

* 父亲 left top 50%、自身 **transform:translate**(-50%,-50%)

~~~css
    /* 方案三 */
    .container {
      position: relative;
      height: 400px;
      height: 400px;
      background-color: yellowgreen;
    }

    .box {
      width: 100px;
      height: 100px;
      background-color: #fff;
      left: 50%;
      top: 50%;
      position: absolute;
      transform: translate(-50%, -50%);

    }

~~~

# 隐藏元素

* display
* visibility
* rgba
* opacity

# **清除浮动**

>* clear:both

```css
.clear_fix::after {
	content: "";
	display: block;
	clear:both;
	visibility: hidden; /* 浏览器兼容性 */
	height: 0; /* 浏览器兼容性 */
}
.clear_fix {
	*zoom: 1; /* IE6/7兼容性 */
}
```

# CSS 原子化

>* 把基本的 css 规则取一个对应的类名
>* tailwind、windi 是其中的实现方案，注意力不用离开标签，提高开发效率

# less

>* 层级嵌套
>  * &.active
>* 定义变量：@green:red
>* 使用混合，减少重复代码

# 画三角形

~~~css
div{
width: 0;
height: 0;
border: 10px solid red;
border-top-color: transparent;
border-left-color: transparent;
border-right-color: transparent;
}
~~~

# 1px 长线

~~~css
.line {
width: 100%;
height: 1px;
overflow: hidden;
font-size: 0px; 
border-bottom: dashed 1px #ccc;
}
~~~



# link vs import

>* DOM 可控性区别：通过 JavaScript 操作 DOM 插入 `<link>` 标签；无法通过 DOM 方法插入 `@import` 规则
>* 兼容性区别：`link` 标签作为 HTML 元素，不存在兼容性问题；`@import`是 CSS2.1 才有的语法，故只可在 IE5+ 才能识别
>* 加载顺序区别：加载页面时，`link`标签引入的 CSS 被同时加载；`@import`引入的 CSS 将在页面加载完毕后被加载
>* 从属关系区别：`link`是HTML提供的标签，不仅可以加载 CSS 文件，还可以定义 rel 连接属性等；`@import`是 CSS 提供的语法规则，只有导入样式表的作用

# **选择器的权重**

>* !important：10000
>* 内联样式：1000
>* id选择器：100
>* 类选择器、属性选择器、伪类：10
>* 元素选择器、伪元素：1
>* 通配符：0

# BFC

* 是什么
* 触发方式

| 元素或属性 | 属性值                     |
| ---------- | -------------------------- |
| 根元素     |                            |
| *float*    | *left、right*              |
| *postion*  | *absolute、fixed*          |
| *overflow* | *auto、scroll、**hidden*** |
| *display*  | *inline-block、table-cell* |

* 作用
  * 解决浮动元素令父元素**高度塌陷**的问题
  * 解决**非浮动元素被浮动元素覆盖**问题
  * 解决**外边距垂直方向重合**的问题

# 常见布局

* 标准流
* 元素定位
* 元素浮动
* flex 布局



# flex

* flex-grow：0 拉伸
* flex-shrink：1 压缩
* flex-basic：auto 主轴基础大小

# 单位

* 相对
  * em
  * rem
  * vw、vh

* 绝对
  * px


# SVG VS Canvas

|          | SVG                  | Canvas                           |
| -------- | -------------------- | -------------------------------- |
| 可扩展性 | 放大缩小不失真       | 放大会模糊                       |
| 渲染能力 | 复杂渲染慢           | 渲染快，更快的图形处理能力       |
| 灵活度   | 用js、css修改        | 只能用js修改                     |
| 使用场景 | logo，icon，几何设计 | 游戏开发，绘制图形，复杂照片合成 |

# CSS 性能优化

>* 减少 **css 文件**的大小
>   * 抽取公共类，减少重复代码
>   * 使用 **css 压缩工具**
>   * 不要使用 `@import`
>* 减少 http 请求数量
>   * 合并多个 css 文件为一个
>   * **背景图使用精灵图**
>* 优化 css 选择器
>   * 使用更简单和更具体的选择器
>   * 使用 *id* 选择器非常高效，因为 *id* 是唯一的
>   * 尽量避免使用通配符选择器
>   * 不使用 !important
>   * 避免深层次的选择器嵌套
>* preload、prefetch
>* 浏览器缓存
>* 动画使用 **translate**
>* 避免过分重排

# 选择器

>* 后代选择器
>  * 直接子代： >
>* 兄弟选择器
>  * 所有：~
>  * 相邻：+

# 精灵图

>* 是一种 CSS 图像合成技术，将各种小图片合并到一张图片上，然后利用 CSS 的背景定位来显示对应的图片部分
>* **好处**
>   * 减少网页的 http 请求数量，加快网页响应速度，减轻服务器压力
>   * 减小图片总大小
>   * 解决了图片命名的困扰，只需要针对一张集合的图片命名

# sticky

>*  CSS3 新增的，当该元素的位置将要移出**偏移范围**时，定位由 relative 变成 fixed，根据设置的 **left、top** 等属性成固定位置的效果
>* 不脱离文档流

# transition vs animation

## transition 过渡

>* 更改 css 属性时控制动画速度
>* *transition* 过渡动画：
>
>   - *transition-property*：指定过渡的 *CSS* 属性
>   - *transition-duration*：指定过渡所需的完成时间
>   - *transition-timing-function*：指定过渡函数
>   - *transition-delay*：指定过渡的延迟时间
>* 缺点
>  * 只能定义开始状态和结束状态
>  * 不能重复执行
>  * 在特定状态下触发才能执行

## animation

>* 使用
>
>  * 使用 keyframes **定义动画序列**，告知浏览器每一帧动画如何执行
> * **配置动画执行相关**
>
>   * *animation* 关键帧动画：
>
>      - *animation-name*：指定要绑定到选择器的关键帧的名称
>      - *animation-duration*：动画指定需要多少秒或毫秒完成
>      - *animation-timing-function*：设置动画将如何完成一个周期
>      - *animation-delay*：设置动画在启动前的延迟间隔
>      - *animation-iteration-count*：定义动画的播放次数
>      - *animation-direction*：指定是否应该轮流反向播放动画
>      - *animation-fill-mode*：规定当动画不播放时（当动画完成时，或当动画有一个延迟未开始播放时），元素停留在哪一帧的位置
>      - *animation-play-state*：指定动画是否正在运行或已暂停
>     * @keyframes moveAnim{}

# 物理像素 vs 逻辑像素

## 物理像素（设备像素）

* 显示器上的真实像素，每个像素的大小是屏幕固有的属性，屏幕出厂以后就不会改变

## 逻辑像素

* CSS 中经常使用的单位，它在默认情况下等同于设备独立像素

# margin 负值

>* `margin-top` 元素自身会向上移动，同时会影响下方的元素会向上移动
>* `margin-bottom` 元素自身不会位移，但是会减少自身供css读取的高度，从而影响下方的元素会向上移动
>* `margin-left` 元素自身会向左移动，同时会影响其它元素
>* `margin-right` 元素自身不会位移，但是会减少自身供css读取的宽度，从而影响右侧的元素会向左移动

>* 通过负边距进行偏移的元素，它会放弃原本占据的空间，这样它后面文档流中的其它元素就会“流”过来填充这部分空间
>* 文档流只能是后面的流向前面的，即文档流只能向左或向上流动，不能向下或向右移动

# margin 的传递

>* 父子块元素之间
>* 上下
>* 解决
>   * 父子之间使用 padding
>   * 触发 BFC

# margin 的折叠

>* 父子、兄弟之间
>* 上下
>* 解决
>   * 触发 BFC
>   * 兄弟之间设置 margin 一个就行了