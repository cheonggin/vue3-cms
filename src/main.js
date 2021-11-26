import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store, { setupStore } from './store'

import '@/assets/styles/index.css'
import 'element-plus/theme-chalk/index.css'

setupStore()

createApp(App).use(router).use(store).mount('#app')
