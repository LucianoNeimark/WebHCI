import { Api } from '@/api/api'
import { useActionsStore} from "@/stores/actions.store";
import { useDeviceTypesStore } from "@/stores/deviceTypes.store";
import type {ActionTemplate} from "@/interfaces/actionTemplate.interface";

export class ActionTemplatesApi {
    static async reloadActionTypes() : Promise<void> {
        const { deviceTypes } = useDeviceTypesStore()
        const { loadActionType, clearActionTypes } = useActionsStore();
        clearActionTypes();

        for(const deviceTypeId of Object.keys(deviceTypes)){
            const res = await Api.get(`/devicetypes/${deviceTypeId}`);
            const { result } = await res.json();
            const actions = result.actions as ActionTemplate[]
            actions.forEach((action: ActionTemplate) => loadActionType(deviceTypeId, action));
        }
    }
}