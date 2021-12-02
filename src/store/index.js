import { createStore, createLogger } from 'vuex'
import login from './login/login'
import main from './main/main'

const isProd = import.meta.env.mode === 'production'

const store = createStore({
  state: {},
  mutations: {},
  actions: {},
  modules: { login, main },
  plugins: isProd ? [createLogger()] : []
})

export function setupStore() {
  store.dispatch('login/loadLocalLogin')
}

export default store
