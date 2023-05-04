<script setup lang="ts">

import {computed} from "vue";
const props = defineProps({
    toggle: Number,
    icons: Array
})

const emit = defineEmits(['updateToggle'])

const toggle = computed({
    get() {
        return props.toggle
    },
    set(index) {
        emit('updateToggle', index)
    }
})
</script>

<template>
    <VBtnToggle
            v-model="toggle"
            variant="flat"
            rounded="xl"
            divided
            mandatory
            class="flex-grow-1"
    >
        <VBtn v-for="(icon, index) in icons" :key="index" :icon="icon" :value=index class="flex-grow-1"/>
    </VBtnToggle>
</template>

<style scoped>

</style>