import { Api } from '@/api/api'
import type { Routine } from '@/interfaces/routine.interface'
import { useRoutinesStore } from "@/stores/routine.store";

export class RoutinesApi{
    static async addRoutine(id : String, name : String, meta : String){

        const data = {
            "name": name,
            "meta": meta
        }

        await Api.post("/routines", JSON.stringify(data))
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

