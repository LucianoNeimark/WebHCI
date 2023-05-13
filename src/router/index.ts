import { createRouter, createWebHistory } from 'vue-router'
import MainPage from '../views/MainPage.vue'
import DevicesPage from '../views/DevicesPage.vue'
import RoomsPage from "@/views/RoomsPage.vue"
import RoutinesPage from "@/views/RoutinesPage.vue"
import DeviceInfoPage from "@/views/DeviceInfoPage.vue";
import RoomInfoPage from "@/views/RoomInfoPage.vue";
import {useRoomsStore} from "@/stores/room.store";
import {useDevicesStore} from "@/stores/device.store";
import CreateRoutinePage from "@/views/CreateRoutinePage.vue";


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
      {
          path: '/',
          name: 'Pagina principal',
          component: MainPage,
          meta: {
              name: () => "Página principal",
              ancestors: []
          }
      },
      {
          path: '/devices',
          name: 'Dispositivos',
          component: DevicesPage,
          meta: {
              name: () => "Dispositivos",
              ancestors: []
          }
      },
      {
          path: '/devices/:id',
          name: 'Dispositivo',
          component: DeviceInfoPage,
          meta: {
              name: () => useDevicesStore()?.currentDevice?.value.name || "Dispositivo",
              ancestors: [{ title: 'Dispositivos', href: '/devices', disabled: false }]
          }
      },
      {
          path: '/routines',
          name: 'Rutinas',
          component: RoutinesPage,
          meta: {
              name: () => "Rutinas",
              ancestors: []
          }
      },
      {
          path: '/routines/create',
          name: 'Crear Rutina',
          component: CreateRoutinePage,
          meta: {
            name: () => "Nueva Rutina",
            ancestors: [{ title: 'Rutinas', href: '/routines', disabled: false}]
          }
      },
      {
          path: '/rooms',
          name: 'Habitaciones',
          component: RoomsPage,
          meta: {
              name: () => "Habitaciones",
              ancestors: []
          }
      },
      {
          path: '/rooms/:id',
          name: 'Habitación',
          component: RoomInfoPage,
          meta: {
              name: () => useRoomsStore()?.currentRoom?.value.name || "Habitación",
              ancestors: [{ title: 'Habitaciones', href: '/rooms', disabled: false }]
          }
      }
  ]
})

export default router
