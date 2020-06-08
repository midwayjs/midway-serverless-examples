## 如何进行开发？

### 本地开发

```shell
# 首先需要安装开发依赖

$ npm i --registry=https://registry.npm.taobao.org
```

```shell
# 启动函数本地 Dev Server
# 在终端中会输出 本地 Dev Server 的URL链接

$ npm run dev
```

### 创建OTS表

#### 1. 创建实例

打开 [阿里云 表格存储（OTS） 控制台](https://otsnext.console.aliyun.com/)，点击`创建实例`，填写实例名称，这个实例名称用于下面配置中的 `MIDWAY_OTS_INSTANCE` 。

![创建实例](https://gw.alicdn.com/tfs/TB1oi_9JAT2gK0jSZFkXXcIQFXa-1315-632.png)

#### 2. 创建表

创建数据表`list`，添加字符串类型表主键`id`。

![创建表](https://gw.alicdn.com/tfs/TB1w7L9JAT2gK0jSZFkXXcIQFXa-1681-750.png)

### 配置

默认为读取环境变量，亦可手动在 `config/config.default.ts` 文件内进行修改

| 环境变量名 | 释义 |
| --- | --- |
| MIDWAY_OTS_ACCESSKEY | 阿里云账户 AccessKey ID |
| MIDWAY_OTS_SECRET | 阿里云账户 AccessKey Secret |
| MIDWAY_OTS_ENDPOINT | 表格存储实例公网访问地址  |
| MIDWAY_OTS_INSTANCE | 表格存储实例名称  |


`AccessKey ID` 与 `Secret` 的获取可参考下图，或[点击](https://usercenter.console.aliyun.com/)：

![AccessKey](https://gw.alicdn.com/tfs/TB1_lj7Jxv1gK0jSZFFXXb0sXXa-1150-670.png)

`表格存储实例公网访问地址` 的获取可参考下图：

![OTS](https://gw.alicdn.com/tfs/TB18n63JxD1gK0jSZFsXXbldVXa-2374-804.png)


## About Midway FaaS

Midway FaaS 是用于构建云函数的 Serverless 框架。帮助您在云原生时代大幅降低维护成本，更专注于产品研发。<br />

- **跨云厂商：** 一份代码可在多个云平台间快速部署，不用担心你的产品会被云厂商所绑定。
- **代码复用：** 通过框架的依赖注入能力，让每一部分逻辑单元都天然可复用，可以快速方便地组合以生成复杂的应用。
- **传统迁移：** 通过框架的运行时扩展能力，让 Egg.js 、Koa、Express.js 等传统应用无缝迁移至各云厂商的云函数。


<br />Midway FaaS 是阿里巴巴集团发起的开源项目，由一个专业的 Node.js 架构团队进行维护。已大规模应用于阿里集团各 BU 线上业务，稳定承载了数千万的流量。

查阅[详细文档](https://www.yuque.com/midwayjs/faas/quick_start)
