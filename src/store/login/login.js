import router from '@/router'

import { accountLoginRequest } from '@/service'
import localCache from '@/utils/cache'
import {
  getTreeData,
  mapRouterMenu,
  getButtonPermission
} from '@/utils/map-menu'

const loginModule = {
  namespaced: true,
  state() {
    return {
      token: '',
      userinfo: {},
      userMenu: [],
      userButtonPermission: []
    }
  },
  mutations: {
    initUserInfo(state, { token, userinfo, userMenu }) {
      state.token = token
      state.userinfo = userinfo
      state.userMenu = userMenu

      // 注册动态路由
      const routes = mapRouterMenu(userMenu)
      routes.forEach(route => {
        router.addRoute('main', route)
      })

      // 获取用户对应的按钮权限
      const userButtonPermission = getButtonPermission(userMenu)
      state.userButtonPermission = userButtonPermission
    }
  },
  actions: {
    async accountLoginAction({ commit, dispatch }, account) {
      const {
        data: { token, userinfo, userMenu }
      } = await accountLoginRequest(account)
      const userMenuTree = getTreeData(userMenu)

      commit('initUserInfo', { token, userinfo, userMenu: userMenuTree })
      localCache.setCache('token', token)
      localCache.setCache('userinfo', userinfo)
      localCache.setCache('userMenu', userMenuTree)

      // 获取token后，请求完整的角色列表、分类列表、菜单列表等
      dispatch('initDataAction', null, { root: true })

      router.push('/main')
    },
    // 处理刷新页面vuex的数据消失
    loadLocalLogin({ commit }) {
      const token = localCache.getCache('token')
      const userinfo = localCache.getCache('userinfo')
      const userMenu = localCache.getCache('userMenu')
      if (token) {
        commit('initUserInfo', { token, userinfo, userMenu })
      }
    }
  }
}

export default loginModule
