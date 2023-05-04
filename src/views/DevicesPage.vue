<script setup>
import LightbulbSVG from "@/assets/device-icons/device/lightbulb.svg"
import CloseDoorSVG from "@/assets/device-icons/device/door-close.svg"
import OvenSVG from "@/assets/device-icons/device/oven.svg"
import SpeakerSVG from "@/assets/device-icons/device/speaker.svg"
import AirConditionerSVG from "@/assets/device-icons/device/air-conditioner.svg"
import CurtainSVG from "@/assets/device-icons/device/curtain.svg"
import FridgeSVG from "@/assets/device-icons/device/refrigerator.svg"

import {ref} from 'vue'
import {mdi} from "vuetify/iconsets/mdi";
const dialog = ref(false)
const toggle_exclusive = ref("")
const deviceTypes = [
    { value: 'AC', name: 'AC', img: AirConditionerSVG, icon: null },
    { value: 'Lightbulb', name: 'Lámpara', img: LightbulbSVG, icon: null },
    { value: 'Speaker', name: 'Parlante', img: SpeakerSVG, icon: null },
    { value: 'Curtain', name: 'Persiana', img: CurtainSVG, icon: null },
    { value: 'Alarm', name: 'Alarma', img: null, icon: "mdi:mdi-alarm-light-outline"},
    { value: 'Oven', name: 'Horno', img: OvenSVG, icon: null},
    { value: 'Door', name: 'Puerta', img: CloseDoorSVG, icon: null },
    { value: 'Fridge', name: 'Heladera', img: FridgeSVG, icon: null },

]
</script>

<template>
    <p> Dispositivos </p>
    <VBtn class="ma-3"
        color="surface" rounded="xl"
        @click="dialog = true"
    >
        Agregar Dispositivo
        <VIcon icon="mdi-plus-circle-outline"></VIcon>
    </VBtn>
    <VDialog
        class="modal align-start"
        v-model="dialog"
        close-on-back
        scrim="true"
    >
        <VCard color="primary">
            <VRow class="mt-3 justify-space-between">
                <VCardTitle class="ml-4">
                    <span class="text-h5"><strong>Agregar Dispositivo</strong></span>
                </VCardTitle>
                <VCardActions>
                    <VSpacer></VSpacer>
                    <VBtn
                        @click="dialog = false"
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
                                    class="align-self-center"
                                    label="Nombre"
                                    placeholder="Nuevo dispositivo"
                                    clearable
                                    required
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
                                <VBtnToggle
                                    v-model="toggle_exclusive"
                                    class="flex-wrap justify-center"
                                    style="height: auto;"
                                >
                                    <VContainer
                                        v-for="deviceType in deviceTypes" :key="deviceType.value" style="width: auto"
                                    >
                                        <VRow>
                                            <VBtn color="surface" class="device-type mx-3 my-2" rounded="circle" :value="deviceType.value" elevation="8" >
                                                <img v-if="deviceType.img != null" :src="deviceType.img" :alt="deviceType.value" width="43" height="43"/>
                                                <VIcon v-if="deviceType.icon != null" :icon="deviceType.icon" size="3.5vw"/>
                                            </VBtn>
                                        </VRow>
                                        <VRow justify="center">
                                            <p class="device-name">{{deviceType.name}}</p>
                                        </VRow>
                                    </VContainer>
                                </VBtnToggle>
                            </VRow>
                        </VCol>
                    </VRow>
                </VContainer>
            </VCardText>
            <VCardActions>
                <VSpacer></VSpacer>
                <VBtn
                    class="add ma-3"
                    @click="dialog = false"
                >
                    Agregar
                </VBtn>
            </VCardActions>
        </VCard>
    </VDialog>
</template>

<style scoped lang="scss">
    @import '@/assets/variables';

    .device-type{
        height: 6vw !important;
        width: 6vw;
    }

    .device-name{
        color: white;
    }

    .modal{
        width: 80%;
        position: absolute;
        left: 19vw;
    }

    .add{
        background-color: $secondary;
    }

</style>