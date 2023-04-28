import { createRouter, createWebHistory } from 'vue-router'
import MainPage from '../views/MainPage.vue'
import DevicesPage from '../views/DevicesPage.vue'
import RoomsPage from "@/views/RoomsPage.vue"
import RoutinesPage from "@/views/RoutinesPage.vue"


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
      // route to main page view
      {
          path: '/',
          name: 'MainPage',
          component: MainPage
      },
      {
          path: '/devices',
          name: 'DevicesPage',
          component: DevicesPage
      },
      {
          path: '/routines',
          name: 'RoutinesPage',
          component: RoutinesPage
      },
      {
          path: '/rooms',
          name: 'RoomsPage',
          component: RoomsPage
      }
  ]
})

export default router
