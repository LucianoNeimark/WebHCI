<script setup lang="ts">

import { onMounted, reactive } from 'vue'
import { useDevicesStore } from "@/stores/device.store";
import { DevicesApi } from "@/api/devices.api";
import type { Device } from "@/interfaces/device.interface";
import { useRoomsStore } from '@/stores/room.store';
import { RoomsApi } from '@/api/rooms.api';
import { computed } from 'vue';
import { useDeviceTypesStore } from '@/stores/deviceTypes.store';
import EditableButton from "@/components/custom-inputs/EditableButton.vue";
const { rooms } = useRoomsStore()
const { getDevicesGroupByRoom } = useDevicesStore()
const { deviceTypes } = useDeviceTypesStore()
import { useToast } from 'vue-toast-notification';

const $toast = useToast()
const devicesGroupByRoom = reactive<{ value: Map<string, Device[]>, countMap: Map<string, number> }>({
    value: new Map<string, Device[]>(),
    countMap: new Map<string, number>()
})

const loadPage = async () => {
    await RoomsApi.reloadRooms()
    await DevicesApi.reloadDevices()
    devicesGroupByRoom.value = getDevicesGroupByRoom()

    devicesGroupByRoom.value.forEach((value, key) => {
        devicesGroupByRoom.countMap.set(key, value.length)
        devicesGroupByRoom.value.set(key, value.map((value) => value).slice(0, 3))
    })
}

const roomItems = computed(() => {
    return rooms.items.values()
})

onMounted(loadPage)

const addRoom = async (name: string) => {
    const addedRoom = await RoomsApi.addRoom(name)
    if (!addedRoom) return
    await RoomsApi.reloadRooms()
    await DevicesApi.reloadDevices()
    devicesGroupByRoom.value = getDevicesGroupByRoom()
    $toast.success('Habitación cargada exitosamente', { position: 'top-right' })
}

</script>

<template>
    <VCol>
        <VRow>
            <EditableButton message="Agregar habitación" @valueSet="addRoom"/>
        </VRow>
        <VCol v-for="room in roomItems" :key="room.id" class="row-width pt-3">
            <VRow class="justify-space-between pl-3 pb-3 vert-align">
                <h2 class="bold">{{room.name}} <span class="span-align qty-devices-font">({{devicesGroupByRoom.countMap.get(room.id) || 0}})</span></h2>
                <VListItem class="more-devices" :to="`/rooms/${room.id}`">
                   Ir a {{room.name}}
                    <VIcon icon="mdi:mdi-chevron-double-right"/>
                </VListItem>
            </VRow>
            <VRow class="d-flex flex-wrap mt-0 pb-3">
                <component v-for="device in devicesGroupByRoom.value.get(room.id)" :key="device.id" :device="device" :id="device.id" :name="device.name"
                           :is="deviceTypes[device.type.id].card"/>
            </VRow>
        </VCol>
    </VCol>
</template>

<style scoped>

.row-width{
    width: 100%;
}

.more-devices{
    margin-right: 3%;
}

.qty-devices-font{
   font-size: 1.1rem;
    vertical-align: middle;
}

.vert-align{
    align-items: center;
}
.span-align{
    vertical-align: text-bottom;
}
</style>