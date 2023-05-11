import { Api } from '@/api/api'
import type { Routine } from '@/interfaces/routine.interface'
import { useRoutinesStore } from "@/stores/routine.store";
import type {Action} from "@/interfaces/action.interface";
import {RoutineCreationDTO} from "@/dtos/routineCreation.dto";

export class RoutinesApi{
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

    static async executeRutine(id : String, params? : String) : Promise<string>{
        const res = await Api.put(`/routines/${id}/execute`, params)
        const { result } = await res.json();
        return result;
    }
}

