<script setup>

import {computed, ref, toRefs} from "vue";

const props = defineProps({
    intensity: {
        type: Number,
        required: true
    },
    color: {
        type: String,
        required: true
    },
    power: {
        type: Boolean,
        required: true
    }
});

// const {intensity, color, power} = toRefs(props);

// TODO: Cambiar cuando este la api
const intensity = ref(props.intensity)
const color = ref(props.color)
const power = ref(props.power)

const powerButtonColor = computed(() => {
    return power.value ? 'green' : 'white' // TODO: Change to constants
});

</script>

<template>
  <VCard class="pa-3" color="primary" rounded="xl">
      <VContainer>
          <VRow class="flex-row justify-center mb-1">
              <VBtn class="light-button" rounded="xl" @click="power = !power" :color="powerButtonColor" size="x-large" stacked>
                  <VIcon icon="mdi:mdi-power" size="6vw"></VIcon>
              </VBtn>
          </VRow>
          <VRow>
              Intensidad
          </VRow>
          <VRow>
              <VSlider
                      v-model="intensity"
                      min="0"
                      max="100"
                      step="1"
                      thumb-label
                      track-fill-color="white"
                      track-color="background"
                      thumb-color="white"
              >
                  <template v-slot:append>
                      <v-text-field
                              v-model="intensity"
                              hide-details
                              single-line
                              density="compact"
                              type="number"
                              style="width: 70px"
                      ></v-text-field>
                  </template>
              </VSlider>

          </VRow>
          <VRow class="justify-center">
              <VColorPicker
                      v-model="color"
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