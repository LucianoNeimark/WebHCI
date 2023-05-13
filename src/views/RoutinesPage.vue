
<script setup lang="ts">
import type { Routine } from '@/interfaces/routine.interface';
import {onMounted, reactive, ref} from 'vue'
import RoutineCard from '@/components/cards/RoutineCard.vue';
import { useRoutinesStore } from '../stores/routine.store';
import { RoutinesApi } from '../api/routines.api';

    const routinesList = reactive<{routines: Routine[]}>({
        routines: []
    })

    const { routines } = useRoutinesStore()

    onMounted(async () => {
        await RoutinesApi.reloadRoutines()
        routinesList.routines = Array.from(routines.items.values())
    })
</script>

<template>
    <VRow class="my-4 ml-6">
        <VBtn class="add-button" rounded="xl" to="/routines/create" color="secondary">
            <VIcon icon="mdi-plus" class="mx-2"/>
            <span class="mx-2">Agregar Rutina</span>
        </VBtn>
    </VRow>
    <VRow class="ma-2 ">
        <RoutineCard v-for="routine in routinesList.routines" :key="routine.id" :routine="routine" class="pa-3" />
    </VRow> 
</template>



<style scoped>

</style>