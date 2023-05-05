<script setup lang="ts">
import FrameCard from "@/components/FrameCard.vue"

import { DevicesApi } from '@/api/devices.api'
import {ref, onMounted, reactive} from 'vue'
import { useDevicesStore } from '../stores/device.store'
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
         <component v-for="device in topDevices.items" :key="device.id" :id="device.id" :name="device.name" 
         :is="deviceTypes[device.type.id].card" class="pa-3" />
    </VRow>
</template>

<style scoped>

</style>
