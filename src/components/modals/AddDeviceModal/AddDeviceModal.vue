<script setup lang="ts">
import {computed, type PropType, ref} from "vue";
  import { DevicesApi } from '@/api/devices.api';
  import DeviceTypePicker from "@/components/modals/AddDeviceModal/DeviceTypePicker.vue";
  import RoomComboBox from "@/components/custom-inputs/RoomComboBox.vue";
  import {RoomsApi} from "@/api/rooms.api";
  import type {Room} from "@/interfaces/room.interface";
  import type {Device} from "@/interfaces/device.interface";

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
  
  const show = computed({
      get() {
        return props.dialog
      },
      set(value) {
        emit('update:dialog', value)
      }
  })

  const inputErrorMessage = computed(() => {
      if (name.value?.length < 3 && name.value?.length > 0) 
        return 'El nombre debe tener al menos 3 caracteres'
      else if (name.value?.length > 60) 
        return 'El nombre debe tener menos de 60 caracteres'
      else if (!/^[a-zA-Z0-9_ ]*$/.test(name.value)) 
        return 'El nombre debe tener letras, números, _ y espacios únicamente'
      return ''
  })
  const formReady = computed(() => inputErrorMessage.value === '' && name.value && type.value)

  const addDevice = async () => {
      const newDevice = await DevicesApi.addDevice(type.value, name.value) as Device
      if(typeof room.value === "string") {
          room.value = await RoomsApi.addRoom(room.value) as Room
          await RoomsApi.reloadRooms()
      }
      if (room.value) {
          if(typeof room.value === "string") {
              room.value = await RoomsApi.addRoom(room.value) as Room
              await RoomsApi.reloadRooms()
              await RoomsApi.addDeviceToRoom(room.value.id, newDevice.id)
          }
          await RoomsApi.addDeviceToRoom((room.value as Room).id, newDevice.id)
      }
      emit('update:dialog', false)
      emit('device-added')
      name.value = ""
      type.value = ""
      room.value = props.room || undefined
  }



</script>

<template>
    <VDialog
            class="modal align-start"
            v-model="show"
            close-on-back
            scrim="true"
    >
        <VCard color="primary">
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
                        <VCol cols="6">
                            <VRow class="mb-2">Nombre</VRow>
                            <VRow>
                                <VTextField
                                        v-model="name"
                                        class="align-self-center"
                                        label="Nombre"
                                        placeholder="Nuevo dispositivo"
                                        clearable
                                        required
                                        :error-messages="inputErrorMessage"
                                        bg-color="lightSurface"
                                ></VTextField>
                            </VRow>
                            <VRow  class="mb-2">Habitacion</VRow>
                            <VRow>
                                <RoomComboBox v-model="room"/>
                            </VRow>
                        </VCol>
                        <VCol cols="6" class="justify-center">
                            <VRow>
                                <span class="ml-6">Tipo de dispositivo</span>
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
                        :disabled="!formReady"
                >
                    Agregar
                </VBtn>
            </VCardActions>
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