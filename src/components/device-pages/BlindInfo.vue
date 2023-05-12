
<script setup lang="ts">
import {type PropType} from "vue";
import { type Blind, openBlind, changeBlindLevel, closeBlind} from "@/interfaces/models/blind";
import { reactive, inject, type Ref, watch, computed } from "vue";
import { CONSTANTS } from "@/utils/constants";
import {useDevicesStore} from "@/stores/device.store";
import type { Event } from "@/interfaces/event.interface";
const props = defineProps({
  device: {
    type: Object as PropType<Blind>,
    required: true
  }
})

const blind = reactive(props.device)

const updateLevel = async () => {
  await changeBlindLevel(blind, blind.state.level)
}

const open = async () => {
  await openBlind(blind)
}

const close = async () => {
  await closeBlind(blind)
}

const { devices } = useDevicesStore()

const MSG = inject<Ref<Event>>(CONSTANTS.EVENT)

watch(() => MSG?.value, async (newMSG) => {
    if (newMSG && newMSG.deviceId === blind.id)
        ({...blind.state} = {...(devices.items.get(blind.id) as Blind)?.state} || {...blind.state})
})

</script>

<template>
  <VCard color="primary" rounded="xl">
    <VContainer>
      <VRow class="mt-3 mb-5 buttons-align justify-space-evenly">
        <VBtn rounded="xl" class="btn-large" @click="open"><VIcon icon="mdi-blinds-horizontal" size="4.5vw"/></VBtn>
        <VBtn rounded="xl" class="btn-large" @click="close"><VIcon icon="mdi-blinds-horizontal-closed" size="4.5vw"/></VBtn>
      </VRow>
      <VRow>
        <VSlider
          class="px-5"
            v-model="blind.state.level"
            @end="updateLevel"
            min="0"
            max="100"
            step="1"
            thumb-label
            track-fill-color="white"
            thumb-color="white"
            append-icon="mdi-blinds"
        />
      </VRow>
      <VRow class="mx-4 mb-5">
        <VProgressLinear :model-value="blind.state.currentLevel"></VProgressLinear>
      </VRow>
    </VContainer>
  </VCard>
</template>

<style scoped>
.buttons-align {
  justify-content: center;
}

</style>