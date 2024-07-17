# edge-ioc-adapter-express

Edge-IoC Express 适配器

> Power by `cc-infra Node.js工程项目CLI`

## 快速开始

1. 安装依赖

   ```bash
   pnpm install
   ```

2. Rollup 构建

   ```bash
   pnpm build
   ```

3. 单元测试

   ```bash
   pnpm test
   ```

## Bundle 构建

基于 Rollup 实现 CommonJS 和 ES Module 的打包构建。

配置和常见问题详见: [Rollup 中文文档](https://www.rollupjs.com/)

## Samples

index.ts

```ts
import chalk from 'chalk';
import { IocFactory } from 'edge-ioc';
import { middleware, EdgeApplication } from 'edge-ioc-adapter-express';
import express from 'express';

import { AppModule } from './AppModule';
import globalPipeline from './utils/global-pipeline';

const server = express();
const port = 80;

const app = IocFactory.create(AppModule);
app.addGlobalPipeline(globalPipeline);

EdgeApplication.setInstance(app);

server.use(middleware);

server.listen(port, () => {
  console.log(chalk.green('🚀 服务启动成功'), '监听端口:', chalk.yellow(port));
});
```

AppModule.ts

```ts
import { Module } from 'edge-ioc';

import { DemoController } from './routes/demo/DemoController';
import { DemoService } from './routes/demo/DemoService';

@Module({
  controllers: [DemoController],
  providers: [DemoService],
  base: '',
})
export class AppModule {}
```

Controller 和 Service 编写方法详见 `packages/edge-ioc` 的 README。

## 使用脚手架

使用大仓中的 `bootstrap` 脚手架，选择 `app` -> `Ioc Express App` 即可创建一个带有初始模版（包含初始 Module、Controller、Service、Pipeline）的 IoC Express 项目。
