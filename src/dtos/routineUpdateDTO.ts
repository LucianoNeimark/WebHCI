import type {Routine} from "@/interfaces/routine.interface";

export class RoutineUpdateDTO {
    id : string
    name: string;
    actions : {
        device :{
            id: string
        },
        actionName: string,
        params: any[]
    }[]
    meta: any;

    constructor(routine : Routine) {
        this.id = routine.id
        this.name = routine.name
        this.actions = []
        routine.actions.forEach(action => {
            this.actions.push({
                device: {
                    id: action.device.id
                },
                actionName: action.actionName,
                params: action.params
            })
        })
        this.meta = {
            qtyUses: routine.meta.qtyUses
        }
    }
}