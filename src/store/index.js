import { createStore, createLogger } from 'vuex'
import login from './login/login'

const isProd = import.meta.env.mode === 'production'

const store = createStore({
  state: {},
  mutations: {},
  actions: {},
  modules: { login },
  plugins: isProd ? [createLogger()] : []
})

export function setupStore() {
  store.dispatch('loadLocalLogin')
}

export default store