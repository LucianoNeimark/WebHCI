<script setup lang="ts">

import {computed, onMounted, reactive, ref} from "vue";
import {ActionTemplatesApi} from "@/api/actionTemplates.api";
import {DevicesApi} from "@/api/devices.api";
import ActionCard from "@/components/cards/ActionCard.vue";
import type {Action} from "@/interfaces/action.interface";
import {RoutinesApi} from "@/api/routines.api";
import {validNameRules} from "@/utils/rules";

const valid = ref(false)
const name = ref("")
const actionId = ref(1)
const actions = reactive<{ id : Number, value : Action | undefined}[]>([{id : actionId.value, value : undefined}])
const addAction = () => {
    actionId.value++
    actions.push({id : actionId.value, value : undefined})
}

const routineIsValid = computed<Boolean>(() : Boolean => {
    return !!(name.value) && actions.length > 0 && !actions.some(action => action.value === undefined)
})

const saveChangesColor = computed(() => {
    return valid.value? "secondary" : "gray"
})
const saveChanges = async () => {
    if(routineIsValid.value) {
        const actionList = actions.map(action => action.value) as Action[]
        await RoutinesApi.addRoutine(name.value, actionList)
    }
}
const onActionupdate = (action : Action, index : number) => {
  actions[index].value = Object.assign({}, {
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
    <VForm v-model="valid">
      <VRow class="align-start ma-3 d-flex">
        <VTextField class="name-input" v-model="name" autofocus placeholder="Nueva Rutina" label="nombre" variant="solo-filled"
                    :rules="validNameRules"
        />
        <VSpacer/>
        <VBtn class="save-changes" rounded="xl" @click="saveChanges" :disabled="!valid" :color="saveChangesColor">
            <VIcon icon="mdi-plus" class="mx-2"/>
            <span class="mx-2">Agregar Rutina</span>
        </VBtn>
      </VRow>
      <TransitionGroup name="action-card-list" tag="div">
        <ActionCard class="ma-2"
          v-for="({id, value}, index) in actions" :key="id" :action="value" @update:action="onActionupdate($event, index)" @delete:action="actions.splice(index, 1)"
        />
      </TransitionGroup>
      <VContainer class="d-flex justify-center align-end">
        <VBtn rounded="xl" class="add-action-btn" @click="addAction">Agregar Acción</VBtn>
      </VContainer>
    </VForm>
  </VContainer>
</template>


<style scoped>
.name-input{
  width: 10vw !important;
}
.save-changes{
  height: 3vw !important;
}
.add-action-btn{
  min-height: 3vw !important;
}
.action-card-list-enter-active,
.action-card-list-leave-active {
    transition: all 0.75s ease;
}
.action-card-list-enter-from{
    opacity: 0;
    transform: translateY(3vw);
}
.action-card-list-leave-to {
    opacity: 0;
    transform: translateX(10vw);
}
</style>