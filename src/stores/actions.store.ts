import { reactive } from 'vue'
import { defineStore } from 'pinia'
import type {ActionTemplate} from "@/interfaces/actionTemplate.interface";

export const useActionsStore = defineStore('actions', () => {
    const actionTemplates = reactive<{items: Map<string, ActionTemplate[]>}>({
        items: new Map<string, ActionTemplate[]>()
    })
    const loadActionType = (deviceTypeId : string, actionType : ActionTemplate) => {
        const actionTypeList = actionTemplates.items.get(deviceTypeId) || []
        if(!actionTemplates.items.has(deviceTypeId)){
            actionTemplates.items.set(deviceTypeId, actionTypeList)
        }
        actionTypeList.push(actionType)
    }

    const clearActionTypes = () => {
        actionTemplates.items.clear()
    }

    return { actionTemplates, loadActionType, clearActionTypes}
})

