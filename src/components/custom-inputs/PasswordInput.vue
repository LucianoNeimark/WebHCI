<script setup lang="ts">
import {computed, ref} from "vue";
import { codeRules } from '@/utils/rules';

const props = defineProps({
    label: {
        type: String,
        default: 'Código'
    },
    placeholder: {
        type: String,
        default: '1234'
    },
    password: {
        type: String,
        required: true
    },
    error: {
        type: Boolean,
        default: false
    }
})

const emit = defineEmits(['update:password'])

const code = computed({
    get: () => props.password,
    set: (value) => emit('update:password', value)
})

const show = ref(false)

const icon = computed(() => show.value ? 'mdi-eye' : 'mdi-eye-off')
const type = computed(() => show.value ? 'text' : 'password')

</script>

<template>
    <VTextField v-model="code"
                :append-icon="icon"
                :label="props.label"
                :placeholder="props.placeholder"
                :type="type"
                :error="error"
                bg-color="lightSurface"
                :rules="codeRules"
                autocomplete="on"
                clearable
                class="required"
                @click:append="show = !show"
                outlined/>
</template>

<style scoped>

</style>