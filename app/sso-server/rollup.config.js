import json from '@rollup/plugin-json';
import typescript from '@rollup/plugin-typescript';

export default {
  input: 'src/index.ts',
  output: [
    {
      file: 'dist/index.js',
      format: 'es',
      sourcemap: true,
    },
  ],
  context: 'globalThis',
  plugins: [
    json(),
    typescript({
      tsconfig: './tsconfig.json',
    }),
  ],
};
