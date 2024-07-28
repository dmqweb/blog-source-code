---
title: Travis和Docker的持续集成
date: 2023-12-2 12:24:4
categories:
- Travis和Docker
tags:
- Travis
- Docker
---
## 所使用的基础组件

代码托管在Github上，使用github集成的Travis CI自动触发CI流程。在CI中自动build新的image上传到Docker Hub。然后通过sshpass远程登录server触发部署脚本。部署脚本pull新的image然后部署。

## Dockerfile

由于项目都是基于python的，所以dockerfile比较简单：

```dockerfile
FROM ubuntu:latest
MAINTAINER Shaobo Liu <shaobo@mkdef.com>
LABEL Description="This image is used to flask-kraken"
RUN apt-get update -y
RUN apt-get install -y python3-pip python3-dev build-essential
COPY src /app
COPY requirements.txt /app
WORKDIR /app
RUN pip3 install -r requirements.txt
ENTRYPOINT ["python3"]
CMD ["app.py"]
```



分解一下：

```dockerfile
FROM ubuntu:latest
MAINTAINER Shaobo Liu <shaobo@mkdef.com>
LABEL Description="This image is used to flask-kraken"
```



首先申明使用的基础镜像，然后写上大名表示我是维护这个镜像的作者和这个镜像的用途。

```dockerfile
RUN apt-get update -y
RUN apt-get install -y python3-pip python3-dev build-essential
```

安装python3，如果有其他的工具或者lib，也要写在这里。

```dockerfile
COPY src /app
COPY requirements.txt /app
WORKDIR /app
RUN pip3 install -r requirements.txt
```

复制源代码到docker里，然后切换工作目录，安装三方依赖。 有时候这里需要安装一些系统级的依赖，比如lxml或者psycopg2之类的，就需要加到前面`apt-get install`里去。

```dockerfile
ENTRYPOINT ["python3"]
CMD ["app.py"]
```

最后是需要执行的命令。根据docker的userguide，一个image最好只干一件事。

## Travis CI

在项目根目录添加`.travis.yml`来定义CI流程

```dockerfile
sudo: required

language: python

services:
  - docker

python:
    - "3.5"

before_install:
  - sudo apt-get update
  - sudo apt-get install sshpass

install: "pip install -r requirements.txt"

script: 
  - python --version

after_success:
  - docker login -u="$DOCKER_USERNAME" -p="$DOCKER_PASSWORD"
  - docker build -t shaobol/kraken:$TRAVIS_BRANCH-$TRAVIS_BUILD_ID . 
  - docker push shaobol/kraken:$TRAVIS_BRANCH-$TRAVIS_BUILD_ID;
  - sshpass -p $VPS_PASSWORD ssh -o stricthostkeychecking=no root@45.32.137.234 "sudo /home/saukymo/kraken/deploy.sh $TRAVIS_BRANCH-$TRAVIS_BUILD_ID"
```



这里就不一一分解了，具体可以参考Travis的官方文档。

主要介绍一下这个部分和其他部分是怎么联动的。首先Travis和Github是有集成服务的，在`Setting -> integrations & services`里选择添加Travis就可以了。然后在Travis上就可以设置相应的CI流程了，默认是master有新的commit就会自动触发一次CI。

每次CI结束后的结果可以通过[badge](https://travis-ci.org/saukymo/odes.svg?branch=master)查看。

重点在于测试完成后build和push docker image的过程

```dockerfile
after_success:
  - docker login -u="$DOCKER_USERNAME" -p="$DOCKER_PASSWORD"
  - docker build -t shaobol/kraken:$TRAVIS_BRANCH-$TRAVIS_BUILD_ID . 
  - docker push shaobol/kraken:$TRAVIS_BRANCH-$TRAVIS_BUILD_ID;
```



敏感信息这里全部通过Travis的Environment Variables。这样可以避免因为公开而泄露。

如果需要将一些敏感信息传递到image里面去，可以通过`--build-arg`参数传递进去，然后保存为环境变量，参考[reference](https://docs.docker.com/engine/reference/builder/#label)

最后通过`sshpass`执行部署脚本，这一步也可以使用`ansible`代替。

## docker 部署脚本

```dockerfile
#!/bin/bash

docker pull shaobol/odes:$1

if docker ps -a | grep -q odes; then
    docker rm -f odes
fi

docker run -d --name odes -p 9000:9000 --link postgres:postgres shaobol/odes:$1
```

脚本很简单，接收CI传过来的参数(image tag)，pull新的image，然后干掉之前的container，run一个新的。这样就完成了update整个过程。