# React-Electron-TypeScript-Template

## 仓库介绍

在蚂蚁实习了一个月后，回顾了一下这一个月的所学，突然有了一个想法，想尝试着去规范一下使用 webpack 管理的 React、Electron、TypeScript 结合的项目的模板。因此便诞生了这样一个仓库，后续根据我的忙碌程度，也不保证能够稳定对这个仓库进行迭代和维护。
开源本仓库并不表示我的实践是最佳实践，这个仓库本身只是作为我个人项目的规范尝试，根本目的是在为我本人提供一个比较容易复用的开发模板。

## 使用方法

克隆代码后通过 yarn 安装依赖。

```bash
yarn install
```

依赖安装完毕后，在根目录下开启两个终端。

```bash
yarn serve
```

首先通过 `yarn serve` 启动渲染进程，待渲染进程启动后开启主进程，即可进入开发环境测试。

```bash
yarn start
```

需要打包时可以通过如下指令进行打包，打包时选择对应的平台及架构。

```bash
yarn dist
```
