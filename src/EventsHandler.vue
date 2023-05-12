<script setup lang="ts">
import { ref, provide, reactive } from 'vue'
import { DevicesApi } from '@/api/devices.api'
import { CONSTANTS } from '@/utils/constants'
import type { Event } from '@/interfaces/event.interface'
import {useDevicesStore} from "@/stores/device.store";

const baseUrl = 'http://127.0.0.1:8080/api/devices'
const source = new EventSource(`${baseUrl}/events`)
const MSG = ref<Event>()

const { devices } = useDevicesStore()

source.onmessage = async (event) => {
    const msg = JSON.parse(event.data) as Event
    if (devices.items && devices.items.get(msg.deviceId)) {
        await DevicesApi.reloadDevices()
        MSG.value = msg
    }
} 

const clearMSG = () => {
    MSG.value = undefined
    DevicesApi.reloadDevices()
}

provide(CONSTANTS.EVENT, MSG)

</script>

<template>
    <slot/>
</template>
