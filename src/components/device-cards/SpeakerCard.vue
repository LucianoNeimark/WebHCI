<script setup>
import FrameCard from "@/components/FrameCard.vue"
import SpeakerSVG from "@/assets/device-icons/device/speaker.svg"
defineProps({
    id: String,
    name : String
})

</script>
<template>
    <FrameCard :name="name" :icon="SpeakerSVG">
    </FrameCard>
</template>

<style scoped>

</style>