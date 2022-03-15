import { IMenuList } from '@/components/nav-menu'
import { localCache } from '@/utils/cache'
import type { App } from 'vue'

export default function (app: App) {
  app.directive('has', {
    mounted(el, binding) {
      const permissionVal = binding.value
      const userAction = localCache.getCache('userAction') as IMenuList[]
      const hasPermission = userAction.findIndex(
        item => item.menu_code === permissionVal
      )

      if (hasPermission === -1) {
        el.style.display = 'none'
        el.parentNode.removeChild(el)
      }
    }
  })
}
