---
title: react技术揭秘
tags: react,react源码
categories: react
date: 2024-01-29 00:26:56
---

# React 理念

### react 理念

> React 被设计用于 JavaScript 构建快速响应的大型 Web 应用程序。
>
> 由此可见，`快速响应`是 react 框架的关键

### 难点限制

需要解决快速响应的难点就要解决以下两种限制：

- CPU 的瓶颈

  遇到大量计算操作时，页面掉帧导致卡顿

  - ```jsx
    function App() {
      const len = 3000;
      return (
          <ul>
          	{
    new Map(len).fill(0).map((item, index) => <li>index</li>);
              }
          </ul>
      )
    }
    ```

  - 这样当页面执行 js 代码时，由于渲染线程和 js 脚本执行互斥，所以页面迟迟没有渲染，造成卡顿

  - 解决方案：

    - 在浏览器每一帧的时间中，预留一些时间给 JS 线程，React 利用这部分时间更新组件（预留的初始时间是 5ms）。

    - 预留的时间不够用时，react 将线程控制权交还给浏览器，使其有时间渲染 UI 界面。

    - > 这种将长任务拆分到每一帧中，每次执行一小段任务的操作成为时间切片

    - ```jsx
      // 通过使用ReactDOM.unstable_createRoot开启Concurrent Mode,启用时间切片
      // ReactDOM.render(<App/>, rootEl);
      ReactDOM.unstable_createRoot(rootEl).render(<App />);
      ```

    - > 解决 CPU 瓶颈的关键在于实现时间切片，而时间切片的关键是：`将同步的更新变为可中断的异步更新`。

- IO 的瓶颈

  发送网络请求后，需要等待数据返回才能进一步操作

  - 网络延迟是无法解决的，如何在网络延迟客观存在的情况下，减少用于对网络延迟的感知？

  - 如果请求数据和显示页面并行执行，就会造成页面的卡顿，而一旦先显示页面，后面请求数据再更新就会流畅很多。

  - > react 采用的方案是：将界面 UI 的同步更新变为可中断的异步更新

# React15 架构

React15 的架构分为协调器和渲染器

### 协调器

- Reconciler 协调器负责找出变化的组件。
- React 中通过`this.setState`、`this.forceUpdate`和`ReactDOM.render`等 API 进行更新。每当有更新发生，协调器就会做如下工作：
  - 调用函数组件或者类组件的`render`方法，将返回的 JSX 转化为虚拟 DOM
  - 将虚拟 DOM 和上次更新时的虚拟 DOM 比对
  - 通过比对找出本次更新中变化的虚拟 DOM
  - 通知渲染器将比那花的虚拟 DOM 渲染到页面上

### 渲染器

- React 支持跨平台，所以不同平台有不同的 Renderer 渲染器，浏览器环境是`ReactDOM`
- Renderer 渲染器负责将变化的组件渲染到页面上

### 缺点

- mount 的组件会同步递归更新子组件，造成 UI 卡顿。

  > 在协调器 Reconciler 中，mount 的组件会调用 mountComponent，update 的组件会调用 updateComponent 方法，这两个方法都会递归更新子组件，而递归更新子组件是非常消耗性能的。

- 同步更新 UI 视图，界面卡顿

  > 视图同步更新，并且 React15 不会中断进行中的更新

# React16 架构

React16 架构可以分为三层：

- Scheduler 调度器：负责调度任务的优先级，高优先级的任务先进入 Reconciler 进行协调
- Reconciler 协调器：找出变化的组件
- Renderer 渲染器：将变化的组件渲染到页面上

React16 架构相比 React15 添加了 Scheduler 调度器

### 调度器

- 首先以浏览器是否有剩余时间作为任务终端的标准，那么就需要一种机制，当浏览器有剩余时间时通知我们。可以使用`requestIdleCallback`这个 API，但是因为下面的原因被弃用了：

  - 浏览器兼容性（跨平台所不能容忍的）
  - 触发频率不稳定，会受很多因素影响

- Scueduler 调度器库由此诞生，并且独立于 React

### 协调器

- > React15 中的 Reconciler 协调器是同步递归处理虚拟 DOM 的，这样会造成 UI 视图层的卡顿。在 React16 中将更新工作从递归变成了可以中断的循环过程，每次循环都会调用`shouldYield`判断当前是否有剩余时间

- React16 解决中断更新时，DOM 渲染不完全的问题

  > React16 中，调度器和协调器不再是交替工作，当调度器将任务交给协调器之后，协调器会为变化的虚拟 DOM 打上增/删/改 的标记
  >
  > 整个工作都在内存中进行，只有当所有组件都完成协调的工作，才会统一交给渲染器进行渲染。

### 渲染器

Renderer 渲染器根据 Reconciler 为虚拟 DOM 打的标记，同步执行对应的 DOM 操作。

### 流程

- 例如：点击 button 按钮，触发更新
- 调度器受到更新，判断是否有凄然优先级更高的任务需要执行，如果没有就将组件状态改变，交给协调器
- 协调器接收到更新，将变化的虚拟 DOM 打上标记，交给渲染器
- 渲染器对打标记的 DOM 元素执行对应的操作

**中间两个任务（调度器和协调器）随时都可能由于以下原因被中断：**

- 有其他更高优先级的任务需要执行

- 当前帧没有剩余时间

  > 由于调度器和协调器的工作都在内存中进行，不会更新到页面上，所以即使反复中断，对用户来说也无感

# Fiber 架构心智模型

### 代数效应

- 代数效应是函数式编程中的概念，用于`将副作用和函数相分离`。
- 代数效应能够将副作用从函数逻辑中分离，使函数关注点保持纯粹
- 代数效应最明显的应用就是 Hooks
- 代数效应和 Fiber 架构：
  - Fiber（纤程）和 Generator（协程）可以理解为代数效应思想在 JS 中的体现。

### Fiber

- React Fiber 可以理解为：
- React 内部实现了一套状态更新机制，支持任务的不同优先级，可以中断和恢复，并且恢复后可以复用之前的中间状态。
- 其中每个任务更新单元就是 React Element 对应的 Fiber 节点。

# Fiber 原理

### 原因

- 在 React15 及以前，协调器采用递归的方式创建虚拟 DOM，递归过程是不能中断的，如果组件树嵌套很深就会占用线程很多时间，造成 UI 卡顿。
- React16 将递归的无法中断的更新重构为异步的可中断更新，由于曾经用于递归虚拟 DOM 数据结构无法满足需要了，就有了全新的 Fiber 架构。

### 概念

- React16 之后，虚拟 DOM 在 React 中有个正式的称呼：Fiber
- Fiber 包含三层含义：
  - Fiber 架构，React16 的 Reconciler 协调器基于 Fiber 节点实现，被称为 Fiber Reconciler
  - Fiber 数据结构，作为静态的数据结构，每一个 Fiber 节点对应一个 React 组件，保存了该组件的类型、对应的 DOM 节点等信息
  - Fiber 动态工作单元，每一个 Fiber 节点保存了本次更新中该组件改变的状态和要执行的工作
- Fiber 节点对应 DOM 节点、Fiber 节点构成的 Fiber 树对应 DOM 树。
  - 组件`mount`时，`Reconciler协调器`根据 JSX 描述的组件内容生成组件对应的`Fiber节点`。
  - 组件`update`时，`Reconciler协调器`将`JSX`与`Fiber节点`保存的数据对比（diff 算法），生成组件对应的`Fiber节点`，并根据对比结果为`Fiber节点`打上`标记`。

### 原理

- 双缓存
  - 在内存中构建并直接替换的技术叫双缓存，目的是不会出现白屏闪烁情况。
  - `React`使用“双缓存”来完成`Fiber树`的构建与替换——对应着`DOM树`的创建与更新
  - 在`React`中最多会同时存在两棵`Fiber树`。当前屏幕上显示内容对应的`Fiber树`称为`current Fiber树`，正在内存中构建的`Fiber树`称为`workInProgress Fiber树`。

# diff 算法

由于`Diff`操作本身也会带来性能损耗，React 文档中提到，即使在最前沿的算法中，将前后两棵树完全比对的算法的复杂程度为 O(n 3 )，其中`n`是树中元素的数量。

如果在`React`中使用了该算法，那么展示 1000 个元素所需要执行的计算量将在十亿的量级范围。这个开销实在是太过高昂。

为了降低算法复杂度，`React`的`diff`会预设三个限制：

- 只对同级元素进行`Diff`。如果一个`DOM节点`在前后两次更新中跨越了层级，那么`React`不会尝试复用他。

- 两个不同类型的元素会产生出不同的树。如果元素由`div`变为`p`，React 会销毁`div`及其子孙节点，并新建`p`及其子孙节点。

- 开发者可以通过 `key prop`来暗示哪些子元素在不同的渲染下能保持稳定。考虑如下例子：

### 单节点 diff

![](/images/Snipaste_2024-07-01_07-44-22.jpg)

- 当`key相同`且`type不同`时，代表我们已经找到本次更新的`p`对应的上次的`fiber`，但是`p`与`li` `type`不同，不能复用。既然唯一的可能性已经不能复用，则剩下的`fiber`都没有机会了，所以都需要标记删除。
- 当`key不同`时只代表遍历到的该`fiber`不能被`p`复用，后面还有兄弟`fiber`还没有遍历到。所以仅仅标记该`fiber`删除。

### 多节点 diff

`Diff算法`的整体逻辑会经历两轮遍历：（对 Children 和 Fiber 进行遍历）

- 第一轮遍历：处理`更新`的节点。

  - 如果 DOM 节点可以复用，比较下一个节点
  - 不可复用分两种情况
    - `key`不同导致不可复用，立即跳出整个遍历，**第一轮遍历结束。**
    - `key`相同`type`不同导致不可复用，会将`oldFiber`标记为`DELETION`，并继续遍历
  - 遍历完，跳出第一轮遍历。

- 第二轮遍历：处理剩下的不属于`更新`的节点，需要对第一轮遍历的结果分别讨论：

  - `newChildren`与`oldFiber`同时遍历完

    那就是最理想的情况：只需在第一轮遍历进行组件[`更新`](https://github.com/facebook/react/blob/1fb18e22ae66fdb1dc127347e169e73948778e5a/packages/react-reconciler/src/ReactChildFiber.new.js#L825)。此时`Diff`结束。

  - [#](https://react.iamkasong.com/diff/multi.html#newchildren没遍历完，oldfiber遍历完)`newChildren`没遍历完，`oldFiber`遍历完

    已有的`DOM节点`都复用了，这时还有新加入的节点，意味着本次更新有新节点插入，我们只需要遍历剩下的`newChildren`为生成的`workInProgress fiber`依次标记`Placement`。

  - [#](https://react.iamkasong.com/diff/multi.html#newchildren遍历完，oldfiber没遍历完)`newChildren`遍历完，`oldFiber`没遍历完

    意味着本次更新比之前的节点数量少，有节点被删除了。所以需要遍历剩下的`oldFiber`，依次标记`Deletion`。

  - [#](https://react.iamkasong.com/diff/multi.html#newchildren与oldfiber都没遍历完)`newChildren`与`oldFiber`都没遍历完

    这意味着有节点在这次更新中改变了位置。接下来需要处理移动的节点并标记节点的移动进行处理。

  ##

# 实现 useState

```js
let workInProgressHook;
let isMount = true;
const fiber = {
  memoizedState: null,
  stateNode: App,
};
function schedule() {
  workInProgressHook = fiber.memoizedState;
  const app = fiber.stateNode();
  isMount = false;
  return app;
}
function dispatchAction(queue, action) {
  const update = {
    action,
    next: null,
  };
  if (queue.pending === null) {
    update.next = update;
  } else {
    update.next = queue.pending.next;
    queue.pending.next = update;
  }
  queue.pending = update;
  schedule();
}
function useState(initialState) {
  let hook;
  if (isMount) {
    hook = {
      queue: {
        pending: null,
      },
      memoizedState: initialState,
      next: null,
    };
    if (!fiber.memoizedState) {
      fiber.memoizedState = hook;
    } else {
      workInProgressHook.next = hook;
    }
    workInProgressHook = hook;
  } else {
    hook = workInProgressHook;
    workInProgressHook = workInProgressHook.next;
  }
  let baseState = hook.memoizedState;
  if (hook.queue.pending) {
    let firstUpdate = hook.queue.pending.next;
    do {
      const action = firstUpdate.action;
      baseState = action(baseState);
      firstUpdate = firstUpdate.next;
    } while (firstUpdate !== hook.queue.pending);
    hook.queue.pending = null;
  }
  hook.memoizedState = baseState;
  return [baseState, dispatchAction.bind(null, hook.queue)];
}
function App() {
  const [num, updateNum] = useState(0);
  console.log(`${isMount ? "mount" : "update"} num: `, num);
  return {
    click() {
      updateNum((num) => num + 1);
    },
  };
}
window.app = schedule();
```

[React 技术揭秘](https://react.iamkasong.com/process/fiber.html#fiber%E7%9A%84%E7%BB%93%E6%9E%84)
