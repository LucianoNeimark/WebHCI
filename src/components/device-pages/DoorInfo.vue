

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

console.log(locked, status)

watch(() => door.state.status, async (newStatus : string, oldStatus : string) => {
  if (newStatus!==oldStatus) await changeDoorOpenClosed(door, newStatus)
})

watch(() => door.state.lock, async (newStatus : string, oldStatus : string) => {
  if (newStatus!==oldStatus) await changeDoorLockedUnlocked(door, newStatus)
})

</script>

<template>
  <ToggleButton :selected="locked" icon-selected="mdi-lock" icon="mdi-lock-open" @click="() => toggleLock(door)"/>
  <ToggleButton :selected="status" icon-selected="mdi-door-closed" icon="mdi-door-open" @click="toggleStatus(door)"/>
</template>

<style scoped>
</style>