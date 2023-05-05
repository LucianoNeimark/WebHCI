<script setup lang="ts">
  import {computed, ref} from "vue";
  import { DevicesApi } from '@/api/devices.api';
  import DeviceTypePicker from "@/components/modals/AddDeviceModal/DeviceTypePicker.vue"; 

  const emit = defineEmits(['updateDialog'])

  const props = defineProps({
    dialog: {
        type: Boolean,
        required: true
    }
  })

  const name = ref()
  const room = ref()
  const type = ref()
  
  
  const show = computed({
      get() {
        return props.dialog
      },
      set(value) {
        emit('updateDialog', value)
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
      const result = await DevicesApi.addDevice(type.value, name.value)
      console.log(result)
      if (room.value) { // TODO
          // await RoomsApi.addDevice(room.value, device)
      }
      emit('updateDialog', false)
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
                        @click="emit('updateDialog', false)"
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
                                <VSelect
                                        :items="['Cocina', 'Living', 'Cuarto Roberta', 'Patio']"
                                        label="Habitación"
                                        required
                                        placeholder="Sin habitacion"
                                        bg-color="lightSurface"
                                        theme="light"
                                ></VSelect>
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