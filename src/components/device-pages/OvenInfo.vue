<script setup lang="ts">

import {computed, type PropType, reactive, watch} from "vue";
import PowerButton from "@/components/custom-inputs/PowerButton.vue";
import {SizesEnum} from "@/enums/enums";
import { type Oven, toggleOven, changeOnOf, changeOvenTemp, convModes, grillModes, heatModes, changeModes}  from "@/interfaces/models/oven"
import DropDownBtn from "@/components/custom-inputs/DropDownBtn.vue";


const props = defineProps({
    device: {
        type: Object as PropType<Oven>,
        required: true
    } 
});


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

const updateTemperature = async (newValue: string) => {
    oven.state.temperature = Number(newValue)
    await changeOvenTemp(oven, oven.state.temperature)
}

</script>

<template>
   <VCard class="d-flex align-center" color="primary" rounded="xl">
    <VContainer>
      <VRow class="flex-row justify-center ma-1 mb-5">
        <PowerButton :power="power" @click="() => {toggleOven(oven)}" :size="SizesEnum.Large"/>
      </VRow>
      <VCol class="flex-row justify-center">
        <VRow class="ml-1"><span>Temperatura: </span></VRow>
        <VRow class="mx-1">
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
                :value="oven.state.temperature"
                @update:model-value="(newValue) => updateTemperature(newValue)"
                hide-details
                min="90"
                max="230"
                single-line
                density="compact"
                type="number"
                class="temperature"
              ></VTextField>
          </template>
        </VSlider>
        </VRow>
      </VCol>
      <VRow align-content="center">
        <VCol class="d-flex justify-center ma-1">
          <DropDownBtn :selected="oven.state.heat" :items="Object.values(heatModes)" text="Calor"  @itemClicked="(value : string) => oven.state.heat = value" />
        </VCol>
        <VCol class="d-flex justify-center ma-1">
            <DropDownBtn :selected="oven.state.grill" :items="Object.values(grillModes)" text="Parrilla"  @itemClicked="(value : string) => oven.state.grill = value" />
        </VCol>
        <VCol class="d-flex justify-center ma-1">
          <DropDownBtn :selected="oven.state.convection" :items="Object.values(convModes)" text="Convección"  @itemClicked="(value : string) => oven.state.convection = value" />
        </VCol>
      </VRow>
    </VContainer>
  </VCard>
</template>

<style scoped>

.temperature {
  width: 6vw; 
}

</style>