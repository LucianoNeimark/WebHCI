<script setup>
import FrameCard from "@/components/FrameCard.vue"
import SpeakerSVG from "@/assets/device-icons/device/speaker.svg"

import {ref} from "vue";
import CardSlider from "@/components/custom-inputs/CardSlider.vue";
import SpeakerPlayer from "@/components/custom-inputs/SpeakerPlayer.vue";
defineProps({
    id: String,
    name : String
})

const volume = ref(50)
const playing = ref(true)

const postInfo = () => {
    console.log("Soy una api call! Cambiando el valor a ...", volume.value)
}

const prev = () => {
    console.log("Previous song")
    playing.value = true
}

const next = () => {
    console.log("Next song")
    playing.value = true
}

const togglePlay = () => {
    console.log("Play/pause")
    playing.value = !playing.value
}

</script>
<template>
    <FrameCard :id="id" :name="name" :icon="SpeakerSVG">
        <VContainer>
            <VRow class="align-content-center justify-space-evenly mb-1">
                <SpeakerPlayer :playing="playing" @prev="prev" @next="next" @togglePlay="togglePlay"/>
            </VRow>
            <VRow>
                <CardSlider :value="volume" :min="0" :max="100" icon="mdi-volume-high"
                            @updateSlider="postInfo"
                            @updateValue="value => volume = value"/>
            </VRow>
        </VContainer>
    </FrameCard>
</template>

<style scoped>

</style>