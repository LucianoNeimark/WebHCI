<script setup lang="ts">
import FrameCard from "@/components/FrameCard.vue"
import AirConditionerSVG from "@/assets/device-icons/device/air-conditioner.svg"
import { ref } from 'vue'
import PowerButton from "@/components/custom-inputs/PowerButton.vue";
import {SizesEnum} from "@/enums/enums";
import ModeToggle from "@/components/custom-inputs/ModeToggle.vue";
import NumericController from "@/components/custom-inputs/NumericController.vue";

const temperature = ref(22)
const toggle = ref(0)
const power = ref(false)
const iconArray = [ "mdi-white-balance-sunny",  "mdi-snowflake", "mdi-weather-windy" ]

defineProps({
    id: String,
    name: {
        type: String,
        required: true
    }
})
</script>

<template>
    <FrameCard :id="id" :name="name" :icon="AirConditionerSVG">
            <VRow>
                <VCol class="d-flex justify-center" align-self="center">
                    <NumericController :val="temperature" suffix="º" :min="18" :max="38" @increment="temperature++" @decrement="temperature--"/>
                </VCol>
                <VCol align-self="center" class="d-flex justify-center">
                    <PowerButton :power="power" @click="power = !power" :size="SizesEnum.Small"/>
                </VCol>
            </VRow>
            <VRow class="mx-2">
                <ModeToggle :icons="iconArray" :toggle="toggle" @updateToggle="(index: number) => toggle = index"/>
            </VRow>
    </FrameCard>
</template>

<style scoped>

</style>