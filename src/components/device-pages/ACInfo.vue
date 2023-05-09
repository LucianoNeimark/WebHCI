<script setup lang="ts">

import {computed, type PropType, reactive, watch} from "vue";
import PowerButton from "@/components/custom-inputs/PowerButton.vue";
import {SizesEnum} from "@/enums/enums";
// import { toggleLamp, type Lamp, changeLampStatus, changeLampColor, changeLampBrightness} from "@/interfaces/models/lamp";
import { type AC, changeTemperature, changeOnOf, toggleAC, changeAcMode, setMode, setTemperature, changeAngle, changeFanSpeed, setVertical, setHorizontal, setFanSpeed }  from "@/interfaces/models/ac"
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

const verticalOpts = ["auto", "22", "45", "67", "90"]
const horizontalOpts = ["auto", "-90", "-45", "0", "45", "90"]
const speedOpts = ["auto", "25", "50", "75", "100"]

const modes = ['heat', 'cool', 'ventilation']

const iconArray = [ "mdi-white-balance-sunny",  "mdi-snowflake", "mdi-weather-windy" ]

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
                    <dropDownBtn :selected="ac.state.fanSpeed" :items="speedOpts" icon="mdi:mdi-wind-power" @itemClicked="(item) => {setFanSpeed(ac,item)}"  />
                </VCol>

                <VCol class="d-flex justify-center">
                    <dropDownBtn :selected="ac.state.verticalSwing" :items="verticalOpts" icon="mdi:mdi-reorder-vertical" @itemClicked="(item) => {setVertical(ac,item)}" />
                </VCol>

                <VCol class="d-flex justify-center">
                    <dropDownBtn :selected="ac.state.horizontalSwing" :items="horizontalOpts" icon="mdi:mdi-reorder-horizontal" @itemClicked="(item) => {setHorizontal(ac,item)}" />
                </VCol>
            </VRow>
        </VContainer>
    </VCard>
   
</template>

<style scoped>
</style>