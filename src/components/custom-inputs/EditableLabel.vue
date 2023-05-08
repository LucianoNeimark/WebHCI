<script setup lang="ts">

import {ref} from "vue";

const props = defineProps({
    icon: String,
    value: String
})

const editedValue = ref(props.value);
const isEditing = ref(false);

const emit = defineEmits(['update:value'])

const save = () => {
    if (!editedValue.value) {
        emit('update:value', props.value)
    } else {
        isEditing.value = false
        emit('update:value', editedValue.value)
    }
};

const cancel = () => {
    isEditing.value = false
    editedValue.value = props.value
};

const rules = [
    (v: string) => !!v || 'El campo no puede estar vacío',
    (v: string) => v.length <= 60 || 'El campo no puede tener más de 20 caracteres',
    (v: string) => v.length >= 3 || 'El campo debe tener al menos 3 caracteres',
    (v: string) => /^[a-zA-Z0-9_ ]*$/.test(v) || 'El campo solo puede tener letras, números, _ y espacios'
];

</script>

<template>
    <span class="ml-5 my-3 editable-row">
        <VIcon size="x-large" class="mr-2 icon" v-if="icon">{{icon}}</VIcon>
        <h1 v-if="!isEditing" @click="isEditing = true" class="title">
            {{ props.value }}
            <VIcon v-if="!isEditing" class="pencil">mdi-pencil</VIcon>
        </h1>
        <VForm fast-fail @submit.prevent>
            <VTextField v-if="isEditing"
                :modelValue="props.value"
                @update:modelValue="newValue => editedValue = newValue"
                append-inner-icon="mdi-check" @click:append-inner="save" :rules="rules"
                append-icon="mdi-close" @click:append="cancel" class="mt-4 value-input"></VTextField>
        </VForm>

    </span>
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