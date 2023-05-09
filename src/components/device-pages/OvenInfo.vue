<script setup lang="ts">

import {computed, type PropType, reactive, watch} from "vue";
import PowerButton from "@/components/custom-inputs/PowerButton.vue";
import {SizesEnum} from "@/enums/enums";
import { type Oven, toggleOven, changeOnOf, changeOvenTemp, setConv, setGrill, setHeat, changeModes }  from "@/interfaces/models/oven"
import ModeToggle from "@/components/custom-inputs/ModeToggle.vue";


const props = defineProps({
    device: {
        type: Object as PropType<Oven>,
        required: true
    } 
});

const convArray = [ "mdi-close",  "mdi-sprout", "mdi-moon-full" ]
const convModes = ["off", "economic", "conventional"]

const heatArray = [ "mdi-chevron-down",  "mdi-chevron-up", "mdi-unfold-more-horizontal" ]
const heatModes = ["conventional", "down", "up"]

const grillArray = [ "mdi-close",  "mdi-sprout", "mdi-moon-full" ]
const grillModes = ["off", "economic", "complete"]


const heatToggle = computed (() => {
  return heatModes.indexOf(oven.state.heat)
})

const convToggle = computed (() => {
  return convModes.indexOf(oven.state.convection)
})

const grillToggle = computed (() => {
  return grillModes.indexOf(oven.state.grill)
})


const oven = reactive(props.device)
const power = computed(() => oven.state.status === 'on')


watch(() => oven.state.status, async (newStatus : string, oldStatus : string) => {
  if (newStatus !== oldStatus) await changeOnOf(oven, newStatus)
})

watch(() => oven.state.grill, async (newStatus : string, oldStatus : string) => {
    if (newStatus !== oldStatus) await changeModes(oven, "Grill", newStatus)
})

watch(() => oven.state.heat, async (newStatus : string, oldStatus : string) => {
    if (newStatus !== oldStatus) await changeModes(oven, "Heat", newStatus)
})

watch(() => oven.state.convection, async (newStatus : string, oldStatus : string) => {
    if (newStatus !== oldStatus) await changeModes(oven, "Convection", newStatus)
})



</script>

<template>
   <VCard class="d-flex align-center" color="primary" rounded="xl">
    <VContainer>
      <VRow class="flex-row justify-center ma-1">
        <PowerButton :power="power" @click="() => {toggleOven(oven)}" :size="SizesEnum.Small"/>
      </VRow>
      <VRow class="flex-row justify-center ma-1">
        <VSlider
                      v-model="oven.state.temperature"
                      min="90"
                      max="230"
                      @end="() => changeOvenTemp(oven, oven.state.temperature)"
                      step="1"
                      thumb-label
                      track-fill-color="white"
                      track-color="background"
                      thumb-color="white"
              >
                  <template v-slot:append>
                      <VTextField
                              v-model="oven.state.temperature"
                              @update:model-value="() => changeOvenTemp(oven, oven.state.temperature)"
                              hide-details
                              single-line
                              density="compact"
                              type="number"
                              style="width: 70px"
                      ></VTextField>
                  </template>
              </VSlider>
      </VRow>
      <VRow class="flex-row justify-center ma-1">
        <div class="test">
          <h2>Calor:</h2>
        </div>
        <ModeToggle :icons="heatArray" :toggle="heatToggle" @updateToggle="(index: number) => {setHeat(oven, heatModes[index])}"/>
      </VRow>
      <VRow class="flex-row justify-center ma-1">
        <div class="test">
          <h2>Grill:</h2>
        </div>
          <ModeToggle :icons="grillArray" :toggle="grillToggle" @updateToggle="(index: number) => {setGrill(oven, grillModes[index])}"/>
      </VRow>
      <VRow class="flex-row justify-center ma-1">
        <div class="test">
          <h2>Conveccion:</h2>
        </div>
        
        <ModeToggle :icons="convArray" :toggle="convToggle" @updateToggle="(index: number) => {setConv(oven, convModes[index])}"/>
      </VRow>
    </VContainer>
  </VCard>
</template>

<style scoped>

.test{
  width:35%
}

</style>