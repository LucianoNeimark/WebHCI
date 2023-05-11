<script setup lang="ts">

import {computed, onMounted, reactive, ref} from "vue";
import {ActionTemplatesApi} from "@/api/actionTemplates.api";
import {DevicesApi} from "@/api/devices.api";
import ActionCard from "@/components/cards/ActionCard.vue";
import type {Action} from "@/interfaces/action.interface";
import {RoutinesApi} from "@/api/routines.api";


const actions = reactive<Array<Action | undefined>>([undefined])
const name = ref("")
const addAction = () => {
  actions.push(undefined)
}

const routineIsValid = computed<Boolean>(() : Boolean => {
    return !!(name.value) && actions.length > 0 && !actions.some(action => action === undefined)
})
const saveChanges = async () => {
    if(routineIsValid.value)
      await RoutinesApi.addRoutine(name.value, actions as Action[])
}
const onActionupdate = (action : Action, index : number) => {
  actions[index] = Object.assign({}, {
    device : action.device,
    actionName : action.actionName,
    params : Array.from(action.params)
  }) as Action
}

onMounted(async () => {
  await DevicesApi.reloadDevices()
  await ActionTemplatesApi.reloadActionTypes()
})
</script>

<template>
  <VContainer class="mx-0">
    <VRow class="align-start ma-3">
      <VTextField class="name-input" v-model="name" autofocus placeholder="Nueva Rutina" label="nombre" variant="solo-filled"></VTextField>
      <VSpacer/>
      <VBtn class="save-changes" rounded="xl" @click="saveChanges" :disabled="!routineIsValid">
          <VIcon icon="mdi-content-save" class="mx-2"/>
          Guardar Cambios
      </VBtn>
    </VRow>
    <ActionCard class="ma-2"
      v-for="(action, index) in actions" :key="index" :action="action" @update:action="onActionupdate($event, index)"
    />

    <VContainer class="d-flex justify-center align-end">
      <VBtn rounded="xl" class="add-action-btn" @click="addAction">Agregar Acción</VBtn>
    </VContainer>
  </VContainer>
</template>


<style scoped>
.name-input{
  width: auto !important;
}
.save-changes{
  height: 3vw !important;
}
.add-action-btn{
  min-height: 4vw !important;
}
</style>