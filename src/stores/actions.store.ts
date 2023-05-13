import { reactive } from 'vue'
import { defineStore } from 'pinia'
import type {ActionTemplate} from "@/interfaces/actionTemplate.interface";

export const useActionsStore = defineStore('actions', () => {
    const actionTemplates = reactive<{items: Map<string, ActionTemplate[]>}>({
        items: new Map<string, ActionTemplate[]>()
    })

    const getActionTemplateByName = (deviceTypeId : string, actionName : string) : ActionTemplate => {
        const actionTemplatesByDevice = actionTemplates.items.get(deviceTypeId) || []
        return actionTemplatesByDevice.find((actionTemplate) => actionTemplate.name === actionName) as ActionTemplate
    }
    const loadActionType = (deviceTypeId : string, actionType : ActionTemplate) => {
        const actionTemplatesByDevice = actionTemplates.items.get(deviceTypeId) || []
        if(!actionTemplates.items.has(deviceTypeId)){
            actionTemplates.items.set(deviceTypeId, actionTemplatesByDevice)
        }
        actionTemplatesByDevice.push(actionType)
    }

    const clearActionTypes = () => {
        actionTemplates.items.clear()
    }

    return { actionTemplates, loadActionType, clearActionTypes, getActionTemplateByName}
})

