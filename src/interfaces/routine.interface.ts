import type { Action } from "@/interfaces/action.interface";

export interface Routine {
    id: string;
    name: string;
    actions: Action[];
    meta?: any;
}
