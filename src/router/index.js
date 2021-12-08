import { createRouter, createWebHashHistory } from 'vue-router'

import locaCache from '@/utils/cache'

const routes = [
  { path: '/', redirect: '/main' },
  {
    path: '/login',
    name: 'login',
    meta: { isPublic: true },
    component: () => import('@/views/login/login.vue')
  },
  {
    path: '/main',
    name: 'main',
    component: () => import('@/views/main/main.vue'),
    redirect: '/index',
    children: [
      {
        path: '/index',
        name: 'index',
        meta: [],
        component: () => import('@/views/main/home/home.vue')
      },
      {
        path: '/product/goods',
        name: 'goods',
        meta: ['商品管理', '商品列表'],
        component: () => import('@/views/main/product/goods/goods.vue')
      },
      {
        path: '/product/category',
        name: 'category',
        meta: ['商品管理', '商品分类'],
        component: () => import('@/views/main/product/category/category.vue')
      },
      {
        path: '/system/role',
        name: 'role',
        meta: ['系统管理', '角色管理'],
        component: () => import('@/views/main/system/role/role.vue')
      },
      {
        path: '/system/admin',
        name: 'admin',
        meta: ['系统管理', '管理员管理'],
        component: () => import('@/views/main/system/admin/admin.vue')
      },
      {
        path: '/system/menu',
        name: 'menu',
        meta: ['系统管理', '菜单管理'],
        component: () => import('@/views/main/system/menu/menu.vue')
      }
    ]
  }
]

const router = createRouter({
  routes,
  history: createWebHashHistory()
})

router.beforeEach((to, from, next) => {
  const token = locaCache.getCache('token')

  if (!to.meta.isPublic && !token) {
    return next('/login')
  }

  next()
})

export default router
