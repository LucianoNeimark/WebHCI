<script setup>
import FrameCard from "@/components/FrameCard.vue"
import LightbulbSVG from "@/assets/device-icons/device/lightbulb.svg"
defineProps({
    id: String,
    name : String
})

</script>
<template>
    <FrameCard :name="name" :icon="LightbulbSVG">
    </FrameCard>
</template>

<style scoped>

</style>