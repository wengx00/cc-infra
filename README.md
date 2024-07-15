# cc-infra 大仓

Monorepo 是指一个仓库之中有多个项目/模块（packages），本仓库为 cc-infra 前端项目工程的 Monorepo。

## 开发规范

1. 不要在 `master` 分支上做任何直接变更

2. 语义化分支：

   - `release/**`：指明一个迭代版本的分支，**粒度最大**
   - `feature/**`：指明一个特性更新的开发分支，**粒度较小**
   - `fix/**`：指明Bug修复的开发分支，**粒度最小**
  
   当然，在合适的时候也可以创建类似 `test/**` 这样的分支，在实际开发和协作的过程中，尽量满足分支的粒度即可，无需要求绝对的粒度拆分。

3. 经过自动流水线测试过后，可以在不同的 `feature` | `release` | `fix` 分支上对 `master` 分支提出 Pull Request（PR），经过至少一个不是自己的成员 Code Review 后可以 Merge 进 `master` 分支

4. 所有 Commits 都请按照 [Conventional Commits 规范](https://www.conventionalcommits.org/zh-hans/v1.0.0/#%e7%ba%a6%e5%ae%9a%e5%bc%8f%e6%8f%90%e4%ba%a4%e8%a7%84%e8%8c%83) 进行，以下是部分消息含义的速览：

    - build: 影响构建系统或外部依赖项的更改（如：gulp、broccoli、npm）
    - ci: 对 CI 配置文件和脚本的更改（如 Dockerfile、ci.yml 等）
    - chore：修改杂物，比如 .gitignore
    - docs: 仅更改文档
    - feat: 新增功能
    - fix: 缺陷修复
    - perf: 性能优化的代码更改
    - refactor: 既不修复错误也不添加功能的代码更改（功能不变但重构了某部分代码）
    - style: 不影响代码含义的更改（空格、格式、缺少分号等）
    - test: 添加缺失的测试或纠正现有的测试
    - revert：回退以前的commit


## 使用脚手架

1. 拉取代码后运行 `pnpm install`

2. 在 Monorepo 根目录运行 `pnpm bootstrap`

3. 在交互式 CLI 中输入【英文｜下划线｜中划线】构成的项目名称、选择项目类型：

    - `app`: 会在 `./app` 下生成新的模块（Vue3 / React18 / VanillaJS 运行时的 Web 应用）
    - `packages`: 会在 `./packages` 下生成新的模块（Node.js / Browser 运行时下的基础设施）

4. 如果一切顺利，会根据标准化模版在对应的目录位置生成新的前端工程目录（你只需跟随 CLI 的提示即可）

以 Vue3 为例，生成的项目模版默认使用以下技术栈：

- 运行时：Vue3

- 工具链：Vite

- 数据管理：Pinia

- 组件库：tdesign-vue-next

- 路由：Vue-Router

同时，项目会生成 **0 配置约定式路由**，详见对应生成出的项目 README

得益于大仓，你可以在任意生成出的标准化项目中使用 `packages/common-utils` 下的工具方法：

- 标准化项目默认使用 `packages/common-utils/styles/reset.scss` 来进行样式还原

- 会在每个 `.scss` | `.vue` 的 scss 块前插入 `packages/common-utils/styles/utils.scss`

- 会使用 `packages/common-utils/styles/theme.css` 作为 tdesign 的主题

- 你可以使用 `packages/common-utils/tools` 下的工具函数，Monorepo 中以 `common-utils` 导出，比如：

```ts
import { debounce } from 'common-utils/tools';

const trigger = debounce(() => {
    console.log('Hello Monorepo');
}, 500)

window.onresize = trigger;
```


## Monorepo 管理

本大仓使用 [pnpm](https://pnpm.io/zh/motivation) + [Lerna](https://lerna.nodejs.cn/) + [changeset](https://github.com/changesets/changesets) 进行管理。

### Workspace

工作区由 `./pnpm-workspace.yaml` 定义，在 `./app` 和 `./packages` 下的包含 `package.json` 的目录将作为 Monorepo 中的子模块，受到 pnpm 和 lerna 的管理。

在 `nx.json` 中定义了各模块 scripts 任务的执行管道。

简单来说，假如模块 `./app/demo` 依赖于 `./packages/infra`，在构建 `app/demo` 之前需要先构建 `packages/infra`，那么你可以在 Monorepo 根目录中运行 `npx lerna run build --scope=demo` 来让 lerna 自动执行依赖构建 -> 包构建的流程，而不必手动依次进入对应的依赖目录执行各自的构建命令。

### 语义化版本和 Changelog

本 Monorepo 使用 `changeset` 进行大仓各个模块的语义化版本管理和 Changelog 生成，具体来说，只需要在希望生成 Changelog 的时候：

1. 在 Monorepo 根目录运行 `pnpm changeset`

2. 从交互式 CLI 选择合适的模块和版本条目，输入 Summary 即可生成一条 Changeset

仅需正常将生成后的文件提交推送即可，当且仅当想要生成一个语义化版本的时候，向 `master` 分支提出 PR，成功合并时，会触发流水线机器人自动更改对应子模块的 `package.json` 中的 `version`，同时更改 Changelog 并应用于 `master`

## 常见问题
### Lockfile 冲突怎么办

> [解决方案原文](https://www.gahing.top/pages/e261ca/#%E4%B8%89%E7%A7%8D%E9%87%8D%E7%BD%AE%E6%96%B9%E6%A1%88)

- 项目已经使用 `.gitattributes` 指定了，若合并时 `pnpm-lock.yaml` 冲突，那么只以当前分支上的 Lockfile 为准。

- 此时 Lockfile 处于**信息丢失**状态，你只需在项目根目录运行一次 `pnpm update:lockfile` 即可自动修复。

> 在项目根目录、项目子目录下都**只用 `pnpm` 作为包管理工具**，不要使用 `npm` | `yarn` | `cnpm` 等。