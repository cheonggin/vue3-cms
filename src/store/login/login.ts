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
      entireRole: [],
      entireCategory: []
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
      await this.getCategoryListAction()

      router.push('/main')
    },

    // 根据角色id获取对应的菜单权限
    async getUserMenuAction(role_id: number) {
      const result = await getRolePermissionById(role_id)
      const data = result.data as IMenuList[]
      const menuList = data.filter(item => item.type === '1')
      const actionList = data.filter(item => item.type === '2')
      this.userMenu = getTreeData(menuList)

      localCache.setCache('userMenu', this.userMenu)
      localCache.setCache('userAction', actionList)
    },

    // 获取所有菜单列表
    async getMenuListAction() {
      const { data } = await getPageList('/menu', {
        query: '',
        offset: 0,
        limit: 1000
      })

      const list = data.rows as IMenuList[]
      console.log(list)
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

    // 获取所有分类列表
    async getCategoryListAction() {
      const { data } = await getPageList('/category', {
        query: '',
        offset: 0,
        limit: 1000
      })

      const list = data.rows
      this.entireCategory = getTreeData(list)
      localCache.setCache('entireCategory', this.entireCategory)
    },

    // 加载localStorage中存储的信息，处理页面刷新数据丢失
    loadLocalLogin() {
      const token = localCache.getCache('token')
      const user = localCache.getCache('user')
      const userMenu = localCache.getCache('userMenu')
      const entireMenu = localCache.getCache('entireMenu')
      const entireRole = localCache.getCache('entireRole')
      const entireCategory = localCache.getCache('entireCategory')

      this.token = token
      this.user = user
      this.userMenu = userMenu
      this.entireMenu = entireMenu
      this.entireRole = entireRole
      this.entireCategory = entireCategory

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
