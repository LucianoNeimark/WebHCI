<script setup>
import FrameCard from "@/components/FrameCard.vue"
import DoorSVG from "@/assets/device-icons/device/door-open.svg"

defineProps({
    id: String,
    name : String
})

</script>
<template>
    <FrameCard :name="name" :icon="DoorSVG">
    </FrameCard>
</template>

<style scoped>

</style>