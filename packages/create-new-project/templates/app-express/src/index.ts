import { IocFactory } from '@cc-infra/edge-ioc';
import {
  middleware,
  EdgeApplication,
} from '@cc-infra/edge-ioc-adapter-express';
import chalk from 'chalk';
import express from 'express';

import { AppModule } from './AppModule';
import globalPipeline from './utils/GlobalPipeline';

const server = express();
const port = 80;

const app = IocFactory.create(AppModule);
app.addGlobalPipeline(globalPipeline);

EdgeApplication.setInstance(app);

server.use(middleware);

server.listen(port, () => {
  console.log(chalk.green('🚀 服务启动成功'), '监听端口:', chalk.yellow(port));
});
