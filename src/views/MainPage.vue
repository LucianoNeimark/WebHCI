<script setup lang="ts">

import { DevicesApi } from '@/api/devices.api'
import { RoutinesApi } from '@/api/routines.api'

import {onMounted, reactive} from 'vue'
import { useDeviceTypesStore } from '@/stores/deviceTypes.store'
import type { Device } from '@/interfaces/device.interface'
import type { Routine } from "@/interfaces/routine.interface";
import RoutineCard from "@/components/cards/RoutineCard.vue";

const topDevices = reactive<{devices: Device[]}>({
  devices: []
}) 

const topRoutines = reactive<{routines: Routine[]}>({
  routines: []
})

const { deviceTypes } = useDeviceTypesStore()

onMounted(async () => {
  topDevices.devices = await DevicesApi.getTopDevices(3)
  console.log(topDevices.devices)
  topRoutines.routines = await RoutinesApi.getTopRoutines(6)
  console.log(topRoutines.routines)
})

</script>

<template>
  <p> Pagina Principal </p>
    <VRow class="ma-3">
        <!-- TODO: Sacar IDs y names para usar device en todos-->
         <component v-for="device in topDevices.devices" :key="device.id" :device="device" :id="device.id" :name="device.name"
         :is="deviceTypes[device.type.id].card" class="pa-3" />
    </VRow>
    <VRow class="ma-3">
        <RoutineCard v-for="routine in topRoutines.routines" :key="routine.id" :routine="routine" :id="routine.id" :name="routine.name" class="pa-3" />
    </VRow>

</template>

<style scoped>

</style>


