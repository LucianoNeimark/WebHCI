<script setup lang="ts">
import {computed, ref} from "vue";

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

const rules = [
    (v: string) => !!v || 'El código es requerido',
    (v: string) => (v && v.length === 4) || 'El código debe tener 4 dígitos',
    (v: string) => (v && !isNaN(Number(v))) || 'El código debe ser numérico'
];

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
                bg-color="surface"
                :rules="rules"
                autocomplete="on"
                clearable
                @click:append="show = !show"
                outlined/>
</template>

<style scoped>

</style>