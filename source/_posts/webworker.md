---
title: webWorker
date: 2024-1-11 12:24:4
categories:
- JS
tags:
- JS
- webWorker
---
# 引言
首先我们知道JS中是没有并行,并发等概念的,这是因为JS是一门单线程的语言,其中的异步执行也是利用事件循环机制进行的,并不是严格意义上的异步.由于JS单线程的特性,使得JS在执行时如果遇到大量的任务就会使得过程运行缓慢.主渲染线程的延迟明显,使得用户体验较差.

# web-worker
web-worker的作用就是用来缓解这一问题的

利用web-worker,我们可以利用浏览器新开辟一个进程,将需要大量执行的过程在这个进程中执行,然后将结果返回给我们的主进程即可.

# 使用示例
# worker.html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
  <style>
    .p{
      line-break: unset;
    }
  </style>
  <a id="link"></a>
    <p class="p">
      <%= sjdfl =%>
    </p>
</head>
<body>
  <script>
    const \u4e2d\u6587 = '这是转义之后的字符';
// 使用webworker,分担主线程的压力
// const worker = new Worker()
//创建一个worker
const worker = new Worker('./worker.js')
    console.log(worker);
worker.postMessage('sdfj');
worker.postMessage({method:'echo',argus:[1,2,3,4]})
//主线程关闭worker
setTimeout(()=>{
worker.terminate()
// worker.postMessage('close')
},1000)
worker.addEventListener('message',(e)=>{
  console.log(e.data);
})
/**
 * 主线程监听worker错误
 */
worker.onerror=(e)=>{
  worker.terminate()
  console.error('worker错误');
}
/**
 * 直接转移数据的控制权
 */
// 创建4字节的缓冲区
let abfer = new ArrayBuffer(4);
// 创建32位整数数组作为视图，引用缓冲区
let tes = new Int32Array(abfer);
console.log(tes,'ArrayBuffer');
worker.postMessage(abfer,[abfer]); //转交控制权，主线程不再存储
/**
 * 模拟文件下载功能
 */
const blob = new Blob(['文件下载']);
const link = document.getElementById('link');
link.href = window.URL.createObjectURL(blob);;
link.download = '测试文件.txt';
setTimeout(()=>{
  // link.click();
},2000)
/**
 * 创建worker线程加载js文件
 * ！！必须指定script标签的type为浏览器不知道的类型
 */
// const blob1 = new Blob(document.getElementById('scriptDom').textContent);
// const url1 = new window.URL.createObjectURL(blob1);
// const worker2 = new Worker(url1);
/**
 * 使用worker线程，完成轮询
 */
//创建worker
function createWorker(f){
  const fnBlob = new Blob(['('+f.toString()+')()'])
  const fnUrl = window.URL.createObjectURL(fnBlob);
  return new Worker(fnUrl);
}
const fnWorker = createWorker((e)=>{
  let cache;
  // setInterval(()=>{
    fetch('/data').then(res=>{
      if(cache != res){
        console.log('变化了');
      }
    })
  // },1000)
});
  </script>
<script id="scriptDom" type="app/worker">
  console.log('我是被woeker加载的文件');
</script>
</body>
</html>
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
  <style>
    .p{
      line-break: unset;
    }
  </style>
  <a id="link"></a>
    <p class="p">
      <%= sjdfl =%>
    </p>
</head>
<body>
  <script>
    const \u4e2d\u6587 = '这是转义之后的字符';
// 使用webworker,分担主线程的压力
// const worker = new Worker()
//创建一个worker
const worker = new Worker('./worker.js')
    console.log(worker);
worker.postMessage('sdfj');
worker.postMessage({method:'echo',argus:[1,2,3,4]})
//主线程关闭worker
setTimeout(()=>{
worker.terminate()
// worker.postMessage('close')
},1000)
worker.addEventListener('message',(e)=>{
  console.log(e.data);
})
/**
 * 主线程监听worker错误
 */
worker.onerror=(e)=>{
  worker.terminate()
  console.error('worker错误');
}
/**
 * 直接转移数据的控制权
 */
// 创建4字节的缓冲区
let abfer = new ArrayBuffer(4);
// 创建32位整数数组作为视图，引用缓冲区
let tes = new Int32Array(abfer);
console.log(tes,'ArrayBuffer');
worker.postMessage(abfer,[abfer]); //转交控制权，主线程不再存储
/**
 * 模拟文件下载功能
 */
const blob = new Blob(['文件下载']);
const link = document.getElementById('link');
link.href = window.URL.createObjectURL(blob);;
link.download = '测试文件.txt';
setTimeout(()=>{
  // link.click();
},2000)
/**
 * 创建worker线程加载js文件
 * ！！必须指定script标签的type为浏览器不知道的类型
 */
// const blob1 = new Blob(document.getElementById('scriptDom').textContent);
// const url1 = new window.URL.createObjectURL(blob1);
// const worker2 = new Worker(url1);
/**
 * 使用worker线程，完成轮询
 */
//创建worker
function createWorker(f){
  const fnBlob = new Blob(['('+f.toString()+')()'])
  const fnUrl = window.URL.createObjectURL(fnBlob);
  return new Worker(fnUrl);
}
const fnWorker = createWorker((e)=>{
  let cache;
  // setInterval(()=>{
    fetch('/data').then(res=>{
      if(cache != res){
        console.log('变化了');
      }
    })
  // },1000)
});
  </script>
<script id="scriptDom" type="app/worker">
  console.log('我是被woeker加载的文件');
</script>
</body>
</html>
```

#worker.js
```javascript
//接受数据
console.log(self);
self.addEventListener('message',(e)=>{
    console.log(e.data);
    self.postMessage('我接受到了你的消息')
    if(e.data === 'close'){
        self.postMessage('听你的我关闭');
        self.close();
    }
},false)
// self.addEventListener('close',(e)=>{
//     console.log('关闭');
// })
/**
 * worker内部加载脚本
 * 只能加载，不能获取其中内容
 */
importScripts('./main.js');
```

#serviceWorker.js
```javascript
//serviceWorker是基于事件驱动的。
//serviceWorker安装事件
self.addEventListener('install',event=>{
    console.log(event,'安装事件');
    event.waitUntil(()=>{
        console.info('安装完成');
    })
})
//serviceWorker激活事件（当安装完成之后就开始激活）
self.addEventListener('active',(event)=>{
    let cacheWhiteList = ['product-v2'];
    event.waitUntil(
        caches.keys().then(cacheNames=>{
            return Promise.all(
                cacheNames.map(cacheName=>{
                    if(cacheWhiteList.indexOf(cacheName) === -1){
                        return caches.delete(cacheName);
                    }
                })
            )
        })
    )
})
//serviceWorker与网页的通信
self.addEventListener('active',(event)=>{
    event.waitUntil(
        self.clients.matchAll().then((client)=>{
            client.postMessage({
                msg:"Hello serviceWorker",
                source:"serviceWorker"
            })
        })
    )
})
```