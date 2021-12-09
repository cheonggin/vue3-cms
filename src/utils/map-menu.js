export function mapRouterMenu(list) {
  const data = []
  for (const item of list) {
    for (const value of item.children) {
      const fileName = value.path.split('/').slice().pop()

      const route = {
        path: value.path,
        name: value.component,
        meta: [item.name, value.name],
        component: () => import(`../views/main${value.path}/${fileName}.vue`)
      }

      data.push(route)
    }
  }

  return data
}
