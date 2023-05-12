<script setup lang="ts">
import FrameCard from "@/components/cards/FrameCard.vue"
import {computed, type PropType, reactive, watch, inject, type Ref} from "vue";
import PowerButton from "@/components/custom-inputs/PowerButton.vue";
import {SizesEnum} from "@/enums/enums";
import { toggleLamp, type Lamp, changeLampStatus } from "@/interfaces/models/lamp";
import { CONSTANTS } from "@/utils/constants";
import type { Event } from "@/interfaces/event.interface";
import {useDevicesStore} from "@/stores/device.store";
const props = defineProps({
    device: {
        type: Object as PropType<Lamp>,
        required: true
    } 
});
const lamp = reactive(props.device)

const power = computed(() => lamp.state.status === 'on')

const { devices } = useDevicesStore()

watch(() => lamp.state.status, async (newStatus: string, oldStatus: string) => {
    if (newStatus !== oldStatus) await changeLampStatus(lamp, newStatus)
})

const MSG = inject<Ref<Event>>(CONSTANTS.EVENT)
watch(() => MSG?.value, async (newMSG) => {
    if (newMSG && newMSG.deviceId === lamp.id)
        ({...lamp.state} = {...(devices.items.get(lamp.id) as Lamp)?.state} || {...lamp.state})
})

</script>

<template>
    <FrameCard :id="device.id" :name="device.name" icon="mdi-lightbulb-outline">
        <VContainer>
            <VRow class="flex-row justify-center mb-1">
                <PowerButton :power="power" @click="() => toggleLamp(lamp as Lamp)" :size="SizesEnum.XLarge"/>
            </VRow>
        </VContainer>
    </FrameCard>
</template>

<style scoped>

</style>