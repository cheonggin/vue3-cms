import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store, { setupStore } from './store'
import * as Icons from '@element-plus/icons'

import registerProperties from '@/global/register-properties'
import '@/assets/styles/index.css'
import 'element-plus/theme-chalk/index.css'

setupStore()

const app = createApp(App)
app.use(router).use(store).use(registerProperties).mount('#app')

Object.keys(Icons).forEach(key => {
  app.component(key, Icons[key])
})
