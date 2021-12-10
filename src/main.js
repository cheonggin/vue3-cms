import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store, { setupStore } from './store'

import registerProperties from '@/global/register-properties'
import reisterElementPlusIcon from '@/global/register-element-icon'

import '@/assets/styles/index.css'
import 'element-plus/theme-chalk/index.css'

setupStore()

createApp(App)
  .use(router)
  .use(store)
  .use(registerProperties)
  .use(reisterElementPlusIcon)
  .mount('#app')
