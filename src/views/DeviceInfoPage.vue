<script setup lang="ts">
import ActionsHistoryTable from "@/components/tables/ActionsHistoryTable.vue";
import { useDevicesStore } from '@/stores/device.store';
import {useRoute, useRouter} from 'vue-router';
import {computed, onMounted, reactive, ref, watch} from 'vue';
import type { Device } from '@/interfaces/device.interface';
import EditableLabel from "@/components/custom-inputs/EditableLabel.vue";
import {DevicesApi} from "@/api/devices.api";
import ConfirmationModal from "@/components/modals/AddDeviceModal/ConfirmationModal.vue";
import RoomComboBox from "@/components/custom-inputs/RoomComboBox.vue";
import {RoomsApi} from "@/api/rooms.api";
import type {Room} from "@/interfaces/room.interface";
import {deviceTypes} from "@/utils/constants";
import { useToast } from 'vue-toast-notification';

const route = useRoute()
const router = useRouter()
const { setCurrentDevice, currentDevice, deviceWithSameNameExists } = useDevicesStore();
const $toast = useToast() 

const device = reactive({
    value: {} as Device
})


const updateName = async (value: string) => {
    if (deviceWithSameNameExists(value)) {
        $toast.error("Ya existe un dispositivo con ese nombre", { position: 'top-right' })
        return;
    }
    device.value.name = value;
    await DevicesApi.updateDevice(device.value)
}

const deleteDevice = async () => {
    await DevicesApi.deleteDevice(device.value.id)
    await router.push('/devices')
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
    setCurrentDevice(<string> route.params.id)
    device.value = currentDevice.value
}

const goToButtonDisabled = computed(() => changingRoom.value || device.value.room === undefined )

onMounted(async () => {
    await DevicesApi.reloadDevices()
    await RoomsApi.reloadRooms()
    setCurrentDevice(<string> route.params.id)
    device.value = currentDevice.value
    if (device.value.room) {
        room.value = device.value.room
    }
})
</script>

<template>
    <VCol v-if="device.value.id">
        <VRow class="ma-3">
            <div class="align-editable-label">
                <EditableLabel :value="device.value.name" @update:value="updateName" :icon="deviceTypes[device.value.type.id].icon"/>
            </div>
            <div>
              <VBtn icon="mdi-delete" class="delete-button ml-5" @click="promptModal"/>
            </div>
        </VRow>
        <VRow class="device-row ma-5">
            <component :is="deviceTypes[device.value.type.id].info" :device="device.value" class="device mr-10" ></component>
            <VCol>
                <VRow>
                    <VBtn class="mb-3" :disabled="goToButtonDisabled" :to="`/rooms/${device.value.room?.id}`">
                        Ir a la habitación
                        <VIcon>mdi-arrow-right</VIcon>
                    </VBtn>
                </VRow>
                <VRow class="align-content-center">
                    <VCol class="px-0">
                        <RoomComboBox v-model="room" :disabled="!changingRoom" />
                    </VCol>
                    <VCol class="px-0">
                        <VBtn icon="mdi-pencil" v-if="!changingRoom" @click="startChangeRoomAction" rounded="circle" class="ml-6" width="3vw" height="3vw"/>
                        <VBtn icon="mdi-check" v-if="changingRoom" @click="changeRoom" rounded="circle" class="ml-6" width="3vw" height="3vw"/>
                    </VCol>
                </VRow>
            </VCol>
        </VRow>
        <VRow>
            <VExpansionPanels multiple variant="accordion">
                <VExpansionPanel class="width-auto" color="background" bg-color="background" elevation="1">
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

.margin-label{
    margin-top: 0%;
}
</style>