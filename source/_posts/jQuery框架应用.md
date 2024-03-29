---
title: jQuery
date: 2023-1-2 12:24:4
categories:
- jQuery
tags:
- jQuery
---
# jQuery基本概念

> 学习目标：学会如何使用jQuery，掌握jQuery的常用api，能够使用jQuery实现常见的效果。



###### 为什么要学习jQuery？

【01-让div显示与设置内容.html】

使用javascript开发过程中，有许多的缺点：

```javascript
1. 查找元素的方法太少，麻烦。
2. 遍历伪数组很麻烦，通常要嵌套一大堆的for循环。
3. 有兼容性问题。
4. 想要实现简单的动画效果，也很麻烦
5. 代码冗余。
```



###### jQuery初体验

优点总结：

```javascript
1. 查找元素的方法多种多样，非常灵活
2. 拥有隐式迭代特性，因此不再需要手写for循环了。
3. 完全没有兼容性问题。
4. 实现动画非常简单，而且功能更加的强大。
5. 代码简单、粗暴。
```

###### 什么是jQuery?

> jQuery的官网 [http://jquery.com/](http://jquery.com/) 
> jQuery就是一个js库，使用jQuery的话，会比使用JavaScript更简单。

js库：把一些常用到的方法写到一个单独的js文件，使用的时候直接去引用这js文件就可以了。（animate.js、common.js）



我们知道了，jQuery其实就是一个js文件，里面封装了一大堆的方法方便我们的开发，其实就是一个加强版的common.js，因此我们学习jQuery，其实就是学习jQuery这个js文件中封装的一大堆方法。



###### jQuery的版本

> 官网下载地址：[http://jquery.com/download/](http://jquery.com/download/)
> jQuery版本有很多，分为1.x 2.x 3.x

###### jQuery的入口函数

使用jQuery的三个步骤：

```javascript
1. 引入jQuery文件
2. 入口函数
3. 功能实现
```



关于jQuery的入口函数：

```javascript
//第一种写法
$(document).ready(function() {
	
});
//第二种写法
$(function() {
	
});
```



jQuery入口函数与js入口函数的对比

```javascript
1.	JavaScript的入口函数要等到页面中所有资源（包括图片、文件）加载完成才开始执行。
2.	jQuery的入口函数只会等待文档树加载完成就开始执行，并不会等待图片、文件的加载。
```



###### jQuery对象与DOM对象的区别（重点）

```javascript
1. DOM对象：使用JavaScript中的方法获取页面中的元素返回的对象就是dom对象。
2. jQuery对象：jquery对象就是使用jquery的方法获取页面中的元素返回的对象就是jQuery对象。
3. jQuery对象其实就是DOM对象的包装集（包装了DOM对象的集合（伪数组））
4. DOM对象与jQuery对象的方法不能混用。
```



DOM对象转换成jQuery对象：【联想记忆：花钱】

```javascript
var $obj = $(domObj);
// $(document).ready(function(){});就是典型的DOM对象转jQuery对象

```



jQuery对象转换成DOM对象：

```javascript
var $li = $(“li”);
//第一种方法（推荐使用）
$li[0]
//第二种方法
$li.get(0)
```



# jQuery框架应用

jQuery是一个快速的、简洁的JavaScript框架（库），它的宗旨“ write less Do more ” 即写更少的代码做更多的事情，它会封装很多JavaScript中常用的功能代码，提供了一个简洁的JS设计模式

- 优化HTML文档操作（优化DOM操作）
- 事件处理
- 动画设计（动画存在bug）
- Ajax

要使用JQ我们需要引入对应的库文件做支持

```html
<script src="js/jquery-3.5.1.min.js"></script>
```

## jQuery基础语法

由三个部分组成

1、启动符：$ ，如果该符号在语言中已经作为关键字或者预留字使用，可以替换成 jQuery

2、选择器【用来选择需要操作的JQ元素】

3、方法【对元素进行操作】



## jQuery选择器



```js
$("h1")   //document.querySelectorAll()
$(".tit")
```

### 什么是jQuery选择器

jQuery选择器是jQuery为我们提供的一组方法，让我们更加方便的获取到页面中的元素。注意：jQuery选择器返回的是jQuery对象。

jQuery选择器有很多，基本兼容了CSS1到CSS3所有的选择器，并且jQuery还添加了很多更加复杂的选择器。【查看jQuery文档】

jQuery选择器虽然很多，但是选择器之间可以相互替代，就是说获取一个元素，你会有很多种方法获取到。所以我们平时真正能用到的只是少数的最常用的选择器。



### 基本选择器

选择器选取到的是一个jQuery对象

| 名称       | 用法               | 描述                                 |
| ---------- | ------------------ | :----------------------------------- |
| ID选择器   | $(“#id”);          | 获取指定ID的元素                     |
| 类选择器   | $(“.class”);       | 获取同一类class的元素                |
| 标签选择器 | $(“div”);          | 获取同一类标签的所有元素             |
| 并集选择器 | $(“div,p,li”);     | 使用逗号分隔，只要符合条件之一就可。 |
| 交集选择器 | $(“div.redClass”); | 获取class为redClass的div元素         |

> 总结：跟css的选择器用法一模一样。



### 层级选择器

| 名称       | 用法        | 描述                                                        |
| ---------- | ----------- | :---------------------------------------------------------- |
| 子代选择器 | $(“ul>li”); | 使用>号，获取儿子层级的元素，注意，并不会获取孙子层级的元素 |
| 后代选择器 | $(“ul li”); | 使用空格，代表后代选择器，获取ul下的所有li元素，包括孙子等  |



> 跟CSS的选择器一模一样。

### 过滤选择器

> 这类选择器都带冒号:
>
> 获取到的为数组，并且只匹配一次，成功后就停止匹配

| 名称         | 用法                               | 描述                                                        |
| ------------ | ---------------------------------- | :---------------------------------------------------------- |
| :eq（index） | $(“li:eq(2)”).css(“color”, ”red”); | 获取到的li元素中，选择索引号为2的元素，索引号index从0开始。 |
| :odd         | $(“li:odd”).css(“color”, ”red”);   | 获取到的li元素中，选择索引号为奇数的元素                    |
| :even        | $(“li:even”).css(“color”, ”red”);  | 获取到的li元素中，选择索引号为偶数的元素                    |

【案例：隔行变色】

###  筛选选择器(方法)

> 筛选选择器的功能与过滤选择器有点类似，但是用法不一样，筛选选择器主要是方法。

| 名称               | 用法                        | 描述                                                         |
| ------------------ | --------------------------- | :----------------------------------------------------------- |
| children(selector) | $(“ul”).children(“li”)      | 相当于$(“ul>li”)，子类选择器，可以不指明selector             |
| find(selector)     | $(“ul”).find(“li”);         | 相当于$(“ul li”),后代选择器，必须要指明selector              |
| siblings(selector) | $(“#first”).siblings(“li”); | 查找所有兄弟节点，不包括自己本身，不指定selector时会包含script标签 |
| parent()           | $(“#first”).parent();       | 查找父亲                                                     |
| eq(index)          | $(“li”).eq(2);              | 相当于$(“li:eq(2)”),index从0开始                             |
| next()             | $(“li”).next()              | 找下一个兄弟，包含其内容，返回的是数组                       |
| prev()             | $(“li”).prev()              | 找上一个兄弟，包含其内容，返回的是数组                       |

```javascript
【案例：下拉菜单】this+children+mouseenter+mouseleave
【案例：突出展示】siblings+find
【案例：手风琴】next+parent
【案例：淘宝精品】index+eq
```

## jQuery事件

jQuery事件是把DOM当中常用的事件进行了一个封装，成了一个方法来调用

```js
$(".tit").click(function(){
    //回调函数就是当你的事件触发的时候要执行的事情
})
```

| 鼠标事件   | 键盘事件 | 表单事件 | 文档/窗口事件  |
| ---------- | -------- | -------- | -------------- |
| click      | keypress | submit   | load（窗口）   |
| dblclick   | keydown  | change   | resize（窗口） |
| mouseenter | keyup    | focus    | scroll（窗口） |
| mouseleave |          | blur     | unload（窗口） |
| hover      |          |          | ready（文档）  |

对于不常用的事件，jQ提供了一个on方法来实现绑定

```js
$("#btn").on("click",function(){
    console.log("呵呵呵呵")
})
```



## jQuery事件委托

jQuery事件委托通过on方法实现

```html
<ul class="ul1">
    <li>1</li>
    <li class="active">2</li>
    <li>3</li>
    <li>4</li>
    <li>5</li>
</ul>
<script>
    $(".ul1").on("click","li.active",function(){
        console.log(new Date());
    })
</script>
```



## jQuery事件移除

jQuery使用off方法

```js
$("css选择器").off("事件类型",函数名)
//如果没有写函数名，就移除所有
```

## jQuery单次事件

```js
//原生写法
document.querySelector("#btn").addEventListener("click",function(){
	console.log("我被点了");
	document.querySelector("#btn").removeEventListener("click",arguments.callee)
})

//jQ写法
$("#btn").one("click",function(){
	console.log("我被点了")
})
```



## jQuery动画方法

1、show() / hide() / toggle() 执行元素的显示隐藏

> 注意：toggle方法有版本兼容的问题，如果要使用toggle简易采用1.7.2一下的版本

2、slideUp() / slideDown() / slideToggle() 元素执行上下滑动

3、fadeIn() / fadeOut() / fadeTo(speed,opacity) / fadeToggle()  渐隐渐显

4、animate() 自定义动画方法

```js
$(".switch").click(function(){
    $(".box").animate({
        "width":"500px",
        "height":"500px"
    },2000,function(){
        console.log("我完了")
    })
})
```



## jQuery css方法（1）

1、addClass() 在选中的元素上添加一个类

2、removeClass() 在选中的元素上删除一个类

3、toggleClass（） 在选中的元素上替换一个类

4、css() 这个方法可以在获取的元素中任意添加或者获取样式

#### 获取样式

```js
var a = $(".box").css("width");
```

#### 设置样式（hover时传入两个函数，移入移出事件）

```js

$(".box").hover(function(){
    $(this).css({
        width:"500px",
        height:"500px"
    })
},function(){
    $(this).css({
        width:"300px",
        height:"300px"
    })
})
```

## css操作（2）

``` js
//name：需要设置的样式名称
//value：对应的样式值
css(name, value);
//使用案例
$("#one").css("background","gray");//将背景色修改为灰色

//参数是一个对象，对象中包含了需要设置的样式名和样式值
css(obj);
//使用案例
$("#one").css({
    "background":"gray",
    "width":"400px",
    "height":"200px"
});

//name:需要获取的样式名称
css(name);
//案例
$("div").css("background-color");
```

注意：获取样式操作只会返回第一个元素对应的样式值。
隐式迭代：
1.设置操作的时候，如果是多个元素，那么给所有的元素设置相同的值
2.获取操作的时候，如果是多个元素，那么只会返回第一个元素的值。

## class操作（2）

```js
//name：需要添加的样式类名，注意参数不要带点.
addClass(name);
//例子,给所有的div添加one的样式。
$(“div”).addClass(“one”);

//name:需要移除的样式类名
removeClass(“name”);
//例子，移除div中one的样式类名
$(“div”).removeClass(“one”);

//name:用于判断的样式类名，返回值为true false
hasClass(name)
//例子，判断第一个div是否有one的样式类
$(“div”).hasClass(“one”);

//name:需要切换的样式类名，如果有，移除该样式，如果没有，添加该样式。
toggleClass(name);
//例子
$(“div”).toggleClass(“one”);
```

、、、
mouseenter
$("li").mouseenter(function(){
    //this:为当前的都dom对象， $(this)转换为jquery对象

```js
console.log($(this).text());
```

### jQuery属性方法

1、html() 等价原生DOM中的innerHTML属性

```js
$(".box").html("<h1>哈哈</h1>")  //传参表示赋值
$(".box").html()   //取值
```

2、text() 等价原生DOM中的innerText属性

3、val() 对表单的value属性进行操作

> 以上三个传参就是赋值，不传参就是取值

4、attr()  操作标签属性

```js
$("input").attr("type");
$("input").attr("type","password")   //注意低版本无法设置type属性
```

5、removeAttr() 移除一个属性

6、prop() 对标签的单属性进行操作

```js
$("input").prop("checked",false)
```



### jQuery的尺寸方法

1、width() / height() 获取盒子的content大小

2、innerWidth() / innerHeight()  获取盒子的content+padding的大小

3、outerWidth() / outerHeight（）获取盒子的content+padding+border的大小

5、outerWidth(true) / outerHeight（true）获取盒子的content+padding+border+margin的大小

   

# 文档就绪函数

```html
<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<title></title>
		<script src="js/jquery-3.5.1.min.js"></script>
		<script>
			$("#btn").click(function(){
				console.log("haha")
			})
		</script>
	</head>
	<body>
		<button id="btn">按钮</button>
	</body>
</html>
```

> 代码分析：
>
> 上面的代码当中，按钮是不会有事件触发的，因为它是先绑定的事件，再加载的DOM元素，再绑定事件的时候DOM元素还没有加载出来

在原生JS中window中有一个事件onload，它代表所有元素已经加载完毕才会触发，所以我们可以使用这个事件

```html
<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<title></title>
		<script src="js/jquery-3.5.1.min.js"></script>
		<script>
			window.onload = function(){
				$("#btn").click(function(){
					console.log("haha")
				})
			}
		</script>
	</head>
	<body>
		<button id="btn">按钮</button>
	</body>
</html>
```

> 代码分析：
>
> 这些写其实不太好，因为它是将所有的元素加载完毕之后才会触发，如果一个页面上所有的元素已经加载好了，但是任然有一些大图片或者一些其他外部资源没有加载好，这个时候onload是不会触发的，这个从用户体验角度来讲不太好

优化一下

```js
document.addEventListener("DOMContentLoaded",function(){
    $("#btn").click(function(){
        console.log("haha")
    })
})
```

> 代码分析：
>
> 上面的写法就更优化了，把对象改成document，通过触发事件DOMContentLoaded 从而不需要等待DOM以外的东西加载好就可以触发

而上面这套写法，在JQ当中有一个专门函数叫做**文档就绪函数**

```js
$(document).ready(function(){
    $("#btn").click(function(){
        console.log("haha")
    })
})
```

进一步简化

```js
$(function(){
    $("#btn").click(function(){
        console.log("haha")
    })
})
```



# Ajax方法

**jquery封装的Ajax方法会自动将返回的json格式数据进行序列化。**

我们自己封装过一套ajax请求，JQ也有自己封装的

```js
$.ajax({
	async:true,               //是否异步，默认false
	type:"get",               //请求方法，默认是get
	url:"",                   //请求地址
	dataType:"json",          //返回的数据类型，如果是json则自动反序列化
	success:function(data){   
		//请求成功时，执行的回调，data相当于xhr对象中的response
	},
	error:function(err){
		//请求失败时执行的回调，err错误信息
	}
}) 
```

JQ自己也觉得上面的写法很麻烦，所以由简化了一下

```js
$.get(url,function(data){

})
或者
$.post(url, data, function(response) {
  // 处理响应数据
});
```



```js
$.extend  === Array.prototype.abc
```

ajax的封装方法中有xhr对象，此对象指向自己，施一公xhr.upload.onprogress方法创建一个函数，可以生成进度条样式（通过e.loaded和e.total，函数事件中内置的属性）

```js
$.extend  === Array.prototype.abc
```



# JQuery的其他方法

1、`each()` 方法

```js
$(".ul1>li").each(function(index,ele){
    console.log(index,ele);
})
```

选取元素之后，可以直接进行遍历，回调函数里面的第一个参数代表索引，第二个参数表单当前遍历的元素

```js
var result = $(".ul1>li");
$.each(result,function(index,ele){
	console.log(index,ele);
})
```

上面的调用 `$.each` 的时候，里面的result是一个类数组，所以我们可以用这个方法来进行遍历

2、`toArray()`  可以把Jquery选择操作的对象转换成一个数组

```js
$(".ul1>li").toArray();   //这个时候就变成了一个数组
```

刚刚上面的`toArray()` 是可以将JQuery的选择结果转化昵称真正的数组，但是这个结束是不是 JQuery选取的？

3、`makeArray()` 可以将任何类数组转换成数组

```js
var lis = document.querySeletorAll(".ul1>li")    //得到是一个NodeList类型的类数组
```

把上面的NodeList，我们通过已经学过的方法转成数组

**第一种**

```js
var arr = Array.prototype.slice.call(lis);
```

**第二种**

```js
var arr = $(lis).toArray();
```

**第三种**

```js
var arr = $.makeArray(lis);
```



### JQuery的扩展

on的使用

**第一种方式**

```js
$("#btn1").on("click",function(){
	console.log("单击事件")
})

$("#btn1").on("mousedown",function(){
	console.log("鼠标按下事件")
})

$("#btn1").on("mouseup",function(){
	console.log("鼠标松开事件")
})
```

**第二种写法**

```js
$("#btn1").on({
	click: function(){
		console.log("单击事件")
	},
	mousedown: function(){
		console.log("鼠标按下事件")
	},
	mouseup: function(){
		console.log("鼠标松开事件")
	}
})
```

**第三种：链式语法**



### DOM的attribute和property

attribute：在web前端中指的是HTML的属性

property：在web前端中指的是对象的属性

```js
$("#input1").attr("type");
$("#input1").prop("checked",false);
```



#### JQuery对象于普通DOM对象的转换

```html
<body>
    <button type="button" id="btn1">按钮</button>
</body>
<script type="text/javascript">
    var btn1 = document.querySelector("#btn1");   //btn是一个原生的DOM对象

    var btn2 = $("#btn1");    //JQuery的初始化操作对象，jQuery.fn.init
</script>
```

首先我们要知道一点，$(选择器)它返回的是一个JQuery对象，是一个类数组形式

**JQuery对象转换成DOM**

```js
btn2[0];
$("#btn1")[0];   //这样就得到了原生的DOM对象
//接下来就可以操作对应的原生的js方法
```

**普通DOM对象转成JQuery对象**

```js
$(btn1);   //这样就得到了JQuery的操作对象
//只要得到了就可以使用JQ方法进行操作
$(btn1).text();
```



### JQ里面的事件对象

JQuery的事件全部都是二级事件，并且它默认执行的是事件冒泡

JQuery当中的事件对象并不是原生的事件对象，而是经过JQuery自己的封装的一个对象，正是因为它是自己封装的对象，所以JQuery事件对象肯定是与原生有一些不一样的

1、JQuery的事件对象不需要做兼容性的处理，因为在框架内部就已经了处理了

```js
//原生的DOM事件对象
event = event || window.event;
//而JQuery里面，直接使用event就好了
```

2、JQuery事件对象上面的 `stopPropagtion()` 它自己封装的方法，它不是原生的事件对象的方法，所以在停止事件冒泡与取消事件传播的时候，直接调用这一个方法就行了

```js
//原生DOM的事件里面，取消事件传播与冒泡
event.cancelBubble = true；    //IE
event.stopPropagtion();       //W3c

//在JQuery中，直接调用方法即可
event.stopPropagtion();
```

3、JQuery事件对象里面，如果要阻止事件的默认行为也是 `event.preventDefault()` ,而在原生DOM对象里面，0级使用 `return false` 2级事件使用 `event.preventDefault()`

```js
//原生DOM
//0级事件
//在事件方法的最后添加
return false

//JQuery当中，直接调用
event.preventDefault()
```

4、JQuery事件里面的 `return false` 会同时停止事件冒泡与阻止事件默认行为，相当于把 `stopPropagtion()` 与 `preventDefault() `都干了

5、jQuery当中的事件对象是框架自己封装的对象，如果要找原生的事件对象可以使用 `originalEvent`这个属性

6、JQuery的事件对象中 `which`属性代表鼠标的键，1代表左键，2代表中键，3代表右键

7、因为JQuery事件是2级事件可以实现多次监听，这样在触发的时候会同时调用所有监听的方法，这时候会形成事件链，在JQuery当中提供了一个排他的特性，它是 `event.stopImmediatePropagation()`

```js
$("#btn1").on("click",function(){
    console.log("我是第一次")
}).on("click",function(event){
    console.log("第二次");
    event.stopImmediatePropagation();  //事件链到这里就断掉了，后面的事件方法不执行
}).on("click",function(){
    console.log("第三次");
})
```



#### JQuery事件委托拓展

在JQ里面事件委托和原生DOM里面实现的事件委托有点不一样

**原生DOM里面**

- `event.target` 代表事件的触发者
- `event.currentTarget` 代表事件的绑定者

**JQuery框架里面**

- `event.target` 代表事件的触发者
- `event.currentTarget` 代表事件的绑定者
- `event.delegateTarget` 代表事件的委托者

```html
<body>
    <div class="box">
        <div class="small-box">
            <button type="button" class="btn1">按钮</button>
        </div>
    </div>
</body>
<script type="text/javascript">
    $(".box").on("click",".small-box",function(){
        console.log("我触发了事件",event);
    })
</script>
```

当我们点击按钮的时候，会触发click事件，这个时候我们来分析下这个事件对象

1、我们把事件绑定在了 `box` 身上，但是 `box` 又把事件委托给了 `small-box` 所以我们认为，事件现在实际上是在 `small-box` 身上

2、当我们点击按钮按钮的时候，会触发按钮身上的click事件，但是按钮本身并没有事件方法需要执行，所以按钮本身并不会又任何的事情发生，但是事件传播的行为任然是会发生的，所以按钮的点击事件传播到了外面的small-box身上，正好触发了small-box身上委托的事件方法

- `delegateTarget`  是 `div.box` 
- `currentTarget` 是 `div.small-box`
- `target` 是 `button.btn1`

总的来说，它的格式因该是如下

```js
$(委托者).on(事件类型，事件绑定者,function(){
	//这里面可以找到真正的target触发者
})
```



#### JQuery 方法中的this

```js
$(".box").on("click",".small-box",function(){
    console.log(this);          //small-box
})
    
$(".box").on("click",function(){
    console.log(this);          //box
})
```

JQuery里面的事件当中的this永远指向谁事件的绑定者  `event.currentTarget`

Jquery当中的this的一种特殊用法，它可以直接通过选择器选取以后再操作

```js
$(this)   //这就相当于对当前元素选取之后再操作
```



### JQuery的扩展方法

在JQuery当中，它为我们提供了很多的方法，同时也可以让我们自己来实现自定义的方法，这些自定义的方法，我们叫做jQuery的扩展方法

jQuery的扩展方法有两种形式存在

1、`$.extend()` ，这种情况直接在 $ 对象身上扩展方法

2、`$.fn.extend()` ，这种情况是在JQuery选取的元素上面扩展方法

```html
<div id="div1"></div>
<script type="text/javascript">
    $.extend({
        aaa:function(){
            console.log("我是JQuery对象上面扩展的aaa方法");
        }
    })

    $.aaa();

    $.fn.extend({
        bbb:function(){
            console.log("我是JQuery操作对象上面扩展的bbb方法")
        }
    })
    $("#div1").bbb();
</script>
```

#### JQuery扩展方法实现插件制作

index.html部分

```html
<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<title></title>
		<link rel="stylesheet" href="css/context-menu-box.css">
		
		<style>
			.box{
				width:400px;
				height:400px;
				border:solid 1px #f00;
			}
		</style>
	</head>
	<body>
		<div class="box">
			<!-- <ul class="context-menu-box">
				<li>haha</li>
				<li>haha</li>
				<li>haha</li>
			</ul> -->
		</div>
	</body>
	<script src="js/jquery-1.7.2.min.js" type="text/javascript"></script>
	<script src="js/jQuery.contextmenu.js"></script>
	<script type="text/javascript">
		var menuList = [
			{
				text: "退回",
				click: function(){
					console.log("你要退回么?")
				}
			},
			{
				text: "提交",
				click: function(){
					console.log("你正在提交")
				}
			},
			{
				text: "登录",
				click: function(){
					console.log("你在登录")
				}
			}
		]
		$(".box").addContextMenu(menuList);
	</script>
</html>

```

context-menu-box.css部分

```css
*{
	padding:0;
	margin:0;
}
ul,ol{
	list-style:none;
}
a{
	text-decoration: none;
	color:#333;
}
.context-menu-box{
	width:130px;
	position: fixed;
	left:0;
	top:0;
	background-color: #fff;
	box-shadow:0 0 5px #000;
	display:none;
}

.context-menu-box>li{
	line-height:35px;
	border-bottom: solid 1px #ccc;
	cursor: pointer;
	text-align: center;
}
.context-menu-box>li:hover{
	font-weight: bold;
}
```

jQuery.contextmenu.js

```js
(function($){
	if(typeof $ == undefined){
		throw new Error("jQuery is not defined");
		return;
	}
	$.fn.extend({
		addContextMenu: function(menuList){
			var menuUl = document.createElement("ul");
			menuUl.classList.add("context-menu-box");
			for(var i = 0;i < menuList.length;i++){
				var newli = document.createElement("li");
				newli.innerText = menuList[i].text;
				//判断一下是否有click事件
				if(typeof menuList[i].click === "function"){
					$(newli).on("click",menuList[i].click);
				}
				menuUl.appendChild(newli);
			}
			document.body.appendChild(menuUl);
			
			//点击自己的时候，把自己隐藏掉
			$(menuUl).click(function(){
				$(this).hide();
			})
			//绑定右键菜单事件
			this.contextmenu(function(event){
				event.preventDefault();
				var x = event.clientX;
				var y = event.clientY;
				$(menuUl).css({
					left: x + "px",
					top: y + "px"
				}).slideDown("fast");
			})
		}
	})
})(jQuery)   
/*
$符号并不是jQuery独占的一个标识符，你有可以在实际的工作中
会引入多个框架文件进行使用，有可以在其他的框架文件中也使用了$这个
符号作为它自己的标识符使用，那么这个时候，两个框架文件之间就会
产生冲突，jQuery在这个情况下，可以使用另外一个标识符来替代$的作用
就是jQuery
*/
```

