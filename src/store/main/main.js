import { ElMessage } from 'element-plus'

import {
  getPageListData,
  deletePageData,
  createPageData,
  editPageData
} from '@/service'

const mainModule = {
  namespaced: true,
  state() {
    return {
      userTotal: 0,
      userList: [],
      roleTotal: 0,
      roleList: [],
      adminTotal: 0,
      adminList: [],
      categoryTotal: 0,
      categoryList: [],
      goodsTotal: 0,
      goodsList: []
    }
  },
  getters: {
    pageListTotal(state) {
      return pageName => state[`${pageName}Total`]
    },
    pageListData(state) {
      return pageName => state[`${pageName}List`]
    }
  },
  mutations: {
    changeUserData(state, { total, list }) {
      state.userTotal = total
      state.userList = list
    },
    changeRoleData(state, { total, list }) {
      state.roleTotal = total
      state.roleList = list
    },
    changeAdminData(state, { total, list }) {
      state.adminTotal = total
      state.adminList = list
    },
    changeCategoryData(state, { total, list }) {
      state.categoryTotal = total
      state.categoryList = list
    },
    changeGoodsData(state, { total, list }) {
      state.goodsTotal = total
      state.goodsList = list
    }
  },
  actions: {
    async getPageListAction({ commit }, payload) {
      // 获取url
      const { pageName } = payload
      const url = `/rest/${pageName}`

      const {
        data: { total, list }
      } = await getPageListData(url, payload.queryInfo)

      const changePageName =
        pageName.slice(0, 1).toUpperCase() + pageName.slice(1)

      commit(`change${changePageName}Data`, { total, list })
    },
    async deletePageDataAction({ dispatch }, payload) {
      // 获取url
      const { pageName, id } = payload
      const url = `/rest/${pageName}/${id}`

      const result = await deletePageData(url)
      if (result.code === 0) {
        ElMessage.success('删除成功')
        dispatch('getPageListAction', {
          pageName,
          queryInfo: {
            query: '',
            pageSize: 5,
            currentPage: 1
          }
        })
      }
    },
    async createPageDataAction({ dispatch }, payload) {
      const { pageName, addData } = payload
      const url = `/rest/${pageName}`

      const result = await createPageData(url, addData)
      if (result.code === 0) {
        ElMessage.success('添加成功')
        dispatch('getPageListAction', {
          pageName,
          queryInfo: {
            query: '',
            pageSize: 5,
            currentPage: 1
          }
        })
      }
    },
    async editPageDataAction({ dispatch }, payload) {
      const { pageName, editData, id } = payload
      const url = `/rest/${pageName}/${id}`

      const result = await editPageData(url, editData)
      if (result.code === 0) {
        ElMessage.success('修改成功')
        dispatch('getPageListAction', {
          pageName,
          queryInfo: {
            query: '',
            pageSize: 5,
            currentPage: 1
          }
        })
      }
    }
  }
}

export default mainModule
