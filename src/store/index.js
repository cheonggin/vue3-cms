import { getPageListData } from '@/service'
import { createStore, createLogger } from 'vuex'
import login from './login/login'
import main from './main/main'

const isProd = import.meta.env.mode === 'production'

const store = createStore({
  state() {
    return {
      entireRole: []
    }
  },
  mutations: {
    changeEntireRole(state, list) {
      state.entireRole = list
    }
  },
  actions: {
    async initDataAction({ commit }) {
      const {
        data: { list }
      } = await getPageListData('/rest/roles', {
        currentPage: 1,
        pageSize: 1000
      })

      commit('changeEntireRole', list)
    }
  },
  modules: { login, main },
  plugins: isProd ? [createLogger()] : []
})

export function setupStore() {
  store.dispatch('login/loadLocalLogin')
  store.dispatch('initDataAction')
}

export default store
