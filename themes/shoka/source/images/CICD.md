# 5-4 持续集成与持续部署

## 课程介绍

那些大厂们，天天DevOps、持续集成的？到底在讲些什么？这堂课来给你揭开持续集成与持续部署的面纱！！没有什么难的，盘它！

**传统的开发过程中的坑：**

- BUG总是在最后才发现
- 越到项目后期，加班越严重
- 交付无法保障
- 变更频繁导致效率低下
- 无效的等待多，用户满足度低

![img](./assets/1460000014924499.png)

**你有没有想过/用过？当你哪一天...**

- 不用为开发/测试环境不一致而苦恼
- 不用麻烦运维人员帮忙调试环境
- 不用手动进行测试，模拟环境中进行自测
- 不用手动发布、部署，自动化实现发布部署
- 不用管开发/测试环境，只用专注代码的开发？



**持续集成解决了什么问题？**

- 提高软件质量
- 效率迭代
- 便捷部署
- 快速交付、便于管理



**课程的主要内容：**

- 什么是CI/CD
- 介绍CI/CD流程
- 前端项目：结合CI/CD流程，实现快速迭代
- Docker的使用，Jenkins+gitlab+nodejs自动化项目

- 持续集成工具介绍：Jenkins、Travis CI、Circle CI



**环境准备：**

- Linux服务器(Centos 7.6/Ubuntu 16.04LTS)
- VSCode+插件 Dockerfile
- 注册github账号



## 持续集成

### 核心概念

**集成，就是一些孤立的事物或元素通过某种方式集中在一起，产生联系，从而构成一个有机整体的过程**。知识经济的社会，集成已经成了很重要的一个名词。各行各业基本都会用到集成。比如汽车行业，那么复杂的一台跑车愣是通过一大堆零件组装起来。对于这些传统行业，它们在研发成功以后，可以通过流水线的方法批量生产进行集成。而在软件行业中，集成并不是一个简单的“搬箱子”的过程。因为软件工业是一个知识生产活动，其内在逻辑非常复杂，需求又很难一次性确定，完成的产品与最初的设计往往相差很远。敏捷宣言中就有一条是说响应变化重于遵循计划。而且由于软件行业的迅猛发展，软件变的越来越复杂，单靠个人是根本无法完成。大型软件为了重用及解耦，往往还需要分成好几个模块，这样集成就成了软件开发中不可或缺的一部分。

持续，不言而喻，就是指**长期的对项目代码进行集成。**

#### 持续集成

持续集成（英文：Continuous Integration，简称CI）

在软件工程中，持续集成是指将所有开发者工作副本每天多次合并到主干的做法。 

> Grady Booch 在1991年的 Booch method 中首次命名并提出了 CI 的概念，尽管在当时他并不主张每天多次集成。而 XP（Extreme programming，极限编程）采用了 CI 的概念，并提倡每天不止一次集成。
>
> 在《持续集成》一书中，对持续集成的定义如下：`持续集成`是一种软件开发实践。在持续集成中，团队成员频繁集成他们的工作成果，一般每人每天至少集成一次,也可以多次。每次集成会经过自动构建(包括自动测试)的检验，以尽快发现集成错误。自从在团队中引入这样的实践之后，`Martin Fowler`发现这种方法可以显著减少集成引起的问题，并可以加快团队合作软件开发的速度。

![img](./assets/c5c8e6f40c7c133e22402c00bb7e1a25_hd.jpg)

持续集成强调开发人员提交了新代码之后，立刻进行构建、（单元）测试。根据测试结果，我们可以确定新代码和原有代码能否正确地集成在一起。

对于一天需要集成多少次数，并没有一个明确的定义。一般就是按照自己项目的实际需要来设置一定的频率，少则可能几次，多则可能达几十次。可以设置按照代码的变更来触发集成，或者设置一个固定时间周期来集成，也可以手工点击集成的按钮来“一键集成”。

#### 持续交付

持续交付（英文：Continuous Delivery，简称CD）

完成 CI 中构建及单元测试和集成测试的自动化流程后，持续交付可自动将已验证的代码发布到存储库。为了实现高效的持续交付流程，务必要确保 CI 已内置于开发管道。持续交付的目标是拥有一个可随时部署到生产环境的代码库。

![img](./assets/db7198e3c39e4656e18efcb4bd1b20b1_hd.jpg)

在持续交付中，每个阶段（从代码更改的合并，到生产就绪型构建版本的交付）都涉及测试自动化和代码发布自动化。在流程结束时，运维团队可以快速、轻松地将应用部署到生产环境中。

比如，我们完成单元测试后，可以把代码部署到连接数据库的 Staging 环境中更多的测试。如果代码没有问题，可以继续`手动`部署到生产环境中。

#### 持续部署

持续部署（英文：Continuous Deployment，简称CD）

对于一个成熟的 CI/CD 管道来说，最后的阶段是持续部署。作为持续交付——自动将生产就绪型构建版本发布到代码存储库——的延伸，持续部署可以自动将应用发布到生产环境。由于在生产之前的管道阶段没有手动门控，因此持续部署在很大程度上都得依赖精心设计的测试自动化。

![img](./assets/f96f19e4d567aad5006d841963a86e41_hd.jpg)

实际上，持续部署意味着开发人员对应用的更改在编写后的几分钟内就能生效（假设它通过了自动化测试）。这更加便于持续接收和整合用户反馈。总而言之，所有这些 CI/CD 的关联步骤都有助于降低应用的部署风险，因此更便于以小件的方式（而非一次性）发布对应用的更改。不过，由于还需要编写自动化测试以适应 CI/CD 管道中的各种测试和发布阶段，因此前期投资还是会很大。

持续部署则是在持续交付的基础上，把部署到生产环境的过程`自动化`。



### 持续集成组成要素

**一个最小化的持续集成系统需要包含以下几个要素：**

1. **版本管理系统：**项目的源代码需要托管到适合的版本管理系统中，一般我们使用git作为版本控制库，版本管理软件可以使用github、`gitlab`、stash等。
2. **构建脚本&工具：**每个项目都需要有构建脚本来实现对整个项目的自动化构建。比如Java的项目就可以使用gradle作为构建工具。通过构建工具实现对编译、静态扫描、运行测试、样式检查、打包、发布等活动串起来，可以通过命令行自动执行。
3. **CI服务器：**CI服务器可以检测项目中的代码变动，并及时的通过构建机器运行构建脚本，并将集成结果通过某种方式反馈给团队成员。



### 应用场景

- 打包平台

  常见的打包，Java应用（Gradle/Maven）、Nodejs前端应用(npm/yarn)

  移动端打包：Android/iOS

- 测试平台

  接口测试

  自动化测试Robotium、Testlink

  单元测试junit

  性能测试Jmeter

- 自动部署

  FTP

  Shell

  Tomcat/Dokcer

  Kubernetes/Rancher/Cluster

- 持续集成

  Git: gitlab github gitee等

  Jenkins/TravisCi/CircleCI

  Docker



### 工作流

#### 传统的工作流

参与人员：开发、项目经理、测试

主要流程：

- 项目一开始是先划分好模块，`分配模块`给相应的开发人员；
- 开发人员`开发好`一个模块就进行`单元测试`；
- 等所有的模块都开发完成之后，由项目经理对`所有代码进行集成`；
- 集成后的项目由项目经理`部署到测试服务器`上，被交由测试人员进行集成测试；
- 测试过程中出现 Bug 就提把问题`记录`进行 `Bug` 列表中；
- `项目经理分配 Bug` 给相应的责任人进行修改；
- 修改完成后，项目经理`再次`对项目进行集成，并`部署`到测试服务器上；
- 测试人员在下一次的集成测试中进行`回归测试`；
- 通过通过之后就`部署到生产环境`中；
- 如果测试不通过，则重复上述“分配 Bug -> 修改 Bug -> 集成代码 -> 部署到测试服务器上 -> 集成测试”工作。

> 这也是传统的瀑布式开发模型，请参考：[软件开发模式对比(瀑布、迭代、螺旋、敏捷)](https://www.cnblogs.com/-OYK/archive/2012/10/08/2714669.html)



带来的问题：

1. **重复性劳动，无效的等待变多**

   重复的进行发布部署。

   流程上：有可能开发在等集成其他人的模块；测试人员在等待开发人员修复 Bug；产品经理在等待新版本上线好给客户做演示；项目经理在等待其他人提交代码。不管怎么样，等待意味低效。

   自动化部署工作可以解放了集成、测试、部署等重复性劳动，而且机器集成的频率明显可以比手工的高很多。

2. **很晚才发现缺陷，并且难以修复**。

   实践证明，缺陷发现的越晚，需要修复的时间和精力也就越大。从上一个可工作的软件到发现缺陷之间可能存在很多次提交，而要从这些提交中找出问题并修复的成本会很大，因为开发人员需要回忆每个提交的上下文来评估影响点。

3. **低品质的软件，软件交付时机无法保障**

   由于集成时每次包含的代码很多，所以大家的关注点主要都是如何保证编译通过、自动化测试通过，而往往很容易忽略代码是否遵守了编码规范、是否包含有重复代码、是否有重构的空间等问题。而这些问题又反过来会影响今后的开发和集成，久而久之集成变得越来越困难，软件的质量可想而知。

4. **项目缺少可见性**

   某些项目，程序会经常需要变更，特别是敏捷开发的实践者。由于产品经理在与客户交流过程中，往往实际的软件就是最好的原型，所以软件会被当作原型作为跟客户交流的工具。当然，客户最希望的当然是客户的想法能够马上反映到原型上，这会导致程序会经常被修改的。那么也就意味着“分配 Bug -> 修改 Bug -> 集成代码 -> 部署到测试服务器上 -> 集成测试”工作无形又爆增了。



#### 常见的工作流

![DevOps](./assets/DevOps.png)

该系统的各个组成部分是按如下顺序来发挥作用的：

1. 开发者检入代码到源代码仓库。

2. CI系统会为每一个项目创建了一个单独的工作区。当预设或请求一次新的构建时，它将把源代码仓库的源码存放到对应的工作区。

3. CI系统会在对应的工作区内执行构建过程。

4. 配置如果存在）构建完成后，CI系统会在一个新的构件中执行定义的一套测试。完成后触发通知(Email,RSS等等)给相关的当事人。

5. 配置如果存在）如果构建成功，这个构件会被打包并转移到一个部署目标(如应用服务器)或存储为软件仓库中的一个新版本。软件仓库可以是CI系统的一部分，也可以是一个外部的仓库，诸如一个文件服务器或者像Java.net、SourceForge之类的网站。

6. CI系统通常会根据请求发起相应的操作，诸如即时构建、生成报告，或者检索一些构建好的构件。

> “You build it, you run it”，这是 Amazon 一年可以完成 5000 万次部署，平均每个工程师每天部署超过 50 次的核心秘籍。



#### 解决的问题

- 高效率

  高效率的发布，避免了重复性的劳动；

  更快的修复BUG，更快的交付成果，减少了等待时间。

- 高质量

  只有在完成集成测试、系统测试后，才能得到可用的软件，整个过程中只有最后时刻才能拿到可运行软件。集成活动不一定在一个标准的构建机器上生成，而是在某个开发人员的机器上构建的，那么可能存在在其他机器上无法运行的问题。

  人与机器的一个最大的区别是，在重复性动作上，人容易犯错，而机器犯错的几率几乎为零。所以，当我们搭建完成集成服务器后，以后的事就交给集成服务器来打理吧。

- 高产出

  快速开发和上市一个新产品，并快速取得预期的投资回报是每个企业孜孜以求的目标。

  便捷的部署+项目的可预期，使得团队的开发变成了一种开心的事情。

  持续集成可以让你在任何时间发布可以部署的软件。在外界看来，这是持续集成最明显的好处，对客户来说，可以部署的软件产品是最实际的资产。利用持续集成，你可以经常对源代码进行一些小改动，并将这些改动和其他代码进行集成。

  

#### 常见问题

1. 思维转变后，新技术抵触

   - 无法接受新事物：不管怎么样，求稳心态的人还是多。总是有人认为老的技术代表稳定，新的事物往往会带来问题。
   - 认为手工集成也没有多少工作量：不是所有的人都参与到了整个持续集成的环节，所以没有办法认识到问题全貌。

   **针对这个问题，可以通过设置一定的持续集成技术培训、宣讲得到改观**

2. 管理层的抵触

   - 培训持续集成需要投入资金啊，没钱。
   - 持续集成服务器要增加软硬件成本啊，没钱。
   - 开发人员领了那么高的工资，多干活多加班应该啊。

   **针对这一点，可以从开发人员的成本和持续集成的投入（软硬件）的成本上两者做下估算。**

   > 硬件参考：
   >
   > Jenkins主服务器一般2C4G，slave服务器根据生产需要进行选购。
   >
   > git服务器一般2C4G(10人团队)
   >
   > Docker服务器8C32G(Rancher + harbor)

3. 生产环境的复杂

   - 比如部署的生成环境是在政务外网，无法从互联网直接访问等。
   - 构建效率低下，任务多 

   目前，这个是最麻烦的，还在研究中。初步设想是让政务外网开辟一个白名单，给持续集成服务器设置一个单独的通道。只是思路，未验证。



#### 最佳实践

实施持续集成的开发人员可以尽早并经常提交。这允许他们尽早发现冲突。并且，如果存在任何问题，则使用较小的提交可以更轻松地对代码进行故障排除。每天或甚至更频繁地提交软件对于持续集成是必要的，但还不够。

要成功使用持续集成，团队必须：

- 使测试成为开发过程中不可或缺的一部分。应该在创建代码时编写测试。

  公司成功持续整合所需的最重要因素是严格的测试文化。为了将新代码自信地集成到主线中，团队需要确信代码是健全的。这是通过测试来实现的，这应该定期进行。工程师应该在开发每个功能时编写测试。

- 确保测试环境反映生产一致。

  为了支持您严格的测试文化，测试环境必须反映生产环境。否则，您无法保证您正在测试的内容将在生产中起作用。这意味着测试环境应使用相同版本的数据库，Web服务器配置，工件等。

- 使用编码最佳实践，例如结对编程。

  软件开发的另一个最佳实践是在编码期间进行配对。对于更复杂的功能，团队在编写单行代码之前讨论体系结构方法。在将任何代码合并到生产环境之前，其他开发人员始终会检查代码。这有助于确保使用编码最佳实践，代码不会与其他开发人员正在处理的现有代码或代码冲突，并且新功能是可扩展的。

  > **Pair programming** is an [agile software development](https://en.wikipedia.org/wiki/Agile_software_development) technique in which two [programmers](https://en.wikipedia.org/wiki/Computer_programmer) work together at one workstation. One, the *driver*, writes [code](https://en.wikipedia.org/wiki/Source_code) while the other, the *observer* or *navigator*,[[1\]](https://en.wikipedia.org/wiki/Pair_programming#cite_note-1) [reviews](https://en.wikipedia.org/wiki/Code_review) each line of code as it is typed in. The two programmers switch roles frequently.
  >
  > While reviewing, the observer also considers the "strategic" direction of the work, coming up with ideas for improvements and likely future problems to address. This is intended to free the driver to focus all of their attention on the "tactical" aspects of completing the current task, using the observer as a safety net and guide.

- 自动化部署工作流程。

  最后，为确保整个软件开发流程快速高效，构建需要快速，部署工作流程应自动化。代码构建的每一分钟都浪费了一分钟。通过自动化部署工作流程，团队可以更快地将完成的代码生成。因为，毕竟，如果没有接触到客户，那么快速开发软件有什么意义呢？



### 效率工具对比

![img](/Users/Shared/Target/5-4 持续集成与持续部署/resource/assets/CICD-resource.png)

[点击查看](#复杂的DevOps相关工具)效率工具

**1. Jenkins**

> Jenkins，原名Hudson，2011年改为现在的名字，它 是一个开源的实现持续集成的软件工具。官方网站：[http://jenkins-ci.org/](http://jenkins-ci.org/)。
>
> Jenkins 能实时**监控集成中存在的错误**，提供**详细的日志文件和提醒**功能，还能用图表的形式形象地展示**项目构建的趋势和稳定性**。



**Jenkins特点:**

- **易安装**：Jenkins是一个独立的基于Java的程序，随时可以运行，包含Windows，Mac OS X和其他类Unix操作系统的软件包。仅仅一个 java -jar jenkins.war，从官网下载该文件后，直接运行，无需额外的安装，更无需安装数据库；
- **易配置**：提供友好的GUI配置界面；
- **变更支持**：Jenkins能从代码仓库（Subversion/CVS）中获取并产生代码更新列表并输出到编译输出信息中；
- **支持永久链接**：用户是通过web来访问Jenkins的，而这些web页面的链接地址都是永久链接地址，因此，你可以在各种文档中直接使用该链接；
- **集成E-Mail/RSS/IM：**当完成一次集成时，可通过这些工具实时告诉你集成结果（据我所知，构建一次集成需要花费一定时间，有了这个功能，你就可以在等待结果过程中，干别的事情）；
- **JUnit/TestNG测试报告**：也就是用以图表等形式提供详细的测试报表功能；
- **支持分布式构建**：Jenkins可以把**集成构建等工作分发到多台计算机中完成**；
- **文件指纹信息**：Jenkins会保存哪次集成构建产生了哪些jars文件，哪一次集成构建使用了哪个版本的jars文件等构建记录；
- **支持第三方插件**：使得 Jenkins 变得越来越强大；凭借更新中心中的数百个插件，Jenkins几乎集成了持续集成和持续交付工具链中的所有工具。
- **Rest API** - 可以访问控制您获取的数据量，获取/更新config.xml，删除作业，检索所有构建，获取/更新作业说明，执行构建，禁用/启用作业

**Jenkins优点：**

- 价格（免费）
- 定制
- 插件系统
- 完全控制系统

**Jenkins缺点：**

- 需要专用服务器（或多个服务器）。这导致额外的费用。对于服务器本身，DevOps等...
- 配置/定制所需的时间

**2. Travis CI**

**Travis CI**是一个托管的持续集成服务，用于构建和测试在GitHub上托管的软件项目。

> **Travis CI** is a hosted continuous integration service used to build and test software projects hosted at GitHub

**Travis CI的特点：**

- 基于云：TravisCI是一个**基于云**的系统 - 不需要专用服务器，您无需管理它。

- 支持Docker运行测试

- 使用YAML文件进行配置

- 可选择Linux和Mac OSX上同时运行测试

- 开箱即用的支持的语言

  Android，C，C＃，C ++，Clojure，Crystal，D，Dart，Erlang，Elixir，F＃，Go，Groovy，Haskell，Haxe，Java，JavaScript（使用Node.js），Julia，Objective-C，Perl，Perl6， PHP，Python，R，Ruby，Rust，Scala，Smalltalk，Visual Basic

- **支持多环境构建矩阵**：如Python 2.7 , 3.4, 3.5 +  Django 1.8, 1.9, 1.10

  构建矩阵是一种工具，可以使用不同版本的语言和包运行测试。您可以以不同的方式自定义它。例如，某些环境的失败可以触发通知但不会使所有构建失败（这对包的开发版本有帮助）

**Travis CI优点：**

- 开箱即用构建矩阵
- 快速启动
- 轻量级YAML配置
- 开源项目的免费计划
- 无需专用服务器

**Travis CI缺点：**

- 与CircleCI相比，价格更高，没有免费的企业计划
- 定制（对于某些你需要第三方的东西）



**3. Circle CI**

在GitHub或Bitbucket上的软件存储库被授权并作为项目添加到[circleci.com之后](https://circleci.com/)，每个代码更改都会在干净的容器或VM中触发自动化测试。

CircleCI在2017年被Forrester评为持续集成领导者，并被命名为多个最佳DevOps工具列表。CircleCI成立于2011年，总部位于旧金山，拥有全球性的远程员工队伍，由Scale Venture Partners，DFJ，Baseline Ventures，Top Tier Capital，Industry Ventures，Heavybit和Harrison Metal Capital提供风险投资。

**Circle CI的特点：**

- **云&本地化**：CircleCI是一个**基于云**的系统 - 不需要专用服务器，您无需管理它。 但是，它还**提供了一个本地解决方案**，允许您在私有云或数据中心中运行它。
- **商业&免费**：即使是商业帐户，它也**有免费计划**
- **Rest API** - 您可以访问项目，构建和工件（artifacts）。构建的结果将是工件或工件组。 工件可以是已编译的应用程序或可执行文件（例如，android APK）或元数据（例如，关于测试`成功的信息）
- **按需安装**：CircleCI 缓存**必要的安装**（requirements installation）。 它会检查第三方依赖项，而不是持续安装所需的环境
- **SSH模式**：您可以触发**SSH模式**访问容器并进行自己的调查（如果出现任何问题）
- **最小化配置**：这是一个完整的开箱即用解决方案，需要**最少的配置\调整**

**CircleCI优点：**

- 快速启动
- CircleCI有一个免费的企业项目计划
- 这很容易，也很快开始
- 轻量级，易读的YAML配置
- 您不需要任何专用服务器来运行CircleCI

**CircleCI缺点：**

- CircleCI仅支持2个版本的Ubuntu免费（12.04和14.04）和MacOS作为付费部分
- 尽管CircleCI可以使用并运行所有语言，但tt仅支持“开箱即用”的以下编程语言：Go（Golang），Haskell，Java，PHP，Python，Ruby / Rails，Scala

- 如果您想进行自定义，可能会出现一些问题：您可能需要一些第三方软件来进行这些调整
- 此外，虽然作为基于云的系统是一方的优势，它也可以停止支持任何软件，你将无法阻止

总结一下：

| 分类       | Jenkins          | Travis CI          | Circle CI           |
| ---------- | ---------------- | ------------------ | ------------------- |
| 本地部署   | 支持             | 不支持             | 支持                |
| REST API   | 支持             | 支持               | 支持                |
| 配置       | 复杂，高度可配置 | YAML文件           | 简单，GUI界面       |
| 按需安装   | 是               | 否                 | 是                  |
| 跨平台支持 | 是               | Linux + MacOS      | Linux + MacOS(付费) |
| 多服务器   | 是               | 按需               | 否                  |
| 快速构建   | 手动配置复杂     | 快(需要写配置文件) | 最快                |
| 基本环境   | Java             | 云环境             | 云环境              |
| 费用       | 免费             | 特定免费(69$/c)    | 特定免费(50$/c)     |

Travis CI的价格（非常感人）：

![image-20190611100501785](./assets/image-20190611100501785.png)

CirCle CI的价格：

![image-20190611100534676](./assets/image-20190611100534676.png)

其他的一些持续集成的工具：CruiseControl，TeamCity，Continuum等

- AnthillPro：商业的构建管理服务器，提供C功能
- Bamboo：商业的CI服务器，对于开源项目免费
- Build Forge：多功能商业构建管理工具，特点：高性能、分布式构建
- Cruise Control：基于java实现的持续集成构建工具
- CruiseControl.NET：基于C#实现的持续集成构建工具
- Lunt build：开源的自动化构建工具
- Para Build：商业的自动化软件构建管理服务器

## Jenkins

### 使用简介

Jenkins是开源CI&CD软件领导者， 提供超过1000个插件来支持构建、部署、自动化， 满足任何项目的需要。

![image-20190611103941326](./assets/image-20190611103941326.png)

相关概念：

- 流水线：**Jenkins Pipeline**（或简称为 "Pipeline"）是一套插件，将持续交付的实现和实施集成到 Jenkins 中。

  Jenkins Pipeline 提供了一套可扩展的工具，用于将“简单到复杂”的交付流程实现为“持续交付即代码”。Jenkins Pipeline 的定义通常被写入到一个文本文件（称为 `Jenkinsfile` ）中，该文件可以被放入项目的源代码控制库中。

- 节点：节点是一个机器，主要用于执行jenkins任务

- 阶段：定义不同的执行任务，比如：构建、测试、发布(部署)

- 步骤：相当于告诉Jenkins现在要做些什么，比如shell命令。

![image-20190611163108298](./assets/image-20190611163108298.png)

Jenkins的界面

![image-20190611163727975](./assets/image-20190611163727975.png)

任务详情页面

![image-20190611163855257](./assets/image-20190611163855257.png)

Jenkins任务日志

### 安装方式

1. 环境要求

   - 机器要求：
     - 256 MB 内存，建议大于 512 MB
     - 10 GB 的硬盘空间（用于 Jenkins 和 Docker 镜像）
   - 需要安装以下软件：
     - Java 8 ( JRE 或者 JDK 都可以)
     - [Docker](https://www.docker.com/) （导航到网站顶部的Get Docker链接以访问适合您平台的Docker下载）

2. 常规安装

   - 安装JDK

     [官方地址](https://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html)

     下载对应的操作系统的JDK，然后解压进行安装。以Linux为例：

     下载最新版本，上传到Linux服务器

     ```bash
     # 上传到 /opt/jdk8目录下
     
     # tar解压JDK安装包
     mkdir -p /opt/jdk8
     tar zxvf jdk-8u211-linux-x64.tar.gz -C /opt/jdk8 --strip-components 1
     
     # vi /etc/profile
     export JAVA_HOME=/opt/jdk8
     export JRE_HOME=${JAVA_HOME}/jre
     export CLASSPATH=.:${JAVA_HOME}/lib:${JRE_HOME}/lib
     export PATH=${JAVA_HOME}/bin:$PATH
     ```

   - 安装Jenkins

     下载Jenkins最新的war包：[Latest](http://mirrors.jenkins.io/war-stable/latest/jenkins.war)

     ```bash
     mkdir -p jenkins && cd /opt/jenkins
     
     wget -O /opt/jenkins/jenkins.war http://mirrors.jenkins.io/war-stable/latest/jenkins.war
     
     java -jar jenkins.war --httpPort=8080
     ```

     就嗯可以打开，http://localhost:8080了

     注意一段这样的话：

     ```bash
     *************************************************************
     *************************************************************
     *************************************************************
     
     Jenkins initial setup is required. An admin user has been created and a password generated.
     Please use the following password to proceed to installation:
     
     63196690ae7d47c49506480ee0e1af4a
     
     This may also be found at: /root/.jenkins/secrets/initialAdminPassword
     
     *************************************************************
     *************************************************************
     *************************************************************
     ```

     这里的`63196690ae7d47c49506480ee0e1af4a`就是初始的安装的管理员密码。

3. 使用Docker安装

   - 安装Docker

     ```bash
     # From https://get.docker.com:
     
     curl -fsSL https://get.docker.com -o get-docker.sh
     sh get-docker.sh
     
     #From https://test.docker.com:
     curl -fsSL https://test.docker.com -o test-docker.sh
     sh test-docker.sh
     
     # From the source repo (This will install latest from the test channel):
     sh install.sh
     ```

   - 配置Docker镜像加速，使用阿里云[容器加速服务](https://cr.console.aliyun.com/?spm=a2c4e.11153940.blogcont29941.9.52027e29w2jv9P)

     左侧的加速器帮助页面就会显示为你独立分配的加速地址

     ```bash
     例如：
     公网Mirror：[系统分配前缀].mirror.aliyuncs.com
     ```

     使用配置文件 `/etc/docker/daemon.json`（没有时新建该文件）

     ```bash
     {
         "registry-mirrors": ["<your accelerate address>"]
     }
     ```

     重启Docker Daemon就可以了

     ```bash
     systemctl daemon-reload
     systemctl restart docker
     ```

   - 安装Docker-compose.yml文件(可选)

     **安装方法：**

     ```bash
     #下载
     sudo curl -L https://github.com/docker/compose/releases/download/1.20.0/docker-compose-`uname -s`-`uname -m` -o /usr/local/bin/docker-compose
     #安装
     chmod +x /usr/local/bin/docker-compose
     #查看版本
     docker-compose --version
     ```

     

   - 安装Jenkins

     **版本选择：**

     Jenkins: https://hub.docker.com/r/jenkins/jenkins/

     Jenkins with Blue Ocean: https://hub.docker.com/r/jenkinsci/blueocean

     > Blue Ocean 重新思考Jenkins的用户体验，从头开始设计[Jenkins Pipeline](https://jenkins.io/zh/doc/book/pipeline/), 但仍然与自由式作业兼容，Blue Ocean减少了混乱而且进一步明确了团队中每个成员 Blue Ocean 的主要特性包括：
     >
     > - 持续交付(CD)Pipeline的 **复杂可视化** ，可以让您快速直观地理解管道状态。
     > - **Pipeline 编辑器** - 引导用户通过直观的、可视化的过程来创建Pipeline，从而使Pipeline的创建变得平易近人。
     > - **个性化** 以适应团队中每个成员不同角色的需求。
     > - 在需要干预和/或出现问题时 **精确定位** 。 Blue Ocean 展示 Pipeline中需要关注的地方， 简化异常处理，提高生产力
     > - **本地集成分支和合并请求**, 在与GitHub 和 Bitbucket中的其他人协作编码时实现最大程度的开发人员生产力。****

     **安装命令：**

     ```bash
     # Jenkins
     docker run \
       -itd \
       -u root \
       -p 8080:8080 \
       -v jenkins-data:/var/jenkins_home \ 
       -v /var/run/docker.sock:/var/run/docker.sock \
       -v "$HOME":/home \ 
       --name jenkins-master
       jenkins/jenkins
       
     # Jenkins blueocean
     docker run \
       -itd \
       -u root \
       -p 8080:8080 \
       -v jenkins-data:/var/jenkins_home \ 
       -v /var/run/docker.sock:/var/run/docker.sock \
       -v "$HOME":/home \ 
       --name jenkins-master
       jenkinsci/blueocean
     ```

     

4. 配置Jenkins插件加速

   进入jenkins系统管理->插件管理中->高级选项卡->升级站点，使用清华源：

   ```html
   https://mirrors.tuna.tsinghua.edu.cn/jenkins/updates/current/update-center.json
   ```

   ![ç³»ç»ç®¡ç](./assets/70.png)

   ![æä»¶ç®¡ç](./assets/70-20190611152837311.png)

   关于官方所有的镜像列表：

   [http://mirrors.jenkins-ci.org/status.html](http://mirrors.jenkins-ci.org/status.html)

5. 环境配置

   

6. 用户权限配置

   

7. 与gitlab进行联接

   

### 插件介绍



### 配置自动化任务

### 前端项目中的应用

## TravisCI

### 使用简介

### 配置Node.js应用

## CircleCI

### 使用简介

### 配置Node.js应用

## 扩展知识

### 自动化流程的发展趋势

1. 集中化

   以集群为基础，服务采用Saas方式进行交付。所有折构建、测试、发布全集中进行管理。

2. 微服务+无服务的应用模式

   应用程序执行环境的管理被新的编程模型和平台取代后，团队的交付生产率得到了进一步的提升。一方面它免去了很多环境管理的工作，包括设备、网络、主机以及对应的软件和配置工作，使得软件运行时环境更加稳定。另一方面，它大大降低了团队采用DevOps的技术门槛。

   **无服务器风格的架构（Serverless architecture）**把DevOps技术在微服务领域的应用推向极致。当应用程序执行环境的管理被新的编程模型和平台取代后，团队的交付生产率得到了进一步的提升。一方面它免去了很多环境管理的工作，包括设备、网络、主机以及对应的软件和配置工作，使得软件运行时环境更加稳定。另一方面，它大大降低了团队采用DevOps的技术门槛。

   在微服务端到端交付流程上，Netflix开源了自家的[Spinnaker](http://www.spinnaker.io/)，Netflix作为微服务实践的先锋，不断推出新的开源工具来弥补社区中微服务技术和最佳实践的缺失。而[Spring Cloud](http://projects.spring.io/spring-cloud/)则为开发者提供了一系列工具，以便他们在所熟悉的Spring技术栈下使用这些服务协调技术(coordination techniques)，如服务发现、负载均衡、熔断和健康检查。

3. 人工智能领域的应用

   DevOps的最早实践来自于互联网企业的Web应用，相应的思想被引入企业级应用并促进了一系列工具的发展。在人工智能领域，[TensorFlow](https://www.tensorflow.org/)就是这样一个例子，它可以有多种DevOps友好的安装和部署方式 ，例如采用Docker进行部署。

   随着Python在大数据、人工智能、区块链、微服务以及Docker中的发展，可以预见Python在日后的领域仍然会发挥重要的作用。

4. 安全推动DevOps的发展

   全是DevOps永远绕不开的话题，也往往是新技术在传统行业（例如金融和电信）应用中的最大阻碍。一方面，组织结构的转型迫使企业要打破原先的部门墙，这意味着很多原先的控制流程不再适用。另一方面，由于大量的DevOps技术来源于开源社区，缺乏强大技术实力的企业在应用相关技术时不免会有所担忧。

5. Windows平台下.net的技术潜力巨大

   长期以来，Windows和.NET平台下的DevOps一直都是一个被低估的领域。一方面，社区缺乏对 Windows Server平台的兴趣。另一方面，[Windows Server却有接近90%的市场占用率](https://community.spiceworks.com/networking/articles/2462-server-virtualization-and-os-trends)，在Web服务器领域则有[33.5%的市场占有率](https://w3techs.com/technologies/overview/operating_system/all)。

6. 非功能性自动化测试工具逐渐完善

   自动化测试水平往往是衡量DevOps技术能力高低的重要指标，尤其是针对生产环境应用程序的非功能性自动化测试工具。一直以来，技术雷达都在尝试从不同的角度宣扬自动化测试的重要性，从软件的开发阶段延展到了整个应用生命周期甚至整体IT资产的管理上。

### 复杂的DevOps相关工具

![DevOps](./assets/devops-hero-1-87966cfbc9c5713ae047551c7b22985c.png)

### Jenkins的一些应用场景

打包平台：

使用Jenkins搭建iOS/Android



测试平台：

jenkins + python + selenium

Jmeter+maven+Jenkins构建云性能测试平台

Jenkins+PMD构建自动化静态代码检测

使用jenkins+Emma统计

客户端单元测试覆盖率

Jenkins+Ant+Java+Junit+SVN执行junit单元测试

jenkins+ant+jmeter搭建持续集成的接口测试平台

自动部署：

Jenkins+GitLab+蒲公英+FTP

jenkins结合ansible用shell实现自动化部署和回滚

持续集成：

Tomcat+Sonar搭建持续集成环境

Maven+Nexus+Jenkins+git/SVN

### Jenkins的Docker-compose.yml创建文件

```bash
version: '3'
services:
  jenkins:
    container_name: 'jenkins'
    image: jenkins/jenkins
    restart: always
    user: jenkins:<这里填Docker用户组的ID，见下面>
    ports:
    - "8080:8080"
    - "50000:50000"
    volumes:
    - /home/jenkins/data:/var/jenkins_home
    - /usr/bin/docker:/usr/bin/docker
    - /var/run/docker.sock:/var/run/docker.sock
```

上面的脚本使用注意：

1. 创建本地jenkins数据目录

   ```bash
   mkdir -p /home/jenkins
   ```

2. 查看docker用户组的ID

   ```bash
   cat /etc/group |grep docker
   ```

3. 执行`docker-compose up -d`
