// add-node-prefix-plugin.js
export default function addNodePrefixPlugin() {
  let extraLength = 0;
  const builtinModules = new Set([
    // 这里列出所有需要添加 node: 前缀的 Node.js 内置模块
    'fs',
    'fs/promises',
    'path',
    'os',
    'http',
    'https',
    'zlib',
    'stream',
    'events',
    'util',
    'assert',
    'tty',
    'domain',
    'constants',
    'child_process',
    'async_hooks',
    // ... 其他模块
  ]);

  return {
    name: 'add-node-prefix',

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    renderChunk(code, chunk, options) {
      // 正则表达式匹配 import 语句
      const importRegex = /(import\s+)(.*?\s+from\s+)?(['"])(.*)(['"]);/g;
      let match;
      let updatedCode = code;

      // 循环查找并替换 import 语句
      // eslint-disable-next-line no-cond-assign
      while ((match = importRegex.exec(code)) !== null) {
        const [fullMatch, header, keep, quote, path] = match;
        if (builtinModules.has(path)) {
          // 如果是 Node.js 内置模块，添加 node: 前缀
          updatedCode = `${updatedCode.substring(0, match.index + extraLength)}${header}${keep}${quote}node:${path}${quote};${updatedCode.substring(
            match.index + extraLength + fullMatch.length,
          )}`;
          extraLength += 'node:'.length;
        }
      }

      return updatedCode;
    },
  };
}
