<script setup lang="ts">

import {computed, type PropType, reactive, ref, watch} from "vue";
import {useDevicesStore} from "@/stores/device.store";
import type {Device} from "@/interfaces/device.interface";
import {useActionsStore} from "@/stores/actions.store";
import type {ActionTemplate} from "@/interfaces/actionTemplate.interface";
import type {Parameter} from "@/interfaces/actionParam.interface";
import type {Action} from "@/interfaces/action.interface";

const props = defineProps({
  action : {
    type : Object as PropType<Action>
  }
})
const emits = defineEmits(['update:action'])
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

</script>

<template>
  <VCard class="pa-5" color="tertiary" rounded="xl">
      <VRow class="pt-5 align-content-center">
        <VCol cols="6" class="py-0">
          <VAutocomplete
                v-model="action.device"
                variant="solo-filled" label="Dispositivo" no-data-text="No hay dispositivos"
                :items="deviceList" item-title="name" return-object
          />
        </VCol>
        <VCol cols="3" class="py-0">
            <VAutocomplete
                    v-model="actionTemplate" :disabled="!action.device" variant="solo-filled" label="Acción"
                    :items="actionTemplateList" item-title="name" return-object
            />
        </VCol>
      </VRow>
      <VExpandTransition>
        <div v-if="actionTemplate">
            <VExpandTransition>
              <div v-if="showParameters">
                <span v-if="paramList.value.length">Parámetros</span>
                <VList v-if="paramList.value.length" bg-color="tertiary" class="py-0">
                    <VTextField v-for="(param, index) in paramList.value" :key="param.name" :label="param.name" v-model="action.params[index]"
                                outlined dense bg-color="surface" class="param-input" @update:model-value="requestActionUpdate()"/>
                </VList>
                <span v-else> Esta acción no tiene parámetros</span>
              </div>
            </VExpandTransition>
        </div>
      </VExpandTransition>
      <VRow class="justify-center">
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