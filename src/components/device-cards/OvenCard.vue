<script setup>
import FrameCard from "@/components/FrameCard.vue"
import OvenSVG from "@/assets/device-icons/device/oven.svg"
defineProps({
    id: String,
    name : String
})

</script>
<template>
    <FrameCard :name="name" :icon="OvenSVG">
    </FrameCard>
</template>

<style scoped>

</style>