为什么这么久都没push 没更新？
# 失恋了
## 她说她年底可能要订婚了

# Ddx

这是一个简单的日记web程序，记录，分享自己喜欢的文字，音乐，照片
总之还有很多问题，我会继续完善，也会尝试多增加点功能，主要是前端react，学习嘛，就是得折腾

## 主要使用到的技术
- React.js
  - webpack
  - redux
  - react-router
- Node.js
  - koa
- Mongodb

还要感谢以下
- css-modules
- cssnext
- postcss
- babel
- .....
(这个b装得可以)

## Demo
 [看这里](http://121.42.195.128/)

## 怎样启动？
1. 依赖mongodb,所以您需要先安装mongodb，并且启动,***建立一个数据库***
2. 进入项目目录，执行```bash npm install  // 也可以使用cnpm install 来安装 ```
3. 😎进入下一步

### 开发模式
- 服务端自动重启
- 前端监控项目文件，有任何改动则会自动重启，无需浏览器自动F5。

***

服务端：
```bash
npm run server-watch
```

前端：
```bash
npm run client-watch
```

### 发布模式
- 服务端使用pm2 or 其他等等启动 (我这里仅仅是很简单的启动而已)
- 前端各种编译打包压缩代码。

***

服务端：
```bash
npm run server-start
```
前端：
```bash
npm run client-build
```

## 第一次运行
第一次数据库是没有东西的所有我们需要来点初始数据看看效果
新建两个命令行窗口，第一个窗口执行
如果你是想看 ***打包压缩*** 后的版本
先编译前端项目
```bash
npm run client-build
```
然后运行服务端
```base
npm run server-start init
```
这里init是执行一个js写点初始数据到数据库里，***以后不用加!!***
打开浏览器localhost:3000
ok 这就是你的第一次😀。

下面是你想进行开发了，自动重启啊什么的
把前面那些统统关掉
```bash
npm run client-watch
```
第二个窗口执行
如果不开发node端，可以用server-start
```bash
npm run server-watch
```
各方面细节还不是很完善，css-modules第一次使用，纯属乱用，导致现在写css比较难受。
本来html、css很渣，所有页面都是乱拼出来的。
Chrome版本 48.0.2547.0 dev (64-bit)

webpack打包后:
- js有1.54MB
- css有18.4KB

gzip压缩后:
- js有460.82KB
- css有5.06KB

## TODOS
- [x] 发表文章
- [x] 浏览文章
- [x] 评论文章
- [x] 实时通知新评论，新文章
- [] 上传图片
- [] 上传音乐
- [] 个人页面
- [] 注册
- [] .....

最后，以上开发都在Mac上进行。 windows能try就try吧😂......
