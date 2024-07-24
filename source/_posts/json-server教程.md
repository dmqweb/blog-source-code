---
title: json-server
date: 2023-1-9 12:24:4
categories:
- json-server
tags:
- json-server
---

#### 0. json-server 搭建本地接口

##### 0.1 安装 json-server

- 使用 **npm** ==全局==安装 **json-server**

  ```bash
  npm install -g json-server
  ```

- 检测是否安装成功

  ```bash
  json-server -v
  ```

##### 0.2 准备数据文件（已准备好，这两步不用自己做）

1. 电脑方便找到的任意位置创建一个==文件夹==，进入到该文件夹里面，创建一个==JSON文件==

   - 文件夹和JSON文件的名字可以任意设计，但是==不能出现中文==

   - 比如：文件夹名字：`service/`；JSON文件名字：`db.json`

2. 在`db.json`文件中，准备==JSON格式的数据==

   ```javascripton
   {
     "address": [
       {
         "id": 101,
         "receiver": "李白姓白",
         "mobile": "13800000101",
         "province": "浙江省",
         "city": "杭州市",
         "area": "西湖区",
         "location": "西湖大道101号",
         "state": 1
       },
       {
         "id": 102,
         "receiver": "苏轼",
         "mobile": "13800000102",
         "province": "北京市",
         "city": "北京市",
         "area": "昌平区",
         "location": "西湖大道102号",
         "state": 0
       },
       {
         "receiver": "韩愈",
         "mobile": "13800000103",
         "province": "浙江省",
         "city": "杭州市",
         "area": "西湖区",
         "location": "西湖大道103号",
         "state": 1,
         "id": 103
       }
     ]
   }
   ```

##### 0.3 启动 json-server 本地服务

- 在`service/`文件夹下，进入终端，执行启动 json-server 命令

- ==第一种==：**默认启动方式**，==只能在自己的计算机中访问自己的数据，其他计算机无法访问你的数据==

  ```bash
  json-server --watch db.json
  ```

  > 测试访问：http://localhost:3000/address

- ==第二种==：**自定义启动方式**，在局域环境内，==其他计算机也可以访问你计算机中的数据==

  - 命令规范：`json-server --host 本机IP地址 db.json --port 端口号`

    ```bash
    json-server --host 192.168.28.95 db.json --port 5000
    ```

    > 测试访问：http://192.168.28.95:5000/address