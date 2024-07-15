import { resolve } from 'path';

import vue from '@vitejs/plugin-vue';
import AutoImport from 'unplugin-auto-import/vite';
import { TDesignResolver } from 'unplugin-vue-components/resolvers';
import Components from 'unplugin-vue-components/vite';
import { defineConfig, loadEnv } from 'vite';

import packageJson from './package.json';
import versionGenerator from './plugins/plugin-version-generator';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [
    vue(),
    versionGenerator({
      version: packageJson.version,
    }),
    AutoImport({
      resolvers: [
        TDesignResolver({
          library: 'vue-next',
        }),
      ],
    }),
    Components({
      resolvers: [
        TDesignResolver({
          library: 'vue-next',
        }),
      ],
    }),
  ],
  base: loadEnv(mode, __dirname).VITE_BASE || '/',
  server: {
    port: Number(loadEnv(mode, __dirname).VITE_PORT || 3000),
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: '@use "common-utils/styles/utils.scss" as *;',
      },
    },
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
      '@utils': resolve(__dirname, 'src/utils'),
      '@images': resolve(__dirname, 'src/assets/images'),
      '@styles': resolve(__dirname, 'src/assets/styles'),
      '@components': resolve(__dirname, 'src/components'),
      '@pages': resolve(__dirname, 'src/pages'),
      '@store': resolve(__dirname, 'src/store'),
      '@layout': resolve(__dirname, 'src/layout'),
    },
  },
}));
