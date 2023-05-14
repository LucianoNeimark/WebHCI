<script setup lang="ts">
import FrameCard from "@/components/cards/FrameCard.vue"
import ToggleButton from "@/components/custom-inputs/ToggleButton.vue";
import { changeDoorLockedUnlocked, changeDoorOpenClosed, toggleLock, toggleStatus, type Door } from "@/interfaces/models/door";
import {computed, inject, type PropType, reactive, type Ref, watch} from "vue";
import {useDevicesStore} from "@/stores/device.store";
import type {Event} from "@/interfaces/event.interface";
import {CONSTANTS} from "@/utils/constants";

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

const { devices } = useDevicesStore()
const MSG = inject<Ref<Event>>(CONSTANTS.EVENT)
watch(() => MSG?.value, async (newMSG) => {
    if (newMSG && newMSG.deviceId === door.id)
        ({...door.state} = {...(devices.items.get(door.id) as Door)?.state} || {...door.state})
})
</script>

<template>
    <FrameCard :id="door.id" :name="door.name" icon="mdi-door">
        <VRow class="align-content-center justify-space-evenly mb-1">
            <ToggleButton class="btn-x-large" :selected="locked" icon-selected="mdi-lock-open" icon="mdi-lock" iconSize="5vw" @click="() => toggleLock(door)"/>
            <ToggleButton class="btn-x-large" :selected="status" icon-selected="mdi-door-open" icon="mdi-door-closed" iconSize="5vw" @click="() => toggleStatus(door)"/>
        </VRow>
    </FrameCard>
</template>

<style scoped>

</style>