import { createRouter, createWebHistory } from 'vue-router'
import MainPage from '../views/MainPage.vue'
import DevicesPage from '../views/DevicesPage.vue'
import RoomsPage from "@/views/RoomsPage.vue"
import RoutinesPage from "@/views/RoutinesPage.vue"
import DeviceInfoPage from "@/views/DeviceInfoPage.vue";
import RoomInfoPage from "@/views/RoomInfoPage.vue";


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
      {
          path: '/',
          name: 'Pagina Principal',
          component: MainPage
      },
      {
          path: '/devices',
          name: 'Dispositivos',
          component: DevicesPage
      },
      {
          path: '/devices/:id',
          name: 'Dispositivo',
          component: DeviceInfoPage
      },
      {
          path: '/routines',
          name: 'Rutinas',
          component: RoutinesPage
      },
      {
          path: '/rooms',
          name: 'Habitaciones',
          component: RoomsPage
      },
      {
          path: '/rooms/:id',
          name: 'Habitacion',
          component: RoomInfoPage
      }
  ]
})

export default router
