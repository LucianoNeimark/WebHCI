<script setup lang="ts">
import FrameCard from "@/components/cards/FrameCard.vue"
import { type Blind, openBlind, closeBlind, changeBlindLevel} from "@/interfaces/models/blind";
import {type PropType, reactive, inject, type Ref, watch} from "vue";
import CardSlider from "@/components/custom-inputs/CardSlider.vue";
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
  blind.state.currentLevel = 0
  await openBlind(blind)
}

const close = async () => {
  blind.state.currentLevel = blind.state.level
  await closeBlind(blind)
}

const { devices } = useDevicesStore()

const MSG = inject<Ref<Event>>(CONSTANTS.EVENT)

watch(() => MSG?.value, async (newMSG) => {
    if (newMSG && newMSG.deviceId === blind.id)
        ({...blind.state} = {...(devices.items.get(blind.id) as Blind)?.state} || {...blind.state})
        console.log(newMSG)
})
</script>

<template>
    <FrameCard :id="blind.id" :name="blind.name" icon="mdi-blinds-horizontal">
      <VRow class="mt-3 buttons-align justify-space-evenly">
        <VBtn rounded="xl" color="lightSurface" class="btn-large" @click="open"><VIcon icon="mdi-blinds-horizontal" size="4.5vw"/></VBtn>
        <VBtn rounded="xl" color="lightSurface" class="btn-large" @click="close"><VIcon icon="mdi-blinds-horizontal-closed" size="4.5vw"/></VBtn>
      </VRow>
      <VRow class="px-5 mt-5">
        <CardSlider v-model:value="blind.state.level" :min="0" :max="100" icon="mdi-blinds"
                          @updateSlider="updateLevel"/>
      </VRow>
    </FrameCard>
</template>

<style scoped lang="scss">
  @import '@/assets/variables.scss';

</style>