# 为什么要有 redux

>* React 是在**视图层**帮助解决了 **DOM** 的渲染过程，但是 **State** 依然是留给自己来管理：
>  * 无论是组件定义自己的 state，还是组件之间的通信通过 props 进行传递；也包括通过 Context 进行数据之间的共享
>  * React 主要负责帮助管理视图，state 如何维护最终还是自己来决定
>* **Redux 就是一个帮助管理 State 的容器：Redux 是 JavaScrip 的状态容器，提供了可预测的状态管理**
>
>* Redux 除了和 React 一起使用之外，它也可以和**其他界面库**一起来使用

# 核心理念

>* state
>* action
>* reducer
>  * **reducer 将 state 和 action 联系在一起**
>    * reducer 是**一个纯函数**
>    * reducer 做的事情就是将传入的 **state 和 action** 结合起来生成一个新的 state

# 三大原则

>* **单一数据源**
>* **State 是只读的**，唯一修改 State 的方法一定是触发 action
>* **使用纯函数来执行修改**，通过 reducer 将 **旧 state 和 actions** 联系在一起，并且返回一个新的 State