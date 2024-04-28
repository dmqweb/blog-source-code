---
title: Vue杂记
date: 2023-1-12 12:24:4
categories:
- Vue
tags:
- Vue
---
## Vue注意事项

一、使用watch监听数组时：

当使用watch监听数组时，要将deep设置为true，这样才能监听到数组内部的操作，而不是只监听引用是否变化，当需要使用newValue和oldValue时，监听部分需要写数组的拷贝而不是数组本身（否则当数组引用不变而堆数据变化时，oldValue和newValue都是变化之后的数值。）

## Vue项目创建过程：

（
①创建项目 `vue create 项目名`
②安装开发依赖：`yarn add 包名@版本号 -D`
③安装生产依赖: `yarn add 包名`，并在main.js中引入和全局属性

）
css选择器和权重的计算
font-size和字体详解（小写x为基准）
小黑记事本案例
vue中结合网络数据库开发应用（axios网络请求库）、
前端避雷技术：Jequry、Angular js、php、rubian rails构建应用程序
form-serialize插件获取表单的各项

## Vue知识点

{

Vue文件分类：将Vue文件分为页面文件和可复用的文件

###### 一、vue项目初始化：

（①vue create文件名②cd进入文件夹③yarn add添加引用包④main.js引入样式(引用方式)⑤vue.config.js中禁用eslint检查)

###### 二、vue组件使用：

（①在components文件夹下添加vue文件组件②在App.vue中import组件form'路径'③在export default的componets下注册组件，有些可简写④div中用组件名使用组件）

###### 三、vue中export default中的属性：

（name,components,props,created,mounted,data,methods，watch,computed,activated,deactivated）

###### 四、vue中使用axios

（①下载axios包（yarn add axios）②在main.js中引入(impoort axios from 'axios')③配置基础地址（axios.defaults.baseURL="https://www.escook.cn"）④将axios挂载到Vue原型上，作为全局属性（在main.js中添加：Vue.prototype.$axios=axios），⑤App.vue的created中使用全局属性axios⑥接口地址为/api/cart⑦进行数据渲染） 

###### 五、动态组件：

（①创建要被切换的组件样式②引入到要展示的vue文件中，注册③变量承载要显示的组件名④设置承载点<component :is="变量"></component>⑤点击按钮，切换comName的值为要显示的组件名⑥使用vue内置的keep-alive组件，将抱起来的组件缓存起来<keep-alive></keep-alive>  )

###### 六、组件插槽

（①通过slot标签占位，让组件内可以接受不同的标签结构样式，为了让封装的组件显示不同的标签结构（灵活），②使用：在模板中添加<slot>默认内容</slot>占位，引入模板时在模板内添加占位标签里的内容③具名插槽：子组件，在slot上绑定name="name值"，在使用组件，传入自定义标签，用template标签内加v-slot="name值"）④作用域插槽：使用子组件时在template中使用scope

###### 七、自定义指令

（①全局注册：Vue.directive("指令名",{"inserted" (el,binding){对el标签扩展额外的功能②局部注册：export.default中添加配置项directives:{"指令名":{inserted(el,binding){对el进行操作}}}})③使用：在标签内添加属性:v-指令名="binding.value"(将自定义传值与指令操作相关联)）自定义指令中除了inserted方法还有update方法

###### 八、父子组件数据交互

（①在父组件中引入和注册并使用②子组件定义好props属性，设定值得类型与校验③子组件中使用设定的props数据④父组件data中定义好子组件中props属性中的相应类型的值⑤父组件中使用时:绑定子组件props中的数据）

###### 九、切换组件显示

（①）

###### 十、vue组件之间传值

（一、父组件给子组件传值：①父组件使用子组件时，:绑定值，并在data中注册②子组件props中注册相同名称的值）
（二、子组件给父组件传值：①在子组件中使用this.$emit方法自定义一个事件并传值②在父组件中使用该事件通过函数操作传来的值）

## 十一、Vue-router

①安装npm i vue-router@(vue2用3的版本,vue3用4版本)

②安装：运行命令yarn add vue-router安装

③配置：src下新建router文件夹，下面的index.js中进行配置：

```js
imprt Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)
```

④创建路由组件：src下的views文件夹下新建vue页面

⑤创建路由组件：在router里index.js中引入：

```js
import Home from '../views/Home.vue'
```

⑥配置路由表：将路由与组件进行映射：

```js
const routes = [
  { path: '/', component: Home },
  { path: '/about', component: About },
  // 更多路由配置...
]
```

⑦创建router实例

```js
const router = new VueRouter({
  routes
});
```

⑧Vue中挂载router

```js
new Vue({
  router,
  render: h => h(App)
}).$mount('#app');
```

###### 十二、跨组件传值（没有引用关系）

（①创建文件夹EventBus，下面创建index.js文件，文件中引入Vue，并默认导出空对象②）
十三、this.$refs获取组件 , 通过组件中ref属性，调用组件中的函数（①组件使用时添加ref属性，使用时通过this.$refs.ref属性.函数名()  ）
十四、this.$nextTick(fn(){})方法中等待DOM更新后触发$nextTick中的函数（ref中的函数会在DOM更新之前触发，DOM更新是异步任务），他可以保证我们在调用子组件的方法时使用到的数据是最新的数据。$nextTick函数原地返回一个Promise对象，主动在js中触发标签事件：获取DOM对象，调用事件方法
十五、name属性的作用：注册时可以定义自己的名字
十六、组件缓存<keep-alive></keep-alive>组件，
十七、动态组件：<component :is=" "></component>
十八、组件插槽（具名插槽）：①目的：为了让封装的组件显示不同的标签结构    ②使用：<slot #name值=“子组件传值的属性”     或   v-slot:name值=“子组件传值的属性”>     </slot>占位(**注意vue2中，只能使用v-slot，vue3中只能使用#name值)  ③使用定义的组件，传入具体的标签替换到slot
             ③插槽默认内容，子组件slot内部书写默认内容④作用域插槽：使用子组件内的变量：(方法:在slot上绑定属性和子组件内的值，在使用组件，传入自定义标签，父组件中用template标签scope属性）
十九、自定义指令：一、①全局方法②局部注册  二、自定义指令传值
自定义指令的生命周期:①bind②inserted③update④componentUpdated⑤unbind
二十、Vue生命周期【创建，挂载，更新，销毁】 （1）beforeCreated 此时拿不到data中的数据（2）created data和methods初始化之后，此时可以拿到变量 （3）beforeMount 挂载之前拿不到真实的DOM （4）mounted 挂载之后，可以使用真实DOM （5）beforeUpdate 真实DOM更新之前（6）updated 更新之后，当数据发生变化并更新页面后执行，可以获取更新之后的DOM （7）beforeDestroy 销毁之前（8）destroyed 销毁之后 
二十一、通过ref获取标签里面的对象（尤其是组件）this.$refs.值获取组件对象【组件通信，但不常用】
二十二、this.$nextTick(fn()) 原地返回Promise对象，使用 $nextTick 可以在下一次 DOM 更新周期结束之后执行回调函数，确保在更新后进行相关操作。
二十三、动态组件:<component :is=''>多个组件在同一个挂载点出现
二十四、组件缓存 <keep-alive></keep-alive>将包起来的组件缓存起来
二十三、在使用组件缓存的时候，会多出两个钩子函数：activated 激活状态 与deactivated失去激活状态
二十四、slot组件插槽：在组件内部不确定内容的位置设置slot标签，标签内是默认内容，父组件使用组件时中间的内容是插槽的内容
二十五、作用域插槽（使用插槽时，想使用子组件内的变量）①子组件在slot上bind绑定属性和值②使用组件时用v-slot=名 获取到组件对象，进而使用组件对象中绑定的属性和值

## 二十六、Vue-router路由系统 

①下载vue-router路由系统使用
yarn add vue-router
②在main.js中引入VueRouter函数,和带切换的页面
import VueRouter from 'vue-router'
import My from '@/views/my'
③添加到Vue.use（）身上-注册全局RouterLinkRouterView组件
Vue.use(VueRouter)
④创建路由规则数组-路径和组件名对应关系
const routes = [{path:'/my',component:My},{其他}]
⑤用规则生成路由对象
const router = new VueRouter({
routes })
⑥将路由对象注入到new Vue实例中
new Vue({
  el: '#app',
  router, // 将路由对象注入到 Vue 实例中
  render: h => h(App)
});
⑦App.vue中用router-view标签作为挂载点，切换不同的路由页面
<router-view></router-view>
---------------export default router;导出之后可以全局进行引入(App.vue中export default{router,})
二十七、声明式导航（传参），①可以用<router-link to="url"></router-link>，其中to里面不用写#号。标签来代替要跳转到指定页面的a标签（本质上相同，但是添加了自带类名，自带导航高亮）②跳转传参：方法一：在router-link中的to属性上传值 ，to="url/path?参数名=值"。在视图vue的标签中{{$route.query.参数名}}使用。方法二： 定义路由规则时添加路径{path：”/first/:name“ ” ,component:First}。然后传值<router-link to="/first/值"></>。再{{$route.params.name}}使用

二十八、路由重定向，在路由规则中进行匹配({path:"/",redirect:"/find"})
二十九、路由404设置，找不到页面时进行返回404页面（404一定要在路由规则末尾），使用{path:"*",component:NotFound}
三十、路由模式::①hash路由：url/#/home（哈希路由可以直接被浏览器识别）②history路由：url/home③将hash路由更改为history路由：在new VueRouter配置项中mode:"history"（*注意history路由会将路径中识别为文件夹，要在服务器端进行设置）
三十九、路由守卫（main.js中对路由权限进行和判断）
 `router.beforeEach(to,from,next)=>{`
 `//next是一个函数体，只有next()执行才会让路由正常跳转，next(false)则停留，next("修改到另一个路由路径"，不执行则不跳转)`
      `router.beforeEach((to,from,next)=>{`
            `if(to.path === '/my' && isLogin === false){`
            `alert('请登录');    next(false)`
`}else{    next()        }})}`
三十一、编程式导航（js方式跳转路由，先给标签添加点击事件，然后将路径作为值传进函数），接着在函数内部，方法一：this.$router.push({path:"函数中的路径值"})
方法二：this.$router.push({name:"路由名称"}) 注意用name跳转时，浏览器上的url不会改变（无感知跳转，方便修改）
三十二、编程式导航（跳转传参）方法一：①this.$router.push({path（或name）:"路由路径",name:”路由名“，query:{"
参数名"：值}})②使用时用{{$route.query.name}}
方法二(使用path时会忽略params)：this.$router.push({name:"路由名称",name:”路由名“，params:{"
参数名"：值}})②使用时用 {{$route.params.username}}
（可以组合但是path和params组合不能一起使用）
三十三、路由嵌套：①创建二级路由页面：views文件夹下新建文件夹和vue文件②main.js中配置二级路由{path:"/first",component:First,children:[{path:"one",component:One},]} (*注意二级路由路径中不加/符) ③在一级页面中设置<router-link to="二级路由路径">，再设置<router-view>标签显示二级路由页面
三十四、router-link激活的2个类型的区别（url上的hash值包含a标签href，就添加模糊匹配的类名，若url上的hash和导航的a标签完全匹配就添加精确匹配的类名）
三十五、路由守卫：（main.js中，在生成路由对象之后）router.beforeEach((to,from,next)=>{ 判断和处理 })  【其中to表示要去到的url，from表示从哪里跳转的，next()调用才能让路由正常的跳转切换，next(false)在原地停留，next(‘强制修改到另一个路由路径上’)，如果不调用next,则页面留在原地 】
三十六、Vant组件库【Vant是一个轻量、可靠的移动端Vue组件库，开箱即用】 （注意vue版本号和vant版本号的兼容性问题）
三十七、支持组件自定义，在组件使用时传值，子组件中使用props接受 ，:style=“{使用绑定的值和属性}”
三十八、将axios挂载到vue原型上，方便全局使用 

【总结】 

}

## ****分析总结：

一、**动态组件和vue-router
动态组件可以根据具体的条件和状态来灵活地切换和加载组件，这种切换是在同一个组件内部进行的，不涉及 URL 的变化和页面的跳转。可以用于组件复用，条件渲染，动态加载和替换部分组件（轻量灵活，不需要路由跳转和重新渲染，组件复用减少代码重复）
二、编程式导航和路由式导航
①声明式导航（路由式导航）：

声明式导航是通过在模板中使用指令（如 <router-link>）或组件（如 <router-view>）来定义和触发路由跳转的方式。

它基于 Vue Router 提供的组件和指令，使得在模板中进行页面导航更加简洁和直观。

②声明式导航适用于那些在模板中静态定义的导航链接，例如菜单、导航栏等。通过声明式导航，你可以直接在模板中定义导航链接，点击链接时自动触发路由跳转。
编程式导航：

编程式导航是通过在代码中以编程方式触发路由跳转的方式。

它使用路由实例的方法来进行导航，例如使用 router.push 方法进行页面跳转。

编程式导航适用于那些需要根据特定条件或用户操作来触发页面跳转的场景。通过编程式导航，你可以在任何地方、任何时候根据需要进行页面的跳转。


}
****注意**
/* css中禁止双击选中文本 */
.element {
  user-select: none;
}

原始类型的值不能直接取反，（true&&false）,可以使用Obj.true进行取反
当父亲组件给子组件传值，需要通过对象的项目引用的关系来影响对象里面的值时，需要使用props的对象方法，而不能用数组方法
element-ui适用于vue2项目，vue3项目需要使用element-plus
v-bind:“ ” ，里面是属性时直接写，里面不是属性时要加括号
v-for遍历对象时，加上key属性，有id绑定id，没有id绑定index
过滤器使用场景：①在插值语法中使用②在v-bind中value | 过滤器1 | 过滤器2
过滤器使用于差值表达式和动态绑定中：管道符前面是过滤器的第一个·参数，过滤器的第二个参数写在其()里面
计算属性：相比于函数带有缓存，减少了函数的执行
侦听器：①侦听值：watch:{变量名（newVal,oldVal）{改变时发生的事件}}
②侦听对象：watch:{"侦听的名称"：{immediate:true,deep:true,handler(newVal,oldVal){侦听值改变时的操作} }}
ajax ：异步请求后端的技术,基于原生ajax+Promise技术封装通用于前后端的请求库（原理是XMLHttpRequest）
@是vue中src的绝对路径（webpack）,#是当前页面的路径
props类型校验：props:{name:String,color:{type:String,required:true,default:red}} 其中有自定义校验规则(验证器validator)：validator(value){校验函数体}
v-model绑定input值时，只能使用简易的没有歧义的js语法，若要使用较难的js语法需要使用watch进行监听（监听对象时，需要用深度监听）
计算属性的get方法在访问这个计算属性时触发，当模板首次渲染，或者当计算属性所依赖的响应式数据发生变化时重新触发
arr.reduce((sum,obj)=>{函数体},0)  返回累加和sum，sum的初始值为0（自定义）

## 代码部分

------------------------------------------------------------------------------------------------------------------------------【*】路由导航中代码：(main.js)

`import Vue from 'vue'`
`import App from './App.vue'`
`Vue.config.productionTip = false`
`// 引入`
`import VueRouter from 'vue-router'`
`import First from '@/views/First'`
`import Second from '@/views/Second'`
`import Third from '@/views/Third'`
`import NotFound from '@/views/NotFound'`
`import ViewsOne from '@/views/Second/ViewsOne'`
`import ViewsTwo from '@/views/Second/ViewsTwo'`
`import ViewsThree from '@/views/Second/ViewsThree'`

`// 注册全局组件`
`Vue.use(VueRouter)`
`// 规则数组`
`const routes = [`
  `// 匹配默认hash值路径,重定向到页面，检测网页打开的默认路由`
  `{`
    `path: '/',`
    `redirect: "/second",`
  `},`
  `{`
    `path: '/first',`
    `component: First,`
    `name: "First",`

   ``meta:{title:"首页"}             //meta元字符，用于传值，路由组件可以通过this.$route.mata.属性名 拿到`

  `},`
  `{`
    `path: '/second',`
    `component: Second,`
    `name: 'Second',`
    `// 给页面配置二级路由`
    `children: [`
      `{`
        `path: "viewsone",`
        `component: ViewsOne`
      `},`
      `{`
        `path: "viewstwo",`
        `component: ViewsTwo`
      `},`
      `{`
        `path: "viewsthree",`
        `component: ViewsThree`
      `},`
    `]`
  `},`
  `{`
    `path: '/third',`
    `component: Third,`
    `name: "Third"`
  `},`
  `// 绑定值给视图`
  `{`
    `path: '/first/:name',`
    `component: First,`
    `name: 'First'`
  `},`
  `{`
    `path: '/second/:name',`
    `component: Second,`
    `name: "Second",`
  `}, {`
    `path: '/third/:name',`
    `component: Third,`
    `name: "Third"`
  `},`
  `// 404一定在配置在规则数组最后`
  `{`
    `path: "*",`
    `component: NotFound`
    `, name: "NotFound"`
  `}`

`]`
`// 生成路由对象`
`const router = new VueRouter({`
  `// routes是固定的key，传入规则数组`
  `routes,`
  `// 默认不写是hash值`
  `mode: "history"`
`})`
`// 路由守卫，根据路由做出判断`
`const isLogin = false`
`router.beforeEach((to, from, next) => {`
  `if (to.path === '/first' && isLogin === false) {`
    `alert('请登录')`
    `next(false)  //阻止路由跳转`
  `} else {`
    `next()  //正常放行`
  `}`
`})`
`new Vue({`
  `router,`
  `render: h => h(App),`
`}).$mount('#app')`



## Vue项目工具

###### 1、vant组件库（移动端vue组件库）

一、下载安装（根据vue版本）、引入(import)和全局注册(Vue.use)（main.js中）、直接使用Vant组件名
二、按需引入：安装（`yarn add @vant/auto-import-resolver unplugin-vue-components -D`）、配置、使用、引入

###### 2、element-ui（PC端vue组件库）

###### 3、postcss  （vue项目插件，配合webpack翻译css代码）

postcss-pxtorem （ 配合webpack , 自动将 px 转成 rem ）

一、下载 postcss    和    postcss-pxtorem

`yarn  add  postcss  postcss-pxtorem`

`二、文件夹 src下新建postcss.config.js

`module.exports = {`

`plugins:{`

`'postcss-pxtorem':{`

`//能够将所有元素的px单位转成rem`

`//rootValue：转换px的基准值。`

`//例如一个元素宽是75px，转换成rem之后就是2rem 。`

`rootValue:37.5 ,`

`propList:['*']`

`}}}`

## Vuex介绍

```js
npm  install vuex --save
import  Vuex from  'vuex'
Vue.use(Vuex)
const store = new Vuex.Store({ state:{count:0} }) 
new Vue({ el:'#app', render:h => h(app) , router , store })
```

### Vuex基础

一、Vuex的介绍（创建store仓库，项目中大范围进行数据共享）
1、简介：Vuex 是一个专为 Vue.js 应用程序开发的状态管理模式。
它采用集中式存储管理应用的所有组件的状态，并以相应的规则保证状态以一种可预测的方式发生变化。Vuex 也集成到 Vue 的官方调试工具 devtools extension (opens new window)，提供了诸如零配置的 time-travel 调试、状态快照导入导出等高级调试功能。

Vuex就是用来存放全局变量的，供所有组件使用

2、通俗理解
Vuex相当于一个仓库，仓库中可以存全局变量，方法。一个项目一个仓库，Vuex充当项目的存储模块

#### Vuex的模块 

#### （store中：state、mutations（commit）、actions（dispatch）、getters（getters）、Module（ this.$store.commit（’子模块名/键名‘））

三大模块中  辅助函数  使用时导入：（使用辅助函数形式时，传参需要在事件发生处传值）     子组件中：

```js
import { mapState ,mapMutations,mapActions} from 'vuex'  //导入辅助函数
computed:{
    ...mapState(['键值'])       //计算属性中使用state中的值
    //直接使用
}
methods：{
    ...mapMutations(['函数1'，'函数2'])       //methods中使用Mutations中的函数
    ...mapActions(['函数1'，'函数2'])        //methods中使用Actions中的异步函数
    //直接使用
}
```

（模块中定义函数时，第一个参数为state，方便拿到其中的数据，通过state.数据名）

###### 【1】`state`数据

【】     共享状态数据，存数据

（1）定义 （在main.js中Vuex.Store中：）

（2）组件获得数据的方式：

①组件通过$store.键名  获得数据

②从vuex中按需导入mapState函数，将全局数据，映射为当前组件的计算属性（子组件中）

```js
import  { mapState }  from  'vuex'
computed:{ ...mapState(['键名'])  }
```

###### 【2】`mutaitions`修改（函数）

【】   修改state**必须**通过mutations，但其只能执行同步代码，改数据

（1）定义函数，传参state，通过state.名得到state中的数据进行修改 （在main.js中Vuex.Store中：）

（2）组件在组件函数中，通过如下，调用state中的函数并传参

```vue
this.$store.commit（'函数名'，形参）
//main.js中：
mutations:{函数名：}
```

（3）`...mapMutations(['函数名',’函数名2‘])  辅助函数`（***需要导入），组件函数中使用，子组件函数名与mutations中函数名保持一致，

传参在事件发生处（@click='fn(参数)'）

```
子组件中import  { mapMutations ..等 }  from  'vuex'
methods中：{...mapMutations(['键名1，键名2']) ,
 函数()里通过  this.键名() 调用
```

###### 【3】`actions`   异步

【】执行异步操作，数据提交给**mutations**进行修改，从后端获取数据，更新到state中的count中（main.js中）

【】注意在action中，不能直接修改state中的数据，必须通过**context.commit（）函数**触发某个mutation才行（main.js中）

（1）在actions中定义函数并传参 （在main.js中Vuex.Store中：）

（2）actions方法参数：

①`context`，相当于组件中的this.$store，即获得store中的值

②形参，用于传值

（3）组件中调用actions（传参时，在定义actions函数时要接收）

①原始形式调用：`this.$store.dispatch("函数名"，形参)`

②辅助函数形式调用（***需要导入）：

子组件中导入，methods方法中使用：

```vue
...mapActions(['函数名','函数名2']，)
//子组件函数中调用（如下）  或者直接在子组件触发事件上使用函数 @click="函数名(形参)"
子组件函数(){
this.函数名（形参）
this.函数名2(形参)  }
```

###### 【4】`getters`计算（包装数据）

【】从state中派生出一些状态，这些状态是依赖state的（相当于计算属性，二次处理数据），此时会用到getters

（1）定义getters，并传参（在main.js中Vuex.Store中：）

（2）组件中调用getters  

①原始形式调用：`this.$store.getters.函数名`,  接着直接在页面使用： {{函数名}}

②辅助函数调用：（***需要引入）: ...mapGetters(['函数名'，’函数名2‘])    导入到computed计算属性中，页面中  {{函数名}}  使用

###### 【5】`Module`模块化

【】所有的数据、更新、操作都在一起，项目越大，越难维护，因此推出Vuex模块化（子模块中使用）

（1）定义子模块Modules （在main.js中Vuex.Store中：）

```vue
modules:{  子模块name1:{state:{ 键：值 }} ， 子模块name2:{state:{ 键：值 }}  } 
```

（2）组件中使用

```vue
$store.state.子模块name.子模块键
```

（3）快捷使用

在getters中定义，之后直接使用自定义的名称（①引入mapGetters，②在computed中扩展 ：...mapGetters(['自定义名1'，'名2'])）

```vue
getters:{  自定义名  : state => state.子模块名.子模块键 ，    }
```

###### 【6】模块化中的`namespaced`命名空间

【】默认情况下，模块内部的action、mutation和getter是注册在全局命名空间的，这样使得多个模块能够对同一mutation或者action做出响应

（各模块中函数中state表示子模块中的state），此时可以通过namespaced命名空间 对模块进行封锁

（1）使用命名空间：

```vue
modules:{  子模块名1： namespaced:true   ,state:{....},.....   }
```

（2）调用数据的方法:

开启命名空间后，组件中读取state数据：
①//方式一：自己直接读取

```
this.$store.state.personAbout.list
```

②//方式二：借助mapState读取：

```
...mapState('countAbout',['sum','school','subject']),
```

开启命名空间后，组件中读取getters数据：
//方式一：自己直接读取
![

```
this.$store.getters['personAbout/firstPersonName']
```

]()

//方式二：借助mapGetters读取：

```
...mapGetters('countAbout',['bigSum'])
```



5. 开启命名空间后，组件中调用dispatch
    //方式一：自己直接dispatch

  ```
  this.$store.dispatch('personAbout/addPersonWang',person)
  ```

  

//方式二：借助mapActions：

```
...mapActions('countAbout',{incrementOdd:'jiaOdd',incrementWait:'jiaWait'})
```

开启命名空间后，组件中调用commit
//方式一：自己直接commit

```
this.$store.commit('personAbout/ADD_PERSON',person)
```

//方式二：借助mapMutations：

```
...mapMutations('countAbout',{increment:'JIA',decrement:'JIAN'}),
```

### 

### 使用、配置Vuex  

####  (main.js中配置，组件通过this.$store获得 )

1、安装：进入项目终端，输入
npm install vuex@3

2、引入

1）终端启动项目

npm run serve
（2）在mian.js文件引入vuex，使用Vuex

```js
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Vuex from 'vuex'    //引入

Vue.config.productionTip = false

Vue.use(Vuex)    //使用

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
```

3、创建使用实例

```js
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Vuex from 'vuex'//引入

Vue.config.productionTip = false

Vue.use(Vuex)

const store = new Vuex.Store({})    //创建实例，注意Vuex.Store的大小写

new Vue({
  router,
  store,    //使用
  render: h => h(App)
}).$mount('#app')
```

4、代码例子

```js
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Vuex from 'vuex'//引入

Vue.config.productionTip = false

Vue.use(Vuex)

const store = new Vuex.Store({
  state:{
    count:0,
  },
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
```

 去任意页面获取显示count数据

<template>
  <div class="home">
    <h1>这是count：{{ $store.state.count }}</h1>
  </div>
</template>
### 项目中使用vuex

一、在src文件中新建store下新建modules下新建 模块名 . js文件

二、模块中结构：

```vue
export default{
namespaced:true , state{} , mutations:{} , actions:{}       }
```

三、在store下index.js中引入定义的模块

```vue
import  模块名  from  '路径'
export  default  new  Vuex.Store({
state:{} , mutations:{} , actions:{} , modules:{模块名1，模块名2}     })
```



###### 封装

1、新建
文件夹store-->在文件夹下新建store.js-->进行以下配置

import Vuex from 'vuex'
import Vue from 'vue'

Vue.use(Vuex)

const store = new Vuex.Store({
    state:{
      count:0,
    },
  })

export default store    //将值导出给main.js
 2、main.js文件
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from '@/store/store'    //引入

Vue.config.productionTip = false

new Vue({
  router,
  store,    //使用
  render: h => h(App)
}).$mount('#app')
四、state状态存放
1、简介
用于存放全局变量，供任意组件访问

2、使用：$store.state.变量名
（1）在store.js这个封装文件，定义需要的变量

import Vuex from 'vuex'
import Vue from 'vue'

Vue.use(Vuex)

const store = new Vuex.Store({
    state:{
      count:0,
      userInfo:[
        {
            name:'申小兮',
            age:18,
        },
        {
            name:'老墨',
            age:34,
        },
      ]
    },
  })

export default store

（2）在任意vue文件进行输出，显示

<template>
  <div class="home">
    <h1>这是count：{{ $store.state.count }}</h1>
    <h1>卖鱼的{{ $store.state.userInfo[1].name }}</h1>
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'HomeView',
  created(){
    console.log('count',this.$store.state.count);
    console.log('userInfo',this.$store.state.userInfo);
  }
}
</script>



###### getters状态派生

1、简介
有时候我们需要从 store 中的 state 中派生出一些状态，类似Vue中的computed计算属性的功能，例如：格式化数据等。

处理数据：当我们想用或修改的数据，在多个组件或页面，且需要统一修改时，这个状态可以很方便进行修改。

使用：$store.getters.变量名

2、参数
（1）state参数：每个getters都是一个方法，接受 state 作为其第一个参数，用来访问vuex中的state数据

import Vuex from 'vuex'
import Vue from 'vue'

Vue.use(Vuex)

const store = new Vuex.Store({
    state:{
      count:0,
      userInfo:[
        {
            name:'申小兮',
            age:18,
        },
        {
            name:'老墨',
            age:34,
        },
      ]
    },
    getters:{
        info(state){
            console.log(state);
            return `告诉${state.userInfo[1].name}，我想吃鱼了`
        }
    }
  })

export default store

<template>
  <div class="home">
    <h1>这是count：{{ $store.state.count }}</h1>
    <h1>卖鱼的{{ $store.state.userInfo[1].name }}</h1>
    <h2>{{ $store.getters.info }}</h2>
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'HomeView',
  created(){
    // console.log('count',this.$store.state.count);
    // console.log('userInfo',this.$store.state.userInfo);
    console.log('getters',this.$store.getters.info);
  }
}
</script>



 （2）getter参数：获取自己本身的数据

getters:{
    info(state,getter){
        console.log('state：',state);
        console.log('getter：',getter);
        return `告诉${state.userInfo[1].name}，我想吃鱼了`
    }
}


3、绑定点击改值事件
事件的错误使用

<template>
  <div class="home">
    <h1>这是count：{{ $store.state.count }}</h1>
    <div>
      <button @click="add">+</button>
      <button @click="sub">-</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomeView',
  created(){
    console.log('getters',this.$store.getters.info);
  },
  methods:{
    add(){
      this.$store.state.count++
    },
    sub(){

    }
  }
}
</script>



观察上图发现：在点击改变count值时，虽然页面跟着变化了，但是vuex检测系统并没有变化，只有鼠标去触发才会更新

那么怎样才能正确修改count值呢？这时候就要介绍第三个状态mutations🧐

###### mutations状态修改

1、简介
更改 Vuex 的 store 中的状态的唯一方法是提交 mutation。每个 mutation 都有一个字符串的 事件类型 (type) 和 一个 回调函数 (handler)，类似Vue【子向父通信】的emit

每个mutations都是一个方法，接受 state 作为第一个参数，payload 作为第二个参数

（1）state：用来访问vuex中的state数据

（2）payload：获取此次mutation提交的数据荷载

注意：mutation中不能在异步函数里修改state值，必须是同步函数

2、使用
（1）提交形式：$store.commit(type, payload)

（2）state参数

mutations:{
    addCount(state){
        console.log('M',state);
        state.count++
    }
}
add(){
    this.$store.commit('addCount')
},
（3）payload参数

mutations:{
    addCount(state,payload){
        console.log('M',state);
        state.count+=payload
    }
}
add(){
  this.$store.commit('addCount',10)
},


 （4）对象写法

add(){
  this.$store.commit({
    type:'addCount',
    num:10
  })
},
mutations:{
    addCount(state,payload){
        console.log('M',state);
        state.count+=payload.num
    }
}
3、模拟接口
（1）例子1：接口是异步的，我们用定时器类比

mutations:{
    getStudentInfo(state){
        setTimeout(()=>{
            let info = {name:"张三",age:43}
            state.studentInfo.push(info)
        })
    }
}
created(){
  this.$store.commit('getStudentInfo')
},
<h3>{{ $store.state.studentInfo }}</h3>
（2） 例子2：在异步中改变count

addCount(state,payload){
    console.log('M',state);
    setTimeout(()=>{
        state.count+=payload.num
    })
},


 这时候发现，vue编译器每次会比实际数据慢一次，这个问题是为什么？因为mutation无法处理异步问题

注意：mutation必须是同步函数，这时候就引出第四个状态actions，来解决mutation的异步问题

###### actions状态修改

1、简介
Action 类似于 mutation，不同的是Action用于提交mutation，而不是直接变更状态；且Action 可以包含任意异步操作

2、使用
每个Action都是一个方法，接受 context 作为第一个参数，payload 作为第二个参数

（1）提交形式：$store.dispatch(type, payload)

（2）参数

①context参数：store实例对象，用以调用mutation、访问state

②payload参数：获取此次mutation提交的数据荷载

（3）解决第六大点mutations无法解决的异步问题

mutations:{
    addCount(state,payload){
        console.log('M',state);
        state.count+=payload.num
    },
    getStudentInfo(state,payload){
        state.studentInfo = payload
    }
},
actions:{
    getInfoApi(context){
        setTimeout(()=>{
            let info = {name:"张三",age:43}
            context.commit('getStudentInfo',info)
        })
    },
    addTime(context){
        setTimeout(()=>{
            context.commit({type:'addCount',num:10})
        })
    }
}

methods:{
  add(){
    this.$store.dispatch('addTime')
  },
  sub(){
    this.$store.dispatch('getInfoApi')
  }
}

<template>
  <div class="home">
    <h1>这是count：{{ $store.state.count }}</h1>
    <div>
      <button @click="add">+</button>
      <button @click="sub">-</button>
    </div>
    <h3>{{ $store.state.studentInfo }}</h3>
  </div>
<template>

（5）几个状态使用的连接

①State：存储数据。调用语句$store.state.变量名
②Getter：更好的处理数据，但是无法实时改变后台数据。调用语句$store.getter.变量名
③Mutation：任意更改state的数据，但是只允许同步函数。调用语句$store.commit(type, payload)
④Action：不能改state数据，但是可以帮助mutation做异步操作。调用语句$store.dispatch(type, payload)

八、Module模块化
1、简介
（1）原因：由于使用单一状态树，应用的所有状态会集中到一个比较大的对象。当应用变得非常复杂时，store 对象就有可能变得相当臃肿。

（2）解决：为了解决以上问题，Vuex 允许我们将 store 分割成模块（module）。每个模块拥有自己的 state、mutation、action、getter。

2、理解
将 store 内的state、mutation、action、getter每个完整的对象分割成一个个单独的模块（module），然后写成一个变量导入。

通常是在做大项目时候才会用上

3、例子
这里举一个简易的例子

（1）将state、mutation、action、getter单独到外面

import Vuex from "vuex";
import Vue from "vue";

Vue.use(Vuex);

const moduleA = {
  namespaced: true, //命名空间
  state: {
    count: 0,
  },
};

const store = new Vuex.Store({
  modules: {
    a: moduleA,
  },
});

export default store;

（2）这时候获取及显示数据的写法要有所改变

<template>
  <div class="about">
    <h1>这是count：{{ $store.state.a.count }}</h1>
    <!-- <h1>This is an about page</h1> -->
  </div>
</template>
4、相关文档
小伙伴们可以查看文档，深入学习🧐

Module | Vuex
Vue.js 的中心化状态管理方案
https://vuex.vuejs.org/zh/guide/modules.html

九、拓展
1、关于vuex编写登录模块的思想流程



 2、vue-cookie的使用，小伙伴们可以在下面这个网站进行学习
————————————————
版权声明：本文为CSDN博主「五秒法则」的原创文章，遵循CC 4.0 BY-SA版权协议，转载请附上原文出处链接及本声明。
原文链接：https://blog.csdn.net/qq_51478745/article/details/129582717





