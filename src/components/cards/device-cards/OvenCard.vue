<script setup lang="ts">
import FrameCard from "@/components/cards/FrameCard.vue"
import {computed, type PropType, reactive, watch, inject, type Ref} from "vue";
import {SizesEnum} from "@/enums/enums";
import PowerButton from "@/components/custom-inputs/PowerButton.vue";
import CardSlider from "@/components/custom-inputs/CardSlider.vue";
import {type Oven, toggleOven, changeOnOf, changeOvenTemp} from "@/interfaces/models/oven"
import type {Event} from "@/interfaces/event.interface";
import {CONSTANTS} from "@/utils/constants";
import {useDevicesStore} from "@/stores/device.store";

const props = defineProps({
  device: {
    type: Object as PropType<Oven>,
    required: true
  }
})

const oven = reactive(props.device)

const status = computed(() => oven.state.status === 'on')

watch(() => oven.state.status, async (newStatus : string, oldStatus : string) => {
  if (newStatus!==oldStatus) await changeOnOf(oven, newStatus)
})

const setTemperature = async () => {
  await changeOvenTemp(oven, oven.state.temperature)
}

const { devices } = useDevicesStore()
const MSG = inject<Ref<Event>>(CONSTANTS.EVENT)
watch(() => MSG?.value, async (newMSG) => {
    if (newMSG && newMSG.deviceId === oven.id)
        ({...oven.state} = {...(devices.items.get(oven.id) as Oven)?.state} || {...oven.state})
})
</script>
<template>
    <FrameCard :id="oven.id" :name="oven.name" icon="mdi-toaster-oven">
        <VContainer>
            <VRow class="flex-row justify-center mb-2">
                <PowerButton :power="status" @click="() => {toggleOven(oven)}" :size="SizesEnum.Large"/>
            </VRow>
            <VRow>
                <CardSlider v-model:value="oven.state.temperature" :min="90" :max="230" icon="mdi-thermometer-low"
                @updateSlider="setTemperature"/>
            </VRow>
        </VContainer>
    </FrameCard>
</template>

<style scoped>

</style>