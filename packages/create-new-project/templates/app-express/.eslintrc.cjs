// @see: https://zh-hans.eslint.org
module.exports = {
  // 设置为true表示该配置文件是根配置文件，ESLint将停止在父目录中查找其他配置文件。
  root: true,
  extends: ['@cc-infra/eslint-config'],
  parserOptions: {
    tsconfigRootDir: __dirname,
  },
  overrides: [
    {
      files: ['rollup.config.js'],
      extends: ['plugin:@typescript-eslint/disable-type-checked'],
    },
  ],
  rules: {
    'no-console': 'off',
    'max-classes-per-file': 'off',
    'no-continue': 'off',
    'no-multi-assign': 'off',
    '@typescript-eslint/no-loop-func': 'off',
    'no-await-in-loop': 'off',
  },
  ignorePatterns: ['dist', 'node_modules'],
};
