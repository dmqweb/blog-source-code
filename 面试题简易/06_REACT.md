# 框架

>* 本身 + 周边生态
>  * 基于**状态的声明式**渲染
>  * 支持**组件化**开发
>  * 客户端**路由**方案
>  * **状态管理**方案

# 介绍

## 版本

>* react 16：出现了 fiber，整个更新变的可中断、可分片、具有优先级
>* react 16.8：推出了 hooks，标志着类组件正式转为函数组件
>* react 17：过渡版本，升级简化本身
>* react 18：
>   * transition
>   * suspense
>   * 新的 hooks
>* react19
>   * 将 React 代码转化为 JS 提高渲染性能
>   * ref 直接作为属性
>   * use 获取 Promise
>   * 文档元数据

## 特点

>* 声明式
>* 组件化
>* 跨平台
>* 单向数据流
>* 虚拟 dom
>* diff 算法

# 生命周期

>- constructor
>  - 初始化操作：props、state
>
>- shouldComponentUpdate
>- render
>  - 是类组件中必须要有的
>  - 返回一个虚拟 dom
>  - 重新渲染就会重新运行
>  - 严禁使用 setState，可能导致无限递归渲染
>- component**DidMount**
>  - 依赖于 DOM 的操作可以在这里进行
>
>  - 在此处发送网络请求
>
>  - 此处添加一些订阅(记得在 componentWillUnmount 取消订阅)
>
>- component**DidUpdate**
>- component**WillUnmount**
>  - 清除  timer
>
>  - 取消网络请求
>
>  - 清除在 componentDidMount() 中创建的订阅
>
>

# hook 出现背景

>解决和**类组件**相关的一些问题
>
>* 告别类组件中 **this 指向**问题：箭头函数，constructor 中使用 bind
>* 告别繁重的**类组件**：继承了 React.Component，有很多东西
>* 类组件**复用状态**很难，使用高阶组件太复杂
>* **编程范式**的转变：“面向对象”转换为“函数式编程”
>   * 纯函数、副作用、柯里化、高阶函数
>   * 编程范式
>     * 命令式（How）：**面向过程，面向对象**
>     * 声明式（What）：**函数式编程，DSL(领域专用语言 HTML、SQL)**

# useState 和 useReducer 

>* useState 本质上是一个简易版的 useReducer
>* 在 mount 阶段，两者之间的区别在于
>   * useState 的 queue 的 lastRenderedReducer 为 **basicStateReducer**
>   * useReducer 的 queue 的 lastRenderedReducer 为开发者自己传入的 reducer 参数
>
>   * 因此，useState 可以视为 reducer  参数为 basicStateReducer 的 useReducer
>
>* 在 update 阶段，updateState 内部直接调用的就是 updateReducer
>   * 传入的 reducer 仍然是 **basicStateReducer**
>
>   * useReducer 是 useState 的代替方案，用于 **state 复杂变化**
>  * useReducer 是单个组件状态管理，组件通讯还需要 props
>
>  * redux 是全局的状态管理，多组件共享数据

# useEffect、useLayoutEffect、useInsertionEffect

>* 三者都是用于定义有副作用的因变量的 hook
>  * useEffect：回调函数会在 commit 阶段完成后**异步执行**，所以它不会阻塞视图的渲染
>  * useLayoutEffect：回调函数会在 commit 阶段的 **layout** **子阶段同步执行**，一般用于执行 **dom** 相关的操作
>  * useInsertionEffect：回调函数会在 commit 阶段的 **Mutation** 子阶段同步执行，与 useLayoutEffect 的区别在于执行的时候无法访问对 **dom 的引用**。这个 hook 是专门为 css-in-js 库插入全局的 style 元素而设计的
>* 工作流程
>  * useEffect 工作流程有声明，**调度**（异步执行），执行阶段
>  * useEffect 的回调函数会在 commit 阶段完成之后异步执行，因此需要经历调度阶段
>  * useLayoutEffect 的工作流程有声明和执行阶段

# useEffect

>纯函数：一个确切的参数在你的函数中运行后，一定能得到一个确切的值
>
>副作用：函数的结果不可控、不可预期。发送网络请求、添加监听的注册和取消监听、手动修改 dom、计时器

* 参数
  * 函数
    * **函数体**：要执行的副作用
    * **返回值**：清理函数，会在下一次渲染之后，执行副作用操作之前执行
  * 副作用的依赖
    * 不写：每次重新渲染都重新执行
    * []：只执行一次
    * [count]：依赖项更新就重新执行
* 使用
  * 执行副作用
  * 执行清理工作

# Context 

* 共享一些数据：用户登录信息、主题

* 使用步骤
  * 创建一个上下文对象：**React.createContext()**
  * 使用 **Provider** 对需要使用到数据的组件进行包裹
  * 使用 **value** 属性将数据注入到上下文环境中
  * 组件中使用 **Consumer** 组件进行包裹
  * 之后就可以使用 context 中的数据

# Portals 

>* 默认都是挂载到 id 为 root 的 DOM元素上的，希望渲染的内容独立于父组件，甚至是独立于当前挂载到的DOM 元素中
>* Portal 提供了一种将子节点渲染到存在于父组件以外的 DOM 节点的优秀的方案
>* 使用场景
>   * **应对 css 兼容性**
>   * **布局问题**

# Refs 

>* 使用场景
>   * 管理**焦点，文本选择或媒体播放**
>   * 获取**组件实例或者元素**
>* 使用方法
>   * **useRef**
>     * 创建的 ref 对象在组件的整个生命周期内都不会改变
>   * **createRef**
>     * 在函数式组件中使用，组件每更新一次，ref 对象就会被重新创建

# JSX vs 模板

>* react
>  * ui 本质
>  * 更加灵活
>* vue
>  * 模板引擎
>* 对比出发点

# 虚拟 dom

>* 虚拟 dom 本质上就是一个普通的 js 对象，用于描述视图的界面结构，最初是由 react 团队提出的概念，是一种编程的思想，指的是 针对真实 UI DOM 的一种描述能力
>
><img src="https://gitee.com/seplisa/img/raw/master/202407111506156.png" alt="image-20230223114000816" style="zoom: 50%;" />
>
>* 在 react 中，使用 js 对象来描述真实的 dom 结构
>* 虚拟 dom 是一种思想，js 对象是这种思想的具体实现
>* 使用虚拟 dom 主要是有两个优点
>  * 相较于 dom ，他有**体积和速度优势**
>  * 具有**多平台渲染**的抽象能力
>* 体积优势和速度优势主要体现在：js 层面的计算的速度，要比 dom 层面的计算快得多
>  * dom 对象被浏览器显示出来之前，浏览器会有很多工作要做
>  * 同时 dom 上面的属性也非常多
>  * 他发挥优势的时机主要体现在更新的时候，根据 React 团队的研究，在渲染页面时，相比使用原生 DOM API，开发人员更加倾向于使用 innerHTML。innerHTML 进行更新的时候，要全部重新赋值，这意味着之前创建的 DOM 节点需要全部销毁掉，然后重新进行创建，而虚拟 dom 能够做到针对 dom 节点做最小程度的修改
>* 多平台渲染的抽象能力
>  * 虚拟 DOM 只是对真实 UI 的一个描述，根据不同的宿主环境，可以执行不同的渲染代码
>  * 浏览器、Node.js 宿主环境使用 reactDOM 包
>  * native 宿主环境使用 reactNative 包
>* 在 react 中，通过 jsx 来描述 UI，jsx 仅仅是一个语法糖，会被 babel 编译为 createElement 方法的调用，方法调用之后会返回一个 js 对象，这个对象就是 虚拟 dom 对象，官方更倾向于称之为 一个 react 元素
>
>![image-20221226155735808](https://gitee.com/seplisa/img/raw/master/202407111507664.png)

# 性能优化

>* 渲染列表时加 key
>* 自定义事件、dom 事件及时销毁
>* 合理使用异步组件，lazy | 路由懒加载
>* 使用 PureComponent、memo
>* 使用 SSR
>* 使用 useMemo 缓存数据、useCallback 缓存函数
>* 使用 Fragement 减少层级

# 整体架构

>React v15 及其之前的架构：
>
>- Reconciler（协调器）：VDOM 的实现，负责根据自变量变化计算出 UI 变化
>- Renderer（渲染器）：负责将 UI 变化渲染到宿主环境中
>
>这种架构称之为 Stack 架构，在 Reconciler 中，mount 的组件会调用 mountComponent，update 的组件会调用 updateComponent，这两个方法都会递归更新子组件，更新流程一旦开始，中途无法中断。
>
>但是随着应用规模的逐渐增大，之前的架构模式无法再满足“快速响应”这一需求，主要受限于如下两个方面：
>
>- CPU 瓶颈：由于 VDOM 在进行差异比较时，采用的是递归的方式，JS 计算会消耗大量的时间，从而导致动画、还有一些需要实时更新的内容产生视觉上的卡顿
>
><img src="https://gitee.com/seplisa/img/raw/master/202407111530784.png" alt="image-20230223152638127" style="zoom:50%;" />
>
><img src="https://gitee.com/seplisa/img/raw/master/202407111530017.png" alt="image-20221227150133112" style="zoom: 30%;" />
>
>

>- I/O 瓶颈：由于各种基于“自变量”变化而产生的更新任务没有优先级的概念，因此在某些更新任务（例如文本框的输入）有稍微的延迟，对于用户来讲也是非常敏感的，会让用户产生卡顿的感觉。
>
>新的架构称之为 Fiber 架构：
>
><img src="https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2023-02-24-032509.png" alt="image-20230224112508425" style="zoom:50%;" />
>
><img src="https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2022-12-27-070226.png" alt="image-20221227150225918" style="zoom:30%;" />

>- Scheduler（调度器）：调度任务的优先级，高优先级任务会优先进入到 Reconciler
>- Reconciler（协调器）：VDOM 的实现，负责根据自变量变化计算出 UI 变化
>- Renderer（渲染器）：负责将 UI 变化渲染到宿主环境中
>
>首先引入了 Fiber 的概念，通过一个对象来描述一个 DOM 节点，但是和之前方案不同的地方在于，每个 Fiber 对象之间通过链表的方式来进行串联。通过 child 来指向子元素，通过 sibling 指向兄弟元素，通过 return 来指向父元素。
>
>在新架构中，Reconciler 中的更新流程从递归变为了“可中断的循环过程”。每次循环都会调用 shouldYield 判断当前的 TimeSlice 是否有剩余时间，没有剩余时间则暂停更新流程，将主线程还给渲染流水线，等待下一个宏任务再继续执行。这样就解决了 CPU 的瓶颈问题。
>
>另外在新架构中还引入了 Scheduler 调度器，用来调度任务的优先级，从而解决了 I/O 的瓶颈问题

# 渲染流程

>React 整体的渲染流程可以分为两大阶段，分别是 render 阶段和 commit 阶段。
>
>render 阶段里面会经由调度器和协调器处理，此过程是在内存中运行，是异步可中断的。
>
>commit 阶段会由渲染器进行处理，根据副作用进行 UI 的更新，此过程是同步不可中断的，否则会造成 UI 和数据显示不一致。
>
>**调度器**
>
>调度器的主要工作就是调度任务，让所有的任务有优先级的概念，这样的话紧急的任务可以优先执行。Scheduler 实际上在浏览器的 API 中是有原生实现的，这个 API 叫做 requestIdleCallback，但是由于兼容性问题，React 放弃了使用这个 API，而是自己实现了一套这样的机制，并且后期会把 Scheduler 这个包单独的进行发布，变成一个独立的包。这就意味 Scheduler 不仅仅是只能在 React 中使用，后面如果有其他的项目涉及到了任务调度的需求，都可以使用这个 Scheduler。
>
>**协调器**
>
>协调器是 Render 的第二阶段工作。该阶段会采用**深度优先的原则遍历并且创建一个一个的 FiberNode，并将其串联在一起，在遍历时分为了“递”与“归”两个阶段**，其中在“递”阶段会执行 beginWork 方法，该方法会根据传入的 FiberNode 创建下一级 FiberNode。而“归”阶段则会执行 CompleteWork 方法，做一些副作用的收集
>
>**渲染器**
>
>渲染器的工作主要就是将各种副作用（flags 表示）commit 到宿主环境的 UI 中。整个阶段可以分为三个子阶段，分别是 BeforeMutation 阶段、Mutation 阶段和 Layout 阶段
>
><img src="https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2023-02-23-101849.png" alt="image-20230223181848783" style="zoom:50%;" />

# fiber 以及 fiber 双缓冲

>fiber 可以从三个方面进行理解
>
>* fiber作为一种**架构**：在 react15 以及之前的版本中，reconciler 采用的是**递归**的方式，因此被称为 stack reconciler，到了 react16 之后，引入了 fiber，reconciler 也从 stack reconciler 变为了 fiber reconciler，各个 fiberNode 之间通过链表的形式串联起来了
>* fiber 作为一种**数据类型**：fiber 本质上也是一个对象，是之前虚拟 dom 对象的一种**升级版本**，每个 fiber 对象里面会包含 react 元素的类型，周围链接了 fiberNode，dom 相关信息
>* fiber 作为**动态的工作单元**：在每个 fiberNode 中，保存了本次更新该  react 元素**变化的数据**、**要执行的工作**（增、删、改、更新 ）以及副作用的信息
>
>* 父 fiberNode 的字段叫做 return 而不是 parent，是因为作为一个动态的工作单元，return 指代的是 fiberNode 执行完 completeWork 后返回的下一个 fiberNode，这里有一个返回的动作
>* 因此通过 return 来指代父 fiberNode
>* 所谓的 fiber 双缓冲树，有点类似于显卡的工作原理，有前缓冲区和后缓冲区
>  * 首先前缓冲区会显示图像
>  * 之后，合成的新的图像会被写入到后缓冲区，一旦后缓冲区写入图像完毕
>  * 前后缓冲区就会进行互换
>  * 双缓冲技术就是将数据保存在缓冲区再进行互换的技术
>* 而在 fiber 架构中，同时存在两棵 fiber tree，一棵是真实 UI 对应的 fiber tree（current fiber tree），类比为显卡中的前缓冲区，另一棵是在内存中构建的 fiber tree（wip fiber tree），可以类比为显卡的后缓冲区
>  * Wip Fiber Tree 在内存中完成更新，而 Current Fiber Tree 是最终要渲染的树，两颗树通过 alternate 指针相互指向
>  * 这样在下一次渲染的时候，直接复用 Wip Fiber Tree 作为下一次的渲染树，而上一次的渲染树又作为新的 Wip Fiber Tree
>  * 这样可以加快 DOM 节点的替换与更新

# Scheduler 选择 MessageChannel 调度任务

>* Scheduler 调度任务需要满足两个条件
>  * js 暂停，将主线程还给浏览器，让浏览器能够有序的重新渲染页面
>  * 暂停了的 js，需要下一次接着执行
>* 自然而然会想到事件循环，可以将还没有执行完的 js **放入到任务队列**（之前的宏任务概念），下一次事件循环的时候取出来执行
>* **react 使用 messageChannel 来产生宏任务**，本身是用于做消息通讯的
> * **setTimeout **
>   * **会延时（原子钟、操作系统实现、嵌套层级、空闲才执行）**，浪费了很多时间 4ms vs 16.66ms
> * requestAnimationFrame
>   * 每一帧渲染之前才能执行一次，包装成一个任务放入到任务队列中，没有到重新渲染的时间就可以一直从任务队列里面获取任务来执行
>   * 兼容性问题，不同浏览器对于 rAF 的实现时机不一样
> * 微任务
>   * **之所以不选择包装成一个微任务是和微任务的执行机制有关系**
>   * **微任务队列会在清空整个队列之后才会结束，那么微任务会在页面更新前一直执行，直到队列被清空，达不到把主线程还给浏览器的目的**
>* 任务队列有两个
>  * 一个是 taskQueue，存放普通任务
>  * 另外一个是 timerQueue，存放延时任务，到了时间放在 taskQueue
>  * 其中 shouldYiedToHost 字段决定了任务是否应该暂停归还主线程

# diff 算法



## diff 限制

* 只对**同级别**元素进行 diff，如果一个 dom 元素在前后两次更新中跨越了层级，那么react不会尝试复用它
* 两个不同类型的元素会产生不同的树，react 会进行删除重建，而不是继续比较
* 开发者可以通过 **key** 表示哪些**子元素**能够保持稳定

## diff 时机

* diff 计算**发生在**更新阶段，当第一次渲染完成后就会产生 fiber 树，再次渲染的时候，就会拿新的 jsx 对象（vdom）和旧的 fiberNode 节点进行一个**对比**，再决定**如何来产生新的 fiberNode**
* 它的**目标**是尽可能的复用已有的 fiber 节点

## diff 类型

* 在 react 中 整个 diff 分为**单节点 diff** 和**多节点 diff**

* 单节点是指新的节点为单一节点，但是旧节点的数量是不一定的

* 对于单节点 diff，他的流程大致如下

  * 首先先判断 key （默认为 null）是否相同
    * key 相同，判断 type 是否相同，相同就复用，不同就无法复用，并且**兄弟节点也一并标记为删除**
    * key 不同，不需要判断 type（标签），不能复用当前 fiberNode，如果有**兄弟节点还会去遍历兄弟节点**

* 对于多节点 diff，react 团队发现，在日常开发中，对节点的**更新操作**的情况多于**增删移动**，因此会进行两轮遍历

  * 第一轮遍历会从前往后遍历，**逐个复用节点**

    * 如果 key 和 type 都**相同**，可以复用

    <img src="https://gitee.com/seplisa/img/raw/master/202407111544716.png" alt="image-20230228112653938" style="zoom:50%;" />

    * **key 相同但是 type** 不同，会根据 reactElement（jsx 对象）生成一个全新的 fiber，旧的 fiber 被放入到 **deletions 数组**里面，之后统一删除

    <img src="https://gitee.com/seplisa/img/raw/master/202407111544764.png" alt="image-20230228155011306" style="zoom:50%;" />

    * key 不同或者到末尾了，结束遍历

    <img src="https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2023-02-28-075345.png" alt="image-20230228155345381" style="zoom:50%;" />

    <img src="https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2023-02-28-075725.png" alt="image-20230228155725123" style="zoom:50%;" />

  * 第二轮遍历，**处理上一轮遍历中没有处理完的节点**

    * 只剩下旧子节点，将旧子节点添加到 **deletions 数组**里面直接删除掉
    * 只剩下新的 jsx 元素，根据 reactElement 元素来创建 fiberNode节点
    * 都有剩余，会将剩余的 fiberNode节点放在一个 map 里面，遍历剩余的新的 jsx 元素，从 map 中寻找能够复用的 fiberNode 节点，如果能够找到，就进行复用；如果没有找到，就新增。如果 jsx 元素遍历完了，map 结构中还有剩余的 fiber 节点，就将其放在 **deletions 数组**里面，之后统一删除

## 为什么不选择双端 diff

* 双端对比，指的是在新旧子节点数组中，各使用两个指针指向头尾的节点，在遍历的过程中，头尾两个指针同时向中间靠拢，每遍历到一个节点，就进行双端比较：四次比较

* vue 是使用双端 diff，而 react 并没有选择这种方式
* 因为双端 diff 需要向前查找节点，但是每个 fiberNode 节点上都没有反向指针，前一个 fiberNode 通过 sibling 属性指向后一个 fiberNode，只能从前往后，不能反过来，因此不能使用双端搜索进行优化
* react 想看看这种方式能够走多远，不理想的话之后考虑双端 diff，暂时不做优化

# lane 模型

* 在 react 中有一套独立的**粒度更细**的优先级算法，叫做 lane 模型
* 而 scheduler 是独立发布的，他和 react 的优先级并不互通，**react** 有四种优先级，不同的交互对应的事件回调的 update 优先级不同，而 **scheduler** 有五种
* 每一个事件对应的优先级就是一个 lane，两者需要相互转换
* 早期的 react 并没有使用 lane 模型，而是采用的基于 **expirationTime** 模型的算法，但是这种算法耦合了“优先级”和“批”（默认划分了批）这两个概念，限制了模型的表达能力
* 优先级算法的本质是“为 update 排序”，但 expirationTime 模型在完成排序的同时还默认的划定了“批”，使用 lane 模型就不存在这个问题，因为是基于位运算，在批的划分上会更加灵活
* 他是基于位运算的算法，每一个 lane 是一个 32 位整数，不同的优先级对应了不同的 lane，越低的位代表越高的优先级

# 事件处理

## 事件系统

>* 在 react 中，有一套自己的事件系统，如果说 react 用 fiberTree 这个数据结构来描述 UI 的话，那么事件系统则是基于 fiberTree 来描述和 UI 之间的**交互**
>* 对于 reactdom 宿主环境，这套事件系统由两个部分组成
>  * **合成事件对象**：它是对浏览器原生事件对象的一层封装，兼容主流浏览器，同时拥有与浏览器原生事件相同的 api（stopPropagation、preventDefault）
>    * 存在的目的是为了消除不同浏览器在事件对象之间的差异
>  * 模拟实现**事件传播机制**
>    * 利用事件委托的原理，react 基于 fiberTree 实现了事件的捕获、目标、冒泡的过程，并且加入了很多新的特性
>      * 不同事件对应不同的优先级
>      * 定制事件名（统一采用“onXXX”）的驼峰写法
>      * 定制事件行为（onChange 的默认行为与原生 oninput 相同）

## 事件

>* this 绑定
>
>  * 默认是 undefined
>    * 在正常的 dom 操作中，监听点击，this 是节点对象
>    * react 中所编写的 buttom 只是一个语法糖，本质是 react 的 element 对象，并不是直接渲染成真实的 dom
>    * 发生监听的时候，react 在执行函数时没有绑定 this，默认情况就是一个 undefined
>
>  * 怎么做
>    * 可以在 constructor 中对需要绑定的方法提前绑定
>      * onClick
>        * onClick = {this.btnClick.bind(this)}
>        * onClick = {()=>this.btnClick()}

# **Hooks 原理**



* hook 是一个对象，一个组件中的 hook 会以链表的形式串起来，fiberNode 的 memoizedState 中保存了 hooks 链表中的第一个 hook，而 hook 也有一个 memoizedState 属性，不同类型的 hook 的 memoizedState 中保存了不同的值

~~~js
const hook = {
memoizedState: null,
baseState: null,
baseQueue: null,
queue: null,
next: null
}
~~~

* 在 react 中有三种类型的 dispatcher（针对 Hook 有三种策略）：HooksDispatcher**OnMount** 负责初始化工作，让函数组件的一切初始化信息挂载到 fiber 上面；HooksDispatcher**OnUpdate** 获取或者更新维护这些 fiber 上的信息；**ContextOnlyDispatcher** 和报错相关，防止开发者在函数组件外部调用 hook
* hook 通常写在顶部，不能写在条件或者循环语句里面
  * 因为更新的过程中，会复用之前的 hook，如果通过 if 条件增加或者删除了 hook，那么在复用的时候，就会产生当前 hook 的顺序和之前 hook 的顺序不一致的问题
