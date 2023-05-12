<script setup lang="ts">

import {computed} from "vue";

const props = defineProps({
    value: Number,
    min: Number,
    max: Number,
    icon: String
})

const emit = defineEmits(['update:value', 'updateSlider'])

const value = computed({
    get() {
        return props.value
    },
    set(state) {
        emit('update:value', state)
    }
})
</script>

<template>
    <VSlider
            class="w-25"
            v-model="value"
            @end="emit('updateSlider')"
            :min="min"
            :max="max"
            step="1"
            thumb-label
            track-fill-color="white"
            thumb-color="white"
            :append-icon="icon"
            width
    />
</template>
<style scoped>

</style>