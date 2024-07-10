# CICD

CI：持续集成

CD：持续交付

CD：持续部署



### 上线流程

> 发布上线流程举例：git上传，开始跑测试，进行打包，使用docker容器化镜像打包，推送到dev开发环境，部署到staging测试环境，最后部署到production生产环境

### pipeline

>  一次pipeline就相当于一次构建任务，里面可以包含多个流程，如：安装依赖，跑测试代码，eslint校验，编译，部署测试服务器，部署生产服务器等流程，任何提交或者Merge Request的合并都可以触发Pipeline。

### runner

> 一个runner就相当于一个打工仔，可以下载gitlab runner之后注册多个runner，并且指定对应的runner执行任务。

# .gitlab-ci.yml文件
```yaml
# 一项代表一个pipeline作业
helloworld:
  stage: linter
  script:
    - echo "hello world,Gitlab!"
    - chmod +x ./run.sh # 将run.sh文件添加可执行权限
    - ./run.sh # 将执行过程提取成可执行文件进行执行

# 私密使用（不想暴露到代码中）的环境变量，可以在平台上进行设置
variables: # 全局的环境变量，还有一些内置的环境变量，例如：$CI_PIPELINE_SOURCE 详见文档
  my_password: "全局的配置变量"

run_unit_tests:
  variables: # 任务中配置变量，使用时加上$符号
    my_password: "iamsomepassword..."
  stage: testing
  script:
    - echo "执行单元测试"

# 配置运行的容器镜像
image: alpine:latest

before_script:
  image: node:3.1.2-alpine3.16 # 配置单项作业运行的容器镜像
  stage: build
  needs: # 同一个stage中，通过needs来指定工作的相依性
    - bad_job
  script:
  - echo "安装套件"
  - echo "设定资料链接"

workflow: # 配置工作流
  rules: # 当main分支commit时，才启动工作流程
    - if: $CI_COMMIT_BRANCH == "main" # $CI_COMMIT_BRANCH是内置的环境变量
      when: always
    - when: never

after_script:
  stage: deplpy
  script:
  - echo "删除不必要的文件"

build_docker_image:
  only: # 指定只有推送到main分支上才会执行，指定哪些分支不执行使用：except
    - main
  state: build
  script:
    - echo "building docker image"
    
bad_job:  # 假设错误的任务，则会中断当前工作的执行，每个工作独立执行
  tags: # 指定runner(打工仔)进行执行，在注册runner时会创建一个tags
    - runner_tags
    - uname # 验证当前在runner中执行
  stage: build
  script:
    script:no_script

# 建立舞台，使得工作按照指定先后顺序执行
stages:
  - linter
  - testing
  - build
  - deploy

# 服务端去官网安装gitlab runner，使用runner（打工仔）分配工作
# 接着启动服务
# 然后将这个服务进行注册（配置在gitlab runner的配置中）
# runner分为：shared runner、 group runners和specific runners三种
# 可以为某个群组设置runner，例如在群组中设置runner配置，服务中注册一个runner进行配置

```