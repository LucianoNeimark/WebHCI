import { Api } from '@/api/api'
import type { Routine } from '@/interfaces/routine.interface'
import { useRoutinesStore } from "@/stores/routine.store";
import type {Action} from "@/interfaces/action.interface";
import {RoutineCreationDTO} from "@/dtos/routineCreation.dto";
import {useToast} from "vue-toast-notification";
import {RoutineUpdateDTO} from "@/dtos/routineUpdateDTO";
import { displayErrorMsg } from '@/utils/utils';

export class RoutinesApi{
    private static $toast = useToast();
    static async addRoutine(name : string, actions : Action[]){
        const routine = new RoutineCreationDTO(name, actions)
        const res = await Api.post("/routines", routine)
        const { result, error } = await res.json()
        if (!res.ok) displayErrorMsg(RoutinesApi.$toast, "Error al crear la rutina", error?.code);
        else this.$toast.success(`Rutina ${name} creada satisfactoriamente`, { position: 'top-right' });
        return result
    }

    static async reloadRoutines() : Promise<void> {
        const res = await Api.get("/routines");
        const { result, error } = await res.json();
        if (!res.ok) displayErrorMsg(RoutinesApi.$toast, "Error al crear la rutina", error?.code);
        else {
            const { loadRoutine } = useRoutinesStore();
            result.forEach((routine: Routine) => loadRoutine(routine));
        }
    }


    static async executeRoutine(id : string) : Promise<string>{
        const res = await Api.put(`/routines/${id}/execute`, {})
        const { result, error } = await res.json();
        if (!res.ok) displayErrorMsg(RoutinesApi.$toast, "Error al ejecutar la rutina", error?.code);
        else this.$toast.success(`Rutina ejecutada satisfactoriamente`, { position: 'top-right' });
        return result;
    }

    static async deleteRoutine(id : string) {
        const res = await Api.delete(`/routines/${id}`)
        const { result, error } = await res.json();
        if (!res.ok) displayErrorMsg(RoutinesApi.$toast, "Error al eliminar la rutina", error?.code);
        else{
            const { removeRoutine } = useRoutinesStore();
            removeRoutine(id);
            this.$toast.success(`Rutina eliminada satisfactoriamente`, { position: 'top-right' });
        }
        return result;
    }

    static async updateRoutine(routine : Routine){
        const res = await Api.put(`/routines/${routine.id}`, new RoutineUpdateDTO(routine))
        const { result, error } = await res.json();
        if (!res.ok) displayErrorMsg(RoutinesApi.$toast, "Error al modificar la rutina", error?.code);
        else this.$toast.success(`Nombre de rutina cambiado a ${routine.name}`, { position: 'top-right' });
        return result;
    }
}

