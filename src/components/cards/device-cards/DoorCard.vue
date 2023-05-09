<script setup lang="ts">
import FrameCard from "@/components/cards/FrameCard.vue"
import ToggleButton from "@/components/custom-inputs/ToggleButton.vue";
import { changeDoorLockedUnlocked, changeDoorOpenClosed, toggleLock, toggleStatus, type Door } from "@/interfaces/models/door";
import {computed, type PropType, reactive, watch} from "vue";


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
    <FrameCard :id="door.id" :name="door.name" icon="mdi-door">
        <VRow class="align-content-center justify-space-evenly mb-1">
            <ToggleButton :selected="locked" icon-selected="mdi-lock-open" icon="mdi-lock" @click="() => toggleLock(door)"/>
            <ToggleButton :selected="status" icon-selected="mdi-door-open" icon="mdi-door-closed" @click="() => toggleStatus(door)"/>
        </VRow>
    </FrameCard>
</template>

<style scoped>

</style>