---
title: vue-router
tags: vue-router原理
categories: vue-router原理
date: 2024-04-12 15:01:09
---

# 

# vue-router源码

### vue-router路由模式

#### hash模式（#）

SEO不友好，资源不变，不会刷新。

#### history模式（/）

SEO友好，重新请求资源。

**history模式发布时出现的问题：**

发布到服务器上时，点击路由跳转正常但是刷新后路由跳转404，出现的原因刷新后跳转的根路径并不是当前项目的index.html导致资源路径不匹配单页面应用路由，采取的方法是**每次请求资源都fallback到index.html文件**，可以使用静态资源服务器的支持。（例如在nginx中location字段添加：**try_files字段**）

### vue-router内部处理

###### vue-router主体架构：

当使用vue.use(vue-router)时，会执行vue-router导出的实例中的install方法，将app作为参数传入，内部会用app.component注册两个全局组件RouterLink和RouterView，接着在app.config.globalProperties上设置$route和$router属性，通过app.provide将router和currentRoute传递下去。

###### 路由变化但不跳转原理：

history.pushState和history.replaceState方法，会改变地址栏的但不进行跳转。

###### history模式实现路由匹配：

内部的mather函数会将routes中的path路径转为正则表达式，与当前的路由进行匹配，匹配成功就将对应的组件添加到router-view中。

###### router-view实现路由展示：

```js
import { defineComponent } from vue;
import Home from '../views/Home';  //导入默认的全部组件
const routerView =  defineComponent({
    name:"routerView",
    props:{},
    setup(props , { slots }){
        return ()=>{
            // return h('div',{        //不使用组件默认的方式
            //     class:'routerViewClass',
            //     onClick(){
            //         //处理点击 逻辑
            //     },
            // },slots.default())
            return h(Home,{
                onClick(){
                    //处理对应的逻辑
                }
            })
        }
    },
})
export default routerView;
```

路由provide一个currentRoute（shallowRef对象）将当前的路由路径捆绑在一起，传递下去，当currentRoute发生变化的时候就会改变相应的router-view。
