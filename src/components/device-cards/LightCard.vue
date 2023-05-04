<script setup>
import FrameCard from "@/components/FrameCard.vue"
import LightbulbSVG from "@/assets/device-icons/device/lightbulb.svg"
import { ref} from "vue";
import PowerButton from "@/components/custom-inputs/PowerButton.vue";
import {SizesEnum} from "@/enums/enums";

defineProps({
    id: String,
    name : String
})

const power = ref(false)

</script>

<template>
    <FrameCard :name="name" :icon="LightbulbSVG">
        <VContainer>
            <VRow class="flex-row justify-center mb-1">
                <PowerButton :power="power" @click="power = !power" :size="SizesEnum.XLarge"/>
            </VRow>
        </VContainer>
    </FrameCard>
</template>

<style scoped>

</style>