import { useAppConfig } from '@store/app-config';
import router from '@utils/router';
import { debounce } from 'common-utils/tools';
import { createPinia } from 'pinia';
import { createApp } from 'vue';

import App from './App.vue';

import 'common-utils/styles/reset.scss';
import 'common-utils/styles/theme.css';

const pinia = createPinia();

createApp(App).use(pinia).use(router).mount('#app');

const appConfig = useAppConfig();

// 窗口调整时更新屏幕信息
window.addEventListener(
  'resize',
  debounce(() => {
    appConfig.updateWindowSize();
  }),
);
