---
title: react笔记
date: 2023-12-2 12:24:4
categories:
  - react
tags:
  - react
---

# ------------------------------------

# [react 官网笔记：](https://zh-hans.react.dev/learn/you-might-not-need-an-effect)

# react 核心价值

组件化 + 数据驱动视图
UI = f( state )

# react 快照 state

state 就像每次渲染的快照，并且不会同步更新，react 中当 state 状态变化时，当前快照中是获取不到更新后的内容和状态的（因为 react 由于优化需要集中多个进行更新），此时想要操作快照更新之后的操作只能在快照更新之后添加钩子函数。

- 使用 useEffect（快照更新之后自动执行钩子）
- 类组件可以使用生命周期钩子
- 使用条件渲染，根据条件进行不同的处理

# 组件透层级传递状态

使用 React 的 Context 功能，Context 让父组件可以为它下面的整个组件树提供数据，实现原理是通过发布订阅模式。

1. 使用 react 中 createContext 方法，创建一个 context 状态，传入状态初始值
2. 通过 react 的 useContent 方法，传入 context 名称进行状态的消费。
3. 前提是需要在需要使用到的标签外部包裹创建的 context 组件.Provider<ContextName.Provider value={}></ContextName.Provider>
4. 这将导致在组件内部消费状态时，根据 Provider 的嵌套层级，使用最近的 Provider 的 context 内容。

# react 状态管理

### 局部状态管理

react 提供了两种状态管理的 hooks，useState 和 useReducer，两者使用场景为：简单的业务可以使用 useState 钩子完成即可，但是如果业务中状态繁琐，频繁使用 useState 就会导致太多状态难以阅读理解，表现和业务耦合在一起，这时使用 useReducer 更好。

### 全局状态管理

react 中已经有了 useState 和 useReducer 两种状态管理方式，那为什么还要使用 redux 呢？其实只是用 useState 和 useReuder 只能实现局部的状态管理，redux 解决了：

- 全局状态管理（多个组件共享状态）
- 状态的可预测性（使得状态的变化更加清晰和易于追踪）
- 结构化组织代码，提高可维护性

## redux 对比 useReducer+Context

- 使用 useReducer 加上 Context 就可以实现一个简易的状态管理仓库了，可以使得子组件之间共享状态
- 但是 redux 的好处在于可以集中管理状态，便于追踪
- 此外 redux 插件可以帮助调试，redux 的分包管理使得逻辑更加清晰

# useRef

useRef 返回一个普通的 javascript 对象，它和 state 一样，react 会在每次渲染之间保留 ref，但是设置 state 会重新渲染组件，更改 ref 不会。

当一条信息用于渲染时，将他保存在 state 中，当一条信息用于仅仅被事件处理器需要，并且不参与渲染时，使用 ref 更加高效。

### ref 和 state 差异

**useRef 是由 useState 函数进一步封装得到（只使用状态，不使用方法更新视图）：**

```javascript
function useRef(initialValue) {
  const [ref, unused] = useState({ current: initialValue });
  return ref;
}
```

大多数情况下，建议使用 state。ref 是一种“脱围机制”，并不会经常用到它。 以下是 state 和 ref 的对比：

| ref                                                     | state                                                                                                                  |
| ------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| `useRef(initialValue)`返回 `{ current: initialValue }`  | `useState(initialValue)` 返回 state 变量的当前值和一个 state 设置函数 ( `[value, setValue]`)                           |
| 更改时不会触发重新渲染                                  | 更改时触发重新渲染。                                                                                                   |
| 可变 —— 你可以在渲染过程之外修改和更新 `current` 的值。 | “不可变” —— 你必须使用 state 设置函数来修改 state 变量，从而排队重新渲染。                                             |
| 你不应在渲染期间读取（或写入） `current` 值。           | 你可以随时读取 state。但是，每次渲染都有自己不变的 state [快照](https://zh-hans.react.dev/learn/state-as-a-snapshot)。 |

**注意：ref 设值（同步）不同于 state 快照型设值（不同步）。**

### ref 和 DOM

ref 最常见的用法是访问 DOM 元素。比如 `<div ref={myRef}>`，React 会将相应的 DOM 元素放入 `myRef.current` 中。当元素从 DOM 中删除时，React 会将 `myRef.current` 更新为 `null`。

`useRef` Hook 返回一个对象，该对象有一个名为 `current` 的属性。最初，`myRef.current` 是 `null`。当 React 为这个 `<div>` 创建一个 DOM 节点时，React 会把对该节点的引用放入 `myRef.current`。然后，你可以从 [事件处理器](https://zh-hans.react.dev/learn/responding-to-events) 访问此 DOM 节点，并使用在其上定义的内置[浏览器 API](https://developer.mozilla.org/docs/Web/API/Element)。

useRef 返回的 ref.current 中有一个 remove 方法，该方法执行后会将 ref 值为 null，这样以便于 ref 能够被垃圾回收机制进行回收。

**注意：ref 只能使用浏览器自带的 DOM 元素上，而不能直接用在组件上（可以在组件内传递一下使用）。**

# forwardRef

用于将一个组件的 `ref` 转发到该组件的子组件中。这在使用类组件或需要访问子组件的 DOM 元素时非常有用，尤其是当子组件是一个函数组件或类组件，且你希望保留对该子组件的引用时。

# useImperativeHandle

`useImperativeHandle` 是 React 的一个钩子，它与 `forwardRef` 一起使用，用于在使用 refs 的场景中为组件提供一个**可自定义的行为。**当你想要在子组件中暴露给父组件一些方法或属性时，`useImperativeHandle` 就非常有用。

两者可以结合使用（使用 forwardRef 转发 ref，使用 useImperativeHandle 设置 DOM 元素方法）：

```javascript
const InputComponent = React.forwardRef((props, ref) => {
  useImperativeHandle(ref, () => ({
    focus: () => inputRef.current.focus(),
  }));
  return <input ref={inputRef} {...props} />;
});
```

# Effect 同步

### React 中两种逻辑类型

- **渲染逻辑代码**，**位于组件的顶层**，在此处接受 props 和 state，并对他们进行转换，最终返回想在屏幕上看到的 JSX，渲染的代码必须是纯粹的，它只应该“计算”结果，而不做其他任何事情。
- **事件处理程序**，**是嵌套在组件内部的函数**，而不仅仅是计算函数。事件处理程序可能会更新输入字段、提交 HTTP POST 请求以购买产品，或者将用户导航到另一个屏幕。事件处理程序包含由特定用户操作（例如按钮点击或键入）引起的“副作用”（它们改变了程序的状态）。

### Effect 作用

Effect 允许指定由渲染本身而不是特定事件引起的副作用。（利用无论是哪种交互导致组件执行渲染，effect 都会在屏幕更新后的提交阶段执行）

### 使用注意

- **不要随意在你的组件中使用 Effect**。记住，Effect 通常用于暂时“跳出” React 代码并与一些 **外部** 系统进行同步。这包括浏览器 API、第三方小部件，以及网络等等。如果你想用 Effect 仅根据其他状态调整某些状态，那么 [你可能不需要 Effect](https://zh-hans.react.dev/learn/you-might-not-need-an-effect)。

- Effect 会在每次渲染之后执行，如下代码会造成死循环：

  ```
  const [count,setCount] = useState();
  useEffect(()=>{
  	setCount(count++);
  })
  ```

- useEffect 第二个参数不传代表： **每次渲染组件后都执行一次**，传空数组代表： **只会在第一次挂载后执行**，传依赖项代表在：**依赖项变化时执行。**
- useEffect 依赖项中传入 ref 通常是无效的，因为 ref 相当于不使用渲染赋值的 state 状态，传递过去的 ref 引用始终相同（不随着快照的渲染而变化）。
- 某些逻辑不能放在 effect 中执行，因为 effect 的执行是和组件渲染强绑定的（例如不能在 effect 中写购买商品的逻辑，这样会导致组件以任何方式被渲染都会执行购买逻辑，这样是不对的）
- effect 中 return 的函数会在下一次 effect 执行前被执行，常用于执行清理函数（清除定时器等）

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

# Effect 生命周期

react 组件的生命周期：

- 添加到屏幕（挂载）
- 组件接收新的 props 或 state（更新）
- 从屏幕移除（卸载）

# effect 依赖项

- effect 中的依赖项只能传入响应性的变量（组件 props 也是响应性的）
- 组件 props 也是响应性的，类组件 props 变化会触发钩子重新执行，函数式组件 props 变化会重新执行
- 组件内声明的变量可以是响应性的，每次会重新声明。
- effect 依赖项不能传入 ref.current，ref.current 本身不是响应性的，不会引起视图更新（ref.current 允许跟踪某些值而不触发重新渲染）
- effect 依赖项不能传入组件内定义的对象或者函数（由于每次定义都会改变）
- effect 依赖项不能传入可变值（包括全局变量），它不是响应性的。

# 自定义 Hook

- use 开头
- 代码检查工具会强制 use 命名公约，只有 Hook 和组件可以调用其他 Hook
- 没有调用 Hook 的函数不需要变成 Hook（或以 use 开头）
- 自定义 Hook 共享的是状态逻辑，而不是状态本身，对 Hook 的每一个调用完全独立于对同一个 Hook 的其他调用。
- 当需要在多个组件之间共享 state 本身时，需要将变量提升并传递下去。

# ------------------------------------

# [react 项目学习]()

# react 笔记

# 状态管理工具

## redux

### 设计思想

将 store 实例进行订阅，则当 store 实例通过 dispatch 进行发布时，就触发订阅函数的执行。

```js
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
## Mobx
声明式的修改数据，类似于 Vue。
# react 中 css 使用
### 出现问题

react 组件中使用样式时，需要引入对应的 css 文件，但是如果两个 css 文件中有相同的 class 命名，这时就会造成样式冲突（相互影响）。

### 解决方案
**CSS Module**
- 每个 CSS 文件都当作单独的模块，命名 xxx.module.css
- 引入时：`import styles from 'xxx.module.css'`
- 使用时：`className = {styles['test-style']}`
- 这样使用后组件中对应的 class 就会被命名为组件名称和样式名称的拼接

create-react-app 中内置了 CSS Module 功能，直接使用即可。
### 使用 sass
create-react-app 中内置了 cass 语法的支持，安装 sass 直接使用即可

## CSS-in-JS
##### 介绍
- css-in-js 是一种解决方案，包含很多工具
- 在 JS 中书写 CSS，带来极大的灵活性
- 它和内联的 style 完全不同，也不会有内联 style 的问题

##### 工具

- styled-components
- styled-js（ts 支持不友好）
- emotion

##### 优缺点

- 优点：使用 js 书写，有逻辑有变量，非常灵活
- 缺点：JSX 和样式代码混在一起，代码较多，增加了编译成本
- 使用场景：需要灵活变换样式

# 路由

### 背景

- Web 系统需要多个页面
- 多页面就需要用路由来管理
- PS：业务上的页面，技术上还是 react 组件

### 使用

- 路由设计：网址和页面之间的关系
- 增加页面和 Layout 模板
- 使用`react-router`增加路由配置

浏览器端使用`react-router-dom`工具，其中包含：

- Outlet 组件（父组件中嵌入子组件路由）
- Link 组件（用于路由跳转）
- useNavigate 钩子函数（用于路由跳转）
- useSearchParams 钩子函数（用于获取路由参数）
- useLocation 钩子函数（用于获取当前路由的信息）

# ----------------

# react 项目

# React 核心价值

这两个，也是所有现代前端框架的核心价值

## 组件化

什么是组件化

- 拆分页面结构，易开发易维护，尤其对大型项目
- 重复的结构，可通过组件化复用

（画图表示）

组件化并不是 React 独创的

- 早年的 PHP ASP 等动态网页技术，就支持组件化
- HTML5 的 Web Component 也支持组件化
- React 正式把组件化发扬光大 （包括 ng Vue）

## 数据驱动视图

公式 `UI = f(state)` （开始可能不理解）

例如，要增加一个 todo item （修改、删除，用 DOM 操作更麻烦）

```html
<ul>
  <li>吃饭</li>
  <li>睡觉</li>
</ul>
// 用 jQuery 的代码逻辑 - DOM 操作 const $li = $('
<li>new todo</li>
') $ul.append($li)
```

用 React

```jsx
<ul>
  {list.map((todo) => (
    <li>{todo}</li>
  ))}
</ul>;
// 用 React 的代码逻辑 - JS 操作
const [list, setList] = useState(["吃饭", "睡觉"]);
setList((l) => l.concat("new todo"));
```

数据驱动视图的好处

- 只关注业务数据，解放 DOM 操作，增加开发效率
- 适合大型复杂的前端项目 （否则，光 DOM 操作也受不了）

# CRA

Create React App 使用最多的脚手架，React 官方推荐

官网 https://create-react-app.dev/

## 脚手架

脚手架的好处：傻瓜式操作，简单方便<br>
如自己搭建，中间可能会出很多问题（版本问题 + 个人操作问题），可能会劝退很多人

## 创建项目

PS：直接使用 typescript

```shell
## 使用 npx
npx create-react-app my-app --template typescript

## 使用 npm
npm init react-app my-app --template typescript

## 使用 yarn
yarn create react-app my-app --template typescript
```

## 项目结构

项目入口 `src/App.js`

其他文件先不管，以后再说

## 启动项目

```
npm start
```

# vite

vite 是 Vue 作者发布的打包工具，启动速度快，近两年很火爆

官网 https://cn.vitejs.dev/guide/

## 创建项目

```shell
npm create vite@latest react-demo-vite --template react-ts

yarn create vite react-demo-vite --template react-ts
```

其他创建方式，可参考官网

## 项目结构

入口 `src/App.tsx`

其他文件，以后再说

## 启动项目

```
npm run dev
```

# 代码规范

高质量代码的特点

- **严格编码规范**（靠工具、流程，而非自觉）
- 合理、规范的注释
- 代码合理拆分

## 两者区别

eslint prettier
- eslint 编码规范，如变量未定义（语法语义）
- prettier 编码风格，如末尾是否用 `;`
- eslint 也有编码风格的功能，两者可能会有冲突

## eslint

安装插件

```shell
npm install eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin -save-dev
```

初始化配置文件 `.eslint.js`

```shell
npx eslint --init    ## 然后根据引导一步一步走
```

解释：eslint `plugin` 与 `extend` 的区别：

- `extend` 提供的是 eslint 现有规则的一系列预设
- `plugin` 则提供了除预设之外的自定义规则，当你在 eslint 的规则里找不到合适的的时候就可以借用插件来实现了

安装 vscode 插件 `eslint` ，此时就可以看到代码 `App.txs` 中的错误提示（如定义一个未使用的变量）

在 `package.json` 中增加 scripts `"lint": " eslint 'src/**/*.+(js|ts|jsx|tsx)' "` <br>
控制台运行 `npm run lint` 也可以看到错误提示。如果要自动修复，可以加 `--fix` 参数

## prettier

```
npm install prettier eslint-config-prettier eslint-plugin-prettier -save-dev
```

- `eslint-config-prettier` 禁用所有和 Prettier 产生**冲突**的规则
- `eslint-plugin-prettier` 把 Prettier 应用到 Eslint，配合 rules `"prettier/prettier": "error"` 实现 Eslint 提醒。

在 eslint 配置文件的 `extends` **最后** 增加 `'plugin:prettier/recommended'`

安装 vscode 插件 `prettier` ，此时可以看到代码 `App.txs` 中的格式提示（如末尾是否使用 `;` ，或单引号、双引号）

在 `package.json` 中增加 scripts `"format": " prettier --write 'src/**/*.+(js|ts|jsx|tsx)' "` <br>
控制台运行 `npm run format` 可以修复所有的格式错误

设置 vscode `.vscode/settings.json` 自动保存格式，可以在文件保存时，自动保留格式

```json
{
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  }
}
```

增加配置文件 `.prettierrc.js` 规定自己的编码格式，运行 `npm run format` 可以看到效果，保存文件也可以看到效果。<br>
【注意】如果此处没效果，可以**重启 vscode** 再重试。

---

一直搞不定，重启 vscode 就好了。
在 vscode 搜“prettier” 插件时，发现一个 “reload required” 的提示，于是就重启了

CRA 创建的项目，配置文件是 `js` 格式
vite 创建的项目，配置文件是 `cjs` 格式

# 提交到 git 仓库

PS：git 不会从 0 讲起

## 选择平台

- 工作中，按照公司规定，可能有内网 git 仓库
- 正式的开源项目，需要积累 star ，可以考虑 github （但有时访问不稳定，不同网络环境不一样）
- 个人学习项目，尽量选择国内平台，速度快

我选择 coding.net

## 演示

```sh
git remote add origin xxx
git push -u origin master
```

## husky

git-hook

安装依赖

```
npm install husky -save-dev
```

参考文档 https://github.com/typicode/husky 增加三个 `pre-commit` 命令

```shell
npm run lint
npm run format
git add .
```

可以故意制造一个错误：定义一个未使用变量（eslint 配置文件 `rules` 增加 `'no-unused-vars': 'error',`）<br>
然后执行 `git commit` 试试

## commit-lint

参考文档 https://github.com/conventional-changelog/commitlint#getting-started 安装设置即可

commit 规则查看 `node_modules/@commitlint/config-conventional` （在 `commitlint.config.js` 中有配置）

尝试 `git commit -m "test"` 会失败，再尝试 `git commit -m "chore: commit lint"` 会成功

# JSX 语法

JSX - JS 语法扩展，可以在 JS 中写模板（类似 HTML 语法）<br>
JSX 已经成为 ES 语法标准，也可用于其他框架，如 Vue3

- 标签
- 属性
- 事件
- JS 表达式
- 判断
- 循环

## 标签

- 首字母小写 - HTML tag
- 首字母**大写** - 自定义组件
- 如 `<input/>` 和 `<Input/>` 就不一样

可以像 HTML 一样嵌套

JSX 里的标签必须是闭合的，`<input>` `<br>` 这样写在 JSX 会报错（在 HTML 中不会报错），必须闭合 `<input/>`

每一段 JSX 只能有一个根节点，或者使用 `<></>` （ Fragment ）

## 属性

和 HTML 属性基本一样，但有些和 JS 关键字冲突了

- `class` 要改为 `className`
- `style` 要写成 JS 对象（不能是 string），key 采用**驼峰写法**
- `for` 要改为 `htmlFor`

## 事件

`onXxx` 的形式

注意 TS 的写法

```javascriptx
function clickHandler(event: React.MouseEvent<HTMLParagraphElement>) {
  event.preventDefault();
  console.log("clicked");
}
return <p onClick={clickHandler}>hello world</p>;
```

如果要想**传递参数**，可以通过如下方式
```javascriptx
function clickHandler(
  event: React.MouseEvent<HTMLParagraphElement>,
  x: string
) {
  event.preventDefault();
  console.log("clicked", x);
}
return (
  <p
    onClick={(e: React.MouseEvent<HTMLParagraphElement>) =>
      clickHandler(e, "hello")
    }
  >
    hello world
  </p>
);
```

PS：Event handlers must be passed, **not called!** `onClick={handleClick}`, not `onClick={handleClick()}`.

## JS 表达式

`{xxx}` 格式表示一个 JS 变量或表达式，可用于

- 普通文本内容，或判断、循环
- 属性值
- 用于注释

## 判断

JS 一般使用 `if...else` 做判断，但不能用于 JSX 的 `{xxx}` 中。

所以，可以选择其他方式做判断

- 运算符 `&&`
- 三元表达式 `a ? b : c`
- 用函数封装

```javascriptx
const flag = true;
return (
  <div>
    {flag && <p>hello</p>}
    {flag ? <p>你好</p> : <p>再见</p>}
  </div>
);
```

或者用函数封装

```javascript
function Hello() {
  if (flag) return <p>你好</p>;
  else return <p>再见</p>;
}

return <Hello></Hello>;
```

## 循环

使用 `map` 做循环

```javascript
const list = [
  { username: "zhangsan", name: "张三" },
  { username: "lisi", name: "李四" },
  { username: "shuangyue", name: "双越" },
];
const ul = (
  <ul>
    {list.map((user) => {
      return <li key={user.username}>{user.name}</li>;
    })}
  </ul>
);
```

JSX 循环必须有 `key` - 帮助 React 识别哪些元素改变了，比如被添加或删除。

- 同级别 `key` 必须唯一
- `key` 是不可改变的 —— 尽量不用 index ，要用业务 ID （也不要用随机数）
- `key` 用于优化 VDOM diff 算法（后面再说）

## 显示 HTML 代码

JSX 防止注入攻击，否则用 `dangerouslySetInnerHTML={{ __html: 'xxx' }}`

# 组件和 props

## React 一切皆组件

React 应用是由组件组成的。组件是 UI(用户界面)的一部分，它有自己的逻辑和外观。组件可以小到一个按钮，也可以大到整个页面。

组件可嵌套

- React 通过组件来构建 UI
- 组件拆分也有利于代码组织和维护，尤其对于大型软件
- JSX 中，组件 tag 首字母要大写

代码演示：从 index.tsx 开始，到 `<App>` 全都是组件。

## 组件就是一个函数

- React 之前是 class 组件
- 现已被函数组件 FC 全面取代
- 输入 props ，返回一段 JSX

## 实战：List 页面抽离组件

代码参考 react-ts-demo 中 `components/QuestionCard1.tsx`

- props 类型
- TS 泛型

## 进阶：type 还是 interface

都可以实现类型定义的功能 （具体代码演示），用哪个都可以

---

PS：组件之间的数据传递不仅仅只有 props ，课程后面还会继续讲解其他形式。

TS 语法如果一开始不熟练，就先记住当前的。随着课程深入，用多了也就熟练了。

PS：函数也可以当做属性来传递

# useState

## 让页面“动”起来

例如实现一个 click 计数功能，普通变量无法实现。即：修改普通变量无法触发组件的更新 rerender

通过 useState 即可实现。

## state 是什么

State, A component's memory —— 这个比喻非常好！

- props 父组件传递过来的信息
- state 组件自己内部的状态，不对外

每次 state 变化，都会触发组件更新，从新渲染页面。

代码演示，参考 react-ts-demo 中 `pages/StateDemo1.tsx`

## state 的特点

### 异步更新

代码演示

PS：setState 传入函数，可同步更新

### 可能会被合并

代码演示

### 不可变数据

state 可以是任意 JS 类型，不仅仅是值类型。<br>
不可直接修改 state ，而要 setState 新值。

代码演示

PS：函数组件，每个更新函数从新执行，**state 被重置，而不是被修改**。state 可以理解为 readOnly

## immer

Immer 简化了不可变数据结构的处理。特别是对于 JS 语法没那么熟悉的人。

代码演示，参考 react-ts-demo 中 `pages/ImmerDemo1.tsx`

## 实战：List 页面使用 state

- 使用 state
- 使用 immer
  - push
  - 修改 isPublish

代码参考 `pages/List2.tsx`
---

最重要的就是：不可变数据 —— 这是 React state 的核心

# useEffect

## 副作用

函数组件：执行函数，返回 JSX

- 初次渲染时
- state 更新时

但有些场景需要如下功能

- 当渲染完成时，做某些事情
- 当某个 state 变化时，做某些事情
- 如 ajax 加载数据（state 变化重新加载）

如果只有 `执行函数，返回 JSX` 这个逻辑，无法满足上面的场景。

所以需要 useEffect

## 组件渲染完成时

代码演示：List2.tsx 使用 `useEffect` 模拟 ajax 请求

## 某些 state 更新时

代码演示：QuestionCard 监听 `isPublished` 的更新

## 组件销毁时

有创建就有销毁，有生就有死

代码演示：增加 `isDeleted` 属性和 `delete` 事件，看 QuestionCard 组件的销毁

【重要】如果有定时任务，或者 DOM 事件，组件销毁时一定要解绑

## 执行两次（销毁一次）

React18 开始，`useEffect` 在开发环境下执行两次 <br>
模拟组件挂载、销毁、重新挂载的完整流程，及早发现后续的问题。如果只挂载一次，有可能卸载组件时有问题。<br>
而且，实际项目中某些组件真的有可能会被挂载很多次（如重置 state），要及早模拟这种情况，避免出现重复挂载的问题（如弹窗重复、bindEvent 重复）

**生产环境下，不会再执行两次**

# 其他 Hooks

## useRef

useRef 是基于 useState 封装而来，区别在于没有向外暴露设置响应性数据的函数，一般用于操作 DOM 元素，也可以用来持久化缓存数据

PS：useRef 也可以传入 JS 值，但更新时不会触发 rerender ，需替换为 useState

## useMemo

- 函数组件，默认，每次 state 变化都会重新执行
- useMemo 可以缓存某个数据，不用每次都重新生成
- 可用于计算量比较大的数据场景

代码参考 pages/UseMemoAndCallback/UseMemoDemo1.tsx

注意文档中的这段话 “你可以把 useMemo 作为性能优化的手段，但不要把它当成语义上的保证。” https://zh-hans.reactjs.org/docs/hooks-reference.html#usememo<br>
即，useMemo 的控制权在 React ，不一定保证每个都会缓存，但都是为了全局的性能最佳。

## useCallback

useCallback用于缓存函数，useMemo用于缓存计算结果

# 自定义 Hooks

已学习了几个常用的内置 Hooks ，可以用于很多业务功能。

## 修改网页标题

- 第一步，直接在组件内部写
- 第二步，可以抽离一个函数
- 第三步，可以直接抽离一个文件 src/hooks/useTitle.ts ，引用使用

抽离自定义 Hook ，可用于很多组件，**复用代码**

## 获取鼠标位置

（刚才的没有返回值，这次有返回值）

代码演示 src/hooks/useMousePosition.ts （直接在 App.tsx 中使用）

## 异步获取信息

（再来个异步的）

代码演示 src/hooks/useGetInfo.ts （直接在 App.tsx 中使用）

## 小节

自定义 Hooks 可以抽离公共逻辑，复用到多个组件中 —— 这是 Hooks 设计的初衷

在 Hooks 和函数组件之前，class 组件也有一些方法：mixin HOC render-prop 等，但都没有 Hooks 来的简单。

# 第三方 Hooks

回顾上一节的“三步”，其实还有第四步：抽离为单独的模块，发布到 npm ，供所有开发者使用。

例如，之前开发的 useTitle useMousePosition ，就现成的

- https://ahooks.js.org/zh-CN/hooks/use-title
- https://ahooks.js.org/zh-CN/hooks/use-mouse

## ahooks

https://ahooks.js.org/zh-CN/

ahooks 是国内流行的第三方 Hooks 库

- 功能全面
- 使用简单
- 文档 demo 清晰易懂

后面会再次用到 ahooks ，到时候再代码演示

## react-use

https://github.com/streamich/react-use

react-use 是国外比较流行的，功能也很前面，但是英文文档。<br>
先做了解吧，项目中不会使用。

# Hooks 使用规则

## 命名规则

Hook 必须 `useXxx` 格式来命名。

PS：这种命名规则也很易读，简单粗暴

## 调用位置

Hook 或自定义 Hook ，只能在两个地方被调用

- 组件内部
- 其他 Hook 内部

组件外部，或一个普通函数中，不能调用 Hook

## 顺序一致

Hook 在每次渲染时都按照相同的顺序被调用。

- Hook 必须是组件“第一层代码”
- Hook 不可放在 if 等条件语句中 （ 或者前面有 return ，也算是条件 ）
- Hook 不可放在 for 等循环语句中

代码演示

## 闭包陷阱

当**异步函数**中获取 state 时，可能不是最新的 state 值。

解决方案：替换为 `useRef` —— **但 ref 变化不会触发 rerender** ，所以得结合 state 一起

# 普通 CSS

## 内联 style

- 和 HTML style 一样，元素的内联样式
- 必须是 JS 对象形式，不可以是字符串
- 样式名称用驼峰式写法，如 `fontSize`

代码演示

## className

- 和 HTML class 一样，设置 CSS 样式名
- 和 JS `class` 重复，所以改名 `className`
- 可用 `clsx` 或 `classnames` 条件判断

代码演示

链接

- https://www.npmjs.com/package/classnames
- https://www.npmjs.com/package/clsx

## 尽量不用内联 style

- 内联 style 代码量多，性能差
- 外链样式（用 className）代码复用，性能好
- 这和 React 无关，在学 HTML CSS 时就知道

# CSS Module

## 普通 CSS 的问题

- React 使用组件化
- 多个组件，对应多个 CSS
- 多个 CSS 就会造成命名重复，不好管理

## CSS Module

- 每个 CSS 都是一个独立的模块，命名 `xxx.module.css`
- 每个模块中的 className 都不一样
- CRA 原生支持 CSS Module

代码演示，参考 `components/Button2.tsx`

## 使用 Sass

- CSS 写法比较原始
- 一般使用 Sass less 等预处理语言
- CRA 支持 Sass Module ，把后缀改为 `.scss` 即可

# CSS-in-js

- 在 JS 中（组件代码中）写 CSS
- 不用担心 CSS class 重名的问题
- CSS-in-js 是一个解决方案，并不是一个工具的名称

PS：CSS-in-js 并不是内联 style （重要！！！），它会经过工具的编译处理，生成 CSS class 的形式。

## Styled-components

https://styled-components.com/

代码演示，参考 `components/Button3.tsx`

## Styled-jsx

https://github.com/vercel/styled-jsx#getting-started

## 优点

CSS-in-js 能更灵活的支持动态样式，直接在 JS 中完成计算和样式切换。这比 css-module 更好。

**# 使用 antd**

**## 安装和使用**

参考文档 https://ant.design/docs/react/use-in-typescript-cn

测试 Button 组件

**## antd 组件**

根据官网 https://ant.design/components/overview-cn/ 浏览一遍 antd 所有的组件，有一个了解

# Tailwind CSS

特点：把常用的 CSS 样式都细分，自己自己随意搭配。

例如

- 字体大小 https://www.tailwindcss.cn/docs/font-size
- 间距 https://www.tailwindcss.cn/docs/padding
- 宽度 https://www.tailwindcss.cn/docs/width

示例：

```html
<h1 className="text-3xl font-bold underline">Use tailwind CSS</h1>
```

安装参考文档 https://www.tailwindcss.cn/docs/guides/create-react-app

# 普通表单组件

## input 组件

```tsx
import React, { FC, useState, ChangeEvent } from "react";

const Demo: FC = () => {
  const [text, setText] = useState("");
  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    setText(event.target.value);
  }

  return <input onChange={handleChange} value={text} />;
};
```

## 受控组件 vs 非受控组件

受控组件

- 元素的值同步到 state
- 使用 `value` 属性

非受控组件

- 元素的值，不同步到 state
- 使用 `defaultValue` 属性

React 推荐使用受控组件。看似麻烦，其实让设计更简单。

# 表单校验

## antd Form rules

参考登录、注册页

PS：选择使用 antd ，顺带了解一下两个其他的 Form 验证工具

## react-hook-form

https://react-hook-form.com/

## formi

React 官网推荐的 f

https://formik.org/docs/overview

# mock 服务

## Mock.js

http://mockjs.com/

- 前端引入 Mock.js
- 定义路由
- Mock.js 劫持 ajax 请求

代码演示

- 安装 Mock.js 和 axios
- 定义路由，参考 `_mock/index.ts`
- App.js 测试 ajax

```ts
import "./_mock/index";
import axios from "axios";

useEffect(() => {
  // fetch('/api/test')  // 不能用 fetch
  //   .then(res => res.json())
  //   .then(data => console.log(data))

  axios.get("/api/test").then((res) => console.log("res", res.data));
}, []);
```

Mock.js 的强大之处：

- 前端劫持 Ajax
- Random 的模拟能力

注意

- Mock.js 只能劫持 XHR ，不能劫持 fetch ，所以不要用 fetch 请求。
- Mock.js 要在生产环境下去掉，否则上线会有问题 —— Mock.js 体积也很大
- 结论：不建议直接在前端使用 Mock.js

## nodejs 搭建 Mock 服务

代码参考 question-mock

- 刻意延迟 1s ，模拟真实效果
- 使用 Mock.js 的 `Random` 功能
- 定义写 Mock 的格式，考虑扩展性

前端修改 `devServer` ，参考 craco.config.js

扩展 webpack 配置

- 使用 craco https://github.com/dilanx/craco
- 可参考 https://www.lingjie.tech/article/2021-01-04/27

## 在线 Mock 平台

不稳定，可能不维护了。有数据泄漏风险（多人使用，难免会写敏感数据）

- fast-mock
- y-api
- swagger - 尽量不推荐用国外平台（可以用做工具，但别用作服务）

# 为何使用状态管理

## 状态提升

- 一个复杂页面，要拆分 UI 组件
- 但数据保存在顶级组件
- 通过 props 传递到下级组件

代码演示，参考 react-ts-demo 中 `pages/homePageDemo/demo3.tsx` —— 需要抽离 `<form>` 为单独的组件

（画图表示）

## 状态管理

但如果情况再复杂，例如问卷编辑器，光通过状态提升无法满足。需要状态管理 —— 数据放在一个集中的第三方。

（画图表示）

React 状态管理的方式

- 自带的 Context useReducer
- Redux
- Mobx

# Context

介绍

\- 向下级组件，跨组件传递信息

\- 不用像 props 层层传递

\- 例如：切换语言、切换主题等

Context 只适合统一设置、下发某些全局变量（语言，主题等），应用场景比较单一

# useReducer

## 背景

第一，是 `useState` 的代替方案。<br/>
当数据简单时用 `useState` ，当数据结构较为复杂时，可以考虑用 `useReducer`

第二，参考了 redux （马上要学）的设计，一个简化了的 redux

## 代码演示

简单 demo `pages/CountReducer.tsx`

todo list demo `pages/TodoReducer/index.tsx`

## 概念

- state 或 store - 存储数据
- action - 动作，格式如 `{ type: 'xxx', ... }`
- reducer - 根据 action 生成新 state —— **不可变数据**
- dispatch - 触发 action

PS：在 React 环境下，永远不能忘记 `不可变数据`

## 问题

需结合 useContext 跨组件通讯

另，state 和 dispatch 没有模块化，数据混在一起，也不适合复杂项目。

但简单项目还是可以用的。

# Redux

Redux 是 React 最出名的状态管理工具

## 概念

redux 和 useReducer 的概念一样

- state 或 store - 存储数据
- action - 动作，格式如 `{ type: 'xxx', ... }`
- reducer - 根据 action 生成新 state —— **不可变数据**
- dispatch - 触发 action

但 redux 和 useReducer 有很多区别

- store 可拆分模块
- 可通过 Hook 获取 state 和 dispatch
- 开发者工具

## 代码演示

代码参考 undo-redo-demo （忽略 undo redo 功能）。分两步：

- 不使用 immer
- 使用 immer

## 开发者工具

Chrome redux DevTools

https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd?hl=zh-CN

可以看到每一步 dispatch 的 state 变化，开发调试很方便

## redux 单项数据流模型

参考这里的动![Image](https://cn.redux.js.org/tutorials/fundamentals/part-2-concepts-data-flow/)

# Mobx

Mobx 可以通过**声明式**的方式来修改数据。像 Vue 。<br>
不像 React 和 redux 那样，需要用纯函数和不可变值。

## 基本概念

主旨 https://zh.mobx.js.org/the-gist-of-mobx.html

- state 数据
- action 动作
- derivation 派生
  - computed
  - `observer` 监听变化，包裹的 React 组件
  - `autorun` 监听变化，像 watch

## 代码演示

简单 demo - mobx-demo/src/BasicDemo

todo-list demo - mobx-demo/src/TodoDemo2

## 小结

Mobx 使用单项数据流 https://zh.mobx.js.org/the-gist-of-mobx.html#%E5%8E%9F%E5%88%99

## 其他

v6 已经默认去掉了**装饰器**语法，为了大部分的兼容性 https://mobx.js.org/installation.html#mobx-and-decorators

尽量使用 `computed`<br>
https://mobx.js.org/the-gist-of-mobx.html
When starting with MobX, people tend to overuse reactions. The golden rule is, always use computed if you want to create a value based on the current state.

computed 必须是纯函数。而 action 可以修改 state （如 arr.push）<br>
computed 采用惰性求值，会缓存其输出，并且只有当其依赖的可观察对象被改变时才会重新计算。 它们在不被任何值观察时会被暂时停用。

# Redux 管理用户信息

## store

创建 src/store/store.ts 和 src/store/userReducer.ts

## 开发

Logo 组件，根据 username 判断链接地址<br>
新建 hooks/useGetUserInfo.ts

hooks/useLoadUserData.ts

- 使用 `loginReducer`
- useSelect - 根据 username 判断是否已经登录
- UserInfo 组件，去掉 service ，改用 useGetUserInfo

UserInfo 组件

- 使用 `logoutReducer`
- useSelect - 显示用户信息或“登录”

新建 `hooks/useNavPage` 执行跳转逻辑，用于 MainLayout QuestionLayout

#

# --------------------------------------

# 功能开发

# 拖拽排序

# 拖拽排序

拖拽排序是 Web 管理系统的常见功能，React 也有相应的第三方插件供我们选择。

## 技术选型

分析常见的第三方插件，并且选择一个合适的。

- 看 github star ，看 npm 下载量 —— （不一定最高，但要有一定的数量规模）
- 看 github 代码更新，和 npm 发布更新
- 看文档和 demo ，是否易读易懂 —— （当年，Vue 能在国内打开，文档占了很大功劳）

### react-dnd

- github star 多，代码更新及时 https://github.com/react-dnd/react-dnd
- npm 下载量大 https://www.npmjs.com/package/react-dnd
- 但，文档不易懂，学习成本高 。如[首页](https://react-dnd.github.io/react-dnd/about) 的 demo ，代码就非常复杂，不易读

PS：examples 太复杂 https://github.com/react-dnd/react-dnd/tree/main/packages/examples/src/04-sortable/simple

### react-beautiful-dnd

https://github.com/atlassian/react-beautiful-dnd

- github star 多， 代码更新不频繁了 https://github.com/atlassian/react-beautiful-dnd
- npm 下载量高 https://www.npmjs.com/package/react-beautiful-dnd
- 文档比较好理解，可以直接在 github 上找到 [examples](https://github.com/atlassian/react-beautiful-dnd/blob/master/docs/about/examples.md)

但，**不支持 React18 严格模式**（代码好久没更新了）<br>
去掉 `<React.StrictMode>` 就好了。但这样就丢失了严格模式的好处 https://zh-hans.reactjs.org/docs/strict-mode.html

有解决的 lib ，但 star 太少了，不可靠 https://github.com/hello-pangea/dnd

PS：暂无精力更新，看 npm 首页的描述 https://www.npmjs.com/package/react-beautiful-dnd

### Sortablejs

老牌的 js 排序 lib ，不依赖于 React 或 Vue 。

官方提供的 React 版本的下载量还可以 https://github.com/SortableJS/react-sortablejs

但它有一个提示 `is not considered ready for production` ，不推荐用于生产环境

### react-sortable-hoc

https://github.com/clauderic/react-sortable-hoc

star 和下载量都不错，但已不再主动维护，推荐使用 `dnd-kit`

### dnd-kit

https://docs.dndkit.com/presets/sortable

- github star 数量还可以（不算高），代码更新及时 https://github.com/clauderic/dnd-kit
- npm 下载量还可以（不算高）https://www.npmjs.com/package/@dnd-kit/core
- 文档和 demo 通俗移动

代码演示，参考 dnd-kit-and-sortablejs-demo

## 开发

- 抽离组件 `SortableContainer` `SortableItem` —— 图层和画布都需要拖拽排序
- 在画布和图层使用

之前代码的改动

- App.css 增加 `div[role="button"] { outline: 0 }`
- 键盘快捷键，修改 `isActiveElementValid` 函数内的逻辑

工具栏：上移/下移

# 撤销重做

## 实现原理

（先介绍 stack）

两个 stack ：undo-stack redo-stack

- 输入：redo-stack 清空，undo-stack 入栈
- undo ：undo-stack 出栈，redo-stack 入栈
- redo ：redo-stack 出栈，undo-stack 入栈

画图表示<br>
代码演示

## redux 撤销重做

https://www.npmjs.com/package/redux-undo

代码演示，从之前的 redux todo-list demo 上进行

- store/store.ts
- pages/TodoList.ts

## 开发

- src/store/store.ts
- src/hooks/useGetComponentInfo.ts
- src/pages/question/Edit/EditToolbar.tsx

PS：看 ctrl + z 等快捷键

# Chat 图表

# chart lib 选型

回顾一下技术选项的三个要点，在“拖拽排序”那一节

## react-chartjs-2

https://react-chartjs-2.js.org/

基于 chartjs （知名 charts lib）

- github star 还可以，代码更新及时 https://github.com/reactchartjs/react-chartjs-2
- npm 下载量大 https://www.npmjs.com/package/react-chartjs-2
- 文档和 demo 简洁易懂 https://react-chartjs-2.js.org/examples

作为备选观察

## recharts

https://recharts.org/zh-CN/

基于 D3

- github star 更多，代码更新及时 https://github.com/recharts/recharts
- npm 下载量大 https://www.npmjs.com/package/recharts
- 文档和 demo 简洁易懂 **有中文文档** https://recharts.org/zh-CN/examples

## echarts-for-react

https://git.hust.cc/echarts-for-react/

基于百度 echarts

- github star 不太多，代码更新不太及时 https://github.com/hustcc/echarts-for-react
- npm 下载量也不太大 https://www.npmjs.com/package/echarts-for-react
- 文档友好，中文文档

## 结论

最终选择了 recharts

# --------------------------------------

# React 项目性能优化

# 缓存数据 减少计算

PS：React18 开发环境下，组件会渲染两次。生产环境则不会。

## useState 传入函数

- useState 传入初始化数据
- 如传入函数，则只在组件渲染执行一次
- 如果数据结构较复杂，可使用函数

代码演示，参考 react-ts-demo 中 pages/UseStateFnDemo.tsx

## useMemo 缓存数据

（之前讲过，再回顾一遍，不用代码演示了）

- 函数组件，默认，每次 state 变化都会重新执行
- useMemo 可以缓存某个数据，不用每次都重新生成
- 可用于计算量比较大的数据场景

代码参考 pages/UseMemoAndCallback/UseMemoDemo1.tsx

注意文档中的这段话 “你可以把 useMemo 作为性能优化的手段，但不要把它当成语义上的保证。” https://zh-hans.reactjs.org/docs/hooks-reference.html#usememo<br>
即，useMemo 的控制权在 React ，不一定保证每个都会缓存，但都是为了全局的性能最佳。

项目示例：统计页，链接和二维码的 Elem

## useCallback 缓存函数

（之前讲过，再回顾一遍，不用代码演示了）

useCallback 就是 useMemo 的语法糖，和 useMemo 一样。用于缓存函数。

代码参考 pages/UseMemoAndCallback/UseCallbackDemo1.tsx

项目示例：新增组件

## React.memo 缓存组件

当 state 变化时，React 会默认渲染所有**子组件**，无论其 props 是否变化

但如果想要控制子组件根据 props 变化来渲染，可以使用 `React.memo`

代码演示，可以在 pages/homePageDemo/Demo3.tsx <br>
为 `List` 组件增加 `React.memo`

PS：注意和 `useMemo` 的区别，一开始容易搞混了

# 代码体积和拆分

## 代码体积分析

https://create-react-app.dev/docs/analyzing-the-bundle-size/

```shell
# build 以后，可以直接运行结果 （看控制台提示）
yarn global add serve
# npm install serve -g
serve -s build
```

发现 main.js 体积有 `1.5M` —— 首页加载就需要 `1.5M` ，有点大，需要拆分。

分析内部发现比较大的体积来自于 antd recharts react-dom dnd-kit 等。<br>
首先想到的：拆分页面，路由懒加载，把编辑页、统计页拆分开

## 路由懒加载

代码参考 src/router/index.ts

再进行代码体积分析，发现 main.js 减小到 `1.0M` 还是很大。<br>
但至少编辑页面、统计页面的代码都移除了。

分析结果中，发现一个不符合预期的现象：**`@dnd-kit` 是拖拽排序的，应该在编辑页，不应该在 main.js**<br>
查代码发现，在 src/store/componentsReducer/index.ts 中用到了 `@dnd-kit/sortable` ，而后者用依赖于 `@dnd-kit/core`<br>
这个是否要优化掉？（把相关代码移动到编辑页面的引用） —— **不值得！！！**

- 这部分代码只占用 50kb ，最后 GZip 压缩以后大约 16kb ，体积不算大
- 如果移动代码，将导致代码修改较多，而且可能破坏语义、可读性
- 综合考虑成本和收益，这里保持不变

继续：分析结果中，占比最大的是 antd 和 react-dom ，可以抽离公共代码。

## 抽离公共代码

PS：生成环境需要抽离。开发环境不需要抽离，否则影响打包速度。

代码参考 craco.config.js ，注意两点

- 必须是生成环境。开发环境不需要抽离，否则影响打包速度。
- 设置 `chunks: 'all'`

重新 build 以后，发现 main.js 只有 `35kb` ，react-dom antd vendors 都被拆分出去了。

## 合理使用缓存

运行 build 结果，发现首页依然要加载好几个 JS 文件： main.js react-dom antd vendors<br>
它们体积的总和依然是 1M 左右，那和优化之前一样吗？ —— **不一样**

- 优化之前是一个文件，一旦有代码改动，文件变化，缓存失效
- 优化之后拆分多个文件，代码改动只会导致 main.js 变化，其他文件都会缓存
- 如果不频繁升级 npm 插件，其他 js 文件不会频繁变动

## CSS

不用做优化，css 已经被分离为 main.css antd-chunk.css edit-page.css stat-page.css

## 小结

从一开始的 1.6M 到最后的 33KB ，效果明显。

PS：浏览器和服务端一般都默认支持 Gzip 压缩，体积能压缩 1/3 左右

# --------------------------------------

# React 项目单元测试

# 单元测试

对比

- 单元测试 - 某个功能模块、函数、组件的测试 —— 开发人员
- 系统测试 - 整个功能流程的测试 —— 专业测试人员

## jest 入门

jest 是最流行的前端单元测试工具<br>
可参考官网首页的 demo https://www.jestjs.cn/docs/getting-started

react-ts-demo 代码演示

- CRA 直接安装了 jest ，可直接写
- utils/math.ts 和 utils/math.test.ts
- 运行 `npm run test` （看 package.json `scripts`）

测试代码文件的位置

- 统一放在 `__tests__` 目录下
- 和源文件放在一起，增加 `.test.ts` 后缀
- 选择后者（1. 结合更密切，可读性好；2. 不容易忘，敦促及时写单元测试）

小结

- test it 构建测试用例
- expect 断言 —— 很多，后面一一学习
- 测试文件的位置

## 组件单元测试

注意，不是所有前端代码都适合单元测试，一般只对一些核心的、功能封装独立的组件进行单元测试。

- QuestionInfo
- QuestionTitle
- QuestionParagraph
- QuestionInput
- QuestionTextarea
- QuestionRadio
- QuestionCheckbox

## 自动化测试

操作

- `npm run test` 加入到 husky `.husky/pre-commit`
- 为 package.json `scripts` `test` **增加 `--watchAll=false`** —— 重要！否则无法正常执行 commit
- 每次 commit 会执行测试

自动测试的价值

- 每次 commit 都自动执行，测试失败，无法提交代码（不污染现有的代码）
- 避免各种“不小心” “忘了” 的问题 —— 自动化，电脑忘不了
- 要及时完善组件单元测试，新组件也要添加单元测试

# storybook

组件**可视化**测试<br>
或者，它可以被理解为一种文档或组件使用介绍，通过 storybook 就可以看到组件的 UI 结构、属性配置等。

## 初始化

https://storybook.js.org/docs/react/get-started/install

进入 react 目录，运行 `npx storybook init` ，添加 storybook<br>
PS：期间会咨询是否使用 eslint 插件，选择否。因为我们已经自己定义好 eslint 规则了

先执行 `npm run format` 和 `npm run lint` 统一代码格式（storybook 新增的组件，代码风格可能不一样）

执行 `npm run storybook` 启动，可以看到现成的 demo

最后，新建 `stories/examples` 文件夹，把示例都拖进来。否则太多太乱。

## 代码演示

新建 `stories/question` 目录，在这里新建组件

- QuestionInfo.stories.tsx
- QuestionTitle.stories.tsx
- QuestionParagraph.stories.tsx
- QuestionInput.stories.tsx

# React Fiber 架构的调度执行原理
> fiber架构的调度借鉴了生成器(或者说是协程)的概念
```javascript
let ticket_num = 0;
let ticket_total = 0;
// 使用生成器,生成迭代器,迭代器用于迭代返回结果
function* sale(name) {
  const saleName = name;
  // 定义死循环,永远执行任务
  while (true) {
    if (ticket_num <= 0) {
      console.log(`${saleName} => No ticket`);
      // 生成器函数中如何直接返回,则只会有一次next方法,执行的value是return返回的值,done为true
      return 1;
    } else {
      ticket_total++;
      console.log(`${saleName} => sales the No.${ticket_total} ticket`);
      ticket_num--;
    }
    yield ticket_num;
  }
}
// 当浏览器处于空闲状态时(手动实现的requestIdleCallback),使用调度器执行任务队列中的迭代器(利用迭代器可以暂停执行的特点)
let thread = async () => {
  //设置任务队列,存放一些迭代器.
  let pool = [sale("A"), sale("B"), sale("C"), sale("D")];
  let len = pool.length;
  let moniter = len;
  ticket_num = 100; //迭代器执行环境和变量相绑定,可以修改变量的值,对应的迭代器执行结果也会变化
  while (true) {
    let id = parseInt(Math.random() * len);
    let status = pool[id].next().done;
    if (status) moniter--;
    if (moniter === 0) {
      console.log("All tickets saled done...");
      break;
    }
  }
};
thread();
```
