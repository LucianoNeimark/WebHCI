<script setup>
import FrameCard from "@/components/FrameCard.vue"
import ToggleButton from "@/components/custom-inputs/ToggleButton.vue";
import OpenDoorSVG from "@/assets/device-icons/device/door-open.svg"
import {ref} from "vue";
import {SizesEnum} from "@/enums/enums";

defineProps({
    id: String,
    name : String
})

const locked = ref(false)
const closed = ref(false)

</script>

<template>
    <FrameCard :id="id" :name="name" :icon="OpenDoorSVG">
        <VRow class="align-content-center justify-space-evenly mb-1">
            <ToggleButton :selected="locked" icon-selected="mdi-lock" icon="mdi-lock-open" @click="locked = !locked"/>
            <ToggleButton :selected="closed" icon-selected="mdi-door-closed" icon="mdi-door-open" @click="closed = !closed"/>
        </VRow>
    </FrameCard>
</template>

<style scoped>

</style>