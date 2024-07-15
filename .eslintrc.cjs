module.exports = {
  parserOptions: {
    project: ['./packages/*/tsconfig.json', './app/*/tsconfig.json'],
    tsconfigRootDir: __dirname,
  },
  ignorePatterns: [
    'commitlint.config.js',
    'packages/create-new-project/templates',
    'dist',
    'node_modules'
  ]
}