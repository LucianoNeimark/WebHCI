<script setup lang="ts">
import {DevicesApi} from "@/api/devices.api";
import {type PropType, reactive, computed, watch, ref} from "vue";
import CardSlider from "@/components/custom-inputs/CardSlider.vue";
import SpeakerPlayer from "@/components/custom-inputs/SpeakerPlayer.vue";
import {type Speaker, type SpeakerSong, previousSongSpeaker, nextSongSpeaker, toggleSpeaker, changeVolumeSpeaker, setGenreSpeaker, getPlaylistSpeaker, stopSpeaker} from "@/interfaces/models/speaker";
import { CONSTANTS } from '@/utils/constants'
import type { Device } from '@/interfaces/models/device'
import { onMounted } from "vue";

const props = defineProps({
    device: {
        type: Object as PropType<Speaker>,
        required: true
    }
})

const speaker = reactive<{device: Device}>({
  device: props.device
})
const playlist = ref<SpeakerSong[]>([])
const interv = ref()
const playing = computed(() => speaker.device.state.status === 'playing')

const prev = async () => {
    await previousSongSpeaker(speaker.device)
    speaker.device = await DevicesApi.getDeviceById(speaker.device.id)
    initTimer()
}

const next = async () => {
    await nextSongSpeaker(props.device)
    speaker.device = await DevicesApi.getDeviceById(speaker.device.id)
    initTimer()
}

const togglePlay = async () => {
    await toggleSpeaker(speaker.device)
    if (playing.value)  {
      speaker.device = await DevicesApi.getDeviceById(speaker.device.id)
      console.log("toggle", speaker.device)
      initTimer()
    }
    else clearInterval(interv.value)
}

const updateVolume = async () => {
  await changeVolumeSpeaker(speaker.device, speaker.device.state.volume)
}

const volumeUp = () => {
  speaker.device.state.volume++
  updateVolume()
}

const volumeDown = () => {
  speaker.device.state.volume--
  updateVolume()
}

const genres = ref(Object.values(CONSTANTS.MUSIC_GENRES))


watch(() => speaker.device.state.genre, async (newGenre, oldGenre) => {
  if (newGenre === oldGenre) return;
  await setGenreSpeaker(speaker.device, newGenre)
  speaker.device = await DevicesApi.getDeviceById(speaker.device.id)
  playlist.value = await getPlaylistSpeaker(speaker.device)
  initTimer()
})


const progressDuration = ref(0);
const progressTime = ref(0);

onMounted(async () => {
  playlist.value = await getPlaylistSpeaker(speaker.device)
  initTimer()
})

const initTimer = () => {
  if (interv.value) clearInterval(interv.value)
  const [m1, s1] = speaker.device.state.song?.progress?.split(':').map(Number) || [0, 0]
  const [m2, s2] = speaker.device.state.song?.duration?.split(':').map(Number) || [0, 0]
  progressTime.value = s1 + (m1 * 60)
  progressDuration.value = s2 + (m2 * 60) 
  if (!playing.value) return; // Si esta en pausa no empieza el timer
  interv.value = setInterval(async () => {
    progressTime.value++
    if (progressTime.value >= progressDuration.value) {
      if (interv.value) clearInterval(interv.value)
      speaker.device = await DevicesApi.getDeviceById(speaker.device.id)
      initTimer()
    } else {
      speaker.device.state.song.progress = 
        `${Math.floor(progressTime.value / 60)}:${(progressTime.value % 60).toString().padStart(2, '0')}`
    }
  }, 1000)
}

const stopped = computed(() => speaker.device.state.status === 'stopped') 

const progress = computed(() => {
  return progressTime.value * 100 / progressDuration.value 
})

</script>
<template>
     <VCard class="card-speaker d-flex" color="primary" rounded="xl">
        <VContainer>
            <VCol class="music-info" v-if="!stopped">
              <div class="title">{{ speaker.device?.state?.song?.title || 'Sin tiulo'}}</div>
              <div class="artist">{{ speaker.device?.state?.song?.artist || 'Sin artista'}}</div>
              <div class="album">{{ speaker.device?.state?.song?.album || 'Sin album'}}</div>
              <VRow class="pa-3 my-1">
                <VCol class="px-0" cols="10">
                  <VProgressLinear bg-color="secondary" class="progress-bar" rounded="xl" height="5" :model-value="progress" color="lightSurface" background-color="primary"/>
                </VCol>
                <VCol class="pa-0">
                  {{ speaker.device?.state?.song?.progress || 'Comienzo'}} / {{ speaker.device?.state?.song?.duration || 'Fin'}}
                </VCol>
              </VRow>
            </VCol>
            <VRow class="align-content-center justify-space-evenly pt-5 px-5">
                <SpeakerPlayer :playing="playing" @prev="prev" @next="next" @togglePlay="togglePlay"/>
            </VRow>
            <VRow class="pa-5">
              <VBtn rounded="xl" size="x-small" color="lightSurface" stacked @click="volumeDown">
                <VIcon icon="mdi:mdi-minus" size="2vw"></VIcon>
              </VBtn> 
              <!-- TODO: Ver de cambiara v-model-->
              <CardSlider class="slider-position" v-model:value="speaker.device.state.volume" :min="0" :max="10" icon="mdi-volume-high"
                          @updateSlider="updateVolume"/>
                  
              <VBtn rounded="xl" size="x-small" color="lightSurface" stacked @click="volumeUp">
                <VIcon icon="mdi:mdi-plus" size="2vw"></VIcon>
              </VBtn>
            </VRow>
            <VSelect label="Género" v-model="speaker.device.state.genre" :items="genres"/>
            <VList rounded="xl" v-if="!stopped">
                <VListItem v-for="song in playlist">
                  <VListItemTitle :class="song.title === speaker.device?.state?.song?.title ? 'bold' : ''">{{ song.title }} </VListItemTitle>
                </VListItem>
            </VList>  
        </VContainer>
      </VCard>
</template>

<style lang="scss">

@import '@/assets/variables';
.card-speaker{
  width: 45%;
}
.slider-position{
  margin-top: inherit;
}

.music-info{
  text-align: center;
}

.title{
  font-size: 1.5rem;
  font-weight: bold;
}

.artist{
  font-size: 1.1rem;
}

.album{
  font-size: 0.9rem;
}

.progress-bar {
  width: 80%;
}

</style>