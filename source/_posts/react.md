---
title: react笔记
date: 2023-12-2 12:24:4
categories:
- react
tags:
- react
---
# react笔记：

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



