export function getTreeData(data) {
  const parents = data.filter(item => item.parent === null)
  const children = data.filter(item => item.parent !== null)
  toTree(parents, children)

  function toTree(parents, children) {
    parents.map(p => {
      children.map((c, i) => {
        if (p._id === c.parent) {
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

  return parents
}

function getComponents() {
  const components = import.meta.globEager('../views/main/**/*.vue')
  // 过滤main.vue和home.vue文件
  delete components['../views/main/main.vue']
  delete components['../views/main/home/home.vue']

  return components
}

function resolveComponent(path, name) {
  const components = getComponents()
  const importPage = components[`../views/main${path}/${name}.vue`]

  return importPage.default
}

export function mapRouterMenu(list) {
  const data = []

  list.forEach(item => {
    item.children.forEach(value => {
      const route = {
        path: value.path,
        name: value.component,
        meta: [item.name, value.name],
        component: resolveComponent(value.path, value.component)
      }
      data.push(route)
    })
  })

  return data
}

export function getButtonPermission(list) {
  const permissions = []

  function _recurseGetPermission(menus) {
    for (const item of menus) {
      if (item.type === 1) {
        _recurseGetPermission(item.children || [])
      } else if (item.type === 2) {
        permissions.push(item.menuCode)
      }
    }
  }

  _recurseGetPermission(list)
  return permissions
}
