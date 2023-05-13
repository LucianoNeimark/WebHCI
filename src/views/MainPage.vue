<script setup lang="ts">

import { DevicesApi } from '@/api/devices.api'
import { RoutinesApi } from '@/api/routines.api'

import {onMounted, reactive} from 'vue'
import { useDevicesStore } from '@/stores/device.store'
import type { Device } from '@/interfaces/device.interface'
import type { Routine } from "@/interfaces/routine.interface";
import RoutineCard from "@/components/cards/RoutineCard.vue";
import {deviceTypes} from "@/utils/constants";
import { useRoutinesStore } from '../stores/routine.store'
import { RoomsApi } from '@/api/rooms.api'
import { useRoomsStore } from '@/stores/room.store'
import type { Room } from '@/interfaces/room.interface'
import RoomCard from '@/components/cards/RoomCard.vue'

const topDevices = reactive<{devices: Device[]}>({
  devices: []
}) 

const topRoutines = reactive<{routines: Routine[]}>({
  routines: []
})

const topRooms = reactive<{rooms: Room[]}>({
  rooms: []
})


const { getTopDevices } = useDevicesStore()
const { getTopRoutines } = useRoutinesStore()
const { rooms } = useRoomsStore()

onMounted(async () => {
  await DevicesApi.reloadDevices()
  await RoutinesApi.reloadRoutines()
  await RoomsApi.reloadRooms()
  topDevices.devices = getTopDevices(3)
  topRoutines.routines = getTopRoutines(6)
  topRooms.rooms = Array.from(rooms.items.values()).slice(0, 6) as Room[]
})

</script>

<template>
    <VCol>
        <VCol>
            <VRow class="justify-space-between">
                <h2 class="bold pl-4">Dispositivos más utilizados</h2>
                <VListItem class="more-devices" to="devices">Ver más<VIcon icon="mdi:mdi-chevron-double-right"/></VListItem>
            </VRow>
            <VRow class="align-content-center">
                <component v-for="device in topDevices.devices" :key="device.id" :device="device" :is="deviceTypes[device.type.id].card"/>
            </VRow>
        </VCol>
        
        <VCol>
            <VRow class="justify-space-between">
                <h2 class="justify-center bold pl-4">Habitaciones</h2>
                <VListItem class="more-devices" to="rooms">Ver más<VIcon icon="mdi:mdi-chevron-double-right"/></VListItem>
            </VRow>
            <VRow>
                <RoomCard v-for="room in topRooms.rooms" :key="room.id" :room="room" class="pa-3" />
            </VRow>
        </VCol>

        <VCol>
            <VRow class="justify-space-between">
                <h2 class="justify-center bold pl-4">Rutinas más utilizadas</h2>
                <VListItem class="more-devices" to="routines">Ver más<VIcon icon="mdi:mdi-chevron-double-right"/></VListItem>
            </VRow>
            <VRow>
                <RoutineCard v-for="routine in topRoutines.routines" :key="routine.id" :routine="routine" class="pa-3" />
            </VRow>
        </VCol>
    </VCol>
</template>

<style scoped>
</style>


