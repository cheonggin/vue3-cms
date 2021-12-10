import { computed } from 'vue'
import { useStore } from 'vuex'

export function usePermission(pageName) {
  const store = useStore()

  const permissions = computed(() => store.state.login.userButtonPermission)

  const isCreate = getPermission(pageName, 'create')
  const isEdit = getPermission(pageName, 'edit')
  const isDelete = getPermission(pageName, 'delete')

  function getPermission(pageName, type) {
    return !!permissions.value.find(item => item === `${type}-${pageName}`)
  }

  return { isCreate, isEdit, isDelete }
}
