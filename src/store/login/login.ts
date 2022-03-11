import { defineStore } from 'pinia'

import type { ILoginAccount } from '@/service/type'
import type { LoginStatus, IRoleList } from './type'
import type { IMenuList } from '@/components/nav-menu'

import router from '@/router'
import { loginAccount, getPageList, getRolePermissionById } from '@/service'
import { localCache } from '@/utils/cache'
import { getTreeData, mapRouterMenu } from '@/utils/map-menu'

const useLoginStore = defineStore('login', {
  state: (): LoginStatus => {
    return {
      token: '',
      user: {
        name: '',
        id: 0,
        role_id: 0
      },
      userMenu: [],
      entireMenu: [],
      entireRole: []
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
      await this.getUserMenuAction(this.user.role_id)

      await this.getMenuListAction()
      this.loadRoutes()

      await this.getRoleListAction()

      router.push('/main')
    },

    // 根据角色id获取对应的菜单权限
    async getUserMenuAction(role_id: number) {
      const result = await getRolePermissionById(role_id)
      this.userMenu = getTreeData(result.data)

      localCache.setCache('userMenu', this.userMenu)
    },

    // 获取所有菜单列表
    async getMenuListAction() {
      const { data } = await getPageList('/menu', {
        query: '',
        offset: 0,
        limit: 1000
      })

      const list = data.rows as IMenuList[]

      this.entireMenu = getTreeData(list)

      localCache.setCache('entireMenu', this.entireMenu)
    },

    // 获取所有角色列表
    async getRoleListAction() {
      const result = await getPageList('/role', {
        query: '',
        offset: 0,
        limit: 1000
      })

      this.entireRole = result.data.rows as IRoleList[]
      localCache.setCache('entireRole', this.entireRole)
    },

    // 加载localStorage中存储的信息，处理页面刷新数据丢失
    loadLocalLogin() {
      const token = localCache.getCache('token')
      const user = localCache.getCache('user')
      const userMenu = localCache.getCache('userMenu')
      const entireRole = localCache.getCache('entireRole')

      this.token = token
      this.user = user
      this.userMenu = userMenu
      this.entireRole = entireRole

      if (this.userMenu) {
        this.loadRoutes()
      }
    },

    // 根据菜单列表动态加载路由
    loadRoutes() {
      const routes = mapRouterMenu(this.userMenu)
      for (const route of routes) {
        router.addRoute('main', route)
      }
    }
  }
})

export { useLoginStore }
