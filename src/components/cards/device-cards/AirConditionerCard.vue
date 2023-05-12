<script setup lang="ts">
import FrameCard from "@/components/cards/FrameCard.vue"
import {reactive, watch, type PropType, inject, type Ref, computed} from 'vue'
import PowerButton from "@/components/custom-inputs/PowerButton.vue";
import {SizesEnum} from "@/enums/enums";
import ModeToggle from "@/components/custom-inputs/ModeToggle.vue";
import NumericController from "@/components/custom-inputs/NumericController.vue";
import { type AC, changeTemperature, changeOnOf, toggleAC, changeAcMode, acModes }  from "@/interfaces/models/ac"
import {useDevicesStore} from "@/stores/device.store";
import type {Event} from "@/interfaces/event.interface";
import {CONSTANTS} from "@/utils/constants";


const iconArray = [ "mdi-white-balance-sunny",  "mdi-snowflake", "mdi-weather-windy" ]

const props = defineProps({
    device: {
        type: Object as PropType<AC>,
        required: true
    } 
});

const ac = reactive(props.device)

const toggle = computed(() => Object.values(acModes).indexOf(ac.state.mode))

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

const { devices } = useDevicesStore()
const MSG = inject<Ref<Event>>(CONSTANTS.EVENT)
watch(() => MSG?.value, async (newMSG) => {
    if (newMSG && newMSG.deviceId === ac.id)
        ({...ac.state} = {...(devices.items.get(ac.id) as AC)?.state} || {...ac.state})
})

</script>

<template>
    <FrameCard :id="ac.id" :name="ac.name" icon="mdi-air-conditioner">
            <VRow>
                <VCol class="d-flex justify-center" align-self="center">
                    <NumericController v-model:value="ac.state.temperature" suffix="º" :min="18" :max="38"/>
                </VCol>
                <VCol align-self="center" class="d-flex justify-center">
                    <PowerButton :power="status" @click="() => toggleAC(ac)" :size="SizesEnum.Small"/>
                </VCol>
            </VRow>
            <VRow class="mx-2">
                <ModeToggle :icons="iconArray" :toggle="toggle" @updateToggle="(index: number) => ac.state.mode = Object.values(acModes)[index]"/>
            </VRow>
    </FrameCard>
</template>

<style scoped>

</style>