<script setup lang="ts">

import FrameCard from "@/components/cards/FrameCard.vue";
import ModeToggle from "@/components/custom-inputs/ModeToggle.vue";
import {computed, inject, type PropType, reactive, type Ref, ref, watch} from "vue";
import type {Alarm} from "@/interfaces/models/alarm";
import {alarmIcons, alarmType, changeStatusAlarm} from "@/interfaces/models/alarm";
import {useToast} from "vue-toast-notification";
import {useDevicesStore} from "@/stores/device.store";
import type {Event} from "@/interfaces/event.interface";
import {CONSTANTS} from "@/utils/constants";
import PasswordInput from "@/components/custom-inputs/PasswordInput.vue";

const props = defineProps({
    device: {
        type: Object as PropType<Alarm>,
        required: true
    }
});

const $toast = useToast()

const alarm = reactive(props.device)
const code = ref("")

const toggle = computed(() => Object.values(alarmType).indexOf(alarm.state.status))

const updateMode = async (index: number) => {
    const newState = Object.values(alarmType)[index]
    const success = await changeStatusAlarm(alarm, newState, code.value)
    if (success) {
        alarm.state.status = newState
    } else {
        $toast.error('El código ingresado es incorrecto', {position: 'top-right'})
    }
}


const { devices } = useDevicesStore()
const MSG = inject<Ref<Event>>(CONSTANTS.EVENT)
watch(() => MSG?.value, async (newMSG) => {
    if (newMSG && newMSG.deviceId === alarm.id)
        ({...alarm.state} = {...(devices.items.get(alarm.id) as Alarm)?.state} || {...alarm.state})
})
</script>

<template>
  <FrameCard :id="alarm.id" :name="alarm.name" icon="mdi-alarm-light-outline">
    <VContainer class="container">
        <VCol>
            <VForm>
                <VRow class="flex-row justify-center mb-1">
                    <PasswordInput v-model:password="code"/>
                </VRow>
                <VRow class="flex-row justify-center mb-2">
                    <ModeToggle :icons="alarmIcons" :toggle="toggle" @updateToggle="updateMode"/>
                </VRow>
            </VForm>
        </VCol>
    </VContainer>
  </FrameCard>
</template>

<style scoped>
.container {
    display: flex;
    width: 100%;
    height: 100%;
    align-items: center;
}
</style>