<script setup lang="ts">

import {computed, type PropType, reactive, watch} from "vue";
import PowerButton from "@/components/custom-inputs/PowerButton.vue";
import { SizesEnum } from "@/enums/enums";
import { type AC, changeTemperature, changeOnOf, toggleAC, changeAcMode, acModes, changeAngle, changeFanSpeed, speedOpts, verticalOpts, horizontalOpts, iconArray}  from "@/interfaces/models/ac"
import NumericController from "@/components/custom-inputs/NumericController.vue";
import ModeToggle from "@/components/custom-inputs/ModeToggle.vue";
import DropDownBtn from "@/components/custom-inputs/DropDownBtn.vue";

const props = defineProps({
    device: {
        type: Object as PropType<AC>,
        required: true
    } 
});

const ac = reactive(props.device)

const power = computed(() => ac.state.status === 'on')

const toggle = computed(() => Object.values(acModes).indexOf(ac.state.mode))

watch(() => ac.state.status, async (newStatus: string, oldStatus: string) => {
    if (newStatus !== oldStatus) await changeOnOf(ac, newStatus)
})

watch(() => ac.state.mode, async (newStatus : string, oldStatus : string) => {
    if (newStatus !== oldStatus) await changeAcMode(ac, newStatus)
})

watch(() => ac.state.temperature, async (newStatus : number, oldStatus : number) => {
    if (newStatus !== oldStatus) await changeTemperature(ac, newStatus)
})

watch(() => ac.state.horizontalSwing, async (newStatus : string, oldStatus : string) => {
    if (newStatus!=oldStatus) await changeAngle(ac, 'Horizontal', newStatus)
})

watch(() => ac.state.verticalSwing, async (newStatus : string, oldStatus : string) => {
    if (newStatus!=oldStatus) await changeAngle(ac, 'Vertical', newStatus)
})

watch(() => ac.state.fanSpeed, async (newStatus : string, oldStatus : string) => {
    if (newStatus!=oldStatus) await changeFanSpeed(ac, newStatus)
})

</script>

<template>
     <VCard class="d-flex" color="primary" rounded="xl">
        <VContainer>
            <VRow class="mt-2 mb-4">
                <VCol class="d-flex justify-center" align-self="center">
                    <NumericController v-model:value="ac.state.temperature" suffix="º" :min="18" :max="38"/>
                </VCol>
                <VCol align-self="center" class="d-flex justify-center">
                    <PowerButton :power="power" @click="toggleAC(ac)" :size="SizesEnum.Small"/>
                </VCol>
            </VRow>
            <VRow class="mx-2">
                <ModeToggle :icons="iconArray" :toggle="toggle" @updateToggle="(index: number) => ac.state.mode = Object.values(acModes)[index]"/>
            </VRow>
            <VRow class="mt-10 mb-3">
                <VCol class="d-flex justify-center">
                    <DropDownBtn color="lightSurface" :selected="ac.state.fanSpeed" :items="speedOpts" text="Velocidad Ventilador" @itemClicked="(value : string) => ac.state.fanSpeed = value" />
                </VCol>
                <VCol class="d-flex justify-center">
                    <DropDownBtn color="lightSurface" :selected="ac.state.verticalSwing" :items="verticalOpts" text="Aspas verticales"  @itemClicked="(value : string) => ac.state.verticalSwing = value" />
                </VCol>
                <VCol class="d-flex justify-center">
                    <DropDownBtn color="lightSurface" :selected="ac.state.horizontalSwing" :items="horizontalOpts" text="Aspas horizontales" @itemClicked="(value : string) => ac.state.horizontalSwing = value" />
                </VCol>
            </VRow>
        </VContainer>
    </VCard>
   
</template>

<style scoped>
</style>