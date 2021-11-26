import { Setting, Goods, User, List } from '@element-plus/icons'

export const menuList = [
  {
    primaryTitle: '用户管理',
    icon: User,
    children: [{ path: '/users', title: '用户列表' }]
  },
  {
    primaryTitle: '商品管理',
    icon: Goods,
    children: [
      { path: '/goods', title: '商品列表' },
      { path: '/categories', title: '商品分类' }
    ]
  },
  {
    primaryTitle: '订单管理',
    icon: List,
    children: [{ path: '/orders', title: '订单列表' }]
  },
  {
    primaryTitle: '系统管理',
    icon: Setting,
    children: [
      { path: '/roles', title: '角色管理' },
      { path: '/admin_users', title: '管理员管理' }
    ]
  }
]
