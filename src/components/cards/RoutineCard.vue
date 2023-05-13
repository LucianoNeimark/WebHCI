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
    ({typeId : action.device.type?.id,
    name : action.device.name,
    secondaryName : action.actionName})).filter(device => device.typeId))
  
  const routine = reactive(props.routine)

  const action = async () => {
    await RoutinesApi.executeRoutine(props.routine.id)
  }

</script>

<template>
    <SmallFrameCard :name="routine.name" :id="routine.id" :types="devicesList" icon="mdi-play" @routine = "action" empty-message="Sin dispositivos" options-url-base="/routines"/>
</template>

<style scoped>

</style>