<script setup lang="ts">

import {computed, type PropType, reactive, watch} from "vue";
import PowerButton from "@/components/custom-inputs/PowerButton.vue";
import {SizesEnum} from "@/enums/enums";
// import { toggleLamp, type Lamp, changeLampStatus, changeLampColor, changeLampBrightness} from "@/interfaces/models/lamp";
import { type AC, changeTemperature, changeOnOf, toggleAC, changeAcMode, setMode, setTemperature }  from "@/interfaces/models/ac"
import AirConditionerSVG from "@/assets/device-icons/air-conditioner.svg"
import NumericController from "@/components/custom-inputs/NumericController.vue";
import ModeToggle from "@/components/custom-inputs/ModeToggle.vue";
import dropDownBtn from "../custom-inputs/dropDownBtn.vue";

const props = defineProps({
    device: {
        type: Object as PropType<AC>,
        required: true
    } 
});

const ac = reactive(props.device)

const power = computed(() => ac.state.status === 'on')
const actemperature = computed(() => ac.state.temperature)

const toggle = computed(() => {
    return modes.indexOf(ac.state.mode)
})

const fanOpts = ["30", "35"]

const modes = ['heat', 'cool', 'ventilation']


console.log(ac.state.mode)
console.log(modes.indexOf(ac.state.mode))

const iconArray = [ "mdi-white-balance-sunny",  "mdi-snowflake", "mdi-weather-windy" ]

watch(() => ac.state.status, async (newStatus: string, oldStatus: string) => {
    if (newStatus !== oldStatus) await changeOnOf(ac, newStatus)
})

watch(() => ac.state.mode, async (newStatus : string, oldStatus : string) => {
    console.log("changed")
    if (newStatus !== oldStatus) await changeAcMode(ac, newStatus)
})

watch(() => ac.state.temperature, async (newStatus : number, oldStatus : number) => {
    console.log(newStatus)
    if (newStatus !== oldStatus) await changeTemperature(ac, newStatus)
})

</script>

<template>
     <VCard class="d-flex " color="primary" rounded="xl">
        <VContainer>
            <VRow>
                <VCol class="d-flex justify-center" align-self="center">
                    <NumericController :val="actemperature" suffix="º" :min="18" :max="38" @increment="() => setTemperature(ac, ac.state.temperature+1)" @decrement="() => setTemperature(ac, ac.state.temperature-1)"/>
                </VCol>
                <VCol align-self="center" class="d-flex justify-center">
                    <PowerButton :power="power" @click="() => toggleAC(ac)" :size="SizesEnum.Small"/>
                </VCol>
            </VRow>
            <VRow class="mx-2">
                <ModeToggle :icons="iconArray" :toggle="toggle" @updateToggle="(index: number) => setMode(ac, modes[index])"/>
            </VRow>
            <VRow class ="my-10">
                <VCol class="d-flex justify-center">
                    <dropDownBtn :items="fanOpts" icon="mdi:mdi-wind-power" />
                </VCol>

                <VCol class="d-flex justify-center">
                    <dropDownBtn :items="fanOpts" icon="mdi:mdi-reorder-vertical" />
                </VCol>

                <VCol class="d-flex justify-center">
                    <dropDownBtn :items="fanOpts" icon="mdi:mdi-reorder-horizontal" />
                </VCol>
            </VRow>
        </VContainer>
    </VCard>
   
</template>

<style scoped>
</style>