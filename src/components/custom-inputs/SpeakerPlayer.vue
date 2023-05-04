<script setup>
  import ToggleButton from "@/components/custom-inputs/ToggleButton.vue";
  import {SizesEnum} from "@/enums/enums";
  defineProps({
      playing: Boolean
  })
  const emit = defineEmits(['prev', 'next', 'togglePlay'])

</script>

<template>
    <VBtn rounded="xl" size="large"  @click="emit('prev')" color="lightSurface" stacked>
        <VIcon icon="mdi:mdi-skip-previous" size="3vw"></VIcon>
    </VBtn>
    <ToggleButton :size="SizesEnum.Large" :selected="playing" icon-selected="mdi:mdi-play" icon="mdi:mdi-pause"
                  @click="emit('togglePlay')"/>
    <VBtn rounded="xl" size="large" @click="emit('next')" color="lightSurface" stacked>
        <VIcon icon="mdi:mdi-skip-next" size="3vw"></VIcon>
    </VBtn>
</template>

<style scoped>

</style>