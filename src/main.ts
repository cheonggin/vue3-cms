import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import ElementPlusIcon from '@/global/register-element-plus-icon'

import '@/assets/styles/index.css'
import 'element-plus/theme-chalk/index.css'

createApp(App).use(router).use(createPinia()).use(ElementPlusIcon).mount('#app')
