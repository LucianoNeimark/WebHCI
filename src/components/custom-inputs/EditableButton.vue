<script setup lang="ts">
import { ref } from "vue";
import { validNameRules } from "@/utils/rules";

defineProps({
    message: {
        type: String,
        required: true
    },
    placeHolder: String
})

const value = ref('')
const valid = ref(true);
const isEditing = ref(false);

const emit = defineEmits(['valueSet'])

const save = () => {
    if (!valid.value) return
    emit('valueSet', value.value)
    close()
};

const close = () => {
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
                :placeholder="placeHolder" :label="message" outlined
                append-inner-icon="mdi-check" @click:append-inner="save" :rules="validNameRules"
                append-icon="mdi-close" @click:append="close" class="value-input mt-5 ml-5">
          </VTextField>
      </VForm>
    </div>

</template>

<style scoped>

  .value-input {
      width: 25vw;
  }

</style>