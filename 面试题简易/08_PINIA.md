# 优点

## 出现背景

>* Pinia 最初是为了探索 Vuex 的下一次迭代会是什么样子，结合了 Vuex 5 核心团队讨论中的许多想法
>* 最终，团队意识到 Pinia 已经实现了 **Vuex5** 中大部分内容，所以最终决定用 Pinia 来替代 Vuex
>* 与 Vuex 相比，Pinia 提供了一个更简单的 API，具有更少的仪式，提供了 Composition-API 风格的 API
>* 最重要的是，在与 TypeScript 一起使用时具有可靠的类型推断支持
>  * vuex 和 ts 结合结合真的很难用

## 优点

>* mutation 不再存在，只有 **state，getters，actions**
>* actions 中支持**同步和异步**修改 state 状态
>* 可以和 **ts** 一起使用
>* 不再有**modules的嵌套结构**，每一个仓库都是独立的扁平化的存在
>* 支持插件扩展，通过插件来扩展仓库的功能
>* 更加轻量，压缩之后体积只有 1kb 作用