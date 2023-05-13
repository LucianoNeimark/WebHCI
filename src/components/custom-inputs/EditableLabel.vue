<script setup lang="ts">

import {ref} from "vue";
import { validNameRules } from "@/utils/rules";

const props = defineProps({
    icon: String,
    value: String
})

const currentValue = ref(props.value);
const isEditing = ref(false);

const valid = ref(true);
const emit = defineEmits(['update:value'])

const save = () => {
    if(valid.value){
        if (currentValue.value === props.value){
            emit('update:value', props.value)
        } else {
            isEditing.value = false
            emit('update:value', currentValue.value)
        }
    }
};

const cancel = () => {
    isEditing.value = false
    currentValue.value = props.value
};

</script>

<template>
    <div class="editable-row">
        <VIcon size="x-large" class="mr-2 icon" v-if="icon">{{icon}}</VIcon>
        <h1 v-if="!isEditing" @click="isEditing = true" class="title">
            {{ props.value }}
            <VIcon v-if="!isEditing" class="pencil">mdi-pencil</VIcon>
        </h1>
        <VForm v-model="valid">
            <VTextField v-if="isEditing"
                v-model="currentValue"
                append-inner-icon="mdi-check" @click:append-inner="save" :rules="validNameRules"
                append-icon="mdi-close" @click:append="cancel" class="value-input"></VTextField>
        </VForm>
    </div>
</template>

<style scoped>
.icon {
    align-self: center;
}

.value-input {
    width: 20vw;
}
.pencil {
    cursor: pointer;
    font-size: 1.5rem !important;
}
.editable-row {
    display: flex;
    flex-direction: row;
}
.title {
    border-bottom: 1px solid;
}

</style>