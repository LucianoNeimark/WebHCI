
<script setup lang="ts">
import {type PropType} from "vue";
import { type Blind, openBlind, changeBlindLevel, closeBlind} from "@/interfaces/models/blind";
import { reactive, computed } from "vue";
import CardSlider from "@/components/custom-inputs/CardSlider.vue";

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
  blind.state.currentLevel = blind.state.level
  await openBlind(blind)
}

const close = async () => {
  // blind.state.currentLevel = 0
  await closeBlind(blind)
}


</script>

<template>
  <VCard color="primary" rounded="xl">
    <VContainer>
      <VRow class="mt-3 mb-10 buttons-align justify-space-evenly">
        <VBtn rounded="xl" class="btn-large" @click="open"><VIcon icon="mdi-blinds-horizontal" size="4.5vw"/></VBtn>
        <VBtn rounded="xl" class="btn-large" @click="close"><VIcon icon="mdi-blinds-horizontal-closed" size="4.5vw"/></VBtn>
      </VRow>
      <VRow>
        <VProgressLinear :model-value="blind.state.currentLevel"></VProgressLinear>
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
    </VContainer>
  </VCard>
</template>

<style scoped>
.buttons-align {
  justify-content: center;
}

</style>