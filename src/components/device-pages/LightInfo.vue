<script setup lang="ts">

import {computed, type PropType, reactive, watch } from "vue";
import PowerButton from "@/components/custom-inputs/PowerButton.vue";
import {SizesEnum} from "@/enums/enums";
import { toggleLamp, type Lamp, changeLampStatus, changeLampColor, changeLampBrightness} from "@/interfaces/models/lamp";

const props = defineProps({
    device: {
        type: Object as PropType<Lamp>,
        required: true
    } 
});
const lamp = reactive(props.device)

const power = computed(() => lamp.state.status === 'on')

watch(() => lamp.state.status, async (newStatus: string, oldStatus: string) => {
    if (newStatus !== oldStatus) await changeLampStatus(lamp, newStatus)
})

</script>

<template>
  <VCard class="pa-3" color="primary" rounded="xl">
      <VContainer>
          <VRow class="flex-row justify-center mb-1">
              <PowerButton :power="power" @click="() => toggleLamp(lamp)" :size="SizesEnum.XLarge"/>
          </VRow>
          <VRow>
              Intensidad
          </VRow>
          <VRow>
              <VSlider
                      v-model="lamp.state.brightness"
                      min="0"
                      max="100"
                      @end="() => changeLampBrightness(lamp, lamp.state.brightness)"
                      step="1"
                      thumb-label
                      track-fill-color="white"
                      track-color="background"
                      thumb-color="white"
              >
                  <template v-slot:append>
                      <VTextField
                              v-model="lamp.state.brightness"
                              min="0"
                              max="100"
                              @update:model-value="() => changeLampBrightness(lamp, lamp.state.brightness)"
                              hide-details
                              single-line
                              density="compact"
                              type="number"
                              class="input-brightness"
                      ></VTextField>
                  </template>
              </VSlider>

          </VRow>
          <VRow class="justify-center">
              <VColorPicker
                      v-model:model-value="lamp.state.color"
                      @mouseup="() => changeLampColor(lamp, lamp.state.color)"
                      flat
                      hide-inputs
                      mode="hex"
                      color="primary"
                      elevation="0"
              ></VColorPicker>
          </VRow>
      </VContainer>
  </VCard>
</template>

<style scoped>
.light-button {
    width: 8vw;
    height: 8vw;
}

.input-brightness{
    width: 6vw !important;
}
</style>