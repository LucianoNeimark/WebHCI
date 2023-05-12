<script setup lang="ts">

import FrameCard from "@/components/cards/FrameCard.vue"
import {computed, inject, type PropType, reactive, watch, type Ref} from "vue";
import { type Refrigerator, changeTemperatureRefrigerator, changeFreezerTemperatureRefrigerator} from "@/interfaces/models/refrigerator";
import type { Device } from '@/interfaces/models/device'
import CardSlider from "@/components/custom-inputs/CardSlider.vue";
import { CONSTANTS } from "@/utils/constants";
import type { Event } from "@/interfaces/event.interface";
import {useDevicesStore} from "@/stores/device.store";

const props = defineProps({
  device: {
    type: Object as PropType<Refrigerator>,
    required: true
  }
})

const refrigerator = reactive<Refrigerator>(props.device)

const setTemperature = async () => {
  await changeTemperatureRefrigerator(refrigerator, refrigerator.state.temperature)
}

const setFreezerTemperature = async () => {
  await changeFreezerTemperatureRefrigerator(refrigerator, refrigerator.state.freezerTemperature)
}

const { devices } = useDevicesStore()

const MSG = inject<Ref<Event>>(CONSTANTS.EVENT)

watch(() => MSG?.value, async (newMSG) => {
    if (newMSG && newMSG.deviceId === refrigerator.id)
        ({...refrigerator.state} = {...(devices.items.get(refrigerator.id) as Refrigerator)?.state} || {...refrigerator.state})
})


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