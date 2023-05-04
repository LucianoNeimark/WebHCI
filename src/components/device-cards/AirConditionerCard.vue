<script setup>
import FrameCard from "@/components/FrameCard.vue"
import AirConditionerSVG from "@/assets/device-icons/device/air-conditioner.svg"
import { ref, computed } from 'vue'
const temperature = ref(22)
const toggle = ref("wind")
const power = ref(true)
const powerColor = computed(() => {
        return power.value ? 'white' : 'grey-lighten-1'
    }
)

defineProps({
    id: String,
    name : String
})


</script>

<template>
    <FrameCard :name="name" :icon="AirConditionerSVG">
        <VContainer class="mx-0">
            <VRow>
                <VCol class="d-flex justify-center" align-self="center">
                    <VBtn color="lightSurface" class="temperature" icon="mdi-minus" @click="temperature--"/>
                    <span style="font-size: 28px" class="px-2 align-self-center">{{temperature}}°</span>
                    <VBtn color="lightSurface" class="temperature" icon="mdi-plus" @click="temperature++"/>
                </VCol>
                <VCol align-self="center" class="d-flex justify-center">
                    <VBtn @click="power = !power" :color="powerColor" class="power">
                        <VIcon icon="mdi-power" size="3vw"> </VIcon>
                    </VBtn>
                </VCol>
            </VRow>
            <VRow>
                <VBtnToggle
                    v-model="toggle"
                    variant="flat"
                    rounded="xl"
                    divided
                    mandatory
                    max="1"
                    class="flex-grow-1"
                >
                    <VBtn icon="mdi-white-balance-sunny" value="hot" class="flex-grow-1"/>
                    <VBtn icon="mdi-snowflake" value="cold" class="flex-grow-1"/>
                    <VBtn icon="mdi-weather-windy" value="wind" class="flex-grow-1"/>
                </VBtnToggle>
            </VRow>
        </VContainer>
    </FrameCard>
</template>

<style scoped>
.temperature{
    width: 3vw;
    height: 3vw;
    border-radius: 40%;
}
.power{
    width: 4vw;
    height: 4vw;
    border-radius: 40%;
}
</style>