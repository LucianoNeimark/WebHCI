<script setup>
import FrameCard from "@/components/FrameCard.vue"
import OpenDoorSVG from "@/assets/device-icons/device/door-open.svg"
import CloseDoorSVG from "@/assets/device-icons/device/door-close.svg"
import OpenLockSVG from "@/assets/device-icons/device/open-lock.svg"
import CloseLockSVG from "@/assets/device-icons/device/close-lock.svg"
import {computed, ref} from "vue";


defineProps({
    id: String,
    name : String
})

const lock = ref(false)
const door = ref(false)

const lockButtonIcon = computed(() => {
    return lock.value ? "mdi-lock" : "mdi-lock-open" // TODO: Change to constants
})

const doorButtonIcon = computed(() => {
    return door.value ? OpenDoorSVG : CloseDoorSVG // TODO: Change to constants
})

</script>

<template>
    <FrameCard :name="name" :icon="OpenDoorSVG">
        <VRow class="align-content-center justify-space-evenly mb-1">
            <VBtn class="door-button" rounded="xl" size="x-large"  @click="lock = !lock" stacked>
                <VIcon :icon="lockButtonIcon" size="x-large"> </VIcon>
            </VBtn>
            <VBtn class="door-button" rounded="xl" size="x-large"  @click="door = !door" stacked>
                <img :src="doorButtonIcon" alt="door-icon" width="35" height="35"/>
            </VBtn>
        </VRow>
    </FrameCard>
</template>

<style scoped>

    .door-button{
        width: 8vw;
        height: 8vw;
    }

</style>