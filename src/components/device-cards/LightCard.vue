<script setup>
import FrameCard from "@/components/FrameCard.vue"
import LightbulbSVG from "@/assets/device-icons/device/lightbulb.svg"
import {computed, ref} from "vue";

defineProps({
    id: String,
    name : String
})

const power = ref(false)

const powerButtonColor = computed(() => {
    return power.value ? 'green' : 'white' // TODO: Change to constants
})

</script>

<template>
    <FrameCard :name="name" :icon="LightbulbSVG">
        <VContainer>
            <VRow class="flex-row justify-center mb-1">
                <VBtn rounded="xl" @click="power = !power" :color="powerButtonColor" size="x-large" stacked>
                    <VIcon icon="mdi:mdi-power" size="x-large"></VIcon>
                </VBtn>
            </VRow>
        </VContainer>
    </FrameCard>
</template>

<style scoped>

</style>