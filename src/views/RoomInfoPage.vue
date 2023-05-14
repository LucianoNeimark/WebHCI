<script setup lang="ts">
import {onMounted, reactive, ref, watch} from "vue";
import type {Device} from "@/interfaces/device.interface";
import {useDevicesStore} from "@/stores/device.store";
import {useRoute, useRouter} from "vue-router";
import {DevicesApi} from "@/api/devices.api";
import AddCard from "@/components/cards/AddCard.vue";
import {useRoomsStore} from "@/stores/room.store";
import type {Room} from "@/interfaces/room.interface";
import {RoomsApi} from "@/api/rooms.api";
import EditableLabel from "@/components/custom-inputs/EditableLabel.vue";
import ConfirmationModal from "@/components/modals/AddDeviceModal/ConfirmationModal.vue";
import AddDeviceModal from "@/components/modals/AddDeviceModal/AddDeviceModal.vue";
import {deviceTypes} from "@/utils/constants";

const route = useRoute()

const roomDevices = reactive<{devices: Device[]}>({
  devices: []
})

const router = useRouter()
const { removeRoom, setCurrentRoom, currentRoom } = useRoomsStore()
const { getDevicesGroupByRoom } = useDevicesStore()

const myRoomData = reactive({room: {} as Room })

const load = async () => {
    await RoomsApi.reloadRooms() // Ver si conviene hacerlo mas eficiente
    await DevicesApi.reloadDevices() // Ver si conviene hacerlo mas eficiente
    setCurrentRoom(<string> route.params.id)
    roomDevices.devices = getDevicesGroupByRoom().get(<string> route.params.id) || [];
    myRoomData.room = currentRoom.value
}
await load()

const showConfirmationModal = ref(false)
const showAddDeviceModal = ref(false)

const promptModal = () => {
    showConfirmationModal.value = true
}

watch(() => myRoomData.room?.name ,async (newValue: string, oldValue: string) => {
    if (oldValue) await RoomsApi.updateRoom(myRoomData.room)
})

const deleteRoom = () => {
    RoomsApi.deleteRoom(myRoomData.room.id)
    router.push('/rooms')
}
</script>

<template>
    <VCol v-if="myRoomData.room.id">
        <VRow class="ma-3">
            <div class="align-editable-label">
                <EditableLabel v-model:value="myRoomData.room.name"/>
            </div>
            <div>
              <VBtn icon="mdi-delete" color="lightSurface" class="delete-button ml-5" @click="promptModal"/>
            </div>
        </VRow>
        <VRow class="ml-2 align-content-center">
            <!-- TODO: Sacar IDs y names para usar device en todos-->
            <component v-for="device in roomDevices.devices" :key="device.id" :device="device"
                       :is="deviceTypes[device.type.id].card"/>
            <AddCard @click="showAddDeviceModal = true"/>
        </VRow>
    </VCol>
    <ConfirmationModal title="¿Estás seguro? Esta opción no puede revertirse"
                       v-model:show="showConfirmationModal" @confirm="deleteRoom"/>
    <AddDeviceModal v-model:dialog="showAddDeviceModal" :room="myRoomData.room" @device-added="load"/>
</template>

<style scoped>

</style>