<script setup lang="ts">
import { ref } from "vue";
import { validNameRules } from "@/utils/rules";

defineProps({
    message: {
        type: String,
        required: true
    }
})

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


</script>

<template>

  <div>
      <VBtn v-if="!isEditing" @click="isEditing = true" class="add-button ma-5"
            color="secondary" rounded="xl">
            <VIcon icon="mdi-plus"/>
            <span class="px-2">{{ message }}</span>
      </VBtn>
      <VForm v-model="valid">
          <VTextField v-if="isEditing" v-model="value"
                append-inner-icon="mdi-check" @click:append-inner="save" :rules="validNameRules"
                append-icon="mdi-close" @click:append="cancel" class="value-input">
          </VTextField>
      </VForm>
    </div>

</template>

<style scoped>

  .value-input {
      width: 25vw;
  }

</style>