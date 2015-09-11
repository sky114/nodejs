# nodejs
nodejs + express4 + mongodb 示例  

Express 是一个基于 Node.js 平台的极简、灵活的 web 应用开发框架，它提供一系列强大的特性，帮助你创建各种 Web 和移动设备应用。

下面主要介绍下环境安装的基本流程，以下只针Windows环境 下
1、安装Nodejs,下载地址 https://nodejs.org/en/，直接安装即可

2、安装express，window 下cmd 通过npm安装express（默认安装nodejs已安装好npm）,执行命令 npm -g install express

3、创建express web站点，直接通过命令即可完成express web模板框框架， express -e ejs microblog(这是站点名称)

4、安装 mongodb 下载地址：https://fastdl.mongodb.org/win32/mongodb-win32-x86_64-3.0.6.zip
   下载源文件，进入mongodb bin目录。创建mongodb数据所放目录：mongodbdata\db, mongodbdata\log\log.log ，一定要事先创建好相应文件夹及文件日志。然后执行命令
   E:\Program\mongodb\bin>mongod --dbpath="E:\Program\mongodbdata\db"  -logpath="E:
   \Program\mongodbdata\log\log.log" --install --serviceName "MongoDB" --serviceDis
   playName "MongoDB"

   其中 install serviceName 后为创建window 宿主服务。使用net start MongoDB 启动服务，然后可以使用mongo 查看Mongodb是否连同
   
   安装MongoVUE可以对mongodb进行可视化操作。
    
   
以上为demo创建的基本流程及所需安装的东西。
