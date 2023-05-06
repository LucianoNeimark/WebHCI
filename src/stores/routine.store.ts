import { defineStore } from 'pinia'
import { reactive } from 'vue'
import type { Routine } from "@/interfaces/routine.interface";

export const useRoutinesStore = defineStore('routines', () => {
    const routines = reactive<{items: Map<string, Routine>}>({
        items: new Map<string, Routine>()
    })

    const loadRoutine = (routine : Routine) => {
        routines.items.set(routine.id, routine)
    }

    return { routines, loadRoutine }
})