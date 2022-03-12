import type { IMenuList } from '@/components/nav-menu/types'
import { RouteRecordRaw } from 'vue-router'

/**
 * 扁平数据转树形
 * @param data
 * @returns
 */
export function getTreeData(data: any[]) {
  const parents = data.filter(item => item.pid === null)
  const children = data.filter(item => item.pid !== null)

  toTree(parents, children)

  return parents
}

function toTree(parents: any[], children: any[]) {
  parents.map(p => {
    children.map((c, i) => {
      if (p.id === c.pid) {
        // 对原子级数据深度克隆
        const _c = JSON.parse(JSON.stringify(children))
        _c.splice(i, 1)
        toTree([c], _c)

        if (p.children) {
          p.children.push(c)
        } else {
          p.children = [c]
        }
      }
    })
  })
}

function getComponents() {
  const components = import.meta.globEager('../views/main/**/*.vue')
  // 过滤main.vue和home.vue文件
  delete components['../views/main/main.vue']
  delete components['../views/main/home/home.vue']

  return components
}

function resolveComponent(path: string, name: string) {
  const components = getComponents()
  const importPage = components[`../views/main${path}/${name}.vue`]

  return importPage.default
}

export function mapRouterMenu(list: IMenuList[]) {
  const data = [] as RouteRecordRaw[]

  list.forEach(item => {
    item.children?.forEach(value => {
      const route: RouteRecordRaw = {
        path: value.path,
        name: value.component,
        meta: { breadcrumbList: [{ name: item.name }, { name: value.name }] },
        component: resolveComponent(value.path, value.component)
      }
      data.push(route)
    })
  })

  return data
}
