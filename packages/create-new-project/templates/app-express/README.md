# {{PROJECT_NAME}}

> Power by `cc-infra Node.js工程项目CLI`

## 快速开始

1. 安装依赖

   ```bash
   pnpm install
   ```

2. Rollup 构建

   构建项目时，可以使用 `lerna` 来确保大仓中的前置依赖同时被构建：

   ```bash
   npx lerna run build --scope {{PROJECT_NAME}}
   ```

   如果仅仅构建本模块，则仅需执行：

   ```bash
   pnpm build
   ```

3. 开发环境下实时构建

   ```bash
   pnpm watch
   ```

   请确保大仓中的前置依赖已经被构建

4. 运行服务

   ```bash
   pnpm start
   ```

5. 单元测试

   ```bash
   pnpm test
   ```

## Bundle 构建

基于 Rollup 实现 CommonJS 和 ES Module 的打包构建。

配置和常见问题详见: [Rollup 中文文档](https://www.rollupjs.com/)

## 装饰器模式和控制反转

本项目基于 `edge-ioc` 实现**控制反转和自动依赖注入**，使用 `edge-ioc-express-adapter` 来与 Express 适配。

更多信息详见 `packages/edge-ioc` 和 `packages/edge-ioc-express-adapter`

