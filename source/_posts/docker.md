---
title: Docker
tags: Docker
categories: Docker
date: 2024-07-08 10:26:39
---

![Docker](https://dmqweb.cn/images/Docker.pdf)
![Docker文档](https://dmqweb.cn/images/Docker文档.pdf)
![Docker大纲](https://dmqweb.cn/images/Docker大纲.pdf)
# 虚拟化技术
> 虚拟化是一种计算机资源管理的技术,是将计算机的各种硬件资源,比如服务器、网络、CPU、内存、以及存储等,通过抽象和转换后呈现出的一套新的硬件资源环境,在这套资源环境中可以按照操作系统 , 部署应用环境等
> 虚拟化技术打破了计算机硬件资源不可切割的障碍,提高了计算机硬件资源的利用率
# 虚拟机(硬件级虚拟化技术)

> 虚拟机是使用虚拟化的技术，使用抽象逻辑对物理计算机的模拟，包含整个操作系统和其中的应用程式。

- 缺点是：启动慢、使用空间很大、性能通常不高，无法完全使用计算机的性能。

# 容器(操作系统级虚拟化技术)

> 容器是包含在任何环境中的运行所需的所有元素的软件包，这样容器就可以模拟化应用程序，并可以在任何地方运行。它直接调用原操作系统的能力，并屏蔽了操作系统之间的差异。

# docker

> docker 是一个用于构建、运行和传送应用程序的平台，docker 是容器的一种实现方式。
> docker 和虚拟机的区别在于：是否模拟构建整个操作系统的能力。

## image 镜像

> image 镜像就相当于是一个菜谱，对应用程序的执行进行模板化。参照同一个 image 镜像运行的应用程序是相同的。它包含了运行容器所需的所有内容（代码、运行时、库、环境变量和配置文件）
> image 镜像打包了：

- 配置文件、启动命令
- 应用程序、环境变量
- 第三方软件库和依赖包
- 运行时环境
- 操作系统

## docker 容器

> https://labs.play-with-docker.com/ ,在线运行各种 docker 容器
> docker 容器就相当于是一个根据 image 镜像创建的运行实例，在 docker 容器中包含了运行时的全部环境，它屏蔽了操作系统之间的差异，使得应用程序的可移植性非常强。

# docker 的优势

> 如果不使用 docker，在开发环境和测试环境中都需要对应用程序的运行环境进行配置。尤其是当应用程序十分复杂时，配置运行环境的工作就十分复杂，使用 docker 之后就相当于封装了应用程序及其对应的运行环境，并且屏蔽了操作系统之间的差异，它直接调用主机操作系统的能力运行 docker 容器。
> 例如：使用 docker 之后，我们开发环境配置好运行环境，打包成镜像之后，测试环境中直接使用镜像构建 docker 容器，运行应用程序即可，无需重新配置环境。

# docker 命令

> 安装 docker 之后，就可以使用 docker 对应的命令（windows 安装后需要开启 Hyper 选项），命令行中输入对应的命令之后会交给内部的 docker daemon 进行执行，docker daemon 会将执行结果返回给命令行。

```bash
# docker run：运行一个新的容器实例。
docker run [OPTIONS] IMAGE [COMMAND] [ARG...]
# docker start：启动一个或多个已经停止运行的容器。
docker start [CONTAINER...]
# docker stop：停止一个或多个正在运行的容器。
docker stop [CONTAINER...]
# docker pause：暂停容器内的所有进程。
docker pause [CONTAINER...]
# docker unpause：恢复之前被暂停的容器。
docker unpause [CONTAINER...]
# docker restart：重启容器。
docker restart [CONTAINER...]
# docker rm：删除一个或多个容器。
docker rm [CONTAINER...]
# docker rmi：删除一个或多个镜像。
docker rmi [OPTIONS] IMAGE [IMAGE...]
# docker ps：列出当前正在运行的容器。
docker ps [OPTIONS]
# docker images：列出本地的镜像。
docker images [OPTIONS] [REPOSITORY[:TAG]]
# docker build：根据 Dockerfile 构建镜像。
docker build [OPTIONS] PATH | URL | -
# docker pull：从远程仓库拉取镜像或仓库到本地。
docker pull [OPTIONS] NAME[:TAG|@DIGEST]
# docker push：将本地的镜像或仓库推送到远程仓库。
docker push [OPTIONS] NAME[:TAG]
# docker login：登录到一个 Docker 远程仓库。
docker login [OPTIONS] [SERVER] USERNAME
# docker logout：从 Docker 远程仓库登出。
docker logout [SERVER]
# docker exec：在运行的容器中执行命令。
docker exec [OPTIONS] CONTAINER COMMAND [ARG...]
# docker logs：获取容器的日志。
docker logs [OPTIONS] CONTAINER
# docker network：管理 Docker 网络设置。
docker network [OPTIONS]
# docker volume：管理 Docker 数据卷。
docker volume [OPTIONS]
# docker inspect：获取容器、镜像、网络或数据卷的详细信息。
docker inspect [OPTIONS] NAME|ID [NAME|ID...]
# docker prune：删除未使用的 Docker 对象，如容器、镜像、网络、数据卷。
docker prune [OPTIONS]
# docker stats：实时显示容器的资源使用情况。
docker stats [OPTIONS] [CONTAINER...]
# docker-compose：使用 Docker Compose 工具管理多容器 Docker 应用程序。
docker-compose [OPTIONS] [COMMAND] [ARGS...]
```

# 容器化

> 如何将应用程序和运行时的环境打包成一个镜像呢（）容器化？这时候就需要配置 dockerfile 定义容器的构建过程,构建镜像。最后使用 docker 命令镜像创建和运行容器（docker build -t app-name . 和 docker run -p 8080:8080 app-name）

# Dockerfile

> dockerfile 文件用于定义软件依赖的构建过程，确保应用程序的依赖项得到满足。alpine 是一个轻量的 linx 发行版。

```dockerfile
# Docker镜像是一层一层进行构建的
# 指定对应的操作系统和版本，alpine是linx轻量级的发行版
FROM node:14-alpine
# 使用COPY命令，将文件复制到镜像中
COPY index.js /index.js
# 运行应用程序
# CMD ["node","/index.js"] 或者
CMD node /index.js
# 此时使用docker build -t docker-name:版本号 . 就可以构建docker镜像，不指定版本号默认是latest
# 使用docker image ls 可以查看所有的镜像
# 使用docker run docker-name 运行镜像
# 将容器推送到远程镜像仓库：docker push your-dockerhub-username/your-app-name:tag
# 如果想要根据这个镜像创建docker容器，只需要拿到Dockerfile文件，运行上述命令即可
# 通常将应用程序上传到docker hub中，后面通过docker pull docker-name 进行拉取
```

# volumes 逻辑卷

> volumes 逻辑卷是 Docker 中用于存储数据的，因为 docker 中的数据是不会进行持久化的。它通常以一个干净的文件开始，容器启动之后，可以在容器中创建文件和修改文件，但是当容器停止之后，数据并不会持久化，从而丢失，这时候就要在 Docker Compose 中使用 volumes 逻辑卷
> volumes 逻辑卷可以将容器中的目录或者指定路径映射到宿主机的某一个目录或者位置上，从而实现数据的持久化。

# Dev Environments

> docker desktop 中的一个功能，可以将自己当前环境分享给其他人，从而共享开发环境。

# Docker Compose

容器编排工具

> 一个项目中需要的应用程序和应用程序（容器）间的逻辑是十分复杂的，统一管理他们的启动和停止非常麻烦，Docker Compose 用一个 YAML 文件，定义和运行多容器 Docker 应用程序，其中可以配置多个容器、网络和数据卷等，以便在隔离的环境中快速启动和停止整个应用程序。

**Docker Compose 的作用：**

- 多容器管理：Docker Compose 允许你在一个文件中定义多个容器，统一管理它们的启动和停止。
- 环境一致性：通过使用 Compose，你可以在不同的机器和环境中保持应用程序的一致性，因为它定义了应用程序的完整运行环境。
- 配置简化：Compose 使用 YAML 格式，使得配置更加简洁和易于理解。
- 服务依赖管理：Compose 可以处理容器之间的依赖关系，确保在启动和停止时按正确的顺序操作。
- 网络配置：Compose 允许定义自定义网络，使容器之间能够相互发现和通信。
- 数据卷管理：可以配置数据卷，以便在容器之间共享数据或持久化数据。
- 扩展性：Compose 支持扩展服务，允许你指定服务运行的容器数量。
- 自动化：通过简单的命令，Compose 可以自动构建、启动或停止整个应用程序。

**docker-compose.yml**

```yaml
version: "3.8" # 指定 docker-compose 的版本

services:
  web:
    image: nginx:alpine # 使用官方的 nginx 镜像（基于 Alpine 版本）
    ports:
      - "80:80" # 将容器的 80 端口映射到宿主机的 80 端口
    volumes:
      - ./src:/usr/share/nginx/html # 挂载当前目录下的 src 文件夹到容器的 nginx HTML 目录
    depends_on:
      - app # 表示 web 服务依赖于 app 服务

  app:
    build: ./app # 构建当前目录下 app 文件夹中的 Dockerfile
    expose:
      - "9000" # 暴露容器内部的 9000 端口，供其他服务访问，但不映射到宿主机
    environment:
      - APP_ENV=production # 设置环境变量
    volumes:
      - ./app:/var/www # 挂载当前目录下的 app 文件夹到容器的 /var/www 目录

  db:
    image: mysql:5.7 # 使用官方的 MySQL 5.7 镜像
    volumes:
      - db-data:/var/lib/mysql # 挂载卷 db-data 到容器的 MySQL 数据目录
    environment:
      - MYSQL_ROOT_PASSWORD=rootpassword # 设置 MySQL root 用户的密码
      - MYSQL_DATABASE=myappdb # 创建并使用名为 myappdb 的数据库

volumes:
  db-data: # 定义一个名为 db-data 的卷，用于持久化 MySQL 数据
```

`docker-compose.yml`文件将一组互相关联的容器组合在一起，然后使用`docker compose up`命令（包含 docker-compose.yml 的文件中执行）即可启动整个应用程序。

docker-compose.yml 可以结合 CI/CD 工具，集成到自动化工作流中，实现从开发到部署的自动化。

# Kubernetes

Kubernetes 和 Docker Compose 类似，是一种容器编排工具，用于管理和部署容器化应用程序。但是 Kubernetes 相比之下更适合大规模的生产环境和复杂的容器编排需求。

### 比较

k8s 和 Docker Compose 的区别

1. 功能和规模：
   - Docker Compose 是一个简单的工具，用于定义和运行多个 Docker 容器组成的应用程序。它适用于单机或简单的多机环境，并提供了一种简化的方式来定义容器之间的依赖关系和配置。
   - Kubernetes 是一个更强大和复杂的容器编排平台，用于管理大规模的容器集群。它可以自动化容器的部署、扩展、负载均衡、故障恢复等操作，并提供了更丰富的功能和管理能力。
2. 架构和部署方式：
   - Docker Compose 使用单个 YAML 文件来定义整个应用程序的配置和服务之间的关系。它可以在单个主机上使用`docker-compose`命令进行部署和管理。
   - Kubernetes 使用一组 YAML 文件来定义应用程序的各个组件和资源，并通过 Kubernetes API 进行管理。它需要一个 Kubernetes 集群来部署和运行应用程序。
3. 可扩展性和弹性：
   - Docker Compose 适用于小型应用程序或开发/测试环境，它的扩展性和弹性有限。它可以在单个主机上运行多个容器，但无法自动进行水平扩展或故障恢复。
   - Kubernetes 设计用于大规模的生产环境，具有强大的扩展性和弹性。它可以自动进行容器的水平扩展、负载均衡和故障恢复，以确保应用程序的高可用性和性能。
4. 社区和生态系统：
   - Docker Compose 是 Docker 官方提供的工具，拥有庞大的用户社区和丰富的生态系统。它与 Docker Engine 紧密集成，并且易于上手和使用。
   - Kubernetes 是由 Google 开源并托管在 Cloud Native Computing Foundation（CNCF）下的项目，也拥有庞大的用户社区和活跃的开发者社区。它有许多第三方工具和插件，可以扩展其功能和集成其他系统。

综上所述，Docker Compose 适用于简单的应用程序部署和开发/测试环境，而 Kubernetes 适用于大规模的生产环境和复杂的容器编排需求。根据实际需求和规模选择合适的工具
