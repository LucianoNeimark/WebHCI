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
  topRoutines.routines = await RoutinesApi.getTopRoutines(6)
})

</script>

<template>
    <VContainer>
        <VRow class="pt-3 justify-space-between">
            <h2 class="bold pl-10">Dispositivos mas utilizados</h2>
            <VListItem class="more-devices" :to="`devices/`">Ver mas dispositivos <VIcon icon="mdi:mdi-chevron-double-right"/></VListItem>
        </VRow>
        <VRow class="ml-2 align-content-center">
            <!-- TODO: Sacar IDs y names para usar device en todos-->
            <component v-for="device in topDevices.devices" :key="device.id" :device="device" :id="device.id" :name="device.name"
                       :is="deviceTypes[device.type.id].card" class="pa-3 pb-2" />
        </VRow>
    </VContainer>
    <VContainer>
        <VRow class="justify-space-between">
            <h2 class="justify-center bold pl-10">Rutinas mas utilizadas</h2>
            <VListItem class="more-devices" :to="`routines/`">Ver mas rutinas<VIcon icon="mdi:mdi-chevron-double-right"/></VListItem>
        </VRow>
        <VRow class="ml-2">
            <RoutineCard v-for="routine in topRoutines.routines" :key="routine.id" :routine="routine" :id="routine.id" :name="routine.name" class="pa-3" />
        </VRow>
    </VContainer>
</template>

<style scoped>

.more-devices{
    margin-right: 3%;
}
</style>


