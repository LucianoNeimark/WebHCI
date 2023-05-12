<script setup lang="ts">
import { ref, provide, reactive } from 'vue'
import { DevicesApi } from '@/api/devices.api'
import { CONSTANTS } from '@/utils/constants'
import type { Event } from '@/interfaces/event.interface'

const baseUrl = 'http://127.0.0.1:8080/api/devices'
const source = new EventSource(`${baseUrl}/events`)
const MSG = ref<Event>()

source.onmessage = (event) => {   
    MSG.value = event.data
} 

const clearMSG = () => {
    MSG.value = undefined
    DevicesApi.reloadDevices()
}

provide(CONSTANTS.EVENT, MSG)

</script>

<template>
    <router-view/>                            
</template>
