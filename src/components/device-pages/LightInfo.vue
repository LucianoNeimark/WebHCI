<script setup>

import {toRefs} from "vue";

const props = defineProps({
    intensity: {
        type: Array,
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

const {intensity, color, power} = toRefs(props);


</script>

<template>
  <VCard>
      {{color}}
  </VCard>
</template>

<style scoped>

</style>