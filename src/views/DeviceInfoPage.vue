<script setup lang="ts">
import ActionsHistoryTable from "@/components/tables/ActionsHistoryTable.vue";
import { useDevicesStore } from '@/stores/device.store';
import {useRoute, useRouter} from 'vue-router';
import { useDeviceTypesStore } from '@/stores/deviceTypes.store';
import {computed, onMounted, reactive, ref, watchEffect} from 'vue';
import type { Device } from '@/interfaces/device.interface';
import EditableLabel from "@/components/custom-inputs/EditableLabel.vue";
import {DevicesApi} from "@/api/devices.api";
import ConfirmationModal from "@/components/modals/AddDeviceModal/ConfirmationModal.vue";
import RoomComboBox from "@/components/custom-inputs/RoomComboBox.vue";
import {RoomsApi} from "@/api/rooms.api";
import type {Room} from "@/interfaces/room.interface";

const route = useRoute()
const { devices, removeDevice } = useDevicesStore();
const { deviceTypes } = useDeviceTypesStore()
const router = useRouter()

const device = reactive({
    value : <Device> devices.items.get(<string> route.params.id)
})

watchEffect(async () => await DevicesApi.updateDevice(device.value))

const deleteDevice = async () => {
    await DevicesApi.deleteDevice(device.value.id)
    removeDevice(device.value.id)
    router.push('/devices')
}

const showConfirmationModal = ref(false)

const promptModal = () => {
    showConfirmationModal.value = true
}

const changingRoom = ref(false)
const room = ref<Room | string | null>(device.value.room || null)
const startChangeRoomAction = () => { changingRoom.value = true }
const changeRoom = async () => {
    changingRoom.value = false
    if(typeof room.value === "string") {
        room.value = await RoomsApi.addRoom(room.value) as Room
        await RoomsApi.reloadRooms()
    }
    if(room.value !== device.value.room) {
        if(device.value.room !== undefined){
            await RoomsApi.removeDeviceFromRoom(device.value.id)
        }
        if(room.value !== null) {
            await RoomsApi.addDeviceToRoom(room.value.id, device.value.id)
        }
    }
    await DevicesApi.reloadDevices()
    device.value = <Device> devices.items.get(<string> route.params.id)
}

const goToButtonDisabled = computed(() => changingRoom.value || device.value.room === undefined )

onMounted(async () => {
        await DevicesApi.reloadDevices()
        await RoomsApi.reloadRooms()
})
</script>

<template>
    <VCol>
        <VRow>
            <EditableLabel v-model:value="device.value.name" :icon="deviceTypes[device.value.type.id].icon"/>
            <VIcon icon="mdi-delete-circle" class="delete-button ml-5" @click="promptModal"/>
        </VRow>
        <VRow class="device-row ma-5">
            <component :is="deviceTypes[device.value.type.id].info" :device="device.value" class="device mr-10" ></component>
            <VCol>
                <VRow>
                    <VBtn class="mb-3" :disabled="goToButtonDisabled" :to="`/rooms/${device.value.room?.id}`">
                        Ir a la habitacion
                        <VIcon>mdi-arrow-right</VIcon>
                    </VBtn>
                </VRow>
                <VRow class="align-content-center">
                    <VCol class="px-0">
                        <RoomComboBox v-model="room" :disabled="!changingRoom" />
                    </VCol>
                    <VCol class="px-0">
                        <VBtn v-if="!changingRoom" @click="startChangeRoomAction" rounded="circle" class="changeButton">
                            <VIcon>mdi-pencil</VIcon>
                        </VBtn>
                        <VBtn v-if="changingRoom" @click="changeRoom" rounded="circle" class="changeButton">
                            <VIcon>mdi-check</VIcon>
                        </VBtn>
                    </VCol>
                </VRow>
            </VCol>
        </VRow>
        <VRow>
            <VExpansionPanels multiple class="ma-5">
                <VExpansionPanel>
                    <VExpansionPanelTitle>Consumo electrico</VExpansionPanelTitle>
                    <VExpansionPanelText>
                    </VExpansionPanelText>
                </VExpansionPanel>
                <VExpansionPanel>
                    <VExpansionPanelTitle>Historial de acciones</VExpansionPanelTitle>
                    <VExpansionPanelText>
                        <ActionsHistoryTable :deviceId="device.value.id" :qty-uses="device.value.meta.qtyUses"/>
                    </VExpansionPanelText>
                </VExpansionPanel>
            </VExpansionPanels>
        </VRow>
    </VCol>
    <ConfirmationModal title="¿Estás seguro? Esta opción no puede revertirse"
                       v-model:show="showConfirmationModal" @confirm="deleteDevice"/>
</template>

<style scoped>
.device {
    min-width: 30vw;
    min-height: 35vh;
}

.changeButton{
    width: 3vw;
    height: 3vw;
    margin-left: 1vw;
}

</style>