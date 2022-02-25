import type { IMenuList } from '@/components/nav-menu/types'

/**
 * 扁平数据转树形
 * @param data
 * @returns
 */
export function getTreeData(data: IMenuList[]) {
  const parents = data.filter(item => item.pid === null)
  const children = data.filter(item => item.pid !== null)

  toTree(parents, children)

  return parents
}

function toTree(parents: IMenuList[], children: IMenuList[]) {
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
