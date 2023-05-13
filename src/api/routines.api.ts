import { Api } from '@/api/api'
import type { Routine } from '@/interfaces/routine.interface'
import { useRoutinesStore } from "@/stores/routine.store";
import type {Action} from "@/interfaces/action.interface";
import {RoutineCreationDTO} from "@/dtos/routineCreation.dto";
import {useToast} from "vue-toast-notification";
import {RoutineUpdateDTO} from "@/dtos/routineUpdateDTO";

export class RoutinesApi{
    private static $toast = useToast();
    static async addRoutine(name : string, actions : Action[]){
        const routine = new RoutineCreationDTO(name, actions)
        const res = await Api.post("/routines", routine)
        const { result } = await res.json()
        return result
    }

    static async reloadRoutines() : Promise<void> {
        const res = await Api.get("/routines");
        const { result } = await res.json();
        const { loadRoutine } = useRoutinesStore();
        result.forEach((routine: Routine) => loadRoutine(routine));
    }


    static async executeRoutine(id : string) : Promise<string>{
        const res = await Api.put(`/routines/${id}/execute`, {})
        const { result } = await res.json();
        return result;
    }

    static async deleteRoutine(id : string) {
        const res = await Api.delete(`/routines/${id}`)
        if (!res.ok) this.$toast.error("Error al eliminar la rutina", { position: 'top-right' });
        else{
            const { removeRoutine } = useRoutinesStore();
            removeRoutine(id);
        }
        const { result } = await res.json();
        return result;
    }

    static async updateRoutine(routine : Routine){
        const res = await Api.put(`/routines/${routine.id}`, new RoutineUpdateDTO(routine))
        if (!res.ok) this.$toast.error("Error al modificar la rutina", { position: 'top-right' });
        const { result } = await res.json();
        return result;
    }
}

