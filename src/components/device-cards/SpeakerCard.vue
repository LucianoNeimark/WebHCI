<script setup>
import FrameCard from "@/components/FrameCard.vue"
import SpeakerSVG from "@/assets/device-icons/device/speaker.svg"

import {ref} from "vue";
defineProps({
    id: String,
    name : String
})

const vol = ref(50)
const playing = ref(true)

const playIcon = "mdi:mdi-play"
const pauseIcon = "mdi:mdi-pause"


</script>
<template>
    <FrameCard :name="name" :icon="SpeakerSVG">
        <VContainer>
            <VRow class="align-content-center justify-space-evenly mb-1">
                <VBtn rounded="xl" size="large"  @click="playing = true" color="lightSurface" stacked>
                    <VIcon icon="mdi:mdi-skip-previous" size="3vw"></VIcon>
                </VBtn>
                <VBtn rounded="xl" size="large" @click="playing = !playing" color="lightSurface" stacked>
                    <VIcon :icon="!playing?playIcon:pauseIcon" size="3vw"></VIcon>
                </VBtn>
                <VBtn rounded="xl" size="large" @click="playing = true" color="lightSurface" stacked>
                    <VIcon icon="mdi:mdi-skip-next" size="3vw"></VIcon>
                </VBtn>
            </VRow>
            <VRow>
                <VSlider
                    class="w-25"
                    v-model="vol"
                    :min="0"
                    :max="100"
                    step="1"
                    thumb-label
                    track-fill-color="white"
                    thumb-color="white"
                    append-icon="mdi-volume-high"
                    width
                />
            </VRow>
        </VContainer>
    </FrameCard>
</template>

<style scoped>

</style>