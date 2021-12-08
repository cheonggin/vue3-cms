import router from '@/router'

import { accountLoginRequest } from '@/service'
import localCache from '@/utils/cache'

const loginModule = {
  namespaced: true,
  state() {
    return {
      token: '',
      userinfo: {},
      userMenu: []
    }
  },
  mutations: {
    initUserInfo(state, { token, userinfo, userMenu }) {
      state.token = token
      state.userinfo = userinfo
      state.userMenu = userMenu
    }
  },
  actions: {
    async accountLoginAction({ commit }, account) {
      const {
        data: { token, userinfo, userMenu }
      } = await accountLoginRequest(account)

      commit('initUserInfo', { token, userinfo, userMenu })
      localCache.setCache('token', token)
      localCache.setCache('userinfo', userinfo)
      localCache.setCache('userMenu', userMenu)

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
