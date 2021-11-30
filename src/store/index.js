import { createStore, createLogger } from 'vuex'
import login from './login/login'
import user from './main/user/user'

const isProd = import.meta.env.mode === 'production'

const store = createStore({
  state: {},
  mutations: {},
  actions: {},
  modules: { login, user },
  plugins: isProd ? [createLogger()] : []
})

export function setupStore() {
  store.dispatch('login/loadLocalLogin')
}

export default store
