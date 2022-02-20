import { defineStore } from 'pinia'

import router from '@/router'
import { loginAccount } from '@/service'
import { localCache } from '@/utils/cache'
import type { ILoginAccount } from '@/service/type'
import type { LoginStatus } from './type'

const useLoginStore = defineStore('login', {
  state: (): LoginStatus => {
    return {
      token: '',
      user: {
        name: '',
        id: 0
      }
    }
  },

  actions: {
    async loginAccountAction(account: ILoginAccount) {
      const loginResult = await loginAccount(account)
      const { token, user } = loginResult.data

      this.token = token
      this.user = user

      localCache.setCache('token', token)
      localCache.setCache('user', user)

      router.push('/main')
    },

    // 加载localStorage中存储的信息，处理页面刷新数据丢失
    loadLocalLogin() {
      const token = localCache.getCache('token')
      const user = localCache.getCache('user')

      this.token = token
      this.user = user
    }
  }
})

export { useLoginStore }
