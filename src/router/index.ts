import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import { isLoggedIn, isSeller } from '../lib/auth'

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
    path: '/setups/:id',
    name: 'setup-detail',
    component: () => import('../pages/SetupDetail.vue'),
  },
  {
    path: '/live',
    name: 'live',
    component: () => import('../pages/Live.vue'),
  },
  {
    path: '/live/:id',
    name: 'live-detail',
    component: () => import('../pages/LiveDetail.vue'),
  },
  {
    path: '/vod/:id',
    name: 'vod',
    component: () => import('../pages/Vod.vue'),
  },
  {
    path: '/cart',
    name: 'cart',
    component: () => import('../pages/Cart.vue'),
  },
  {
    path: '/checkout',
    name: 'checkout',
    component: () => import('../pages/Checkout.vue'),
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../pages/Login.vue'),
  },
  {
    path: '/my',
    name: 'my-page',
    component: () => import('../pages/MyPage.vue'),
  },
  {
    path: '/my/orders',
    name: 'order-history',
    component: () => import('../pages/OrderHistory.vue'),
  },
  {
    path: '/order/complete',
    name: 'order-complete',
    component: () => import('../pages/OrderComplete.vue'),
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
    children: [
      {
        path: 'live',
        name: 'seller-live',
        component: () => import('../pages/seller/Live.vue'),
      },
      {
        path: 'products',
        name: 'seller-products',
        component: () => import('../pages/seller/Products.vue'),
      },
    ],
  },
  {
    path: '/seller/my',
    name: 'seller-my',
    component: () => import('../pages/seller/MyPage.vue'),
  },
  {
    path: '/seller/live/create',
    name: 'seller-live-create',
    component: () => import('../pages/seller/LiveCreateCue.vue'),
  },
  {
    path: '/seller/live/create/basic',
    name: 'seller-live-create-basic',
    component: () => import('../pages/seller/LiveCreateBasic.vue'),
  },
  {
    path: '/seller/live/stream/:id',
    name: 'seller-live-stream',
    component: () => import('../pages/seller/LiveStream.vue'),
  },
  {
    path: '/seller/products/create',
    name: 'seller-products-create',
    component: () => import('../pages/seller/ProductCreateInfo.vue'),
  },
  {
    path: '/seller/products/create/detail',
    name: 'seller-products-create-detail',
    component: () => import('../pages/seller/ProductCreateDetail.vue'),
  },
  {
    path: '/seller/products/:id/edit',
    name: 'seller-products-edit',
    component: () => import('../pages/seller/ProductEditInfo.vue'),
  },
  {
    path: '/seller/products/:id/edit/detail',
    name: 'seller-products-edit-detail',
    component: () => import('../pages/seller/ProductEditDetail.vue'),
  },
]

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior() {
    return { top: 0 }
  },
})

router.beforeEach((to) => {
  const loggedIn = isLoggedIn()
  const isSellerPath = to.path.startsWith('/seller')
  if (!loggedIn && to.path.startsWith('/my')) {
    return { path: '/login', query: { redirect: to.fullPath } }
  }
  if (isSellerPath && !loggedIn) {
    return { path: '/login', query: { redirect: to.fullPath } }
  }
  if (isSellerPath && loggedIn && !isSeller()) {
    return { path: '/login', query: { redirect: to.fullPath } }
  }
  if (loggedIn && to.path === '/login') {
    return { path: isSeller() ? '/seller' : '/my' }
  }
  return true
})
