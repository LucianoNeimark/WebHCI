<script setup lang="ts">

import { DevicesApi } from '@/api/devices.api'
import { RoutinesApi } from '@/api/routines.api'

import {onMounted, reactive} from 'vue'
import { useDeviceTypesStore } from '@/stores/deviceTypes.store'
import { useDevicesStore } from '@/stores/device.store'
import type { Device } from '@/interfaces/device.interface'
import type { Routine } from "@/interfaces/routine.interface";
import RoutineCard from "@/components/cards/RoutineCard.vue";

const topDevices = reactive<{devices: Device[]}>({
  devices: []
}) 

const topRoutines = reactive<{routines: Routine[]}>({
  routines: []
})


const { getTopDevices } = useDevicesStore()
const { deviceTypes } = useDeviceTypesStore()

onMounted(async () => {
  await DevicesApi.reloadDevices()
  topDevices.devices = getTopDevices(3)
  topRoutines.routines = await RoutinesApi.getTopRoutines(6)
})

</script>

<template>
    <VCol>
        <VRow class="pt-3 justify-space-between">
            <h2 class="bold pl-10">Dispositivos más utilizados</h2>
            <VListItem class="more-devices" :to="`devices/`">Ver más dispositivos <VIcon icon="mdi:mdi-chevron-double-right"/></VListItem>
        </VRow>
        <VRow class="ml-2 align-content-center">
            <!-- TODO: Sacar IDs y names para usar device en todos-->
            <component v-for="device in topDevices.devices" :key="device.id" :device="device" :id="device.id" :name="device.name"
                       :is="deviceTypes[device.type.id].card"/>
        </VRow>
        <VRow class="justify-space-between">
            <h2 class="justify-center bold pl-10">Rutinas más utilizadas</h2>
            <VListItem class="more-devices" :to="`routines/`">Ver más rutinas<VIcon icon="mdi:mdi-chevron-double-right"/></VListItem>
        </VRow>
        <VRow class="ml-2">
            <RoutineCard v-for="routine in topRoutines.routines" :key="routine.id" :routine="routine" :id="routine.id" :name="routine.name" class="pa-3" />
        </VRow>
    </VCol>
</template>

<style scoped>

.more-devices{
    margin-right: 3%;
}
</style>


