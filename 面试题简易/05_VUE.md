# nextTick

>* 作用
>* 实现
>  * 微任务
>    * promise.then
>    * MutationObserver
>    * setImmediate
>  * 宏任务
>    * setTimeout

# data 是一个函数

>* 引用类型
>* 复用组件
>* 新的 data

# MVVM

>* 设计思想
>  * Model
>  * View
>  * ViewModel

# 组件通信

>* 父子
>   * props emit
>   * slot
>   * ref
>   * v-model
>* 非父子
>   * provide inject
>   * vuex  pinia
>   * eventbus

# 虚拟 dom

>虚拟 dom 本质上就是一个普通的 js 对象，用于**描述**视图的界面结构，最初是由 react 团队提出的概念，是一种编程的思想，指的是 针对真实 UI DOM 的一种描述能力

<img src="https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2023-02-23-034001.png" alt="image-20230223114000816" style="zoom: 50%;" />

>在 vue 中，每个组件都有一个 **render 函数**（用于创建虚拟 dom），每个 render 函数都会返回一个虚拟 dom 树，这也就意味着每个组件都对应一棵虚拟 dom 树

<img src="http://mdrs.yuanjin.tech/img/20210225140726.png" alt="image-20210225140726003" style="zoom:30%;" align="left" />

* 体积和速度优势 =》 渲染效率
* 首次渲染 | 重新渲染

<img src="http://mdrs.yuanjin.tech/img/20210225144108.png" alt="image-20210225144108143" style="zoom:33%;" align="left" />

* 模板 ==编译=》render 函数

# v-model

* 表单元素 自定义组件
* 属性 事件

# 响应式原理

>* 数据响应式是指当对象本身（[].push(1)）或者对象属性（.a=10）发生变化时，会自动运行一些函数（render、watch），页面发生变化
>* Vue **用到四个核心部件：Observer、Dep、Watcher、Scheduler**

![image-20240503205219536](https://gitee.com/seplisa/img/raw/master/202407101015229.png)

## Observer

>* Observer 将所有数据变成响应式数据
>* vue2
>  * 通过 Object.defineProperty 遍历 data 对象的每一个属性
>  * 把每一个属性转换成带有`getter`和`setter`的属性
>    * 读取属性的时候运行 getter
>    * 给属性赋值的时候运行 setter
>  * 对一个对象新增属性、删除属性不能检测到，需要使用 $set(obj,'c') 和 $delete(obj,'a')
>  * 对一个数组下标直接赋值不能检测到，需要使用 $set
>* vue3
>  * 
>* 总之，Observer 的目标，就是要让一个对象，它属性的读取、赋值，内部数组的变化都要能够被 vue 感知到

<img src="http://mdrs.yuanjin.tech/img/20210226153448.png" alt="image-20210226153448807" style="zoom:50%;" />

<img src="http://mdrs.yuanjin.tech/img/20210226154624.png" alt="image-20210226154624015" style="zoom:50%;" />

## Dep

>* vue 会为响应式对象中的每个属性、对象本身、数组本身创建一个 Dep 实例，每个 Dep 实例能够记录依赖和派发更新
>   * 当读取响应式对象的某个属性时，它会进行依赖收集
>   * 当改变某个属性时，它会派发更新

<img src="http://mdrs.yuanjin.tech/img/20210226155852.png" alt="image-20210226155852964" style="zoom:50%;" />

## Watcher

>* 响应式数据需要知道哪个函数在使用自己
>* 所以 vue 不是直接执行函数，而是把函数交给一个 watcher 去执行
>* watcher 会设置一个**全局变量**记录当前负责执行的 watcher 等于自己，然后再去执行函数，函数执行过程中如果发生了**依赖记录**，那么 Dep 就会把这个**全局变量**（watcher）记录下来
>* 之后派发更新的时候，就去通知之前记录的所有 watcher 自己改变了

<img src="http://mdrs.yuanjin.tech/img/20210226161404.png" alt="image-20210226161404327" style="zoom:50%;" />

## Scheduler

>* Dep 通知 watcher，watcher 执行对应的函数，可能导致函数频繁运行，效率低下（四个属性都对应了同一个 render）
>* 因此，watcher 收到派发更新的通知后，不是立即执行对应函数，而是把自己交给一个调度器的东西
>* 调度器维护一个**执行队列**，该队列中同一个 watcher 只会存在一个，队列中的 watcher 不是立即执行，而是通过 nexttick，把需要执行的 watcher 放入到事件循环的微队列中

# diff 算法

>* 当**组件创建**、**依赖的属性或数据发生变化**（更新）时，会运行一个函数 updateComponent
>  * 运行 render 生成一棵新的虚拟 dom 树
>  * 运行 update，传入**虚拟 dom 树的根节点**，对新旧两棵树进行对比，最终完成对真实 dom 的更新
>* diff 算法就发生在 update 函数的运行过程中

~~~js
function Vue(){
    var updateComponent = ()=>{
        this._update(this._render())
    }
    new Watcher(updateComponent) // watcher 就是把这个函数运行一遍
}
~~~

>* update 函数接收到一个新的 vnode 参数（虚拟 dom 树的根节点）——新生成的虚拟 dom 树
>* update 函数通过当前组件的 _vnode 属性（虚拟 dom 树），拿到旧的虚拟 dom 树
>* update 函数首先会给组件的 _vnode 属性重新赋值，让它指向新树（虚拟 dom 搞定完毕）

![image-20240605144846002](https://gitee.com/coderlisa/img/raw/master/202407071437158.png)

~~~js
function update(vnode){
    const oldVnode = this._vnode
    this._vnode = vnode
    if(!oldVnode){
        this._patch(this.$el,vnode)
    }
}
~~~

>判断旧树是否存在
>
>* 不存在：第一次加载组件，通过内部的 patch 函数，直接遍历新树，为每个节点**生成真实 dom**，**挂载到每个节点的 elm 属性上**
>* 存在：说明之前已经渲染过该组件，于是通过内部的 **patch 函数**，将新旧两棵树进行**对比**，完成对所有真实 dom 的最小化处理，让新树的节点对应合适的真实 dom

<img src="http://mdrs.yuanjin.tech/img/20210301194237.png" alt="image-20210301194237825" style="zoom:43%;" />

![image-20240605145334501](https://gitee.com/coderlisa/img/raw/master/202407071438527.png)

>* 首先对**根节点**进行比较
>* 如果两个虚拟节点
>  * **key** （默认 undefined）值，**标签类型均相同**（input 元素还要看 type 属性），进入**更新流程**（改动真实 dom）（两个文本节点相同）
>    * 将旧节点的真实 dom 赋值到新节点：`newVnode.elm = oldVnode.elm`
>    * 对比新节点和旧节点的属性，有变化的更新到真实 dom 中
>    * 当两个节点处理完毕，开始**对比子节点**（深度优先遍历）
>      * vue 一切的出发点，都是为了：
>        * 尽量啥也别做，尽量仅改动元素属性，尽量移动元素，而不是删除和创建元素，最后才删除和创建元素
>      * **采用双端对比算法**
>        * 头尾指针
>          * 对比新树旧树的头指针
>            * 相同
>              * 对比改动 dom
>              * 对比子节点
>              * 移动下一个
>            * **不同**
>              * 对比新树旧树的尾指针
>                * 相同
>                  * 对比改动 dom
>                  * 对比子节点
>                  * 移动上一个
>                * **不同**
>                  * 比较旧头和新尾
>                  * 比较新头和旧尾
>                    * **不同**
>                      * 以新头为基准，在旧树中查找
>                        * 存在：修改
>                        * 不存在：新建
>          * 还有多余就删除真实 dom
>  * 不相同，直接创建新的 dom 节点，销毁之前的节点
>    * 递归根据虚拟节点新建新节点
>    * 销毁旧节点

<img src="http://mdrs.yuanjin.tech/img/20210301203350.png" alt="image-20210301203350246" style="zoom:50%;" />

# 生命周期

<img src="http://mdrs.yuanjin.tech/img/20210302155735.png" alt="image-20210302155735758" style="zoom: 33%;" />

* 首次渲染

  * 初始化操作，设置私有属性到实例中
  * beforeCreate
  * 注入流程：处理属性、computed、methods、data、provide、inject
  * created
  * 生成 render 函数
  * beforeMount
  * 创建一个 watcher，传入 updateComponent；过程遇到组件，还会进入**组件实例化流程**

  ~~~js
  function Vue(){
      var updateComponent = ()=>{
          this._update(this._render())
      }
      new Watcher(updateComponent) // watcher 就是把这个函数运行一遍
  }
  ~~~

  * 运行 mounted
* 重渲染

  * 数据变化后，所有依赖该数据的 watcher 均会重新运行
  * watcher 会被调度器放在 nextTick 中运行
  * **beforeUpdate**
  * 执行 updateComponent 函数；新组件需要创建时，进入实例化流程，旧组件需要删除时候，进入 beforeUnmount、unmounted 流程

  ~~~js
  var updateComponent = ()=>{
          this._update(this._render())
  }
  function update(vnode){
      const oldVnode = this._vnode
      this._vnode = vnode
      this._patch(oldVnode,vnode)
  }
  ~~~

  * **updated**

# computed vs methods

* 正常解答
* vue 处理
* lazy
  * value
  * dirty
* 结合组件 watcher

# 优化

* v-show v-if
* v-for 结合 key
* computed
* keep-alive
* 异步组件
* 路由懒加载
* 服务端渲染 ssr
* 延迟加载

# 延迟加载

# keep-alive

* 是什么
* 优缺点
* 属性
  * include
  * exclude
  * max
* 生命周期
* 原理
  * keys 数组
  * cache 缓存对象

# vue2 vs vue3

* 去掉了 Vue 构造函数
  * 打包体积
  * 创建的对象

* vue3 中的 options api 打印 this
* options api VS composition api
* 效率的提升
  * 静态提升（ast 树）
    * 静态节点
    * 静态属性
  * 预字符串化（ast 树）
  * 缓存事件处理函数（ast 树）
  * 采用 block tree 提升对比效率（ast 树）
    * 动态节点
  * patchFlag（ast 树）
    * 记录节点哪一块是动态内容
* 数据响应式
  * vue2
  * vue3

# v-show vs v-if

# v-if、v-for 

# ReactivityApi

## 获取响应式数据

## 

|    API     |           传入            |       返回       |                             备注                             |
| :--------: | :-----------------------: | :--------------: | :----------------------------------------------------------: |
| `reactive` |  `plain-object`普通对象   |    `对象代理`    |                   深度代理对象中的所有成员                   |
| `readonly` | `plain-object` or `proxy` |    `对象代理`    |              只能读取代理对象中的成员，不可修改              |
|   `ref`    |           `any`           | `{ value: ... }` | 对 value 的访问是响应式的<br />如果给 value 的值是一个对象，<br />则会通过`reactive`函数进行代理<br />如果已经是代理，则直接使用代理 |
| `computed` |        `function`         | `{ value: ... }` |  当读取 value 值时，<br />会**根据情况**决定是否要运行函数   |

## 监听数据变化

* watchEffect
  * 用于**自动收集**响应式数据的依赖
  * 

* watch
  * 需要**手动指定**侦听的数据源
  * watcheffect默认直接执行一次，watch需要设置immediate属性才能立即执行
  * 需要深度监听 deep:true




# 自定义指令

# 请求异步数据生命周期

# 路由模式

* hash
  * 不会带到 http 请求
  * ononhashchange
* history
  * 路由分发模式
  * api
    * 切换
      * forward
      * back
      * go
    * 修改
      * pushState
      * replaceState
* 区别
  * 修改
  * 栈
  * 记录类型
  * 404

# 优点

>* 响应式编程
>  * 会自动对页面中某些数据的变化做出响应
>  * 让开发者不用再操作 *DOM* 对象，有更多的时间去思考业务逻辑
>
>
>* 组件化开发
>  * 提高开发效率、方便重复使用、简化调试步骤、提升整个项目的可维护性、便于协同开发
>
>
>* 虚拟 dom
>
>  * 在传统开发中，用 *JQuery* 或者原生的 *JavaScript DOM* 操作函数对 *DOM* 进行频繁操作的时候，浏览器要不停的渲染新的 *DOM* 树，导致在性能上面的开销特别的高
>
>  * 开始说虚拟 dom 去吧

# vue complier

>- parse：接受 template 原始模板，按着模板的节点和数据生成对应的 ast
>- optimize：**遍历 ast 的每一个节点，标记静态节点，这样就知道哪部分不会变化，于是在页面需要更新时，通过 diff 减少去对比这部分DOM，提升性能**
>- generate：**把前两步生成完善的 ast，组成 render 字符串，然后将 render 字符串通过 new Function 的方式转换成渲染函数**

# watch vs computed

>* 都是观察数据变化的
>* 计算属性将会混入到 vue 的实例中，所以需要**自定义监听的变量**；watch 监听 data 、props 里面数据的变化
>* computed 有缓存，它依赖的值变了才会重新计算；watch 没有
>* **watch 支持异步**；computed 不支持
>* watch 监听某一个值变化，执行对应操作；computed 监听属性依赖于其他属性
>* watch 监听函数接收两个参数，第一个是最新值，第二个是输入之前的值；computed 属性是函数时，都有 get 和 set 方法，默认走 get 方法，get 必须有返回值

# 首屏优化

## 请求优化

>* CDN
>   * CDN 将第三方的类库放到 CDN 上，能够大幅度减少生产环境中的项目体积
>   * CDN 能够实时地根据**网络流量**和**各节点的连接**、**负载状况**以及**到用户的距离**和**响应时间**等综合信息将用户的请求重新导向离用户最近的**服务节点**上
>* 缓存：移步【**浏览器缓存策略**】
>* gzip：开启 gzip 压缩，通常开启 gzip 压缩能够有效的缩小传输资源的大小
>* http2
>   * 如果系统首屏同一时间需要加载的静态资源非常多，但是浏览器对同域名的 tcp 连接数量是有限制的(chrome 为 6 个)超过规定数量的 tcp 连接，则必须要等到之前的请求收到响应后才能继续发送
>   * 而 http2 则可以在多个 tcp 连接中并发多个请求没有限制，在一些网络较差的环境开启 http2 性能提升尤为明显
>* 懒加载
>   * 当 url 匹配到相应的路径时，通过 import 动态加载页面组件，这样首屏的代码量会大幅减少，webpack 会把动态加载的页面组件分离成单独的一个 chunk.js 文件
>* 预渲染
>   * 由于浏览器在渲染出页面之前，需要先加载和解析相应的 html、css 和 js 文件，为此会有一段白屏的时间，可以添加 **loading**，或者**骨架屏幕**尽可能的减少白屏对用户的影响

## 体积优化

>* 合理使用第三方库
>  * 对于一些第三方 ui 框架、类库，尽量使用按需加载，减少打包体积
>* 使用可视化工具分析打包后的模块体积
>  * webpack-bundle- analyzer 这个插件在每次打包后能够更加直观的分析打包后模块的体积，再对其中比较大的模块进行优化
>* 提高代码使用率
>  * 利用**代码分割**，将脚本中无需立即调用的代码在代码构建时转变为**异步加载**的过程
>* 封装
>   * 构建良好的项目架构，按照项目需求就行全局组件，插件，过滤器，指令，utils 等做一 些公共封装，可以有效减少代码量，而且更容易维护资源优化
>* 图片
>  * 图片懒加载
>    * 使用图片懒加载可以优化同一时间减少 http 请求开销，避免显示图片导致的画面抖动，提高用户体验
>  * 使用 svg 图标
>    * 相对于用一张图片来表示图标，svg 拥有更好的图片质量，体积更小，并且不需要开启额外的 http 请求
>  * 压缩**图片**
>    * 可以使用 image-webpack-loader，在用户肉眼分辨不清的情况下一定程度上压缩图片

# 插槽 vs 作用域插槽

>* 插槽的作用是子组件提供了**可替换模板**，父组件可以**更换模板的内容**
>* 作用域插槽给了**子组件将数据返给父组件的能力**，子组件一样可以复用，同时父组件**也可以重新组织内容和样式**

# v-for 的 key 属性

>* 有 key ：源码通过调用 patchKeyedChildren方法，尽可能的进行复用这个节点，而不是移动或者创建新的节点
>* 无 key：vue 修改的效率非常低，调用 patchUnkeyedChildren方法，从而进行更多的 key 操作