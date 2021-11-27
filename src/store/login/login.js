import router from '@/router'

import { accountLoginRequest } from '@/service/login/login'
import localCache from '@/utils/cache'

const loginModule = {
  state() {
    return {
      token: '',
      userinfo: {}
    }
  },
  mutations: {
    initUserInfo(state, { token, userinfo }) {
      state.token = token
      state.userinfo = userinfo
    }
  },
  actions: {
    async accountLoginAction({ commit }, account) {
      const {
        data: { token, userinfo }
      } = await accountLoginRequest(account)

      commit('initUserInfo', { token, userinfo })
      localCache.setCache('token', token)
      localCache.setCache('userinfo', userinfo)

      router.push('/main')
    },
    // 处理刷新页面vuex的数据消失
    loadLocalLogin({ commit }) {
      const token = localCache.getCache('token')
      const userinfo = localCache.getCache('userinfo')
      if (token) {
        commit('initUserInfo', { token, userinfo })
      }
    }
  }
}

export default loginModule
