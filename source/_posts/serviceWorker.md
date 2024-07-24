
---
title: serviceWorker
date: 2024-2-2 12:24:4
categories:
- JS
tags:
- JS
- serviceWorker
---

## serviceWorker.html

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <script>
        //数据库
        console.log(window.indexedDB);
        //service worker
        console.log(window.navigator.serviceWorker);
        //service Worker是后台运行的脚本，充当一个代理服务器，拦截用户发出的网络请求。还可以修改用户的请求或者直接向用户发出回应，使得用户可以在离线情况下使用网络应用。还可以在本地缓存资源文件，加快访问速度。
        if('serviceWorker' in navigator){
             window.addEventListener('load',()=>{
             navigator.serviceWorker.register('./service-worker.js');
            })
        }
        navigator.serviceWorker.register('./service-worker.js').then(res=>{
            console.info('注册成功');
        }).catch(err=>{
            console.error('注册失败');
        })
        // 为了节省内存，当service-Worker不使用时是休眠的，他也不回保存数据，所以重新启动时，为了拿到数据需要将数据放在IndexedDb中
        //服务端部署消息，监听代码
        window.addEventListener('message',data=>{
            if(data.source==='service-worker'){
                console.log(data.msg,'serviceWorker发送来的消息');
            }
        })
    </script>
</body>
</html>
```

## serviceWorker.js

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

