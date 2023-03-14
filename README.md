# 介绍

社团管理系统 react 版本

# 使用技术

React+Redux+React-router v6+Ant design
功能：

1. 资源展示
2. 人员安排
3. 课表展示

亮点：

1. 路由守卫：在路由跳转前进行验证，如登录鉴权，没有登录不能进入个人中心页
2. 动态路由：根据不同角色渲染不同的菜单列表

权限控制

1. 满足灵活的调整用户访问相关页面的许可，权限整体的架构设计若没有设计好，则会导致项目中各种权限代码混入业务代码造成结构混乱。
2. 一般由后端进行权限的把关，前端做的权限校验可以被本地数据造假越权通过。前端权限控制的根本目的是为了优化体验，即把那些不能够访问的页面入口直接关闭，让用户看到他能看到的页面
3. 场景
   （1） 登录权限控制：实现哪些页面能够被游客访问，哪些页面只有登录后才能内访问。
   （2） 页面权限控制：引入了角色。普通会员能浏览软件系统的所有内容，但是不能编辑和删除内容。将路由分为静态路由（所有角色都能访问）和动态路由（角色定制化）
   （3） 内容权限控制
4. react-router v6 官方路由身份验证示例
   使用 useNavigate（）钩子在组件提交登录表单后进行命令式导航，在未经过身份验证的用户访问特定路线时进行声明式导航
   使用 location.state 保留以前的位置，以便在用户进行身份验证后将返回到原来 URL 的位置
   用于 navigate("...",{replace:true})替换/login 历史堆栈中的路由，使用户点击返回时，不会重复返回登录页面。

5. 路由守卫：当用户访问角色权限不予许访问的路由时，直接展示一个无权限的页面或是跳转登录页面等逻辑
   react 的路由守卫是通过高阶组件对路由进行封装https://juejin.cn/post/7075948824845352990
6. 渲染判断：当用户能够访问页面时，我们需要对页面内某些交互进行限制，比如菜单栏隐藏某些菜单项，某些按钮需要禁用等等。

# 遇到的问题及解决方案

## 1.从 js 项目转为 ts 项目

[从 JavaScript 迁移到 Typescript](https://typescript.bootcss.com/tutorials/migrating-from-javascript.html)

[React 转换指南](https://github.com/Microsoft/TypeScript-React-Conversion-Guide#typescript-react-conversion-guide)

[React 项目关于 webpack 配置修改](https://juejin.cn/post/6974572885763424270)

[react-app-rewired](https://github.com/timarney/react-app-rewired#readme)

## 2. typescript 配置 module.css 文件

https://blog.csdn.net/qq_42760405/article/details/111937793

## 3.使用 eslint 中注意点

禁止词法声明 (let、const、function 和 class) 出现在 case 或 default 子句中。则 switch 与 case 使用的时候如果在 switch 与 case 里使用定义变量，需要提供作用域

## 4.使用 mock

1. vite-plugin-mock 如果是 vite 打包的可以用这个
2. mock.js
   利用 webpack-dev-server 的 before 方法，拦截请求，将请求的路径映射到本地 mock 目录中文件的路径。
   mock 中间件实现的功能：
   请求的路径与 mock 目录相对应，找不到则返回 404
   可直接返回响应数据
   返回一个方法，参数为请求的常用参数，返回为响应数据，可实现处理请求返回不同响应结果
3. mock url 自定义携带参数
   mock 只能拦截确定的 url 地址，拦截到不到带参数的 url，如果一定要传参数则要加个正则进行匹配，一共有两种方式：

(1).Mock.mock(/\/api\/user\/getUser/, user.getUserList)

需要注意的是， 是把 url 转化成正则表达式，不能在 url 外再加‘’包裹

(2).Mock.mock(RegExp('/api/user/getUser' + '.\*'), user.getUserList)

RegExp()方法中的 url 则需要加引号了，另外拼接'.\*' 4. mock 模拟 post 请求

## 5.配置项目打包的不同环境应用场景

1. 测试环境接口与生产环境接口域名不一样，每次项目部署都手动修改需要调用的接口域名
2. 项目对应的不是一个后端服务，需要接入多个域名的接口

因此，通过配置来区分不同环境的构建.
执行构建命令，如 npm run build:pre，npm run build:pro 来构建不同的分支
CRA 本身已经配置了不同的环境，只需要在项目下配置.env,.env.production 文件即可，执行 yarn start 项目会读取.emv 配置，但执行 yarn build 项目会读取.env.production 文件。

## 6.跨域问题的解决

使用 http-proxy-middleware 解决端口不一致的问题，
使用 proxy 进行代理

## 7.错误边界

白屏现象，为了不使部分的 UI 的错误导致整个应用崩溃，错误边界使一种 react 组件，可以捕获发生在子组件树任何位置的 JavaScript 错误，并**打印这些错误**，**同时展示降级**UI，而并不会渲染那些发生崩溃的子组件树。错误边界在渲染期间、生命周期方法和整个组件树的构造函数中捕获错误。
错误边界需要使用类组件。

## 8.husky commit 出现 Could not determine Node.js install directory

https://stackoverflow.com/questions/66246587/how-to-fix-error-not-found-husky-run-when-committing-new-code
