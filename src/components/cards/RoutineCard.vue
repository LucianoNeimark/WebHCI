<script setup lang="ts">
  import SmallFrameCard from "@/components/cards/SmallFrameCard.vue";
  import type { Routine } from "@/interfaces/routine.interface";
  import type { PropType } from "vue";
  import {computed, reactive} from "vue";

  const props = defineProps({
    routine: {
      type: Object as PropType<Routine>,
      required: true
    }
  })

  const devicesList = computed(() => props.routine.actions.map(action => action.device.type.id))
  const routine = reactive(props.routine)

</script>

<template>
    <SmallFrameCard :name="routine.name" :types="devicesList" icon="mdi-play-circle"/>
</template>

<style scoped>

</style>