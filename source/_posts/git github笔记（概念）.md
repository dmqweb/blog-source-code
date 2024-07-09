---
title: git笔记
date: 2023-5-2 12:24:4
categories:
- git
tags:
- git
- github
---

<!--Ctrl+[ 提升列表等级；Ctrl+1 一级标题-->



![/images/image-20220202212355012](https://gitee.com/meng-xuemeng/git-and---github-notes/raw/master/img/20220203003049.png)

# 一、用于版本控制

1. 版本控制工具需要的功能

   协同修改、数据备份、版本管理、权限控制、历史记录、分支管理

   ![/images/image-20220130110013784](D:\AMYCode\220202testGithub\images\image-20220130110013784.png)

2. 分布式版本控制 vs 集中式版本控制

   集中式版本控制需联网才能需要

   ![](https://gitee.com/meng-xuemeng/git-and---github-notes/raw/master/img/20220203003434.png)

   


# 二、Git简介

1. ![/images/image-20220130112357773](https://gitee.com/meng-xuemeng/git-and---github-notes/raw/master/img/20220203003455.png)



2. 本地库和远程库

   

   - ![](https://gitee.com/meng-xuemeng/git-and---github-notes/raw/master/img/20220203003509.png)

     团队内成员操作

   - 想找不是团队内的成员 东方不败 来帮忙，那就需要他fork一下，这样对于修改可以进行pull request，经过审核后可以merge到原来的远程仓库

     ![/images/image-20220130113228007](https://gitee.com/meng-xuemeng/git-and---github-notes/raw/master/img/20220203003535.png)

   

# 三、Git命令行操作

主体内容：![/images/image-20220130120329440](https://gitee.com/meng-xuemeng/git-and---github-notes/raw/master/img/20220203003525.png)

##  本地库初始化

- git init

- 初始化后效果：会生成一个.git隐藏文件。使用ll .git/可以查看

  ![/images/image-20220130120928612](https://gitee.com/meng-xuemeng/git-and---github-notes/raw/master/img/20220203003546.png)

- 注意：.git目录中存放的是本地库相关的子目录和文件，不要删除，也不能胡乱修改

## 设置签名

- 形式  例如：

  用户名：tom

  Email地址：git@bala.com

- 作用：区分不同开发人员的身份

- 辨析：这里设置的签名和登录远程库（代码托管中心）的账户、密码没有任何关系

- 命令

  - 项目级别/仓库级别：仅在当前本地库范围内有效

    - git config user.name tom

    - git config user.email tom@bala.com

    - 设置后，信息会保存到 .git/config [下面用cat命令查看这个文件]

      ![/images/image-20220130123501964](https://gitee.com/meng-xuemeng/git-and---github-notes/raw/master/img/20220203003600.png)

  - 系统用户级别：登录当前操作系统的用户范围

    - git config --global user.name tom
    - git config --global user.email tom@bala.com
    - 信息保存位置：./.git/config 文件

  - 级别优先级

    - 就近原则：项目级别优先于用户级别，二者都有时采用项目级别的签名
    - 如果只有系统用户级别的签名，就以系统用户级别的签名为准
    - 二者都没有不允许

## 操作命令

1. 状态查看操作 **git** **status** 【该命令特别常用】

2. 添加操作 **git add 文件名**   

   把untrack的文件加入到暂存区。将工作区的“新建/修改”添加到暂存区

3. 提交操作 **git commit 文件名**

- 把文件从暂存区提交到本地库

- 执行该命令后需要输入 commit message，即这次commit的相关注释。

  因为使用的是vim编辑器，可以i键进入编辑模式，ESC进入命令模式，命令模式下输入：wq进行保存并退出

![/images/image-20220130125343078](https://gitee.com/meng-xuemeng/git-and---github-notes/raw/master/img/20220203003720.png)

 图片展示中的2 insertions代表两行，新加的good.txt文件确实里边只有两行文字。

-  执行git commit命令后会进入vim文本编辑器，需要输注释。下面是一种更简单的方法

  `git commit -m "这里写注释" goood.txt`

4. 查看历史记录操作

   `git log` 

   - 查看历史操作![/images/image-20220130131345836](https://gitee.com/meng-xuemeng/git-and---github-notes/raw/master/img/20220203003738.png)

   - 如果提交次数特别多，历史记录会一屏放不下。多屏显示控制方式

     空格向下翻页；b向上翻页；q退出

   - 可以使用--pretty增加参数

     `git log --pretty=oneline` 显示一行

     ![/images/image-20220130132306271](https://gitee.com/meng-xuemeng/git-and---github-notes/raw/master/img/20220203003846.png)

   - `git log --oneline` 也是每次提交仅显示一行，与上面的命令相比，hash值会变短

     ![/images/image-20220130132333516](https://gitee.com/meng-xuemeng/git-and---github-notes/raw/master/img/20220203003854.png)

   - `git reflog` 可以增加显示要移动几次指针来回复到对应版本

     ![/images/image-20220130132048569](https://gitee.com/meng-xuemeng/git-and---github-notes/raw/master/img/20220203003822.png)

5. 版本前进和后退

   - 基于索引值操作（推荐）

     `git reset --hard 索引值`【索引值可以通过git reflog获得，选中索引，然后粘贴】

   - 使用^符号

     - 该命令只能后退

     - `git reset --hard HEAD^^` 几个**^**代表退几步

   - 使用~符号

     该命令也只能后退

     - `git reset --hard HEAD~n` 

     - n代表后退n步

       

   - reset命令的三个参数对比

     - --soft 参数  仅仅在本地库移动HEAD指针

     - --mixed参数 在本地库移动HEAD指针；重置暂存区

     - --hard参数   在本地库移动HEAD指针；重置暂存区；重置工作区

       

6. `git help 命令`

7. 永久删除文件后找回

   在工作区删除后，提交到本地库，可以通过reset回到之前的版本，之前版本还保留该文件

   - 前提：删除前，文件存在时的状态提交到本地库
   - 操作：git reset --hard [指针位置]
     - 删除操作已经提交到本地库，则指针位置指向历史记录
     - 删除操作没有提交到本地库，指针使用head

8. 比较文件差异

   - git diff [文件名]
     - 将工作区中的文件和暂存区进行比较
   - git diff [本地库中的历史版本] [文件名]
     - 将工作区中的文件和本地库历史记录比较
   - 不带文件名则可以比较多个文件

9. 分支管理

   1. 分支：在版本控制过程中，使用多条线同时推进多个任务

   2. 分支的好处：

      - 同时并行推进多个功能的开发，提高开发效率
      - 如果发现某个分支有问题，可以删除该分支不影响主干

   3. 如何查看分支

      `git branch -v`

   4. 如何创建分支

      `git branch [新的分支名字]`

   5. 切换分支

      `git checkout [分支名字]`  切换到某个分支

   6. 合并分支

      `git branch -v` 

      - 第一步，切换到接受修改的分支（被合并，增加新内容）上

        `git checkout master` 到接受修改的分支，比如合并到主分支

      - 第二步，执行merge

        `git merge [被合并的分支名]`

   7. 解决冲突

      - 冲突的表现

        ![/images/image-20220202183828366](https://gitee.com/meng-xuemeng/git-and---github-notes/raw/master/img/20220203003919.png)

      - 冲突的解决
        - 第一步：编辑文件，删除特殊符号
        - 第二步：把文件修改到满意的程度，保存退出
        - 第三步：git add[文件名]
        - 第四步：git commit -m “日志信息”
          - 注意：此时commit 一定不能带具体文件名

   # 四、Git基本原理

   1. Hash

      ![/images/image-20220202184334597](https://gitee.com/meng-xuemeng/git-and---github-notes/raw/master/img/20220203003934.png)

      
      
      ![/images/image-20220202184638546](https://gitee.com/meng-xuemeng/git-and---github-notes/raw/master/img/20220203003941.png)

   2.创建分支--->创建指针；

   切换分支--->切换指针；

   # 五、Github

   1. 首先创建一个Github账号，然后创建一个repository。复制这个仓库对应的地址，然后在本地添加一下这个地址（这样就不用每次都写它了）

      - 这里初始化仓库 `git init`
      - 添加远程仓库，`之后可以使用别名origin指代该仓库

      ![/images/image-20220202192116825](https://gitee.com/meng-xuemeng/git-and---github-notes/raw/master/img/20220203003953.png)

      - 向该仓库推送  `git push origin master` 格式：git push 仓库地址（名） 分支名

   `git remote add  地址别名  地址`

   `git push 地址别名  分支名`

2. 克隆
   - 直接使用命令`git  clone [远程地址]`
   - 效果
     - 完整地把远程库下载到本地
     - 创建origin远程地址别名
     - 初始化本地库

3. 拉取

   - pull = fetch+merge
   - git fetch 【远程库地址别名】【远程分支名】
   - git merge 【远程库地址别名/远程分支名】
   - git pull 【远程库地址别名】【远程分支名】

   如果没冲突，就直接从远程pull；如果不确定，可以先fetch下来看看，再决定merge

4. 协同开发时冲突的解决
   - 要点
     - 如果不是基于Github远程库的最新版所作的修改，不能推送，必须先拉取。
     - 拉取下来后如果进入冲突状态，则按照“分支冲突解决”操作解决即可
5.  跨团队协作
   - Fork
   - pull requestes

6. Eclipse 中Git使用 

   介绍了在Eclipse使用Git 。 应该pycharm或者VSCode也可以？

# 六、Git工作流

![/images/image-20220202210632324](https://gitee.com/meng-xuemeng/git-and---github-notes/raw/master/img/20220203003050.png)

这里安装Gitlab为啥？？？？



# 七、Gitee

![/images/image-20220203000544636](https://gitee.com/meng-xuemeng/git-and---github-notes/raw/master/img/20220203003051.png)
