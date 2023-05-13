<script setup lang="ts">

import {onMounted, reactive, ref} from 'vue'
import { useDevicesStore } from "@/stores/device.store";
import { DevicesApi } from "@/api/devices.api";
import type { Device } from "@/interfaces/device.interface";
import { useRoomsStore } from '@/stores/room.store';
import { RoomsApi } from '@/api/rooms.api';
import { computed } from 'vue';
import EditableButton from "@/components/custom-inputs/EditableButton.vue";

const { rooms } = useRoomsStore()
const { getDevicesGroupByRoom } = useDevicesStore()
import { useToast } from 'vue-toast-notification';
import {deviceTypes} from "@/utils/constants";

const $toast = useToast()
const devicesGroupByRoom = reactive<{ value: Map<string, Device[]> }>({
    value: new Map<string, Device[]>(),
})

const loadPage = async () => {
    await RoomsApi.reloadRooms()
    await DevicesApi.reloadDevices()
    devicesGroupByRoom.value = getDevicesGroupByRoom()

    devicesGroupByRoom.value.forEach((value, key) => {
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
    <VRow class="my-4 ml-4">
        <EditableButton message="Agregar habitación" @valueSet="addRoom"/>
    </VRow>
    <VRow>
        <VExpansionPanels multiple variant="accordion">
            <VExpansionPanel v-for="room in roomItems" :key="room.id"
                class="width-auto" color="background" bg-color="background" elevation="0">
                <VExpansionPanelTitle>
                    {{room.name}}
                </VExpansionPanelTitle>
                <VExpansionPanelText>
                    <VRow class="flex-row-reverse">
                        <VListItem class="more-devices" :to="`/rooms/${room.id}`">
                            Ir a {{room.name}}
                            <VIcon icon="mdi:mdi-chevron-double-right"/>
                        </VListItem>
                    </VRow>
                    <VSheet class="d-flex flex-wrap justify-start height-auto" color="background">
                        <component v-for="device in devicesGroupByRoom.value.get(room.id)" :key="device.id" :device="device" :id="device.id" :name="device.name"
                                   :is="deviceTypes[device.type.id].card"/>
                    </VSheet>
                </VExpansionPanelText>
            </VExpansionPanel>
        </VExpansionPanels>
    </VRow>
</template>

<style scoped>

.row-width{
    width: 100%;
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