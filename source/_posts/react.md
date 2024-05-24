---
title: react笔记
date: 2023-12-2 12:24:4
categories:
- react
tags:
- react
---
# ------------------------------------

# [react官网笔记：](https://zh-hans.react.dev/learn/you-might-not-need-an-effect)

# react核心价值

组件化 + 数据驱动视图
UI = f( state )

# react快照state

state就像每次渲染的快照，并且不会同步更新，react中当state状态变化时，当前快照中是获取不到更新后的内容和状态的（因为react由于优化需要集中多个进行更新），此时想要操作快照更新之后的操作只能在快照更新之后添加钩子函数。

- 使用useEffect（快照更新之后自动执行钩子）
- 类组件可以使用生命周期钩子
- 使用条件渲染，根据条件进行不同的处理

# 组件透层级传递状态

使用React的Context功能，Context 让父组件可以为它下面的整个组件树提供数据，实现原理是通过发布订阅模式。

1. 使用react中createContext方法，创建一个context状态，传入状态初始值
2. 通过react的useContent方法，传入context名称进行状态的消费。
3. 前提是需要在需要使用到的标签外部包裹创建的context组件.Provider<ContextName.Provider value={}></ContextName.Provider>
4. 这将导致在组件内部消费状态时，根据Provider的嵌套层级，使用最近的Provider的context内容。

# react状态管理

### 局部状态管理

react提供了两种状态管理的hooks，useState和useReducer，两者使用场景为：简单的业务可以使用useState钩子完成即可，但是如果业务中状态繁琐，频繁使用useState就会导致太多状态难以阅读理解，表现和业务耦合在一起，这时使用useReducer更好。

### 全局状态管理

react中已经有了useState和useReducer两种状态管理方式，那为什么还要使用redux呢？其实只是用useState和useReuder只能实现局部的状态管理，redux解决了：

- 全局状态管理（多个组件共享状态）
- 状态的可预测性（使得状态的变化更加清晰和易于追踪）
- 结构化组织代码，提高可维护性

## redux对比useReducer+Context

- 使用useReducer加上Context就可以实现一个简易的状态管理仓库了，可以使得子组件之间共享状态
- 但是redux的好处在于可以集中管理状态，便于追踪
- 此外redux插件可以帮助调试，redux的分包管理使得逻辑更加清晰

# useRef

useRef返回一个普通的javascript对象，它和state一样，react会在每次渲染之间保留ref，但是设置state会重新渲染组件，更改ref不会。

当一条信息用于渲染时，将他保存在state中，当一条信息用于仅仅被事件处理器需要，并且不参与渲染时，使用ref更加高效。

### ref和state差异

**useRef是由useState函数进一步封装得到（只使用状态，不使用方法更新视图）：**

```js
function useRef(initialValue) {
  const [ref, unused] = useState({ current: initialValue });
  return ref;
}
```

大多数情况下，建议使用 state。ref 是一种“脱围机制”，并不会经常用到它。 以下是 state 和 ref 的对比：

| ref                                                     | state                                                        |
| ------------------------------------------------------- | ------------------------------------------------------------ |
| `useRef(initialValue)`返回 `{ current: initialValue }`  | `useState(initialValue)` 返回 state 变量的当前值和一个 state 设置函数 ( `[value, setValue]`) |
| 更改时不会触发重新渲染                                  | 更改时触发重新渲染。                                         |
| 可变 —— 你可以在渲染过程之外修改和更新 `current` 的值。 | “不可变” —— 你必须使用 state 设置函数来修改 state 变量，从而排队重新渲染。 |
| 你不应在渲染期间读取（或写入） `current` 值。           | 你可以随时读取 state。但是，每次渲染都有自己不变的 state [快照](https://zh-hans.react.dev/learn/state-as-a-snapshot)。 |

**注意：ref设值（同步）不同于state快照型设值（不同步）。**

### ref和DOM

ref 最常见的用法是访问 DOM 元素。比如 `<div ref={myRef}>`，React 会将相应的 DOM 元素放入 `myRef.current` 中。当元素从 DOM 中删除时，React 会将 `myRef.current` 更新为 `null`。

`useRef` Hook 返回一个对象，该对象有一个名为 `current` 的属性。最初，`myRef.current` 是 `null`。当 React 为这个 `<div>` 创建一个 DOM 节点时，React 会把对该节点的引用放入 `myRef.current`。然后，你可以从 [事件处理器](https://zh-hans.react.dev/learn/responding-to-events) 访问此 DOM 节点，并使用在其上定义的内置[浏览器 API](https://developer.mozilla.org/docs/Web/API/Element)。

useRef返回的ref.current中有一个remove方法，该方法执行后会将ref值为null，这样以便于ref能够被垃圾回收机制进行回收。

**注意：ref只能使用浏览器自带的DOM元素上，而不能直接用在组件上（可以在组件内传递一下使用）。**

# forwardRef

用于将一个组件的 `ref` 转发到该组件的子组件中。这在使用类组件或需要访问子组件的DOM元素时非常有用，尤其是当子组件是一个函数组件或类组件，且你希望保留对该子组件的引用时。

# useImperativeHandle

`useImperativeHandle` 是React的一个钩子，它与 `forwardRef` 一起使用，用于在使用refs的场景中为组件提供一个**可自定义的行为。**当你想要在子组件中暴露给父组件一些方法或属性时，`useImperativeHandle` 就非常有用。

两者可以结合使用（使用forwardRef转发ref，使用useImperativeHandle设置DOM元素方法）：

```js
const InputComponent = React.forwardRef((props, ref) => {
  useImperativeHandle(ref, () => ({
    focus: () => inputRef.current.focus()
  }));
  return <input ref={inputRef} {...props} />;
});
```

# Effect同步

### React中两种逻辑类型

- **渲染逻辑代码**，**位于组件的顶层**，在此处接受props和state，并对他们进行转换，最终返回想在屏幕上看到的JSX，渲染的代码必须是纯粹的，它只应该“计算”结果，而不做其他任何事情。
- **事件处理程序**，**是嵌套在组件内部的函数**，而不仅仅是计算函数。事件处理程序可能会更新输入字段、提交 HTTP POST 请求以购买产品，或者将用户导航到另一个屏幕。事件处理程序包含由特定用户操作（例如按钮点击或键入）引起的“副作用”（它们改变了程序的状态）。

### Effect作用

Effect允许指定由渲染本身而不是特定事件引起的副作用。（利用无论是哪种交互导致组件执行渲染，effect都会在屏幕更新后的提交阶段执行）

### 使用注意

- **不要随意在你的组件中使用 Effect**。记住，Effect 通常用于暂时“跳出” React 代码并与一些 **外部** 系统进行同步。这包括浏览器 API、第三方小部件，以及网络等等。如果你想用 Effect 仅根据其他状态调整某些状态，那么 [你可能不需要 Effect](https://zh-hans.react.dev/learn/you-might-not-need-an-effect)。

- Effect会在每次渲染之后执行，如下代码会造成死循环：

  ```
  const [count,setCount] = useState();
  useEffect(()=>{
  	setCount(count++);
  })
  ```

- useEffect第二个参数不传代表**每次渲染组件后都执行一次**，传空数组代表**只会在第一次挂载后执行**，传依赖项代表在**依赖项变化时执行。**
- useEffect依赖项中传入ref通常是无效的，因为ref相当于不使用渲染赋值的state状态，传递过去的ref引用始终相同（不随着快照的渲染而变化）。
- 某些逻辑不能放在effect中执行，因为effect的执行是和组件渲染强绑定的（例如不能在effect中写购买商品的逻辑，这样会导致组件以任何方式被渲染都会执行购买逻辑，这样是不对的）
- effect中return的函数会在下一次effect执行前被执行，常用于执行清理函数（清除定时器等）

### 摘要

- 与事件不同，Effect 是由渲染本身，而非特定交互引起的。
- Effect 允许你将组件与某些外部系统（第三方 API、网络等）同步。
- 默认情况下，Effect 在每次渲染（包括初始渲染）后运行。
- 如果 React 的所有依赖项都与上次渲染时的值相同，则将跳过本次 Effect。
- 不能随意选择依赖项，它们是由 Effect 内部的代码决定的。
- 空的依赖数组（`[]`）对应于组件“挂载”，即添加到屏幕上。
- 仅在严格模式下的开发环境中，React 会挂载两次组件，以对 Effect 进行压力测试。
- 如果 Effect 因为重新挂载而中断，那么需要实现一个清理函数。
- React 将在下次 Effect 运行之前以及卸载期间这两个时候调用清理函数

# Effect生命周期

react组件的生命周期：

- 添加到屏幕（挂载）
- 组件接收新的props或state（更新）
- 从屏幕移除（卸载）

# effect依赖项

- effect中的依赖项只能传入响应性的变量（组件props也是响应性的）
- 组件props也是响应性的，类组件props变化会触发钩子重新执行，函数式组件props变化会重新执行
- 组件内声明的变量可以是响应性的，每次会重新声明。
- effect依赖项不能传入ref.current，ref.current本身不是响应性的，不会引起视图更新（ref.current允许跟踪某些值而不触发重新渲染）
- effect依赖项不能传入组件内定义的对象或者函数（由于每次定义都会改变）
- effect依赖项不能传入可变值（包括全局变量），它不是响应性的。

# 自定义Hook

- use开头
- 代码检查工具会强制use命名公约，只有Hook和组件可以调用其他Hook
- 没有调用Hook的函数不需要变成Hook（或以use开头）
- 自定义Hook共享的是状态逻辑，而不是状态本身，对Hook的每一个调用完全独立于对同一个Hook的其他调用。
- 当需要在多个组件之间共享state本身时，需要将变量提升并传递下去。



#   ------------------------------------

# 

# [react项目学习]()

# 

# redux状态管理工具：

### 设计思想

将store实例进行订阅，则当store实例通过dispatch进行发布时，就触发订阅函数的执行。

```react
  // 1. 定义reducer函数 
  // 作用: 根据不同的action对象，返回不同的新的state
  // state: 管理的数据初始状态
  // action: 对象 type 标记当前想要做什么样的修改
  function reducer (state = { count: 0 }, action) {
    // 数据不可变：基于原始状态生成一个新的状态
    if (action.type === 'INCREMENT') {
      return { count: state.count + 1 }
    }
    if (action.type === 'DECREMENT') {
      return { count: state.count - 1 }
    }
    return state
  }

  // 2. 使用reducer函数生成store实例
  const store = Redux.createStore(reducer)

  // 3. 通过store实例的subscribe订阅数据变化
  // 回调函数可以在每次state发生变化的时候自动执行
  store.subscribe(() => {
    console.log('state变化了', store.getState())
    document.getElementById('count').innerText = store.getState().count
  })

  // 4. 通过store实例的dispatch函数提交action更改状态 
  const inBtn = document.getElementById('increment')
  inBtn.addEventListener('click', () => {
    // 增
    store.dispatch({
      type: 'INCREMENT'
    })
  })

  const dBtn = document.getElementById('decrement')
  dBtn.addEventListener('click', () => {
    // 减
    store.dispatch({
      type: 'DECREMENT'
    })
  })
  // 5. 通过store实例的getState方法获取最新状态更新到视图中
```

# react中css使用

### 出现问题

react组件中使用样式时，需要引入对应的css文件，但是如果两个css文件中有相同的class命名，这时就会造成样式冲突（相互影响）。

### 解决方案

**CSS Module**

- 每个CSS文件都当作单独的模块，命名xxx.module.css
- 引入时：`import styles from 'xxx.module.css'`
- 使用时：`className = {styles['test-style']}`
- 这样使用后组件中对应的class就会被命名为组件名称和样式名称的拼接

create-react-app中内置了CSS Module功能，直接使用即可。

### 使用sass

create-react-app中内置了cass语法的支持，安装sass直接使用即可

## CSS-in-JS

##### 介绍

- css-in-js是一种解决方案，包含很多工具
- 在JS中书写CSS，带来极大的灵活性
- 它和内联的style完全不同，也不会有内联style的问题

##### 工具

- styled-components
- styled-js（ts支持不友好）
- emotion

##### 优缺点

- 优点：使用js书写，有逻辑有变量，非常灵活
- 缺点：JSX和样式代码混在一起，代码较多，增加了编译成本
- 使用场景：需要灵活变换样式

# 路由

### 背景

- Web系统需要多个页面
- 多页面就需要用路由来管理
- PS：业务上的页面，技术上还是react组件

### 使用

- 路由设计：网址和页面之间的关系
- 增加页面和Layout模板
- 使用`react-router`增加路由配置

浏览器端使用`react-router-dom`工具，其中包含：

- Outlet组件（父组件中嵌入子组件路由）
- Link组件（用于路由跳转）
- useNavigate钩子函数（用于路由跳转）
- useSearchParams钩子函数（用于获取路由参数）
- useLocation钩子函数（用于获取当前路由的信息）



