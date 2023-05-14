<script setup lang="ts">
import {reactive, watch, ref} from "vue";
import {useRoute, useRouter} from "vue-router";
import {useRoutinesStore} from "@/stores/routine.store";
import type {Routine} from "@/interfaces/routine.interface";

import ActionCard from "@/components/cards/ActionCard.vue";
import {RoutinesApi} from "@/api/routines.api";
import {ActionTemplatesApi} from "@/api/actionTemplates.api";
import EditableLabel from "@/components/custom-inputs/EditableLabel.vue";
import { useToast } from 'vue-toast-notification';
import ConfirmationModal from '@/components/modals/AddDeviceModal/ConfirmationModal.vue';

const route = useRoute()
const router = useRouter()
const {setCurrentRoutine, currentRoutine, routineWithSameNameExists} = useRoutinesStore()
const $toast = useToast()
const showConfirmationModal = ref(false)

const routine = reactive({
    value: {} as Routine
})
await RoutinesApi.reloadRoutines()
await ActionTemplatesApi.reloadActionTypes()
setCurrentRoutine(<string> route.params.id)
routine.value = currentRoutine.value

if (!routine.value){
    router.push('/notfound')
}


const update = async (value: string) => {
    if (routineWithSameNameExists(value)) {
        $toast.error('Ya existe una rutina con ese nombre', { position: 'top-right' })
        return;
    }
    routine.value.name = value
    await RoutinesApi.updateRoutine(routine.value)
}

const executeRoutine = async () => {
    await RoutinesApi.executeRoutine(routine.value.id)
}

const deleteRoutine = async () => {
    await RoutinesApi.deleteRoutine(routine.value.id)
    await router.push('/routines')
}

</script>

<template>
    <VContainer class="mx-0 py-1 px-6">
        <VRow class="ma-3 d-flex align-center">
            <div>
                <EditableLabel class="align-editable-label" :value="routine.value?.name" @update:value="update"/>
            </div>
            <div>
                <VBtn color="lightSurface" icon="mdi-delete" class="delete-button ml-5" @click="showConfirmationModal = true"/>
            </div>
            <div class="align-end">
                <VBtn class="add-button" rounded="xl" @click="executeRoutine" color="success">
                    <VIcon icon="mdi-play" class="mx-2"/>
                    <span class="mx-2">Ejecutar Rutina</span>
                </VBtn>
            </div>
        </VRow>
        <TransitionGroup name="action-card-list" tag="div">
            <ActionCard class="ma-2"
                v-for="action in routine.value?.actions" :action="action" :key="action.actionName"
            />
        </TransitionGroup>
    </VContainer>
    <ConfirmationModal title="¿Estás seguro? Esta opción no puede revertirse"
                       v-model:show="showConfirmationModal" @confirm="deleteRoutine"/>
</template>


<style scoped>
.align-center {
    align-items: center;
}
.align-end {
    margin-left: auto;
}
</style>