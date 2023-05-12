<script setup lang="ts">
import { ref, provide } from 'vue'
import { DevicesApi } from '@/api/devices.api'
import { CONSTANTS } from '@/utils/constants'
import type { Event } from '@/interfaces/event.interface'
import {useDevicesStore} from "@/stores/device.store";
import {Api} from "@/api/api";

const source = new EventSource(Api.getDevicesEventsUrl())
const MSG = ref<Event>()

const { devices } = useDevicesStore()

source.onmessage = async (event) => {
    const msg = JSON.parse(event.data) as Event
    if (devices.items && devices.items.get(msg.deviceId)) {
        await DevicesApi.reloadDevices()
        MSG.value = msg
    }
} 
provide(CONSTANTS.EVENT, MSG)
</script>

<template>
    <slot/>
</template>
