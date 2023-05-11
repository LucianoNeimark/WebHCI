import type {Action} from "@/interfaces/action.interface";

export class RoutineCreationDTO {
    name: string;
    actions : {
        device :{
            id: string
        },
        actionName: string,
        params: any[]
    }[]

    meta: any;

    constructor(name: string, actions : Action[]) {
        this.name = name
        this.actions = []
        actions.forEach(action => {
            this.actions.push({
                device: {
                    id: action.device.id
                },
                actionName: action.actionName,
                params: action.params
            })
        })
        this.meta = {
            qtyUses: 0
        }
    }
}