<script setup lang="ts">

import FrameCard from "@/components/cards/FrameCard.vue"
import {computed, type PropType, reactive, watch} from "vue";
import { type Refrigerator, changeTemperatureRefrigerator, changeFreezerTemperatureRefrigerator, changeModeRefrigerator, setMode} from "@/interfaces/models/refrigerator";
import type { Device } from '@/interfaces/models/device'
import CardSlider from "@/components/custom-inputs/CardSlider.vue";
import ModeToggle from "@/components/custom-inputs/ModeToggle.vue";

const props = defineProps({
    device: {
        type: Object as PropType<Refrigerator>,
        required: true
    } 
});

const refrigerator = reactive<Device>(props.device)

const setTemperature = async () => {
  await changeTemperatureRefrigerator(refrigerator, refrigerator.state.temperature)
}

const setFreezerTemperature = async () => {
  await changeFreezerTemperatureRefrigerator(refrigerator, refrigerator.state.freezerTemperature)
}


watch(() => refrigerator.state.mode, async (newStatus : string, oldStatus : string) => {
    if (newStatus !== oldStatus) await changeModeRefrigerator(refrigerator, newStatus)
})

const modes = ['default', 'vacation', 'party']
const iconArray = [ "mdi-fridge",  "mdi-beach", "mdi-party-popper" ]


const toggle = computed(() => {
    return modes.indexOf(refrigerator.state.mode)
})


</script>

<template>
  <VCard class="d-flex " color="primary" rounded="xl">
    <VCol class="pt-7 px-5">
        <VCol>
            <VRow>
                <CardSlider v-model:value="refrigerator.state.temperature" :min="2" :max="8" icon="mdi-thermometer-low"
                  @updateSlider="setTemperature" class="pt-4"/>
                <VCol cols="3">
                    <VTextField
                        v-model="refrigerator.state.temperature"
                        @update:model-value="() => changeTemperatureRefrigerator(refrigerator, refrigerator.state.temperature)"
                        hide-details
                        single-line
                        density="compact"
                        type="number"
                    />
                </VCol>
            </VRow>
            <VRow>
                <CardSlider v-model:value="refrigerator.state.freezerTemperature" :min="-20" :max="-8" icon="mdi-snowflake-thermometer"
                  @updateSlider="setFreezerTemperature" class="pt-4"/>
                  <VCol cols="3">
                    <VTextField
                        v-model="refrigerator.state.freezerTemperature"
                        @update:model-value="() => changeFreezerTemperatureRefrigerator(refrigerator, refrigerator.state.freezerTemperature)"
                        hide-details
                        single-line
                        density="compact"
                        type="number"
                    />
                </VCol>
                  
            </VRow>
        </VCol>
        <VRow class="pt-5 px-5">
          <ModeToggle :icons="iconArray" :toggle="toggle" @updateToggle="(index: number) => setMode(refrigerator, modes[index])"/>
        </VRow>
    </VCol>
    </VCard>
</template>

<style scoped>

</style>