<script setup lang="ts">
import {computed, type PropType, reactive, watch} from "vue";
import ToggleButton from "@/components/custom-inputs/ToggleButton.vue"
import { changeDoorLockedUnlocked, changeDoorOpenClosed, toggleLock, toggleStatus, type Door } from "@/interfaces/models/door";

const props = defineProps({
  device: {
    type: Object as PropType<Door>,
    required: true
  }
})

const door = reactive(props.device)
const locked = computed(() => door.state.lock === 'locked')
const status = computed(() => door.state.status === 'closed')


watch(() => door.state.status, async (newStatus : string, oldStatus : string) => {
  if (newStatus!==oldStatus) await changeDoorOpenClosed(door, newStatus)
})

watch(() => door.state.lock, async (newStatus : string, oldStatus : string) => {
  if (newStatus!==oldStatus) await changeDoorLockedUnlocked(door, newStatus)
})

</script>

<template>
  <VCard class="d-flex align-center" color="primary" rounded="xl">
    <VContainer>
      <VRow class="flex-row justify-center ma-1 doorRow">
        <ToggleButton class="btn-x-large" :selected="locked" icon-selected="mdi-lock-open" icon="mdi-lock" iconSize="5vw" @click="() => toggleLock(door)"/>
        <ToggleButton class="btn-x-large" :selected="status" icon-selected="mdi-door-open" icon="mdi-door-closed" iconSize="5vw"  @click="() => toggleStatus(door)"/>
      </VRow>
    </VContainer>
  </VCard>

</template>

<style scoped>

.doorRow{
  gap: 5vw;
}

</style>