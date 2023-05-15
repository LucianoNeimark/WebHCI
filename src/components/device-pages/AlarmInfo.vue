<script setup lang="ts">

import ModeToggle from "@/components/custom-inputs/ModeToggle.vue";
import {computed, type PropType, reactive, ref} from "vue";
import {type Alarm, alarmIcons, alarmType, changeSecurityCode, changeStatusAlarm} from "@/interfaces/models/alarm";
import {useToast} from "vue-toast-notification";
import PasswordInput from "@/components/custom-inputs/PasswordInput.vue";

const props = defineProps({
    device: {
        type: Object as PropType<Alarm>,
        required: true
    }
});

const $toast = useToast()

const changingCode = ref(false)
const alarm = reactive(props.device)
const code = ref("")
const oldCode = ref("")
const newCode = ref("")
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
    manualError.value = false
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
</script>

<template>
    <VCard class="pa-3" color="primary" rounded="xl">
        <VContainer class="container" >
            <VCol class="d-flex flex-column" v-if="!changingCode">
                <VForm>
                    <VRow class="-center pa-5">
                        <PasswordInput v-model:password="code" :error="manualError"/>
                    </VRow>
                    <VRow class="flex-row justify-center mb-6">
                        <ModeToggle :icons="alarmIcons" :toggle="toggle" @updateToggle="updateMode"/>
                    </VRow>
                    <VRow justify="center">
                        <VBtn @click="changingCode = true" color="secondary">Ingresar nuevo código</VBtn>
                    </VRow>
                </VForm>
            </VCol>
            <VCol class="d-flex flex-column" v-if="changingCode">
                <VForm v-model="valid">
                    <VRow class="-center pa-5 mb-1">
                        <PasswordInput v-model:password="oldCode" label="Código anterior"/>
                    </VRow>
                    <VRow class="-center pa-5 mb-1">
                        <PasswordInput v-model:password="newCode" label="Nuevo código"/>
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