import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'

import '@/assets/styles/index.css'
import 'element-plus/theme-chalk/index.css'

createApp(App).use(router).use(createPinia()).mount('#app')
