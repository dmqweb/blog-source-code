# HTML 结构

* 文档声明
* html
  * head
    * meta
    * title
    * link
  * body
    * div
    * script

# <!DOCTYPE>

* 作用
* 重要性
* html5

# 严格模式与混杂模式

* 分别解释
  * w3c
  * 自己的方式
* 存在影响，保留的意义

# meta

>* *meta* 标签提供关于 HTML 文档的元数据
>  * 元数据不会显示在页面上，但是对于机器是可读的
>* charset
>* name     content
>  * viewpoint
>    * width
>    * height
>    * user-scalable
>    * initial-scale
>    * maximum-scale
>    * minmum-scale
>  * robots
>    * all
>    * none
>  * keywords
>  * description
>  * http-equiv

# iframe

>* 作用
>* 优点
>  * 并行加载
>  * 跨子域通讯
>* 缺点
>  * onload
>  * seo
>  * 页面多不好管理

# 块级元素、内联元素

>* block：div、p、h1、form、hr、ol、ul、table
>* inline：a、span、img
>* inline-block：input、button

# 语义化

>* 好处
>  * 代码结构
>  * seo
>  * 用户体验
>  * 团队开发维护
>  * 方便其他设备解析
>* 语义标签
>
><img src="https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2021-09-07-062515.png" alt="image-20210907142515375" style="zoom:50%;" />

# SEO 之 TDK

>* title
>* description
>* keywords

# src vs href 

>* *src* 是 *source* 的缩写，它通常用于 *img、video、audio、script* 元素，通过 *src* 属性，**可以指定外部资源的来源地址**
>* *href* 意味「超引用」，它通常用于 ***a、link*** 元素，通过 *href* 属性，可以**标识文档中引用的其他超文本**

# a 元素

>* *href* 属性中的 *url* 可以是浏览器支持的任何协议
>
>  * 用于手机拨号 \<a href='tel:10086'>10086</a>
>
>  * 发送短信 \<a href="sms:10086?body=test"> 
>
>* 做锚点
>
>* 下载文件：无法解析，选择下载

# label 元素

>* 不呈现特殊效果，为鼠标用户改进了可用性
>* 使用 for 属性绑定表单控件，表单控件使用 id 属性
>
>~~~html
><label for="male">男</label>
><input type="radio" name="sex" id="male" />
>~~~
>
>

# html5 新特性

>* canvas、video、audio
>* storage
>* 语义化元素
>* 表单控件：日期、邮箱、日历
>* webworker、websocket