# diff 代码块

```diff
const unique = (arr)=>{
- return Array.from(new Set(arr))
+ return [...new Set(arr)];
}
```

# 待办(ctrl+shift+x)

- [ ] [ ]

# 折叠

```
<details>
<summary>展开查看规范</summary>
这是展开后的内容1
</details>
```

<details> <summary>展开查看规范</summary> 这是展开后的内容1 </details>

# puml 画图（需要插件）

```puml
@startuml
tank <|-- PlayerTank
tank <|-- EnemyTank
@enduml
```

# mermaid 流程图

```
sequenceDiagram
	participant 老板L
	participant 员工A

	老板L ->> 员工A : “在这里我们是兄弟！”
	老板L -x 员工A : 画个饼
	员工A -->> 老板L : 怯怯地鼓掌
```

```mermaid
sequenceDiagram
	participant 老板L
	participant 员工A

	老板L ->> 员工A : “在这里我们是兄弟！”
	老板L -x 员工A : 画个饼
	员工A -->> 老板L : 怯怯地鼓掌
```

```mermaid
sequenceDiagram
	Note left of 老板L : 对脸不感兴趣
	Note right of 老板M : 对钱不感兴趣
	Note over 老板L,老板M : 对996感兴趣
	loop 一天七次
		网友 ->> + X宝 : 查看配送进度
		X宝 -->> - 网友 : 配送中
	end
```



```mermaid
	pie
        title 今天晚上吃什么？
        "火锅" : 8
        "外卖" : 60
        "自己煮" : 8
        "海底捞" : 9
        "海鲜" : 5
        "烧烤" : 5
        "不吃" : 5
```

```mermaid
graph RL

        User((用户))--1.用户登录-->Login(登录)
        Login --2.查询-->SERVER[服务器]
 subgraph 查询数据库
        SERVER--3.查询数据-->DB[(数据库)]
        DB--4.返回结果-->SERVER
 end
        SERVER--5.校验数据-->Condition{判断}
        Condition -->|校验成功| OK[登录成功]
        Condition -->|校验失败| ERR[登录失败]
        OK-->SYS[进入系统]

        ERR -->|返回登录页面,重新登录| Login
```



# flow流程图

```flow
\```mermaid
flowchat
st=>start: Start:>http://www.google.com[blank]
e=>end:>http://www.google.com
op1=>operation: My Operation
sub1=>subroutine: My Subroutine
cond=>condition: linear or polynomial :>http://www.google.com
io=>inputoutput: catch something...
para=>parallel: 3 possibilities

st->op1->cond
cond(true)->io->e
cond(false)->sub1(right)
sub1(right)->para
para(path1, top)->cond
para(path2, right)->op1
para(path3, bottom)->e
\```
```

