<script setup lang="ts">
import FrameCard from "@/components/FrameCard.vue"
import OvenSVG from "@/assets/device-icons/device/oven.svg"
import {ref} from "vue";
import {SizesEnum} from "@/enums/enums";
import PowerButton from "@/components/custom-inputs/PowerButton.vue";
import CardSlider from "@/components/custom-inputs/CardSlider.vue";
defineProps({
    id: String,
    name : String
})

const temp = ref(90)

const power = ref(false)

const postInfo = () => {
    console.log("Soy una api call! Cambiando el valor a ...", temp.value)
}

</script>
<template>
    <FrameCard :id="id" :name="name" :icon="OvenSVG">
        <VContainer>
            <VRow class="flex-row justify-center">
                <PowerButton :power="power" @click="power = !power" :size="SizesEnum.Large"/>
            </VRow>
            <VRow>
                <CardSlider :value="temp" :min="90" :max="240" icon="mdi-thermometer-low"
                @updateSlider="postInfo"
                @updateValue="(value: number) => temp = value"/>
            </VRow>
        </VContainer>
    </FrameCard>
</template>

<style scoped>

</style>