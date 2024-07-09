---
title: git与github
date: 2023-4-2 12:24:4
categories:
- git
tags:
- git
- github
---

# -----------------------------------git

## https://zhuanlan.zhihu.com/p/389814854

网址：git命令大全

#### git全局配置文件，配置一次即可生效

（C:user/用户名文件夹/.gitconfig）

### 一、`git init` 

#### （初始化，创建本地仓库）

### 二、`git add`  

#### （添加到本地仓库）

### 三、`git commit -m` "注释"

#### （添加注释）

### 四、`git remote add origin` 仓库地址 

#### （连接远程仓库）

### 五、`git pull --rebase origin master` 

#### 仓库地址（同步仓库内容）

### 六、`git push -u origin master`

#### （上传到远程仓库）

### ①获得git帮助命令（浏览器中）

`git help config`（获取参考）
`git config -h`（获取更简明的快速参考）

### ②获得git配置信息

 `git config --list --global`（查看全局配置项）
`git config user.name`(查看某一项)

### ③配置用户信息

`git config --global user.name 'name'`
`git config --global user.email 'email'`
（使用了--global选项，那么该命令只需要运行一次即可永久生效）

### ④获取帮助信息

git help <verb>(获取某个命令的帮助手册)

### ⑤将目录转换成Git仓库（项目的git Bash中使用git init）

### ⑥从其他服务器上克隆一个仓库

### ⑦四种状态：：工作区（未修改），暂存区（已修改），仓库（已暂存）

### ⑧git目标：将工作区的文件都处于未修改的状态

### ⑨查看文件出于什么状态：（git status命令（git status -s 精简显示），查看那些文件被跟踪，哪些没有）

??：未被 Git 跟踪的新文件。
A：新增文件。
M：文件已被修改。
D：文件已被删除。
R：文件已被重命名。
C：文件已被拷贝。
X：文件状态没有更改。
M：文件被修改并且已经暂存。
A：文件已经添加到 Git 并且还没有被暂存。
D：文件被删除了。
R：文件被重命名了。
C：文件被拷贝（复制）了。

### ⑩跟踪文件，跟踪后Git会记录文件的所有变化，并管理和恢复（git add 文件名 ）

取消跟踪文件：`git rm --cached <file>`  （需要执行一次提交才生效）

### 十一、提交到git仓库中

（`git commit -m` '描述信息'）

### 十二、修改已提交的文件，其状态为红色M

### 十三、git add命令的三个功能：①跟踪新文件②将已跟踪且修改的文件放到暂存区③将有冲突的文件标记为以解决状态

### 十四、撤销对文件的修改*谨慎操作*

*（`git checkout -- 文件名`），本质是Git仓库中保存的文件，覆盖工作区中指定的文件

### 十五、向暂存区中一次性添加目录下所有文件

*（`git add .`）

### 十六、从暂存区移除暂存的文件

*（`git reset HEAD 文件名`）文件名为 .号表明移除全部

### 十七、Git工作流程：工作区----暂存区----Git仓库

### 十八、跳过使用暂存区

*（`git commit -a -m` "描述消息"）

### 十九、从Git仓库中移除文件

*（`git rm -f` 文件名   ，从Git仓库和工作区中同时移除index.js文件②git rm --cached 文件名  ， 只从Git仓库中移除文件，用于不用更改的固定文件不用记录）

### 二十、忽略文件

*（新建一个名为.gitignore配置文件，列出要忽略的文件的匹配模式）①以#开头的是注释②以/结尾的是目录③以/开头防止递归④以！开头表示取反⑤可以使用glob模式进行文件和文件夹的匹配（glob指简化了的正则表达式）

### 二十一、glob模式：

*①*:匹配零个或多个任意字符

②[abc]匹配任何一个列在方括号中的字符

③？：匹配一个任意字符

④[0-9]匹配所有0到9的数字

⑤**表示匹配任意中间目录

### 二十二、输出Git提交日志

`（git log）git log -n`提交最近n条历史信息

### 二十三、回退指定版本：

（`git log --pretty=onlin`查看提交历史，获得对应标识id 、

 `git reset --hard <CommitID>`根据指定的提交ID回退到指定版本 、

`git reflog --pretty=online`旧版本中使用，查看命令操作的历史 、

 `git reset --hard <CommitID>`再次根据最新的提交ID，跳转到最新的版本）

# ----------------------------------------github

## 一、远程仓库使用

HTTPS:零配置，每次范围问需要重新输入密码

SSH:需要额外配置,配置后不必重复输入密码（推荐使用）

## 二、基于HTTPS、SSH将本地仓库上传到Github

`echo "# project 02" >> README.md`       使用终端创建内容为#project 02的md文件

`git init`初始化本地仓库（git打开）

`git add README.md`

`git commit -m "first commit"` 文件修改并提交到本地仓库

`git remote add ` 仓库地址（HTTP或SSH） 链接远程仓库

`git push -u 仓库地址 master` 将本地仓库推送到远程仓库（第一次推送 以后直接`git push`）

## 三、生成SSH key

git Bash中 使用： `ssh-keygen -t rsa -b 4096  -C "邮箱地址"`

连续三次回车，即可在C:\Users\dmq \ .ssh目录中生成id_rsa 和 id_rsa.pub两个文件

#### SSH key的好处

实现本地仓库和Github之间免登录的加密数据传输

#### SSH key两部分

①id_rsa(私钥文件，存放于客户端的电脑中)

②id_rsa.pub(公钥文件，需要配置到Github中)

#### 配置SSH key

①记事本打开id_rsa.pub 文件，复制里面的内容

②在浏览器中登录Github，点击头像 ->Settings ->SSH and GPG Keys -> New SSH key

③将id_rsa.pub文件中的内容，粘贴到Key对应的文本框中

④在Title文本框中任意填写一个名称，来标识这个Key从何而来

#### 检测远程仓库中SSH是否配置成功

Git Bash中：

 `ssh -T git@github.com `(github)

`ssh -T git@gitee.com` (gitee)

输入yes

## 四、将远程仓库克隆到本地

Git Bash 中输入 `git clone  远程仓库地址`



