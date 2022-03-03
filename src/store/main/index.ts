import { defineStore } from 'pinia'

import type { IQueryInfo } from '@/service/type'
import type { IMainState } from './types/main.type'

import {
  addPageData,
  getPageList,
  updatePageData,
  deletePageData
} from '@/service'
import { ElMessage } from 'element-plus'

const useMainStore = defineStore('main', {
  state: (): IMainState => {
    return {
      adminList: [],
      adminTotal: 0
    }
  },
  getters: {
    pageListData: state => {
      return (pageName: String) => state[`${pageName}List` as keyof IMainState]
    }
  },
  actions: {
    async getPageListAction(pageName: string, queryInfo: IQueryInfo) {
      const url = `/${pageName}`
      const result = await getPageList(url, queryInfo)

      this[`${pageName}List` as keyof IMainState] = result.data.rows
      this[`${pageName}Total` as keyof IMainState] = result.data.count
    },

    async addPageDataAction(pageName: string, data: any) {
      const url = `/${pageName}`
      const result = await addPageData(url, data)

      if (result.msg === 'success') {
        ElMessage.success('添加成功')
      }
    },

    async updatePageDataAction(pageName: string, id: number, data: any) {
      const url = `/${pageName}/${id}`
      const result = await updatePageData(url, data)

      if (result.msg === 'success') {
        ElMessage.success('修改成功')
      }
    },

    async deletePageDataAction(pageName: string, id: number) {
      const url = `/${pageName}/${id}`
      const result = await deletePageData(url)

      if (result.msg === 'success') {
        ElMessage.success('删除成功')
      }
    }
  }
})

export { useMainStore }
