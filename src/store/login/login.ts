import { defineStore } from 'pinia'

import type { ILoginAccount } from '@/service/type'
import type { LoginStatus } from './type'
import type { IMenuList } from '@/components/nav-menu'

import router from '@/router'
import { loginAccount, getMenuList } from '@/service'
import { localCache } from '@/utils/cache'
import { getTreeData } from '@/utils/map-menu'

const useLoginStore = defineStore('login', {
  state: (): LoginStatus => {
    return {
      token: '',
      user: {
        name: '',
        id: 0
      },
      userMenu: []
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

      // 登录成功后获取菜单列表
      this.getMenuListAction()

      router.push('/main')
    },

    // 加载localStorage中存储的信息，处理页面刷新数据丢失
    loadLocalLogin() {
      const token = localCache.getCache('token')
      const user = localCache.getCache('user')
      const userMenu = localCache.getCache('userMenu')

      this.token = token
      this.user = user
      this.userMenu = userMenu
    },

    async getMenuListAction() {
      const menuResult = await getMenuList()
      const data = menuResult.data as IMenuList[]
      this.userMenu = getTreeData(data)
      localCache.setCache('userMenu', this.userMenu)
    }
  }
})

export { useLoginStore }
