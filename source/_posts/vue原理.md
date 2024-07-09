---
title: vue源码解读
date: 2023-11-2 12:24:4
categories:
  - vue
sticky: true
tags:
  - vue
  - 源码
---

# vue 解析

# 一、响应式系统：

- 响应式的目的就是为了解决计算机语言的程序性
- vue2 采用`Object.defineProperty`的方式来代理对象的属性，但是这个 api 有个问题就是需要先显式地去声明这个对象的属性（属性需要先写出来），就导致向对象添加属性或删除属性时兼管不到。
- vue3 中通过`Proxy`来代理整个对象，就解决了这个问题，但由于我们操作的都是返回的代理对象，并且在调用时打点调用（上下文是代理对象，监听不到源对象的 get 和 set），所以需要使用`reflect`方法指定执行上下文。
- 代理到源对象的 get 和 set 方法后，就将当前的响应性表（也可以看成是桶，结构是 weakMap(对象名，map(属性名，set 副作用集合))），源对象执行 get 方法时，会收集当前副作用函数，存储到表中，执行 set 方法时，会将表中对应的副作用函数拿出来遍历执行。

## reactivity 模块

![/images/image-20240123164938769](/images/Snipaste_2024-05-31_14-44-09.png)

## reactive：

创建代理对象（用于收集依赖）

![/images/image-20240123164938769](/images/vue1.png)

**需要注意的是：当使用代理对象的 this 时，其 this 指向普通对象，导致的结果就是后续使用代理对象收集不到使用 this 指定的函数，解决方法是通过 Reflect 反射。**

此时，就创建了代理对象，并将普通对象和代理对象存在 map 中，此时可以通过 Proxy 代理的拦截器收集依赖，但是视图中的赋值并不是响应性的（需要执行依赖）。

## effect：

**副作用函数，用于触发依赖，更新视图**

首先通过 reactiveEffect 类创建副作用实例：通过实例的 run 方法可以执行里面的函数

![/images/image-20240123164938769](/images/vue2.png)

通过 track 函数收集依赖。**（在 Proxy 对象的 getter 中执行）**

![/images/image-20240123164938769](/images/vue3.png)

通过 trigger 函数触发依赖 **（在 Proxy 对象的 setter 中执行）**

![/images/image-20240123164938769](/images/vue4.png)

## ref 函数：

![/images/image-20240123164938769](/images/vue5.png)

## computed 函数：

![/images/image-20240123164938769](/images/vue7.png)

## scheduler 调度器：

![/images/image-20240123164938769](/images/vue8.png)

## watch 函数：

![/images/image-20240123164938769](/images/vue9.png)

# 二、运行时 runtime：

## runtime 模块

![/images/image-20240123164938769](/images/Snipaste_2024-06-02_15-17-35.png)

## createVNode 函数：

![/images/image-20240123164938769](/images/vue10.png)

## h 函数：

![/images/image-20240123164938769](/images/vue11.png)

## nodeOps 对象：

封装 dom 元素操作

![/images/image-20240123164938769](/images/vue13.png)

## patchProp 函数：

根据元素类型（class 属性，style 属性，事件，dom Properties 和其他属性），进行不同的 patch 打补丁操作

![/images/image-20240123164938769](/images/vue14.png)

## render 函数：

![/images/image-20240123164938769](/images/vue12.png)

## 组件渲染：

![/images/image-20240123164938769](/images/vue16.png)

## patch 函数（diff 算法）：

![/images/image-20240123164938769](/images/vue15.png)

# 三、编译时 compile：

将 template 模板转为 render 函数。这个过程中共经历了三大步骤：1、解析（解析 template 模板，生成 AST 抽象语法树）；2、转化（转化 AST，生成 JavaScript AST）；3、生成（生成 render 函数）

## compile 模块

![image](/images/Snipaste_2024-06-02_11-30-05.png)

## baseParse 函数：

baseParse 函数**根据 template 模板**，通过有限自动状态机的概念解析得到**tokens**，然后通过扫描 tokens 最终得到**AST**（抽象语法树）。

## transform 函数:

transform 函数将**抽象语法树 AST**转化为**JavaScript AST**（抽象语法树）。

## generate 函数：

根据**JavaScript AST**（抽象语法树）**生成 render 函数**。(render 函数的本质是字符串，字符串的换行和空格需要进行处理)。

## compile 函数：

根据**字符串 render 函数**通过**new Function(render)()** 方法创建出 renderFn 函数（这里不用 eval 函数的原因是出于安全性考虑），改名为 compile 函数。

## parseInterpolation 函数：

###### （处理插值表达式）

找到 }} 的索引位置，拿到双大括号内部的字符串，通过 trim 方法去除空格拿 到变量，通过 with 语法改变作用域，bind 语法绑定 this 指向从而使用这个变量。

## parseAttributes 函数：

###### （处理 props 属性，v-指令等）

通过正则表达式判断是否是 Vue 指令，如果是指令，就返回指令对象，如果不是指令就返回普通属性的对象。然后通过 nameSet 函数拿到 props 属性。

## createStructuralDirectiveTransform 函数：

**（统一处理指令）**

## transform 指令系列函数：

**transformIf(v-if)**

AST 中添加对应属性，JavascriptAST 中相应变动，在生成 render 函数时，通过 v-if 绑定的变量名，在 render 字符串中添加上三元表达式。

# 四、运行时+编译时合并

此时只能导入模块中的函数进行使用，尚未处理合并的逻辑：

## 1、render 渲染

```js
<script setup>
const { createApp,h } = Vue;
const App = {
    render(){
        return h('div','hello world');
    }
}
const app = createApp(App);
app.mount('#app');
</script>
```

## createApp 函数：

createApp 函数调用 createAppAPI 函数，传入 render 函数拿到结果

## createAppAPI 函数

接受 render 函数，返回 createApp 函数，createApp 函数拿到 rootComponent 和 rootProps 作为参数，定义出 app 对象，声明出 component 属性、container 属性和 mount 方法，mount 方法拿 rootContainer 作为参数，通过 createVNode 函数，传入 rootComponent 和 rootProps 创建出 vnode 虚拟节点，然后调用 render 函数，传入 vnode 虚拟节点和 rootContainer 进行执行。最后返回这个 app 对象

## mount 函数：

为了兼容不同的平台（宿主环境），需要去进行不同的处理：

mount 函数接受参数（选择器字符串或者 dom 元素），通过 nromalizeContainer 函数获取到 dom 元素。mount 方法将 dom 元素作为 rootContainer，通过 createVNode 函数创建出 vnode 虚拟节点，然后调用 render 函数，传入 vnode 虚拟节点和 rootContainer 进行执行。

## normalizeContainer 函数：

如果参数是选择器字符串，就通过 querySelector 选择出 dom 元素，并返回。

## 2、template 模板渲染

```js
<script setup>
const { createApp,h } = Vue;
const App = {
    template:`<div>hello world</div>`
}
const app = createApp(App);
app.mount('#app');
</script>
```

此时 app 中是 template 组件模板，而不是 render 函数，所以需要将模板变为 render 函数。

在 finishComponentSetup 函数中进行判断：如果当前存在 compile 编译器，并且 component 中不存在 render 函数，就利用 compile 函数生成 render 函数，赋值到 component 组件实例中去，最后赋值给：instance 的 render。

# Vue3 更新优化

https://juejin.cn/post/7254092954431668284

## 1、静态提升

Vue3 在处理 template 模板时会对静态模板进行标识。将 ：**静态的模板**（不存在变化的模板）提**升并进行缓存**、静态的**类等样式进行缓存**。

静态提升有利于代码的复用，减少不必要的 DOM 操作和比对（因为它们不会变化）。

## 2、预字符串化

将**不会变化的静态模板字符串缓存保留为 render 函数字符串的形式**

预字符串化跳过了编译时，能有效减少运行时的计算和处理，提高性能。

## 3、缓存事件处理函数

Vue3 会将**事件处理函数在编译阶段缓存起来**，以便在组件整个生命周期中重复使用，避免了重复创建的开销。

缓存事件处理函数使得事件处理这种固定内容的函数不会被重复创建，减少了内存分配和垃圾回收机制的压力。

## 4、Block Tree

Vue3 中的 Block Tree 会将**条件渲染 v-if**和**循环渲染 v-for**的内容封装为一个单独的 Block，从而避免大量的 VNode 节点创建和销毁。

Block Tree 使得 Vue3 在编译之后的模板会被拆分成多个块，每个块对应一个节点或一组节点，这些块可以被独立地更新和渲染，从而避免不必要的渲染操作。

## 5 、patchFlag

Vue3 中引入了 PatchFlag 地概念，会**标记 VNode 中哪些部分在后续可能会发生变化**，从而实现**只对变化的部分进行比较和更新**。

**patchFlag 可选值有：**

- `0` 或 `1`：静态节点，没有动态特性。
- `2`：元素有动态绑定的类。
- `4`：元素有动态绑定的样式。
- `8`：元素有动态绑定的属性。
- `16`：元素有动态绑定的事件监听器。
- `32`：元素有动态绑定的文本插值。
