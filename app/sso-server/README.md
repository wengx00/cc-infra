# sso-server

> Power by `cc-infra 边缘Node.js项目CLI`

## 运行时

- 专门为边缘环境设计的 IoC 框架：`edge-ioc`

- 边缘云服务：[Cloudflare Workers](https://workers.cloudflare.com/)

## 开发须知

- 尽量使用 Vanilla JS（原生 JavaScript，即不依赖 Node.js / Browser 运行时的 JS）编写。

- 可以使用 Cloudflare Workers 实现的部分 Node.js API，详见：[Runtime APIs](https://developers.cloudflare.com/workers/runtime-apis/)

## 快速开始

1. 安装依赖

   ```bash
   pnpm install
   ```

2. 热更新构建

   ```bash
   pnpm build watch
   ```

3. 启动 `wrangler` 本地服务

   ```bash
   pnpm typegen:wrangler
   pnpm dev
   ```

4. 部署到远程 Workers

   ```bash
   pnpm run deploy
   ```