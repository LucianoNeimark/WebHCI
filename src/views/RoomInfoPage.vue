<script setup lang="ts">
import { onMounted, reactive, ref} from "vue";
import type {Device} from "@/interfaces/device.interface";
import {useDevicesStore} from "@/stores/device.store";
import {useRoute} from "vue-router";
import {DevicesApi} from "@/api/devices.api";
import {useDeviceTypesStore} from "@/stores/deviceTypes.store";
import AddCard from "@/components/cards/AddCard.vue";
import {useRoomsStore} from "@/stores/room.store";
import type {Room} from "@/interfaces/room.interface";
import {RoomsApi} from "@/api/rooms.api";

const route = useRoute()

const roomDevices = reactive<{devices: Device[]}>({
  devices: []
})

const { rooms } = useRoomsStore()
const { getDevicesGroupByRoom } = useDevicesStore()
const { deviceTypes } = useDeviceTypesStore()

const myRoom = ref({})

onMounted(async () => {
  await RoomsApi.reloadRooms() // Ver si conviene hacerlo mas eficiente
  await DevicesApi.reloadDevices() // Ver si conviene hacerlo mas eficiente
  roomDevices.devices = getDevicesGroupByRoom().get(<string> route.params.id) || [];
  myRoom.value = <Room> rooms.items.get(<string> route.params.id)
})

const addDevice = () => {
    console.log("Hello world")
}

</script>

<template>
    <VCol>
        <VRow class="pt-3 justify-space-between">
            <h2 class="bold pl-10">{{myRoom.name || 'Sin habitación'}}</h2>
        </VRow>
        <VRow class="ml-2 align-content-center">
            <!-- TODO: Sacar IDs y names para usar device en todos-->
            <component v-for="device in roomDevices.devices" :key="device.id" :device="device" :id="device.id" :name="device.name"
                       :is="deviceTypes[device.type.id].card"/>
            <AddCard @click="addDevice"/>
        </VRow>
    </VCol>
</template>

<style scoped>

</style>