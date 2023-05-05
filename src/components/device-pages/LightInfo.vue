<script setup lang="ts">

import {computed, ref, toRefs} from "vue";
import PowerButton from "@/components/custom-inputs/PowerButton.vue";
import {SizesEnum} from "@/enums/enums";
import type { Device } from '@/interfaces/device.interface';
import { toggleLamp, type Lamp, changeLampStatus, changeLampColor, changeLampBrightness} from "@/interfaces/models/lamp";
import type { PropType } from 'vue';
import { reactive } from 'vue';
import { watch } from 'vue';
import { watchEffect } from 'vue';

const props = defineProps({
    device: {
        type: Object as PropType<Lamp>,
        required: true
    } 
});
const lamp = reactive(props.device)

/*const status = ref(props.device)
const color = ref(lamp.state.brightness)
const brightness = ref(props.brightness)*/

const power = computed(() => {
    return lamp.state.status === 'on'
})

watch(() => lamp.state.status, async (newStatus: string, oldStatus: string) => {
    if (newStatus !== oldStatus) {
        console.log("Change lamp status");
        await changeLampStatus(lamp, newStatus)
    }
})

watch(() => lamp.state.brightness, async (newBrightness: number, oldBrightness: number) => {
    if (newBrightness !== oldBrightness){
        console.log("Change lamp brightness");
        await changeLampBrightness(lamp, newBrightness)
    }
})

watch(() => lamp.state.color, async (newColor: string, oldColor: string) => {
    if (newColor !== oldColor){
        console.log("Change lamp status");
        await changeLampColor(lamp, newColor)
    }
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
                      step="1"
                      thumb-label
                      track-fill-color="white"
                      track-color="background"
                      thumb-color="white"
              >
                  <template v-slot:append>
                      <VTextField
                              v-model="lamp.state.brightness"
                              hide-details
                              single-line
                              density="compact"
                              type="number"
                              style="width: 70px"
                      ></VTextField>
                  </template>
              </VSlider>

          </VRow>
          <VRow class="justify-center">
              <VColorPicker
                      v-model="lamp.state.color"
                      flat
                      hide-canvas
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


</style>