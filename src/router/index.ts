import { createRouter, createWebHashHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  { path: '/', redirect: '/main' },
  {
    path: '/login',
    name: 'login',
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
        component: () => import('@/views/main/home/home.vue')
      },
      {
        path: '/product/goods',
        name: 'goods',
        meta: { breadcrumbList: [{ name: '商品管理' }, { name: '商品列表' }] },
        component: () => import('@/views/main/product/goods/goods.vue')
      },
      {
        path: '/product/category',
        name: 'category',
        meta: { breadcrumbList: [{ name: '商品管理' }, { name: '商品分类' }] },
        component: () => import('@/views/main/product/category/category.vue')
      },
      {
        path: '/system/role',
        name: 'role',
        meta: { breadcrumbList: [{ name: '系统管理' }, { name: '角色管理' }] },
        component: () => import('@/views/main/system/role/role.vue')
      },
      {
        path: '/system/admin',
        name: 'admin',
        meta: {
          breadcrumbList: [{ name: '系统管理' }, { name: '管理员管理' }]
        },
        component: () => import('@/views/main/system/admin/admin.vue')
      },
      {
        path: '/system/menu',
        name: 'menu',
        meta: { breadcrumbList: [{ name: '系统管理' }, { name: '菜单管理' }] },
        component: () => import('@/views/main/system/menu/menu.vue')
      }
    ]
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'notFound',
    component: () => import('@/views/not-found/not-found.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
