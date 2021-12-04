import { getPageListData } from '@/service'
import { createStore, createLogger } from 'vuex'
import login from './login/login'
import main from './main/main'

const isProd = import.meta.env.mode === 'production'

const store = createStore({
  state() {
    return {
      entireRole: [],
      entireCategory: []
    }
  },
  mutations: {
    changeEntireRole(state, list) {
      state.entireRole = list
    },
    changeEntireCategory(state, list) {
      state.entireCategory = list
    }
  },
  actions: {
    async initDataAction({ commit }) {
      // 获取角色列表
      const {
        data: { list: roleList }
      } = await getPageListData('/rest/role', {
        currentPage: 1,
        pageSize: 1000
      })

      // 获取分类列表
      const {
        data: { list: categoryList }
      } = await getPageListData('/rest/category')

      commit('changeEntireRole', roleList)
      commit('changeEntireCategory', categoryList)
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
