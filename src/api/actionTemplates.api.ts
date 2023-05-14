import { Api } from '@/api/api'
import { useActionsStore} from "@/stores/actions.store";
import type {ActionTemplate} from "@/interfaces/actionTemplate.interface";
import {deviceTypes} from "@/utils/constants";
import { useToast } from 'vue-toast-notification';
import { displayErrorMsg } from '@/utils/utils';

export class ActionTemplatesApi {
    private static $toast = useToast();

    static async reloadActionTypes() : Promise<void> {
        const { loadActionType, clearActionTypes } = useActionsStore();
        clearActionTypes();

        for(const deviceTypeId of Object.keys(deviceTypes)){
            const res = await Api.get(`/devicetypes/${deviceTypeId}`);
            const { result, error } = await res.json();
            if (!res.ok) displayErrorMsg(ActionTemplatesApi.$toast, "Error al obtener las acciones disponibles", error?.code);
            const actions = result.actions as ActionTemplate[]
            actions.forEach((action: ActionTemplate) => loadActionType(deviceTypeId, action));
        }
    }
}