import { defineStore } from 'pinia'
import { reactive } from 'vue'
import type { Routine } from "@/interfaces/routine.interface";

export const useRoutinesStore = defineStore('routines', () => {
    const routines = reactive<{items: Map<string, Routine>}>({
        items: new Map<string, Routine>()
    })
    const currentRoutine = reactive<{value: Routine}>({value: {} as Routine})

    const setCurrentRoutine = (routineId: string) => {
        currentRoutine.value = routines.items.get(routineId) as Routine
    }
    const loadRoutine = (routine : Routine) => {
        routines.items.set(routine.id, routine)
    }

    const getTopRoutines = (count: number) : Routine[] => {
        return [...routines.items.values()].sort((a, b) => b.meta.qtyUses - a.meta.qtyUses).slice(0, count);
    }

    const removeRoutine = (routineId: string) => {
        routines.items.delete(routineId)
    }
    return { routines, loadRoutine, getTopRoutines, setCurrentRoutine, currentRoutine, removeRoutine}
})