
---
title: jenkins配合git hook持续集成
date: 2024-2-2 14:4:4
categories:
- jenkins配合git hook持续集成
tags:
- jenkins
- github hook
---
## 环境

- Centos 7.4
- JDK 1.8

## 主要步骤

以下包含相关所有的步骤，可根据现有环境进行跳过

1. 安装JDK
2. 安装Centos
3. Jenkins和Github配置
4. 配置任务

### 安装JDK

Jenkins需要JDK才可以运行，我们首先安装JDK

#### 下载

[下载链接查看地址](http://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html)

首先点击Accept License Agreement，选择Linux对应版本

**注**若想要直接获取下载链接，使用wget进行下载是不行的，我们可以先点击链接进行下载，然后在chrome中的下载任务中查看下载链接进行复制。

```
cd /usr/local/src
wget `your download url`
```

#### 解压

```
tar -zxvf jdk-8u91-linux-x64.tar.gz
```

#### 环境变量

将以下内容追加到 /etc/profile末尾,替换你对应的解压路径

```
JAVA_HOME=/usr/local/tools/jdk1.8.0_144

JRE_HOME=$JAVA_HOME/jre

PATH=$PATH:$JAVA_HOME/bin:$JRE_HOME/bin

CLASSPATH=:$JAVA_HOME/lib/dt.jar:$JAVA_HOME/lib/tools.jar:$JRE_HOME/lib/dt.jar

export JAVA_HOME JRE_HOME PATH CLASSPATH
```

#### 启用配置

```
source /etc/profile
```

#### 查看版本

```
java -version
```

### 安装Centos

使用yum进行安装

```
#安装自动选择最快源的插件
$ yum install yum-fastestmirror -y
#添加Jenkins源:
$ sudo wget -O /etc/yum.repos.d/jenkins.repo http://jenkins-ci.org/redhat/jenkins.repo
$ sudo rpm --import http://pkg.jenkins-ci.org/redhat/jenkins-ci.org.key
 #安装jenkins
$ yum install jenkins
```

#### 启动

```
service jenkins start
```

#### 更改端口

```
vim /etc/sysconfig/jenkins
service jenkins restart
```

### Jenkins和Github配置

这里的配置就比较多了，主要是在github上生成key,然后在Jenkins与项目进行绑定即可

#### 初始化Jenkins

这几步非常简单，按照提示进行即可

1. 访问你的IP:8080
2. cat /var/lib/jenkins/secrets/initialAdminPassword 把密码输入进去
3. Install suggested plugins进行安装
4. 设置账户密码

### 配置Github webhooks

#### 在对项目有写权限的用户上获取token

进入github –> setting –> Personal Access Token –> Generate new token

[![img](http://callmedadaxin.github.io/images/jenkins-1.png)](http://callmedadaxin.github.io/images/jenkins-1.png)

点击保存，获取token,并**保存好你的token**

#### 设置webhooks

进入GitHub上指定的项目 –> setting –> WebHooks&Services –> add webhook –> 输入刚刚部署jenkins的服务器的IP

[![img](http://callmedadaxin.github.io/images/jenkins-2.png)](http://callmedadaxin.github.io/images/jenkins-2.png)

### 配置Jenkins的Git Plugin

新版Jenkins在初始的时候已经默认安装了Git Plugin和相关依赖的Plugin，我们不用在重复进行安装，直接配置即可

系统管理 –> 系统设置 –> GitHub –> Add GitHub Sever

填写API URL为[https://api.github.com](https://api.github.com/)

[![img](http://callmedadaxin.github.io/images/jenkins-3.png)](http://callmedadaxin.github.io/images/jenkins-3.png)

点击旁边的Add按钮, 添加Secret Text
[![img](http://callmedadaxin.github.io/images/jenkins-4.png)](http://callmedadaxin.github.io/images/jenkins-4.png)

### 配置任务

### 1.新建

回到主页 –> 新建任务 –> 新建一个自由风格的软件项目

[![img](http://callmedadaxin.github.io/images/jenkins-5.png)](http://callmedadaxin.github.io/images/jenkins-5.png)

### 2.配置源码管理

[![img](http://callmedadaxin.github.io/images/jenkins-6.png)](http://callmedadaxin.github.io/images/jenkins-6.png)

### 3.构建触发器，构建环境

[![img](http://callmedadaxin.github.io/images/jenkins-7.png)](http://callmedadaxin.github.io/images/jenkins-7.png)

### 4.编写你的构建脚本

[![img](http://callmedadaxin.github.io/images/jenkins-8.png)](http://callmedadaxin.github.io/images/jenkins-8.png)

保存，应用

## 问题记录

- 项目会自动clone在/var/lib/jenkins/workspace/
- 执行的全局脚本确定已经软链到 /usr/bin,否则访问不到