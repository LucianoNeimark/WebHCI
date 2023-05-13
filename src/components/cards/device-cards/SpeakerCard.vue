<script setup lang="ts">
import FrameCard from "@/components/cards/FrameCard.vue"

import {computed, reactive, type PropType, inject, type Ref, watch} from "vue";
import CardSlider from "@/components/custom-inputs/CardSlider.vue";
import SpeakerPlayer from "@/components/custom-inputs/SpeakerPlayer.vue";
import {type Speaker, previousSongSpeaker, nextSongSpeaker, toggleSpeaker, changeVolumeSpeaker} from "@/interfaces/models/speaker";
import {DevicesApi} from "@/api/devices.api";
import {useDevicesStore} from "@/stores/device.store";
import type {Event} from "@/interfaces/event.interface";
import {CONSTANTS} from "@/utils/constants";


const props = defineProps({
    device: {
        type: Object as PropType<Speaker>,
        required: true
    } 
})

const speaker = reactive<Speaker>(props.device)

const prev = async () => {
    await previousSongSpeaker(speaker)
    const { state: {song: {title}}}= await DevicesApi.getDeviceById(speaker.id)
    speaker.state.song.title = title
}

const next = async () => {
    await nextSongSpeaker(speaker)
    const { state: {song: {title}}}= await DevicesApi.getDeviceById(speaker.id)
    speaker.state.song.title = title
}

const togglePlay = async () => {
    await toggleSpeaker(speaker)
}

const updateVolume = async () => {
  await changeVolumeSpeaker(speaker, speaker.state.volume)
}

const playing = computed(() => speaker.state.status === 'playing')

const { devices } = useDevicesStore()
const MSG = inject<Ref<Event>>(CONSTANTS.EVENT)
watch(() => MSG?.value, async (newMSG) => {
    if (newMSG && newMSG.deviceId === speaker.id) {
        ({...speaker.state} = {...(devices.items.get(speaker.id) as Speaker)?.state} || {...speaker.state});
    }
})
</script>
<template>
    <FrameCard :id="device.id" :name="device.name" icon="mdi-volume-high">
        <VContainer>
            <VRow class="song-title">
                <span class="marquee">
                    <span class="track">
                        {{ speaker.state?.song?.title || '' }}
                    </span>
                </span>
            </VRow>
            <VRow class="align-content-center justify-space-evenly mb-1">
                <SpeakerPlayer :playing="playing" @prev="prev" @next="next" @togglePlay="togglePlay"/>
            </VRow>
            <VRow>
                <CardSlider v-model:value="speaker.state.volume" :min="0" :max="10" icon="mdi-volume-high"
                            @updateSlider="updateVolume"/>
            </VRow>
        </VContainer>
    </FrameCard>
</template>

<style scoped>
.song-title {
    font-weight: bold;
    align-content: center;
    margin-bottom: 2%;
    justify-content: center !important;
}

.marquee {
  width: 100vw;
  max-width: 100%;
  height: 1.5vw;
  overflow-x: hidden;
}

.track {
  position: absolute;
  white-space: nowrap;
  will-change: transform;
  animation: marquee 11s linear infinite;
}

@keyframes marquee {
  from { transform: translateX(30vw); }
  to { transform: translateX(-30vw); }
}

</style>