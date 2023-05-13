<script setup lang="ts">
  import  { RoutinesApi } from "@/api/routines.api";
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

  const devicesList = computed(() => props.routine.actions.map(action => 
    ({typeId : action.device.type.id,
    name : action.device.name,
    secondaryName : action.actionName})))
  
  const routine = reactive(props.routine)

  const action = async () => {
    await RoutinesApi.executeRutine(props.routine.id)
  }

</script>

<template>
    <SmallFrameCard :name="routine.name" :types="devicesList" icon="mdi-play-circle" @routine = "action" empty-message="Sin dispositivos"/>
</template>

<style scoped>

</style>