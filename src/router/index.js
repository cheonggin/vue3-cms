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
        path: '/users',
        name: 'user',
        meta: ['用户管理', '用户列表'],
        component: () => import('@/views/main/user/user.vue')
      },
      {
        path: '/goods',
        name: 'goods',
        meta: ['商品管理', '商品列表'],
        component: () => import('@/views/main/product/goods/goods.vue')
      },
      {
        path: '/categories',
        name: 'category',
        meta: ['商品管理', '商品分类'],
        component: () => import('@/views/main/product/category/category.vue')
      },
      {
        path: '/orders',
        name: 'order',
        meta: ['订单管理', '订单列表'],
        component: () => import('@/views/main/order/order.vue')
      },
      {
        path: '/roles',
        name: 'role',
        meta: ['系统管理', '角色管理'],
        component: () => import('@/views/main/system/role/role.vue')
      },
      {
        path: '/admin_users',
        name: 'admin',
        meta: ['系统管理', '管理员管理'],
        component: () => import('@/views/main/system/admin/admin.vue')
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
  console.log(!to.meta.isPublic)
  if (!to.meta.isPublic && !token) {
    return next('/login')
  }

  next()
})

export default router
