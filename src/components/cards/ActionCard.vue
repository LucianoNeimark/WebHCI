<script setup lang="ts">

import {computed, type PropType, reactive, ref, watch} from "vue";
import {useDevicesStore} from "@/stores/device.store";
import type {Device} from "@/interfaces/device.interface";
import {useActionsStore} from "@/stores/actions.store";
import type {ActionTemplate} from "@/interfaces/actionTemplate.interface";
import type {Parameter} from "@/interfaces/actionParam.interface";
import type {Action} from "@/interfaces/action.interface";
import ParameterInput from "@/components/custom-inputs/ParameterInput.vue";
import {useDeviceTypesStore} from "@/stores/deviceTypes.store";

const props = defineProps({
  action : {
    type : Object as PropType<Action>
  }
})
const emits = defineEmits(["update:action", "delete:action"])
const showParameters = ref(true)
const action = reactive<Partial<Action>>(Object.assign({},props.action))
action.params = []
const actionValid = ()  => {
    return action.device && action.actionName && action.params && !action.params.some(param => param === null || param === undefined || param === "")
}
const requestActionUpdate = () => {
    if(actionValid()){
        emits('update:action', action as Action)
    }
}

const { devices } = useDevicesStore();
const deviceList= computed<Device[]>(
    () => Array.from(devices.items.values())
)

const { actionTemplates } = useActionsStore();
const actionTemplateList = ref<ActionTemplate[]>([])

watch(() => action.device, async (newDevice) => {
    if (newDevice) {
        actionTemplateList.value = actionTemplates.items.get(newDevice.type.id) || []
    }
    actionTemplate.value = undefined
    paramList.value = []
})

const actionTemplate = ref<ActionTemplate>()
const paramList = reactive<{ value : Parameter[]}>({value:[]})
watch(actionTemplate, async (newActionTemplate) => {
    paramList.value = []
    if (newActionTemplate) {
        action.actionName = newActionTemplate.name
        newActionTemplate.params.forEach(param => {
            paramList.value.push(param)
        })
        action.params = Array(paramList.value.length).fill(undefined)
        requestActionUpdate()
    }
})
const updateParameter = (value : any, index : number) => {
    if(action.params) action.params[index] = value
    requestActionUpdate()
}
const stateIcon = computed(() => {
    if(actionValid()){
        return "mdi-check-circle-outline"
    }else{
        return "mdi-alert-circle-outline"
    }
})
const { deviceTypes } = useDeviceTypesStore();
const deviceIcon = computed(() => {
    if(action.device){
        return deviceTypes[action.device.type.id].icon
    }else{
        return ""
    }
})

</script>

<template>
  <VCard class="pa-5" color="tertiary" rounded="lg">
      <VRow class="align-content-center">
        <VCol cols="6">
          <VAutocomplete v-model="action.device" :prepend-inner-icon="deviceIcon"
                variant="solo-filled" label="Dispositivo" no-data-text="No hay dispositivos"
                :items="deviceList" item-title="name" return-object hide-details="auto"
          />
        </VCol>
        <VCol cols="3">
            <VAutocomplete v-model="actionTemplate" :disabled="!action.device" variant="solo-filled" label="Acción"
                    :items="actionTemplateList" item-title="name" return-object hide-details="auto"
            />
        </VCol>
        <VCol cols="1" class="align-center d-flex">
            <VIcon :icon="stateIcon" class="state-icon align-content-center" size="x-large"/>
        </VCol>
        <VCol class="d-flex">
            <VSpacer/>
            <VBtn icon="mdi-delete" class="delete-button ml-5" @click="$emit('delete:action')"/>
        </VCol>
      </VRow>
      <VExpandTransition>
        <div v-if="actionTemplate">
            <VExpandTransition>
              <div class="py-4" v-if="showParameters">
                <span v-if="paramList.value.length">Parámetros</span>
                <VList v-if="paramList.value.length" bg-color="tertiary" class="d-flex flex-wrap">
                    <ParameterInput class="param-input pr-4"
                        v-for="(param, index) in paramList.value" :key="param.name" :param="param" :value="action.params[index]"
                        @update:model-value="updateParameter($event, index)"
                    />
                </VList>
                <span v-else> Esta acción no tiene parámetros</span>
              </div>
            </VExpandTransition>
        </div>
      </VExpandTransition>
      <VRow class="justify-center align-end">
        <VIcon @click="showParameters = !showParameters"
          :icon='showParameters ? "mdi-chevron-up" : "mdi-chevron-down"' v-if="actionTemplate"
        />
      </VRow>
  </VCard>

</template>

<style scoped>
.param-input {
    max-width: 20vw;
}
</style>