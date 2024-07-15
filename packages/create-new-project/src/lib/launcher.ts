import { existsSync } from 'fs';
import { resolve } from 'path';

import chalk from 'chalk';
import inquirer from 'inquirer';
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

import createEdgeApp from './create-edge-app';
import createExpressApp from './create-express-app';
import createNodejsPackage from './create-nodejs-packages';
import createVue3App from './create-vue3-app';

export default async function launcher() {
  const { name, type } = await yargs(hideBin(process.argv)).argv;

  console.log(chalk.green('🌀 cc-infra 工程化项目创建中...'));

  inquirer
    .prompt([
      {
        type: 'input',
        message: '🚀 项目名称',
        name: 'name',
        default: name as string,
        validate(value) {
          if (!value) {
            return '项目名称不能为空';
          }
          if (!/^[a-zA-Z0-9\-_]+$/.test(value)) {
            return '项目名称只能包含字母、数字、中划线、下划线';
          }
          return true;
        }
      },
      {
        type: 'list',
        message: '📦 项目类型',
        name: 'type',
        default: type && ['packages', 'app'].includes(type as string) ? type : undefined,
        choices: [
          {
            name: '[Web应用] app',
            value: 'app'
          },
          {
            name: '[基础设施] packages',
            value: 'packages'
          }
        ]
      }
    ])
    .then(({ name, type }) => {
      const target = resolve(process.cwd(), type, name);
      if (existsSync(target)) {
        console.log(chalk.red('⛔️ 目标模块已经存在'));
        return launcher();
      }
      let choices = [];
      if (type === 'packages') {
        choices = [
          {
            name: 'Node.js',
            value: 'nodejs'
          },
          {
            name: 'Browser',
            value: 'browser'
          }
        ];
      } else {
        choices = [
          {
            name: 'Vue3',
            value: 'vue3'
          },
          {
            name: 'React18',
            value: 'react18'
          },
          {
            name: 'IoC Express App',
            value: 'express'
          },
          {
            name: 'Cloudflare Workers',
            value: 'edge'
          },
          {
            name: 'Other',
            value: 'other'
          }
        ];
      }
      inquirer
        .prompt([
          {
            type: 'list',
            message: '🛠️ 运行时',
            name: 'stack',
            choices
          }
        ])
        .then(async ({ stack }) => {
          const template = resolve(
            process.cwd(),
            'packages/create-new-project/templates',
            `${type}-${stack}`
          );
          if (!existsSync(template)) {
            console.log(chalk.red('⛔️ 项目模板不存在，尚未支持该类型'));
            return launcher();
          }
          switch (`${type}-${stack}`) {
            case 'app-vue3': {
              await createVue3App(name, template, target);
              break;
            }
            case 'app-edge': {
              await createEdgeApp(name, template, target);
              break;
            }
            case 'app-express': {
              await createExpressApp(name, template, target);
              break;
            }
            case 'packages-nodejs': {
              await createNodejsPackage(name, template, target);
              break;
            }
            default:
              console.log(chalk.red('⛔️ 尚不支持创建该类型的工程项目'));
          }
          console.log(chalk.green('✅ 项目创建成功'));
          console.log(chalk.grey('- 进入项目: '), `cd ./${type}/${name}`);
          console.log(chalk.grey('- 安装依赖: '), `pnpm install`);
          console.log(chalk.grey('- 启动项目: '), `pnpm dev`);
        });
    })
    .catch(() => {});
}
