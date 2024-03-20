import {createRouter, createWebHistory} from 'vue-router'
import TradingDashboardView from '../views/TradingDashboardView.vue'
import LoginView from '../views/LoginView.vue'
import TradeRoomView from "@/views/TradeRoomView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'tradingdashboard',
      component: () => import('../views/TradingDashboardView.vue'),
      meta: {
        requiresAuth: true,
      }
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/traderoom',
      name: 'traderoom',
      component: TradeRoomView,
      meta: {
        requiresAuth: true,
      }
    },
    {
      path: '/checkout',
      name: 'checkout',
      component: () => import('../views/CheckoutView.vue'),
      meta: {
        requiresAuth: true,
      }
    },
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (About.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import('../views/AboutView.vue')
    // }
  ]
})

export default router
