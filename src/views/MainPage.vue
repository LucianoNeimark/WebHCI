<script setup lang="ts">

import { DevicesApi } from '@/api/devices.api'
import {onMounted, reactive} from 'vue'
import { useDeviceTypesStore } from '../stores/deviceTypes.store'
import type { Device } from '../interfaces/device.interface'

const topDevices = reactive<{items: Device[]}>({
  items: []
}) 

const { deviceTypes } = useDeviceTypesStore()

onMounted(async () => {
  topDevices.items = await DevicesApi.getTopDevices(3)
  console.log(topDevices.items)
})

</script>

<template>
  <p> Pagina Principal </p>
    <VRow class="ma-3">
        <!-- TODO: Sacar IDs y names para usar device en todos-->
         <component v-for="device in topDevices.items" :key="device.id" :device="device" :id="device.id" :name="device.name" 
         :is="deviceTypes[device.type.id].card" class="pa-3" />
    </VRow>
</template>

<style scoped>

</style>
