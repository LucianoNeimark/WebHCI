<script setup lang="ts">
import {DevicesApi} from "@/api/devices.api";
import {type PropType, reactive, computed, watch, ref} from "vue";
import CardSlider from "@/components/custom-inputs/CardSlider.vue";
import SpeakerPlayer from "@/components/custom-inputs/SpeakerPlayer.vue";
import {type Speaker, previousSongSpeaker, nextSongSpeaker, toggleSpeaker, changeVolumeSpeaker, setGenreSpeaker} from "@/interfaces/models/speaker";
import { CONSTANTS } from '@/utils/constants'
import { watchEffect } from "vue";

const props = defineProps({
    device: {
        type: Object as PropType<Speaker>,
        required: true
    }
})

const speaker = reactive(props.device)

const prev = async () => {
    console.log("Previous song")
    await previousSongSpeaker(speaker)
    //playing.value = true
}

const next = async () => {
    console.log("Next song")
    await nextSongSpeaker(props.device)
    //playing.value = true
}

const togglePlay = async () => {
    console.log("Play/pause")
    await toggleSpeaker(speaker)
    //playing.value = !playing.value
}

const updateVolume = async () => {
  await changeVolumeSpeaker(speaker, speaker.state.volume)
}

const volumeUp = () => {
  speaker.state.volume++
  updateVolume()
}

const volumeDown = () => {
  speaker.state.volume--
  updateVolume()
}


const genres = ref(Object.values(CONSTANTS.MUSIC_GENRES))

const playing = computed(() => speaker.state.status === 'playing')

watch(() => speaker.state.genre, async (newGenre, oldGenre) => {
  if (newGenre !== oldGenre) await setGenreSpeaker(speaker, newGenre)
})

</script>
<template>
     <VCard class="d-flex " color="primary" rounded="xl">
        <VContainer>
            <VRow class="align-content-center justify-space-evenly pt-10 px-5">
                <SpeakerPlayer :playing="playing" @prev="prev" @next="next" @togglePlay="togglePlay"/>
            </VRow>
            <VRow class="pa-5">
              <VBtn rounded="xl" size="x-small" color="lightSurface" stacked @click="volumeDown">
                <VIcon icon="mdi:mdi-minus" size="2vw"></VIcon>
              </VBtn> 
              <!-- TODO: Ver de cambiara v-model-->
              <CardSlider class="slider-position" v-model:value="speaker.state.volume" :min="0" :max="10" icon="mdi-volume-high"
                          @updateSlider="updateVolume"/>
                  
              <VBtn rounded="xl" size="x-small" color="lightSurface" stacked @click="volumeUp">
                <VIcon icon="mdi:mdi-plus" size="2vw"></VIcon>
              </VBtn>       
            </VRow>
            <VSelect label="Género" v-model="speaker.state.genre" :items="genres"/>
        </VContainer>
      </VCard>
</template>

<style scoped>
.slider-position{
  margin-top: inherit;
}

</style>