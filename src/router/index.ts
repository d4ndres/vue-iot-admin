import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      children: [
        {
          path: 'dashboard',
          name: 'dashboard',
          component: () => import('@/views/admin/Dashboard.vue')
        },
        {
          path: 'devices',
          name: 'devices',
          component: () => import('@/views/admin/Devices.vue')
        }
      ] as any
    }
  ]
})

router.beforeEach( (to, from) => {
  if( to.name == 'home' ) {
    return { name: 'dashboard'}
  }
})

export default router
