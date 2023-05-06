<script setup lang="ts">
import FrameCard from "@/components/FrameCard.vue"
import LightbulbSVG from "@/assets/device-icons/device/lightbulb.svg"
import {computed, type PropType, reactive, watch} from "vue";
import PowerButton from "@/components/custom-inputs/PowerButton.vue";
import {SizesEnum} from "@/enums/enums";
import { toggleLamp, type Lamp, changeLampStatus, changeLampColor, changeLampBrightness} from "@/interfaces/models/lamp";

const props = defineProps({
    device: {
        type: Object as PropType<Lamp>,
        required: true
    } 
});
const lamp = reactive(props.device)

const power = computed(() => lamp.state.status === 'on')

watch(() => lamp.state.status, async (newStatus: string, oldStatus: string) => {
    if (newStatus !== oldStatus) await changeLampStatus(lamp, newStatus)
})

</script>

<template>
    <FrameCard :id="device.id" :name="device.name" :icon="LightbulbSVG">
        <VContainer>
            <VRow class="flex-row justify-center mb-1">
                <PowerButton :power="power" @click="() => toggleLamp(lamp)" :size="SizesEnum.XLarge"/>
            </VRow>
        </VContainer>
    </FrameCard>
</template>

<style scoped>

</style>