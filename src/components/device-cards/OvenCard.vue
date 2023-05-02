<script setup>
import FrameCard from "@/components/FrameCard.vue"
import OvenSVG from "@/assets/device-icons/device/oven.svg"
import {computed, ref} from "vue";
defineProps({
    id: String,
    name : String
})

const temp = ref(90)
const power = ref(false)

const powerButtonColor = computed(() => {
    return power.value ? 'green' : 'white' // TODO: Change to constants
})

</script>
<template>
    <FrameCard :name="name" :icon="OvenSVG">
        <VContainer>
            <VRow class="flex-row justify-center">

                <VBtn class="oven-button" rounded="xl" @click="power = !power" :color="powerButtonColor" stacked>
                    <VIcon icon="mdi:mdi-power" size="5vw"></VIcon>
                </VBtn>
            </VRow>
            <VRow>
                <VSlider
                    v-model="temp"
                    :min="90"
                    :max="240"
                    step="1"
                    thumb-label
                    track-fill-color="white"
                    thumb-color="white"
                    append-icon="mdi-thermometer-high"
                ></VSlider>
            </VRow>
        </VContainer>
    </FrameCard>
</template>

<style scoped>
    .oven-button{
        width: 7vw;
        height: 7vw;
    }
</style>