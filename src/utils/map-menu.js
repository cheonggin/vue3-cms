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

export function mapRouterMenu(list) {
  const data = []
  list.forEach(item => {
    item.children.forEach(value => {
      const route = {
        path: value.path,
        name: value.component,
        meta: [item.name, value.name],
        component: () =>
          import(`../views/main${value.path}/${value.component}.vue`)
      }
      data.push(route)
    })
  })
  return data
}
