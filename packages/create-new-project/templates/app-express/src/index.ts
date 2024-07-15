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
