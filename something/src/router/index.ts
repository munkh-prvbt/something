import ChessView from '@/views/ChessView.vue'
import { createRouter, createWebHistory } from 'vue-router'
import DashboardView from '../views/DashboardView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'dashboard',
      component: DashboardView,
    },
    {
      path: '/chess',
      name: 'chess',
      component: ChessView,
    },
  ],
})

export default router
