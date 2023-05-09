<script setup lang="ts">
import FrameCard from "@/components/cards/FrameCard.vue"
import { reactive, ref, watch, type PropType } from 'vue'
import PowerButton from "@/components/custom-inputs/PowerButton.vue";
import {SizesEnum} from "@/enums/enums";
import ModeToggle from "@/components/custom-inputs/ModeToggle.vue";
import NumericController from "@/components/custom-inputs/NumericController.vue";
import { type AC, changeTemperature, changeOnOf, toggleAC, changeAcMode, setMode, setTemperature }  from "@/interfaces/models/ac"
import { computed } from "@vue/reactivity";


const iconArray = [ "mdi-white-balance-sunny",  "mdi-snowflake", "mdi-weather-windy" ]

const props = defineProps({
    device: {
        type: Object as PropType<AC>,
        required: true
    } 
});

const ac = reactive(props.device)

const actemperature = computed(() => ac.state.temperature)

const modes = ['heat', 'cool', 'ventilation']

const toggle = computed(() => {
    return modes.indexOf(ac.state.mode)
})

const status = computed(() =>  ac.state.status === 'on')

watch(() => ac.state.temperature, async (newStatus : number, oldStatus : number) => {
  if (newStatus!==oldStatus) await changeTemperature(ac, newStatus)
})

watch(() => ac.state.mode, async (newStatus : string, oldStatus : string) => {
    if (newStatus !== oldStatus) await changeAcMode(ac, newStatus)
})

watch(() => ac.state.status, async (newStatus : string, oldStatus : string) => {
  if (newStatus!==oldStatus) await changeOnOf(ac, newStatus)
})

</script>

<template>
    <FrameCard :id="ac.id" :name="ac.name" icon="mdi-air-conditioner">
            <VRow>
                <VCol class="d-flex justify-center" align-self="center">
                    <NumericController :val="actemperature" suffix="º" :min="18" :max="38" @increment="setTemperature(ac, ac.state.temperature+1)" @decrement="setTemperature(ac, ac.state.temperature-1)"/>
                </VCol>
                <VCol align-self="center" class="d-flex justify-center">
                    <PowerButton :power="status" @click="() => toggleAC(ac)" :size="SizesEnum.Small"/>
                </VCol>
            </VRow>
            <VRow class="mx-2">
                <ModeToggle :icons="iconArray" :toggle="toggle" @updateToggle="(index: number) => setMode(ac, modes[index])"/>
            </VRow>
    </FrameCard>
</template>

<style scoped>

</style>