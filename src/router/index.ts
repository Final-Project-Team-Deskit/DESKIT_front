import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    component: () => import('../pages/Home.vue'),
  },
  {
    path: '/products',
    name: 'products',
    component: () => import('../pages/Products.vue'),
  },
  {
    path: '/products/:id',
    name: 'product-detail',
    component: () => import('../pages/ProductDetail.vue'),
  },
  {
    path: '/setup',
    name: 'setup',
    component: () => import('../pages/Setup.vue'),
  },
  {
    path: '/live',
    name: 'live',
    component: () => import('../pages/Live.vue'),
  },
  {
    path: '/cart',
    name: 'cart',
    component: () => import('../pages/Cart.vue'),
  },
  {
    path: '/admin',
    name: 'admin',
    component: () => import('../pages/Admin.vue'),
  },
  {
    path: '/seller',
    name: 'seller',
    component: () => import('../pages/Seller.vue'),
  },
]

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior() {
    return { top: 0 }
  },
})
