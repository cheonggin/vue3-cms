import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import ElementPlusIcon from '@/global/register-element-plus-icon'
import { useLoginStore } from '@/store/login/login'

import '@/assets/styles/index.css'
import 'element-plus/theme-chalk/index.css'

const app = createApp(App)
app.use(createPinia())

const loginStore = useLoginStore()
loginStore.loadLocalLogin()

app.use(router)
app.use(ElementPlusIcon)
app.mount('#app')
