<script setup lang="ts">

import FrameCard from "@/components/cards/FrameCard.vue";
import ModeToggle from "@/components/custom-inputs/ModeToggle.vue";
import {computed, type PropType, reactive, ref} from "vue";
import type {Alarm} from "@/interfaces/models/alarm";
import {alarmIcons, alarmType, changeStatusAlarm} from "@/interfaces/models/alarm";
import {useToast} from "vue-toast-notification";

const props = defineProps({
    device: {
        type: Object as PropType<Alarm>,
        required: true
    }
});

const $toast = useToast()

const alarm = reactive(props.device)
const code = ref('')

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

const rules = [
    (v: string) => !!v || 'El código es requerido',
    (v: string) => (v && v.length === 4) || 'El código debe tener 4 dígitos',
    (v: string) => (v && !isNaN(Number(v))) || 'El código debe ser numérico'
];

</script>

<template>
  <FrameCard :id="alarm.id" :name="alarm.name" icon="mdi-alarm-light-outline">
    <VContainer class="container">
        <VCol>
            <VRow class="flex-row justify-center mb-2">
                <ModeToggle :icons="alarmIcons" :toggle="toggle" @updateToggle="updateMode"/>
            </VRow>
            <VRow class="flex-row justify-center mt-5 mb-1">
                  <VTextField v-model="code"
                              label="Código"
                              placeholder="1234"
                              type="password"
                              bg-color="surface"
                              :rules="rules"
                              outlined/>
            </VRow>
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