<script setup lang="ts">

import ModeToggle from "@/components/custom-inputs/ModeToggle.vue";
import {computed, type PropType, reactive, ref} from "vue";
import {type Alarm, alarmIcons, alarmType, changeSecurityCode, changeStatusAlarm} from "@/interfaces/models/alarm";
import {useToast} from "vue-toast-notification";

const props = defineProps({
    device: {
        type: Object as PropType<Alarm>,
        required: true
    }
});

const $toast = useToast()

const changingCode = ref(false)
const alarm = reactive(props.device)
const code = ref()
const oldCode = ref()
const newCode = ref()
const valid = ref(false)
const manualError = ref(false)

const toggle = computed(() => Object.values(alarmType).indexOf(alarm.state.status))

const updateMode = async (index: number) => {
    const newState = Object.values(alarmType)[index]
    const success = await changeStatusAlarm(alarm, newState, code.value)
    if (success) {
        manualError.value = false;
        alarm.state.status = newState
    } else {
        manualError.value = true;
        $toast.error('El código ingresado es incorrecto', {position: 'top-right'})
    }
}

const clear = () => {
    oldCode.value = ''
    newCode.value = ''
    code.value = ''
    changingCode.value = false
}

const done = async () => {
    const result = await changeSecurityCode(alarm, oldCode.value, newCode.value)
    if (result) {
        $toast.success('Código actualizado', {position: 'top-right'})
        clear()
    } else {
      $toast.error('El código anterior es incorrecto', {position: 'top-right'})
    }
}

const rules = [
    (v: string) => !!v || 'El código es requerido',
    (v: string) => (v && v.length === 4) || 'El código debe tener 4 dígitos',
    (v: string) => (v && !isNaN(Number(v))) || 'El código debe ser numérico'
];

</script>

<template>
    <VCard class="pa-3" color="primary" rounded="xl">
        <VContainer class="container" >
            <VCol class="d-flex flex-column" v-if="!changingCode">
                    <VRow class="flex-row justify-center mb-2">
                        <ModeToggle :icons="alarmIcons" :toggle="toggle" @updateToggle="updateMode"/>
                    </VRow>
                    <VRow class="-center pa-5 mb-1">
                        <VTextField v-model="code"
                                    :error="manualError"
                                    label="Código"
                                    placeholder="1234"
                                    type="password"
                                    hide-details="auto"
                                    :rules="rules"
                                    bg-color="surface"/>
                    </VRow>
                    <VRow justify="center">
                        <VBtn @click="changingCode = true" color="secondary">Ingresar nuevo código</VBtn>
                    </VRow>
            </VCol>
            <VCol class="d-flex flex-column" v-if="changingCode">
                <VForm v-model="valid">
                    <VRow class="-center pa-5 mb-1">
                        <VTextField v-model="oldCode"
                                    class="required"
                                    label="Código anterior"
                                    placeholder="1234"
                                    type="password"
                                    hide-details="auto"
                                    :rules="rules"
                                    bg-color="surface"/>
                    </VRow>
                    <VRow class="-center pa-5 mb-1">
                        <VTextField v-model="newCode"
                                    class="required"
                                    label="Nuevo código"
                                    placeholder="1234"
                                    type="password"
                                    hide-details="auto"
                                    :rules="rules"
                                    bg-color="surface"/>
                    </VRow>
                    <VRow class="button-panel">
                        <VBtn @click="clear" color="secondary">Volver</VBtn>
                        <VBtn @click="done" color="secondary" :disabled="!valid">Actualizar</VBtn>
                    </VRow>
                </VForm>
            </VCol>
        </VContainer>
    </VCard>

</template>

<style scoped>
.container {
    display: flex;
    flex-direction: column;
    height: 100%;
}
.button-panel {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
}
</style>