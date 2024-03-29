---
title: vue原理
date: 2023-11-2 12:24:4
categories:
- vue
tags:
- vue
- 源码
---
# vue

# 一、响应式系统：

#### reactive：

创建代理对象（用于收集依赖）

![image-20240123164938769](C:\Users\44676\Desktop\md\assets\vue1.png)

**需要注意的是：当使用代理对象的this时，其this指向普通对象，导致的结果就是后续使用代理对象收集不到使用this指定的函数，解决方法是通过Reflect反射。**

此时，就创建了代理对象，并将普通对象和代理对象存在map中，此时可以通过Proxy代理的拦截器收集依赖，但是视图中的赋值并不是响应性的（需要执行依赖）。

#### effect：

**副作用函数，用于触发依赖，更新视图**

首先通过reactiveEffect类创建副作用实例：通过实例的run方法可以执行里面的函数

![image-20240123164938769](C:\Users\44676\Desktop\md\assets\vue2.png)

通过track函数收集依赖。**（在Proxy对象的getter中执行）**

![image-20240123164938769](C:\Users\44676\Desktop\md\assets\vue3.png)

通过trigger函数触发依赖  **（在Proxy对象的setter中执行）**

![image-20240123164938769](C:\Users\44676\Desktop\md\assets\vue4.png)

#### ref函数：

![image-20240123164938769](C:\Users\44676\Desktop\md\assets\vue5.png)

#### computed函数：

![image-20240123164938769](C:\Users\44676\Desktop\md\assets\vue7.png)

### scheduler调度器：

![image-20240123164938769](C:\Users\44676\Desktop\md\assets\vue8.png)

### watch函数：

![image-20240123164938769](C:\Users\44676\Desktop\md\assets\vue9.png)

# 二、运行时runtime：

#### createVNode函数：



![image-20240123164938769](C:\Users\44676\Desktop\md\assets\vue10.png)

#### h函数：

![image-20240123164938769](C:\Users\44676\Desktop\md\assets\vue11.png)

#### nodeOps对象：

封装dom元素操作

![image-20240123164938769](C:\Users\44676\Desktop\md\assets\vue13.png)

#### patchProp函数：

根据元素类型（class属性，style属性，事件，dom Properties和其他属性），进行不同的patch打补丁操作

![image-20240123164938769](C:\Users\44676\Desktop\md\assets\vue14.png)

#### render函数：

![image-20240123164938769](C:\Users\44676\Desktop\md\assets\vue12.png)

#### 组件渲染：

![image-20240123164938769](C:\Users\44676\Desktop\md\assets\vue16.png)

### patch函数（diff算法）：

![image-20240123164938769](C:\Users\44676\Desktop\md\assets\vue15.png)



# 三、编译时compile：

将template模板转为render函数。这个过程中共经历了三大步骤：1、解析（解析template模板，生成AST抽象语法树）；2、转化（转化AST，生成 JavaScript  AST）；3、生成（生成render函数）

#### baseParse函数：

baseParse函数**根据template模板**，通过有限自动状态机的概念解析得到**tokens**，然后通过扫描tokens最终得到**AST**（抽象语法树）。

#### transform函数:

transform函数将**抽象语法树AST**转化为**JavaScript  AST**（抽象语法树）。

#### generate函数：

根据**JavaScript AST**（抽象语法树）**生成render函数**。(render函数的本质是字符串，字符串的换行和空格需要进行处理)。

### compile函数：

根据**字符串render函数**通过**new Function(render)()**  方法创建出renderFn函数（这里不用eval函数的原因是出于安全性考虑），改名为compile函数。

#### parseInterpolation函数：

###### （处理插值表达式）

找到 }}  的索引位置，拿到双大括号内部的字符串，通过trim方法去除空格拿  到变量，通过with语法改变作用域，bind语法绑定this指向从而使用这个变量。

#### parseAttributes函数：

###### （处理props属性，v-指令等）

通过正则表达式判断是否是Vue指令，如果是指令，就返回指令对象，如果不是指令就返回普通属性的对象。然后通过nameSet函数拿到props属性。

#### createStructuralDirectiveTransform函数：

###### （统一处理指令）

#### transform指令系列函数：

###### transformIf(v-if)

AST中添加对应属性，JavascriptAST中相应变动，在生成render函数时，通过v-if绑定的变量名，在render字符串中添加上三元表达式。



# 四、运行时+编译时合并

此时只能导入模块中的函数进行使用，尚未处理合并的逻辑：

### 1、render渲染

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

#### createApp函数：

createApp函数调用createAppAPI函数，传入render函数拿到结果

###### createAppAPI函数

接受render函数，返回createApp函数，createApp函数拿到rootComponent和rootProps作为参数，定义出app对象，声明出component属性、container属性和mount方法，mount方法拿rootContainer作为参数，通过createVNode函数，传入rootComponent和rootProps创建出vnode虚拟节点，然后调用render函数，传入vnode虚拟节点和rootContainer进行执行。最后返回这个app对象

#### mount函数：

为了兼容不同的平台（宿主环境），需要去进行不同的处理：

mount函数接受参数（选择器字符串或者dom元素），通过nromalizeContainer函数获取到dom元素。mount方法将dom元素作为rootContainer，通过createVNode函数创建出vnode虚拟节点，然后调用render函数，传入vnode虚拟节点和rootContainer进行执行。

###### normalizeContainer函数：

如果参数是选择器字符串，就通过querySelector选择出dom元素，并返回。



## 2、template模板渲染

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

此时app中是template组件模板，erbushirender函数，所以需要将模板变为render函数。

在finishComponentSetup函数中进行判断：如果当前存在compile编译器，并且component中不存在render函数，就利用compile函数生成render函数，赋值到component组件实例中去，最后赋值给：instance的render。

# 

# 

# 

# 

# Vue3更新优化

https://juejin.cn/post/7254092954431668284

###### 1、静态提升

Vue3将  ：**静态的模板**（不存在变化的模板）提**升并进行缓存**，静态的**类等样式进行缓存**，这样不用每次都重新更新

###### 2、预字符串化

将**不会变化的静态数据转换为字符串**，以减少运行时的计算和处理。

###### 3、缓存事件处理函数

Vue3会将**事件处理函数在编译阶段缓存起来**，避免了重复创建的开销。

###### 4、Block Tree

Vue3中的Block Tree会将**条件渲染v-if**和**循环渲染v-for**的内容封装为一个单独的Block，从而避免大量的VNode节点创建和销毁。

此外，Vue3编译之后的模板会被拆分成多个块，每个块对应一个节点或一组节点，这些快可以被独立地更新和渲染，从而避免不必要的渲染操作。

###### 5 、patchFlag

Vue3中引入了PatchFlag地概念，会**标记VNode中哪些部分发生了变化**，从而**只对变化的部分进行比较和更新**。

