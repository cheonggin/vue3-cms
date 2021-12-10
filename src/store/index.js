import { getPageListData } from '@/service'
import { createStore, createLogger } from 'vuex'
import login from './login/login'
import main from './main/main'

import { getTreeData } from '@/utils/map-menu'
import localCache from '@/utils/cache'

const isProd = import.meta.env.mode === 'production'

const store = createStore({
  state() {
    return {
      entireRole: [],
      entireCategory: [],
      entireMenu: []
    }
  },
  mutations: {
    changeEntireRole(state, list) {
      state.entireRole = list
    },
    changeEntireCategory(state, list) {
      state.entireCategory = list
    },
    changeEntireMenu(state, list) {
      state.entireMenu = list
    }
  },
  actions: {
    async initDataAction({ commit }) {
      // 获取角色列表
      const {
        data: { list: roleList }
      } = await getPageListData('/role/list', {
        currentPage: 1,
        pageSize: 1000
      })

      // 获取分类列表
      const {
        data: { list: categoryList }
      } = await getPageListData('/category/list', {
        currentPage: 1,
        pageSize: 1000
      })

      // 获取菜单列表
      const {
        data: { list }
      } = await getPageListData('/menu/list')
      const menuList = getTreeData(list)

      commit('changeEntireRole', roleList)
      commit('changeEntireCategory', categoryList)
      commit('changeEntireMenu', menuList)

      localCache.setCache('roleList', roleList)
      localCache.setCache('categoryList', categoryList)
      localCache.setCache('menuList', menuList)
    },
    loadDataList({ commit }) {
      const roleList = localCache.getCache('roleList')
      const categoryList = localCache.getCache('categoryList')
      const menuList = localCache.getCache('menuList')

      roleList && commit('changeEntireRole', roleList)
      categoryList && commit('changeEntireCategory', categoryList)
      menuList && commit('changeEntireMenu', menuList)
    }
  },
  modules: { login, main },
  plugins: isProd ? [createLogger()] : []
})

export function setupStore() {
  store.dispatch('login/loadLocalLogin')
  store.dispatch('loadDataList')
}

export default store
