<script setup lang="ts">
import {reactive, watch} from "vue";
import {useRoute, useRouter} from "vue-router";
import {useRoutinesStore} from "@/stores/routine.store";
import type {Routine} from "@/interfaces/routine.interface";

import ActionCard from "@/components/cards/ActionCard.vue";
import {RoutinesApi} from "@/api/routines.api";
import {ActionTemplatesApi} from "@/api/actionTemplates.api";
import EditableLabel from "@/components/custom-inputs/EditableLabel.vue";

const route = useRoute()
const router = useRouter()
const {setCurrentRoutine, currentRoutine} = useRoutinesStore()

const routine = reactive({
    value: {} as Routine
})
await RoutinesApi.reloadRoutines()
await ActionTemplatesApi.reloadActionTypes()
setCurrentRoutine(<string> route.params.id)
routine.value = currentRoutine.value


watch(() => routine.value.name, async () => {
    if (routine.value?.name) await RoutinesApi.updateRoutine(routine.value)
})

const executeRoutine = async () => {
    await RoutinesApi.executeRoutine(routine.value.id)
}

const deleteRoutine = async () => {
    await RoutinesApi.deleteRoutine(routine.value.id)
    await router.push('/routines')
}

</script>

<template>
    <VContainer class="mx-0">
        <VRow class="align-start ma-3 d-flex">
            <EditableLabel v-model:value="routine.value.name"/>
            <VBtn icon="mdi-delete" class="delete-button ml-5" @click="deleteRoutine"/>
            <VSpacer/>
            <VBtn class="add-button" rounded="xl" @click="executeRoutine" color="success">
                <VIcon icon="mdi-play" class="mx-2"/>
                <span class="mx-2">Ejecutar Rutina</span>
            </VBtn>
        </VRow>
        <TransitionGroup name="action-card-list" tag="div">
            <ActionCard class="ma-2"
                v-for="action in routine.value.actions" :action="action" :key="action.actionName"
            />
        </TransitionGroup>
    </VContainer>
</template>


<style scoped>

</style>