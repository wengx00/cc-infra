# {{PROJECT_NAME}}

> Power by `cc-infra 工程项目CLI`

## 推荐设置

- [VS Code](https://code.visualstudio.com/) + [Vue - Official](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (也就是之前的 Volar) 并禁用 Vetur

- 使用 [vue-tsc](https://github.com/vuejs/language-tools/tree/master/packages/tsc)，用于从命令行执行相同的类型检查，或为 SFC 生成 d.ts 文件。

## 快速开始

### 启动步骤

1. 安装依赖

   ```bash
   pnpm install
   ```

2. 开发环境启动

   ```bash
   pnpm dev
   ```

3. 生产环境构建

   ```bash
   pnpm build
   ```

### 技术栈和相关文档

- [Vue3](https://cn.vuejs.org/)

- 构建工具链：[Vite](https://vitejs.cn/)

- 组件库：[tdesign-vue-next](https://tdesign.tencent.com/vue-next/overview)

- 页面路由：[Vue Router](https://router.vuejs.org/zh/index.html)

- 状态管理：[Pinia](https://pinia.cn/zh/)

- 规范化：[ESLint](https://eslint.org/)

### 目录结构

- `src/assets`：静态资源目录

- `src/components`：全局组件

- `src/pages`：页面路由，详见[约定式路由](#约定式路由)。

- `src/store`：Pinia 的全局状态目录

- `src/utils`：公共代码

  - `router`：路由目录

  - `tools`：工具方法目录

  - `constants.ts`：常量代码

  - `interact.ts`：页面交互相关工具方法（对话框、消息提示、通知提示）

- `src/App.vue`：应用入口组件

- `src/env.d.ts`：全局类型声明， `.env` 文件的类型声明就在这

- `src/main.ts`：应用注册代码

### 约定式路由

- 项目遵循基于文件目录的约定式路由方法，`@pages/` 下的每一层文件目录会生成一层路由。

- 每一层目录下的 `page.vue` 会作为页面组件， `layout.vue` 会作为页面的 Layout，`layout.vue` 是可选的。

- 上层目录的 `layout.vue` 会影响到其所有子级目录，子级目录的 `layout.vue` 会嵌套在父级 `layout.vue` 之中。

- 如果想要编写 `layout.vue`，需要使用 `<router-view />` 来让子级或同级 `page.vue` 插入。

- 如果有不受 Layout 控制的页面，请以 `page.isolate.vue` 命名，并放在 `@pages/` 下的**一级目录**中，他将会逃逸在路由规则之外，同时在 `@router/index.ts` 中额外配置该条路由规则即可。

- 以 `components` 命名的目录不会命中路由规则，而是会作为页面的子组件来看待。

### `.env` 文件

关于 `.env` 文件、vite 配置等，详见 [Vite 官网](https://cn.vitejs.dev/config/)

### Monorepo

本项目依赖于 Monorepo，务必使用 `pnpm` 来进行依赖管理。

使用到的大仓内部模块如下：

- `/packages/common-utils`: 通用公用工具方法、通用样式文件、约定式路由动态加载方法

Monorepo 中的 `/packages/common-utils` 以 `common-utils` 为包名导出，你可以在任何地方使用其中的工具方法，比如：

```ts
import { debounce } from 'common-utils/tools';

const trigger = debounce(() => {
    console.log('Hello Monorepo');
}, 500)

window.onresize = trigger;
```
