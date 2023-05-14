<script setup lang="ts">

import {computed, type PropType, reactive, ref, watch} from "vue";
import {useDevicesStore} from "@/stores/device.store";
import type {Device} from "@/interfaces/device.interface";
import {useActionsStore} from "@/stores/actions.store";
import {deviceTypes} from "@/utils/constants";
import type {ActionTemplate} from "@/interfaces/actionTemplate.interface";
import type {Parameter} from "@/interfaces/actionParam.interface";
import type {Action} from "@/interfaces/action.interface";
import ParameterInput from "@/components/custom-inputs/ParameterInput.vue";
import {requiredRule} from "@/utils/rules";

const props = defineProps({
  action : {
    type : Object as PropType<Action>
  },
  valid : {
    type : Boolean
  },
  editMode : {
      type : Boolean,
      default : false
  }
})
const emits = defineEmits(["update:action", "delete:action", "update:valid"])
const showParameters = ref(true)
const action = reactive<Partial<Action>>(Object.assign({},props.action))
if(!action.params) {
    action.params = []
}

const validAction = ref(props.valid)
watch(validAction, (newValidAction) => { emits("update:valid", newValidAction) })

const requestActionUpdate = async () => {
    await form.value.validate()
    if(props.editMode && validAction.value) {
        emits("update:action", action as Action)
    }
}

const { devices } = useDevicesStore();
const deviceList= computed<Device[]>(
    () => Array.from(devices.items.values())
)

const { actionTemplates, getActionTemplateByName } = useActionsStore();
const actionTemplateList = ref<ActionTemplate[]>()
const actionTemplate = ref<ActionTemplate>()
const paramList = reactive<{ value : Parameter[]}>({value:[]})
const form = ref(null)

if (action.device){
    actionTemplateList.value = actionTemplates.items.get(action.device.type.id) || []
    if(action.actionName) {
        actionTemplate.value = getActionTemplateByName(action.device.type.id, action.actionName)
        actionTemplate.value.params.forEach(param => {
            paramList.value.push(param)
        })
    }
}
if (props.editMode) {
    watch(() => action.device, async (newDevice, oldDevice) => {
        if (newDevice) {
            actionTemplateList.value = actionTemplates.items.get(newDevice.type.id) || []
        }
        if (!newDevice || newDevice.type.id !== oldDevice?.type.id) {
            actionTemplate.value = undefined
            paramList.value = []
            if (oldDevice) form.value.validate()
        }
        await requestActionUpdate()
    })

    watch(actionTemplate, async (newActionTemplate) => {
        paramList.value = []
        if (newActionTemplate) {
            action.actionName = newActionTemplate.name
            newActionTemplate.params.forEach(param => {
                paramList.value.push(param)
            })
            action.params = Array(paramList.value.length).fill(undefined)
            await requestActionUpdate()
        }
    })
}
const updateParameter = async (value : any, index : number) => {
    if(action.params) action.params[index] = value
    await requestActionUpdate()
}
const stateIcon = computed(() => validAction.value ? "mdi-check-circle" : "mdi-alert-circle")
const stateColor = computed(() => validAction.value ? "success" : "error")
const deviceIcon = computed(() => action.device ? deviceTypes[action.device.type.id].icon : "mdi-alert-circle-outline")

defineExpose({
    form
})
</script>

<template>
  <VCard class="pa-5" color="tertiary" rounded="lg">
      <VForm v-model="validAction" ref="form" :disabled="!editMode">
        <VRow class="align-content-center">
          <VCol cols="6">
            <VAutocomplete v-model="action.device" :prepend-inner-icon="deviceIcon" class="required"
                  variant="solo-filled" label="Dispositivo" no-data-text="No hay dispositivos" hide-details="auto"
                  :items="deviceList" item-title="name" return-object :rules="[requiredRule]"
            />
          </VCol>
          <VCol cols="3">
              <VAutocomplete v-model="actionTemplate" :disabled="!action.device" variant="solo-filled" label="Acción" hide-details="auto" class="required"
                      :items="actionTemplateList" :item-title="item => `${$t(item.name as string)}`" return-object  :rules="[requiredRule]"
              />
          </VCol>
          <VCol cols="1" class="align-center d-flex" v-if="editMode">
              <VIcon :icon="stateIcon" class="state-icon align-content-center" size="x-large" :color="stateColor"/>
          </VCol>
          <VCol class="d-flex" v-if="editMode">
              <VSpacer/>
              <VBtn icon="mdi-delete" color="lightSurface" class="delete-button ml-5" @click="$emit('delete:action')"/>
          </VCol>
        </VRow>
        <VExpandTransition>
          <div v-if="actionTemplate">
              <VExpandTransition>
                  <div class="pt-4" v-show="showParameters">
                  <span v-if="paramList.value.length">Parámetros</span>
                  <VList v-if="paramList.value.length" bg-color="tertiary" class="d-flex flex-wrap">
                      <ParameterInput class="param-input pr-4"
                          v-for="(param, index) in paramList.value" :key="param.name" :param="param" :value="action.params[index]"
                          @update:value="updateParameter($event, index)"
                      />
                  </VList>
                  <span v-else> Esta acción no tiene parámetros</span>
                </div>
              </VExpandTransition>
          </div>
        </VExpandTransition>
        <VRow class="justify-center align-end">
          <VIcon @click="showParameters = !showParameters" :icon='showParameters ? "mdi-chevron-up" : "mdi-chevron-down"' v-if="actionTemplate" />
        </VRow>
      </VForm>
  </VCard>

</template>

<style scoped>
.param-input {
    max-width: 20vw;
}
.v-col{
    margin: 0 !important;
}
</style>