import { getPageListData } from '@/service'

const mainModule = {
  namespaced: true,
  state() {
    return {
      userTotal: 0,
      userList: [],
      roleTotal: 0,
      roleList: []
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
    }
  },
  actions: {
    async getPageListAction({ commit }, payload) {
      // 获取url
      const pageName = payload.pageName
      const url = `/rest/${pageName}s`

      const {
        data: { total, list }
      } = await getPageListData(url, payload.queryInfo)

      const changePageName =
        pageName.slice(0, 1).toUpperCase() + pageName.slice(1)

      commit(`change${changePageName}Data`, { total, list })
    }
  }
}

export default mainModule
