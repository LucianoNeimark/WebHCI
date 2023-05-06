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

    static async getRoutines() : Promise<Routine[]> {
        const res = await Api.get("/routines");
        const { result } = await res.json();
        const { loadRoutine } = useRoutinesStore();
        result.forEach((routine: Routine) => loadRoutine(routine));
        return result;
    }

    static async getTopRoutines(count: number) : Promise<Routine[]> {
        const routineList = await RoutinesApi.getRoutines();
        return routineList.sort((a, b) => b.meta.qtyUses - a.meta.qtyUses).slice(0, count);
    }
}

