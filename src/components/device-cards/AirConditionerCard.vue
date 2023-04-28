<script setup>
import FrameCard from "@/components/FrameCard.vue"
import AirConditionerSVG from "@/assets/device-icons/device/air-conditioner.svg"

defineProps({
    id: String,
    name : String
})

</script>

<template>
    <FrameCard :name="name" :icon="AirConditionerSVG">
        <VBtn rounded="xl" size="x-large">-</VBtn>
        <VBtn rounded="xl" size="x-large">+</VBtn>
    </FrameCard>
</template>

<style scoped>

</style>