
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

     <VRow class="ma-2 ">
            <RoutineCard v-for="routine in routinesList.routines" :key="routine.id" :routine="routine" class="pa-3" />
     </VRow> 
</template>



<style scoped>

</style>