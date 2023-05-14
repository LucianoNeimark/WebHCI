<script setup lang="ts">
import { computed, type PropType, ref } from "vue";
import { DevicesApi } from '@/api/devices.api';
import DeviceTypePicker from "@/components/modals/AddDeviceModal/DeviceTypePicker.vue";
import RoomComboBox from "@/components/custom-inputs/RoomComboBox.vue";
import { RoomsApi } from "@/api/rooms.api";
import type { Room } from "@/interfaces/room.interface";
import type { Device } from "@/interfaces/device.interface";
import { useDevicesStore } from '@/stores/device.store';
import { useToast } from 'vue-toast-notification';
import { validNameRules } from '@/utils/rules';
import { useRoomsStore } from "@/stores/room.store";

const emit = defineEmits(['update:dialog', 'device-added'])

const props = defineProps({
    dialog: {
        type: Boolean,
        required: true
    },
    room: Object as PropType<Room>
})

const name = ref()
const room = ref<Room | String | undefined>(props.room)
const type = ref()
const valid = ref(true)
const { deviceWithSameNameExists } = useDevicesStore()
const { roomWithSameNameExists } = useRoomsStore()
const $toast = useToast()

const show = computed({
    get() {
        return props.dialog
    },
    set(value) {
        emit('update:dialog', value)
    }
})

const addDevice = async () => {
    if (deviceWithSameNameExists(name.value)) {
        $toast.error('Ya existe un dispositivo con ese nombre', { position: 'top-right' })
        return;
    }
    if (room.value && roomWithSameNameExists(room.value as string)) {
        $toast.error('Ya existe una habitación con ese nombre', { position: 'top-right' })
        return;
    }
    const newDevice = await DevicesApi.addDevice(type.value, name.value) as Device
    if (!newDevice) return;

    if (room.value) {
        if (typeof room.value === "string") {
            room.value = await RoomsApi.addRoom(room.value) as Room
            await RoomsApi.reloadRooms()
        } else {
            await RoomsApi.addDeviceToRoom((room.value as Room).id, newDevice.id)
        }
    }
    emit('update:dialog', false)
    emit('device-added')
    name.value = ""
    type.value = ""
    room.value = props.room || undefined
}

const validForm = computed(() => {
    return valid.value && type.value
}) 

</script>

<template>
    <VDialog
            class="modal align-start"
            v-model="show"
            close-on-back
            scrim="true"
    >
        <VCard color="primary">
            <VForm v-model="valid">
                <VRow class="mt-3 justify-space-between">
                    <VCardTitle class="ml-4">
                        <span class="text-h5 bold">Agregar Dispositivo</span>
                    </VCardTitle>
                    <VCardActions>
                        <VSpacer></VSpacer>
                        <VBtn
                            @click="emit('update:dialog', false)"
                            class="mr-3"
                        >
                            <VIcon icon="mdi:mdi-close" size="2vw"></VIcon>
                        </VBtn>
                    </VCardActions>
                </VRow>
                <VCardText>
                    <VContainer>
                        <VRow>
                            <VCol>
                                <VRow class="mb-2 required">
                                    <label>Nombre</label>
                                </VRow>
                                <VRow>
                                    <VTextField
                                            v-model="name"
                                            class="align-self-center"
                                            label="Nombre"
                                            placeholder="Nuevo dispositivo"
                                            clearable
                                            required
                                            :rules="validNameRules"
                                            bg-color="lightSurface"
                                    ></VTextField>
                                </VRow>
                                <VRow  class="mb-2">
                                    <label>Habitación</label>
                                </VRow>
                                <VRow>
                                    <RoomComboBox v-model="room"/>
                                </VRow>
                            </VCol>
                            <VCol class="justify-center">
                                <VRow class="required">
                                    <label class="ml-6">Tipo de dispositivo</label>
                                </VRow>
                                <VRow>
                                    <DeviceTypePicker :selectedTypeId="type" @pick="(value: string) => type = value"/>
                                </VRow>
                            </VCol>
                        </VRow>
                    </VContainer>
                </VCardText>
                <VCardActions>
                    <VSpacer></VSpacer>
                    <VBtn
                            class="add ma-3"
                            @click="addDevice"
                            :disabled="!validForm"
                    >
                        Agregar
                    </VBtn>
                </VCardActions>
            </VForm>
        </VCard>
    </VDialog>
</template>

<style scoped lang="scss">
@import '@/assets/variables';

.modal{
    width: 80%;
    position: absolute;
}

.add{
    background-color: $secondary;
}

</style>