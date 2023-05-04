<script setup>

import {computed} from "vue";

const props = defineProps({
    value: Number,
    min: Number,
    max: Number,
    icon: String
})

const emit = defineEmits(['updateValue', 'updateSlider'])

const value = computed({
    get() {
        return props.value
    },
    set(state) {
        emit('updateValue', state)
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