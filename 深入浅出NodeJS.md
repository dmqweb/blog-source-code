# 概念
### 介绍
> node.js是一个异步的事件驱动的`JavaScript`运行时，node.js的特性其实是JS的特性：`非阻塞I/O` 和 `事件驱动`。这种基于事件的编程方式具有`轻量级`、`松耦合`和`只关注事务点`等优势。
### 发展
Node的出现将前后端的壁垒再次打破,JavaScript这门最初就能运行在服务端的语言，在经历了前端的辉煌和后端的低迷后，借助事件驱动和V8的高性能，再次成为了服务端的佼佼者。在Web应用中,JavaScript将不再仅仅出现在前端浏览器中，因为Node的出现，前端将会被重新定义。
### 核心
> Node带来的最大特性莫过于:基于事件驱动的非阻塞I/O模型,它可以使CPU与I/O并不相互依赖等待,让资源得到更好的利用
### 架构
> node的核心相当于：`v8引擎` + `libuv库` + `各种native api模块`的集合
事件循环
> node是利用v8引擎打造的基于事件循环实现的异步I/O框架
优势
> Node在高并发、高性能后端服务程序上也有着极大的优势：
- 非阻塞IO模型（使得node.js适用于高交互的场景，可以在等待IO操作完成时继续处理其他请求，从而提高性能和吞吐量）
- 事件驱动（不创建新的线程的情况下处理大量并发连接，减少了资源消耗并提升了效率）
- 单线程（因为js运行在单线程上，通过事件循环和回调函数来处理并发，从而避免了多线程编程中的复杂性和同步问题）
- 轻量级线程（node.js使用libuv来管理轻量级线程，用于执行实际的IO操作）
- 跨平台良好

# 认识node
## 异步IO
> 在Node中，绝大多数的操作都是以异步的方式进行调用，这样可以使得操作并行处理，大大节省运行时间。
## 单线程
单线程概念
> node单线程指的是：node.js并没有给我们创建一个线程的能力，所有我们自己写的代码都是单线程执行的，在同一时间内，只能执行我们写的一句代码。但是宿主环境node.js并不是单线程的，`它会维护一个回调队列`，libuv中的线程池在完成一项任务之后`会将回调函数放入回调队列中`，后面libuv会调度JS线程来进行执行。因此：`单线程操作和并发执行并不冲突，node采用回调队列+事件循环的模式来完成并发操作`
误区
> 除了你的代码是单线程，其余都是多线程（线程池），nodejs本身是事件驱动，一个io事件完成会被放到一个事件队列中，主线程负责轮询这个队列，然后执行相应的回调函数。
单线程优势
> node中：JS与其余线程是无法共享状态的，单线程最大的优势就在于：不用像多线程那样处处在意同步问题，这里没有死锁的存在，也没有线程上下文交换所带来的性能上的消耗。
单线程的劣势
- 无法充分利用多核CPU
- 错误会引起整个应用退出
- 大量计算占用CPU会导致无法继续调用异步IO
## 跨平台
> node.js的跨平台特性得益于libuv，和libuv的底层屏蔽了各个操作系统之间的差异。
## IO密集型
> node很擅长IO密集型应用场景，因为node面向网络且擅长并行IO,能够有效的组织起更多的硬件资源，从而提供更好的服务。IO密集的优势主要在于Node利用事件循环的处理能力，而不是启动每一个线程为每一个请求服务，资源占用极少
## CPU密集型
> 由于v8引擎的高性能，使得node.js在CPU密集型应用中仍然有不俗的表现。
CPU密集型应用带给Node.js最大的挑战是：
> 由于JS单线程的原因，如果有长时间的运行的计算，将会导致CPU时间片不能释放，使得后续IO无法发起，但是适当调整和分解大型运算任务为多个小任务就可以使得运算能够适时释放，而不阻塞IO调用的发起，这样既可以同时享受到并行异步IO的好处又能充分利用CPU
> node可以通过编写C/C++扩展的方式更高效的利用CPU
> node可以通过子进程的方式将一部分Node进程当作常驻服务进行用于计算，然后利用进程间的消息来传递结果，将计算与IO分离，这样还能充分利用CPU
## 分布式应用
> Node非常适用于BFF中间层，例如：分布式应用，而非单纯的后端开发
比如一个数据平台去数据库集群中查询数据，node编写的中间层可以并行的去多台数据库中获取数据并合并，这个过程中，对于node来说只是一次普通的IO操作，但对于数据库而言是一次复杂的计算，所以也是进而充分压榨硬件资源的过程。
## 实时应用
> 得益于node的高性能IO
## 并行IO，有效提升web渲染能力
> 摒弃同步等待方式，大胆采用并行IO，加速数据的获取进而提升Web的渲染速度
# 模块
## Commonjs
> Nodejs采用Commonjs的模块规范,在Node中,模块分为两类: 核心模块和文件模块
## 核心模块
> 核心模块部分在Node源码编译过程中,编译进了二进制执行文件,在Node进行启动时,部分核心模块就被加载进了内存中
## 文件模块
> 文件模块则是在运行时动态加载的,需要完整的路径分析、文件定位和编译执行过程,速度比核心模块要慢
## 模块缓存
> Node像浏览器一样,对于引入过的模块都会进行缓存,浏览器仅仅缓存文件,而Node缓存的是编译和执行之后的对象,核心模块的缓存检查先于文件模块的缓存检查
## 文件查找规则
### 路径查找
- 缓存加载
- 核心模块,如:fs模块
- 路径形式的文件模块m 
- 自定义模块(node_modules中)
- - 自定义模块在查找时,会现在当前文件目录下的node_modules目录中向上级依次进行查找,当前文件的路径越深,模块的查找速度就会越慢
### 文件定位
- CommonJS规范允许文件标识符中省略文件后缀,Node会按照 .js、.json和.node的顺序依次补足扩展名,其余扩展名会被当作js文件进行载入
- 如果查找到是一个文件夹,node就会查找文件夹中package.json的入口文件
- 如果还没有找到,Node就会依次查找index.js、index.json和index.node文件
- 如果还没有找到,node就会抛出一个异常
### 模块全局变量
- 模块全局变量并不是当node.js执行时,声明在全局的,而是类似回调的方式进行的一种首位包装
### 模块的编译
#### js模块
- 编译过程中,Node对获取的js文件进行了头尾包装,在头部添加了(function (exports, require, module, __filename, __dirname) {\n，在尾部添加了\n});
- 有了exports还需要module.exports的原因在于:避免exports直接赋值导致改变了形参的引用
#### C/C++模块
- 对于C/C++模块,Node调用process.dlopen()方法进行加载和执行
- C/C++模块主要用于提升执行效率
#### JSON文件
- JSON文件的编译会调用JSON.parse()方法得到对象,然后赋值给exports
## 核心模块
- 核心模块分为C/C++编写的和JS编写的两部分
- 对于核心模块,Node采用V8附带的工具:js2c.py工具,将所有内置的JS代码转换成C++里面的数组,生成node_natives.h头文件
- 这个过程中,js代码以字符串的形式存储在node命名空间中,当启动Node进行时,js代码直接加载进内存中,在加载时,js核心模块经历标识符分析之后直接定位到内存中,比普通文件模块从磁盘中一处一处查找要快很多
## 内建模块
- 那些工作在node底层、由C/C++编写的模块被称为内建模块
- 内建模块的优势在于: 首先由于是C/C++编写的,所以性能会优于脚本语言,其次在进行文件编译时,他们被编译为二进制文件,一旦Node开始执行,它们就会被加载进内存中,无须再次做标识符定位、文件定位和编译等过程,直接执行即可
## 总结
- CommonJs提出的规范均十分简单,但是现实意义却十分强大,node通过模块规范,组织了自身的原生模块,弥补了JS弱结构性的问题,形成了稳定的结构,并向外提供服务
# 异步I/O
## 介绍
> 与Node的事件驱动、异步I/O设计理念比较相近的一个知名产品是Nginx,它采用C编写,性能表现优异,他们的区别在于:Nginx具备面向客户端管理连接的强大能力,但是它的背后仍然受限于各种同步方式的编程语言,但Node却是全方位的,既可以作为服务器端去处理客户端带来的大量并发请求,也可以作为客户端向网络中的各个应用进行并发请求
### 设计理念
> 为什么需要异步I/O ?,原因是I/O是昂贵的,而分布式I/O是更昂贵的,只有后端能快速响应资源,才能让前端的体验更好
### 资源分配
> 如果业务场景中有一组互不相关的任务需要完成,目前主流方法有两种:
- 单线程串行依次执行
> 单线程中通常I/O与CPU计算之间是可以并行进行的,但是同步的编程模型导致的问题是:I/O的进行会让后续任务等待,造成资源不能更好的去利用
- 多线程并行完成
> 多线程的代价子啊与创建线程和执行期线程上下文切换开销大,并且复杂业务中,多线程编程经常面临锁、状态同步等问题
### Node单线程 & 多线程
> Node单线程是指:js执行是单线程的,Node多线程是指:Node通过libuv中多线程队列去接收和响应I/O操作。Node资源分配的方案为:利用单线程执行js,远离多线程死锁、状态同步等问题,利用异步I/O使得单线程远离阻塞,以便于能够更好的去利用CPU。为了弥补单线程无法利用多核CPU的缺点,Node提供了子进程,可以通过工作进程高效地利用CPU和I/O
### 异步I/O与非阻塞I/O
- 操作系统内核对于I/O有两种方式:阻塞与非阻塞,在调用阻塞I/O时,应用程序需要等待I/O完成之后才返回结果。阻塞I/O的一个特点就是:调用之后一定要等到系统内核层面完成所有操作之后,调用才结束,系统内核在完成磁盘寻道、读取数据和复制数据到内存中之后,这个调用才结束
> 非阻塞I/O和阻塞I/O之间的差别在于调用之后是否会立即返回
- 操作系统对计算机进行了抽象,将所有输入输出设备抽象为文件,内核在进行文件I/O操作时,通过文件描述符进行管理,而问及教案描述符类似于应用程序和系统内核之间的凭证,应用程序如何需要进行I/O调用,需要先打开文件描述符,然后再根据文件描述符去实现文件的数据读写
- 非阻塞I/O也存在一些问题:由于完整的I/O并没有完成,立即返回的并不是业务层期望的数据,而仅仅是当前调用的状态,为了获取完成的数据,应用程序需要重复调用I/O操作来确认是否完成,这种重复调用判断操作是否完成的技术叫做轮询
- 阻塞I/O会造成CPU等待的浪费,非阻塞I/O带来的麻烦是需要通过轮询去确认是否完全地获取到了数据,会使CPU处理状态判断,从而导致CPU资源浪费
- 经过不断的发展,I/O事件通知机制现在通常使用epoll,它在进入轮询的时候如果没有检查到I/O事件,将会进行休眠,指导实践发生将它唤醒,它真实利用了事件通知、执行回调的方式,而不是遍历查询,所以不会浪费CPU,执行效率较高,但是休眠期间CPU几乎是闲置的
- Node使用libuv中的线程池来完成异步I/O的目标,通过让部分线程进行阻塞I/O或者非阻塞I/O加轮询技术来完成数据获取,让一个线程进行计算处理,通过线程之间的通信,将I/O得到的数据进行传递,就轻松实现了异步I/O。它的思想就是:调用异步方法,等待I/O完成之后的通知,执行回调,用户无需考虑轮询,但是它的内部仍然是线程池的原理,不同之处在于这些线程池由系统内核接手管理
### Node的异步I/O

### 事件循环
- node中的事件循环是基于libuv的线程池,每一个线程池都有一个watcher观察者和一个任务队列,当满足条件时将回调放入任务队列中等待libuv调度放入执行栈执行
- 事件循环是一个典型的:生产者/消费者模型,异步I/O、网络请求等则是事件的生产者
- 进程启动时,Node便会创建一个类似while的循环,每执行一次循环体的过程称为Tick,每个Tick的过程就是查看是否有事件待处理,如果有就取出事件及相关的回调函数,如果存在关联的回调函数,就执行他们,然后进入下个循环,如果不再有事件处理,就退出进程
> 事件循环流程
- 外部输入数据
- 轮询阶段
- check阶段(process.nextTick)
- 关闭事件回调阶段(close callback)
- 定时器检查阶段(timer)
- I/O回调
- 闲置阶段(setImmediate)
- 轮询阶段
> node中的微任务队列
- node中微任务队列有两个:nextTickQueue和microTaskQueue
- 两个微任务队列的优先级相同,按照代码执行顺序进行执行
> node中的宏任务队列
- timer,setImmediate,I/O回调等
> setImmediate会在当前tick执行,而settimeout不传参数时,默认很小,可能在当前tick被轮询到,也可能当前tick没有找到
```js
setTimeout(() => {
    console.log('当前tick执行');
});
setImmediate(() => {
    console.log('immediate当前tick执行');
})
setTimeout(() => {
    console.log('下一轮tick执行');
},0);
```
### 观察者
- 每个事件循环中有一个或者多个观察者,而判断是否有事件要处理的过程就是向这些观察者询问是否有要处理的事件
### 请求对象
- Node中的异步I/O调用而言,回调函数却不由开发者来调用,那么从发出调用之后,到回调函数被执行的过程中,存在一种中间产物,叫做请求对象
- 请求对象是异步I/O过程中重要的中间产物,所有的状态都保存在这个对象中,包括送入线程池等待执行以及I/O操作完毕后的回调处理
### 非I/O的异步API
- Node中还存在一些与I/O无关的异步API,分别是:setTimeout、setInterval、setImmediate和process.nextTick
> 定时器
- 定时器与浏览器中的API是一致的,分别用于单次和多次定时执行任务,他们的实现原理与异步I/O较为类似,只是不需要I/O线程池的参与,调用setTimeout或者setInterval创建的当时其会被插入到定时器观察者内部的一个红黑树中,每次Tick执行时,会从该红黑树中迭代取出定时器对象,检查是否超过定时时间,如果超过就形成一个事件,它的回调函数将会立即执行
- 定时器的问题在于不够精确,如果依次循环占用的时间较多,那么下次循环时,也许已经超时了一会

> process.nextTick
- 每次调用process.nextTick时,只会将回调函数放入队列中,在下一轮Tick时取出执行
> setImmediate
- setImmediate方法与process.nextTick方法十分类似,都是将回调函数延迟执行,但是两者有些细微的差别
- process.nextTick中的回调函数执行的优先级要高于setImmediate,原因是因为事件循环对观察者的检查是有先后顺序的,会先检查nextTick的idle观察者,后检查setImmediate的check观察者
- 事件循环检查观察者的顺序:idle观察者---I/O观察者---check观察者
- 具体实现上: process.nextTick的回调函数保存在一个数组中,setImmediate的结果保存在链表中,在行为上,process.nextTick在每轮循环中会将数组中的回调函数全部执行完,而setImmediate在每轮循环中执行链表中的一个回调函数
- 也就是说:setImmediate的回调在一个Tick中只会执行一次
### 事件驱动与高性能服务器
> 事件驱动的实质是: 通过主循环加事件触发的方式来运行程序
##### 服务器模型
- 同步式 ,对于同步式的服务,一次只能处理一个请求,并且其余请求都处于等待状态
- 每进程/每请求 ,为每个请求启动一个进程,这样可以处理多个请求,但是不具备扩展性,因为系统资源是固定的
- 每线程/每请求 ,为每个请求启动一个线程来处理。尽管线程比进程要轻量,但是由于每个线程都占用一定内存,当大并发请求到来时,内存将会很快用光,1导致服务器缓慢
- Node通过事件驱动的方式处理请求,无需为每一个请求创建额外的对应先册灰姑娘,可以省略掉创建线程和销毁线程的开销,这是Node高性能的一个原因
> 异步回调会被放入到对应的线程中,被相应的观察者进行观察,如果观察者观察到回调需要被执行了,就会放入到相应的任务队列中,从而被事件循环所执行
# 异步编程
### 特性
> Node带来的最大特性莫过于:基于事件驱动的非阻塞I/O模型,它可以使CPU与I/O并不相互依赖等待,让资源得到更好的利用
### 处理异常
- 尝试对异步方法进行try/catch操作只能捕获当次事件循环内的异常,对callback执行时抛出的异常将无能为力
- Node在处理异常上形成了一种约定,江宜常作为回调函数的第一个实参传回,如果为空值则表明异步调用没有异常抛出
### 观察者模式
- node中的event是一种观察者的设计模式,可以实现一个事件与多个回到函数的关联,这些回调函数又称为事件侦听器.
- 观察者模式和发布/订阅模式广泛应用于异步编程,通用来解耦业务逻辑
- 事件侦听器模式也是一种Hook机制,利用钩子导出内部数据或状态给外部的调用者
> 同步I/O因为每个I/O都是彼此阻塞的,在循环体中,总是一个接着一个的调用,不会耗用文件描述符太多的情况,同时性能也是低下的,对于异步I/O,虽然并发容易实现,但是由于太容易实现,依然需要进行控制
# 内存控制
### V8
- 在V8中,所有的javaScript对象都是通过堆来进行分配的
- V8限制堆大小的原因是因为:V8最初为浏览器而设计,不太可能遇到用大量内存的场景,而深层原因是因为V8垃圾回收机制的限制
- 取消V8内存限制的方式可以在启动Node时传入--max-old-space-size或者--max-new-space-size来调整内存限制的大小
- V8垃圾回收机制将内存空间分为新生代和老生代,新生代通过分区、赋值和同一清除的方式销毁旧的数据,老生代通过标记清除法配合清除碎片空间的算法进行清除
- V8新生代复制和清除的方式只能使用到一半的堆内存,采用的是典型的牺牲空间换取时间的算法,无法大规模的应用到所有的垃圾回收机制中
- 垃圾回收是影响性能的因素之一,想要高性能的执行效率就需要注意让垃圾回收尽量少地进行
- node启动时,添加--trace_gc参数就可以查看垃圾回收日志
- node启动时,添加--prof参数就可以得到V8执行时地性能分析数据,包含了垃圾回收执行时占用的时间
- V8中通过delete删除对象的属性有可能会干扰到V8地优化,所以将属性值赋值为undefined或null去解引用更好
> Node地内存构成主要是通过V8进行分配的部分和Node自行分配的部分,受V8地垃圾回收限制的主要是V8的堆内存
#### 内存泄漏
- Node对于内存泄漏十分敏感,内存泄露的实质只有一个就是应当回收的对象和出现意外而没有被回收,从而变成了常驻在老生代中的对象
- 造成内存泄露的原因主要有几个:缓存、队列消费不及时和作用域未释放
- 慎将内存当作缓存,缓存在引用的作用举足轻重,可以十分有效的节省资源,因为它的访问效率要比I/O的效率高,一旦命中缓存,就可以节省一次I/O的时间
- 但是在Node中,缓存并不是物美价廉,一旦一个对象被当作缓存来使用,就将会导致垃圾回收机制在机型扫描和整理时,对这些对象做无用功
- 在Node中,任何试图拿内存当缓存的行为都应该被小心使用
- 另一个需要考虑的事情就是:进程之间无法共享内存,如果在进行中使用缓存,这些缓存就不可避免地有重复,对物理内存的使用是一种浪费
- 目前使用大量缓存最好的方案是使用进程外的缓存,以减少常驻内存的对象数量,让垃圾回收更高效,并且进程之间可以共享缓存,市面上目前较好的有Redis
#### 内存泄漏排查
工具:v8-profiler、node-heapdump等
### 大内存应用
> 由于Node的内存限制,操作大文件时要十分小心,Node提供了stream模块用于处理大文件
- 由于V8内存的限制,对于大文件无法通过fs.readFile和fs.writeFile进行大文件的操作,而是使用fs.createReadStream和fs.createWriteStream方法通过流的方式对大文件进行操作
> 如果不需要进行字符串层面的操作,则不需要借助V8来处理,可以尝试进行纯粹的Buffer操作,这将不会受到V8堆内存的限制(不过物理内存仍然有限制)
# Buffer
> Buffer是一个类似Array的对象,但它主要用于操作字节,Buffer是一个典型的JavaScript和C++结合的模块,它将性能相关部分用C++实现,将非性能相关的部分用JavaScript来实现,Node中Buffer是一个全局对象而无需导入
- Buffer占用的内存不是通过V8分配的,属于堆外内存
- Buffer和Array类似,可以通过length得到长度,也可以通过下标访问元素,也有如concat等原型方法,两者的构造方式也相似
### Buffer的转换
- Buffer对象可以和字符串之间相互进行转换
- 字符串转Buffer:
```js
new Buffer(str,[encoding]);
```
- Buffer转字符串:
```js
buf.toString([encoding],[start],[end]);
//buf.toString默认以UTF-8的编码形式
```
- Buffer不支持某些编码类型,可以通过Buffer.isEncoding(encoding)来判断,对于不支持的编码类型可以使用第三方工具库进行转换
- 可写流可以通过setEncoding设置编码方式
```js
let rs = fs.createReadStream('test.md',{ highWaterMark:11 });
rs.setEncoding("utf8");
```
### Buffer与性能
> Buffer在文件I/O和网络I/O中的运用十分广泛,尤其在网络传输中,它的性能举足轻重,一旦在网络中传输,都需要转换为Buffer,以进行二进制数据的传输,提高字符串的转换效率,可以很大程度地提高网络的吞吐率
- 通过预先转换静态内容为Buffer对象,可以有效减少CPU地重复使用,节省服务器资源,静态内容部分可以通过预先转换为Buffer的方式,使得性能得到提升
# 网络编程
> 利用Node可以十分方便地搭建网络服务器,Node中提供了TCP、UDP、HTTP和HTTPS等,适用于服务器端和客户端
### TCP
- TCP全名传输控制协议,在OSI网络模型中属于传输层协议
- TCP是面向连接的协议,显著特征是在传输之前需要进行三次握手形成会话,只有会话形成之后,服务端和客户端之间才能互相发送数据,在创建会话的过程中,服务端和客户端分别提供一个套接字,两个套接字共同形成一个连接
- 在Node中通过net模块可以创建TCP服务
### TCP服务的事件
> 对于通过net创建的服务器实例而言,这个实例是一个EventEmitter实例,它有几种自定义事件:
##### 服务器事件
- listening: 在调用server.listen绑定端口后触发
- connection: 每个客户端套接字连接到服务端时触发,简洁写法为通过net.create-Server,最后一个参数传递
- close: 当服务器关闭时触发,在调用server.close之后,服务器将停止接收进的套接字连接
- error: 当服务器异常时,会触发该事件
##### 连接事件
- data: 当一端调用write发送数据时,另一端会触发data事件,事件传递的数据是write发送的数据
- end: 当连接中的任意一端发送了FIN数据时,将会触发该事件
- drain: 当任意一端调用write发送数据时,当前这端会触发该事件
- 等等
### UDP服务
> UDP又称用户数据包协议,与TCP一样属于网络传输层,UDP与TCP最大的不同就在于:UDP不是面向连接的,TCP中连接一旦建立,所有的会话都基于连接完成,客户端如果要与另一个TCP服务通信,需要再创建一个套接字来完成连接,但是在UDP中,一个套接字可以与多个UDP服务通信
- 要在Node.js中创建UDP服务器端,需要调用dgram模块
### HTTP模块
> Node的HTTP模块包含对HTTP处理的封装,在Node中HTTP服务器继承自TCP服务器(net模块),他可以与多个客户端保持连接,由于其采用事件驱动的形式,并不会为每一个连接创建额外的线程或者进程,保持很低的内存占用,所以能实现高并发
- 开启keepalive之后,一个TCP会话可以用于多次请求和响应
##### HTTP服务的事件
> 服务器也是一个EventEmitter实例,具有以下事件:
- connection事件: 这个连接可能因为开启了keep-alive,可以在多次请求响应之间使用,当这个连接建立时,服务器触发一次connection事件
- request事件: 解析出HTTP请求头之后,将会触发该事件,在res.end之后,TCP连接可能将用于下一次请求响应
- close事件: 与TCP服务器行为一致,调用server.close方法传递一个回调函数来快速注册该事件
- checkContinue事件和connect事件等
### WebSocket服务
- WebSocket实现了客户端与服务器端之间的长连接,而Node事件驱动的方式十分擅长与大量的客户端保持高并发连接
- 相比于HTTP,WebSocket更接近于传输层协议,它并没有在HTTP的基础上模拟服务器端的推送,而是在TCP上定义独立地协议
- WebSokcet协议主要分为两个部分: 握手和传输数据
- 客户端将会校验Sec-WebSocket-Accept的值,如果成功将会开始接下来的数据传输
- 为了安全考虑,客户端需要对发送的数据帧进行掩码处理,服务器一旦收到无掩码帧(比如中间拦截破坏),连接就会关闭
- 基于事件驱动的方式使得Node对于WebSocket这类长连接的应用场景可以轻松地处理大量并发请求
### 网络服务与安全
- SSL:安全套接层SSL作为一种安全协议,他在传输层提供了对网络连接加密的功能,对于应用层而言,它是透明的,最初的SSL应用在Web上,被服务端和浏览器端同时支持,随后被标准化为TLS(安全传输层协议)
- Node在网络安全上提供了3个模块:crypto、tls和https,其中crypto主要用于加密解密,真正用于网络的是tls模块和https模块
###### TLS/SSL
> TLS和SSL是一个公钥/私钥的结构,他是一个非对称的结构,每个服务器端和客户端都有自己的公钥和私钥,公钥用于加密要传输的数据,私钥用于解密接收到的数据
- 公私钥的非对称加密性虽好,但是网络中依然可能存在窃听的情况,比如:中间人攻击
- 为了解决这个问题,TLS/SSL引入了数字证书来进行认证
- CA(数字证书认证中心)的作用就是为站点颁发证书
- 通过CA机构颁发证书通常是一个繁琐的过程,需要付出一定的精力和费用,服务器端需要向CA机构进行申请
# 中间件
> 中间件的作用是用于简化和隔离基础设施与业务逻辑之间的细节,让开发者能够关注在业务的开发上,以达到提升开发效率的目的
- 中间件的意义在于:封装了底层细节,为上层提供更方便的服务
# Node多进程
- 如何充分利用多核CPU一直是服务端关心和探讨的话题之一。
### child_process
- spawn:启动一个子进程来执行命令
- exec:启动一个子进行执行命令,他有一个回调函数获知子进程的状况
- execFile:启动子进程执行可执行文件
- fork:fork创建的Node子进程只需要指定要执行的JavaScript文件模块即可
### Cluster模块
> 为了创建单机Node集群,只使用child_process的话有许多细节需要进行处理
##### 原理
> cluster模块就是child_process和net模块的组合应用,当cluster启动时,他会在内部启动TCP服务器,当cluster.fork子进程时,会将这个TCP服务器端socket的文件描述符发送给工作进程,如果进程是通过cluster.fork复制出来的,那么它的环境变量中就存在NODE_UNIQUE_ID,如果工作进程中存在listen侦听网络端口的调用,它将拿到文件描述符,通过端口重用实现多个子进程共享端口
### 进程间通信
##### 浏览器端
- 浏览器端WebWorker允许创建工作线程并在后台运行,使得一些阻塞较为严重的计算不会影响主线程上的UI渲染
- 主线程通过onmessage和postMessage进行发送和接收数据,子进程对象通过send发送数据,通过message事件接收数据
##### 进程间通信原理
> IPC全称为进程间通信,进程间通信的目的是为了让不同的进程能够互相访问资源并进行协调工作
##### 实现进程间通信的技术
- 命名管道、匿名管道(文件描述符)
- socket(通用通信接口)
- 信号量(进程间通过发布订阅的模式监听事件)
- 共享内存(映射同一内存地址)
- 消息队列等等(一个进程创建消息队列,另一个进程向其消息队列发送消息)
> Node中实现IPC通道的是管道技术,这种技术很适合父子进程之间的状态通信
##### Node中IPC通道
> Node中父进程在创建子进程之前,会创建IPC通道并监听它,然后才真正创建出子进程,并通过环境变量告诉子进程这个IPC通道的文件描述符
# 后端技术方案
- 为了解决性能问题和Session数据无法跨进程共享的问题,常常将Session集中化,将原本可能分散在多个进程里的数据,同意转移到集中的数据存储中,目前常用的工具是Redis、Memcached等,通过这些高效的缓存,Node进程无须在内部维护数据对象,垃圾回收问题和内存限制问题都可以迎刃而解,并且这些高速缓存设计的缓存过期策略更加合理更加高效,比在Node中自定设计缓存策略更好
