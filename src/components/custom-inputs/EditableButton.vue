<script setup lang="ts">
import { ref } from "vue";

const value = ref('')
const valid = ref(true);
const isEditing = ref(false);

const emit = defineEmits(['valueSet'])

const save = () => {
    if (!valid.value) return
    isEditing.value = false
    emit('valueSet', value.value)
};

const cancel = () => {
    isEditing.value = false
    value.value = ''
};

const rules = [
    (v: string) => !!v || 'El campo no puede estar vacío',
    (v: string) => v.length <= 60 || 'El campo no puede tener más de 20 caracteres',
    (v: string) => v.length >= 3 || 'El campo debe tener al menos 3 caracteres',
    (v: string) => /^[a-zA-Z0-9_ ]*$/.test(v) || 'El campo solo puede tener letras, números, _ y espacios'
];


</script>

<template>

  <span>
      <VBtn v-if="!isEditing" @click="isEditing = true" class="add-button ml-5 mt-5 mb-3"
            color="surface" rounded="xl">
          Agregar Habitacion
          <VIcon icon="mdi-plus-circle-outline"></VIcon>
      </VBtn>
      <VForm class="ml-7 mt-3" v-model="valid">
          <VTextField v-if="isEditing" v-model="value"
                append-inner-icon="mdi-check" @click:append-inner="save" :rules="rules"
                append-icon="mdi-close" @click:append="cancel" class="mt-8 value-input">
          </VTextField>
      </VForm>
  </span>

</template>

<style scoped>

  .value-input {
      width: 25vw;
  }

</style>