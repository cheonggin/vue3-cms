import { getUserList } from '@/service'

const userModule = {
  namespaced: true,
  state() {
    return {
      total: 0,
      userList: []
    }
  },
  mutations: {
    initUserData(state, { total, list }) {
      state.total = total
      state.userList = list.slice()
    }
  },
  actions: {
    async getUserListAction({ commit }, queryInfo) {
      const {
        data: { total, list }
      } = await getUserList(queryInfo)

      commit('initUserData', { total, list })
    }
  }
}

export default userModule
