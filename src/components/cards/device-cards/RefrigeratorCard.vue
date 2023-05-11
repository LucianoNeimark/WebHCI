<script setup lang="ts">

import FrameCard from "@/components/cards/FrameCard.vue"
import {computed, type PropType, reactive, watch} from "vue";
import { type Refrigerator, changeTemperatureRefrigerator, changeFreezerTemperatureRefrigerator} from "@/interfaces/models/refrigerator";
import type { Device } from '@/interfaces/models/device'
import CardSlider from "@/components/custom-inputs/CardSlider.vue";
import ModeToggle from "@/components/custom-inputs/ModeToggle.vue";


const props = defineProps({
  device: {
    type: Object as PropType<Refrigerator>,
    required: true
  }
})

const refrigerator = reactive<Device>(props.device)

const setTemperature = async () => {
  await changeTemperatureRefrigerator(refrigerator, refrigerator.state.temperature)
}

const setFreezerTemperature = async () => {
  await changeFreezerTemperatureRefrigerator(refrigerator, refrigerator.state.freezerTemperature)
}


</script>


<template>
    <FrameCard :id="refrigerator.id" :name="refrigerator.name" icon="mdi-door">
        <VContainer class="mt-8">
          <VRow class="px-4">
            <CardSlider v-model:value="refrigerator.state.temperature" :min="2" :max="8" icon="mdi-thermometer-low"
                  @updateSlider="setTemperature"/>
          </VRow>
          <VRow class="px-4 py-2">
            <CardSlider v-model:value="refrigerator.state.freezerTemperature" :min="-20" :max="-8" icon="mdi-snowflake-thermometer"
                  @updateSlider="setFreezerTemperature"/>
          </VRow>
        </VContainer>
    </FrameCard>
</template>

<style scoped lang="scss">
.caca {
  justify-content: end;
}
</style>