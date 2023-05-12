<script setup lang="ts">
const emit = defineEmits(['update:value'])

const props = defineProps({
    suffix: String,
    value: {
        type: Number,
        required: true
    },
    max: {
        type: Number,
        required: true
    },
    min: {
        type: Number,
        required: true
    } 
})
const decrement = () => {
    if (props.value > props.min) emit('update:value', props.value - 1)
}

const increment = () => {
    if (props.value < props.max) emit('update:value', props.value + 1)
}

</script>

<template>
    <VBtn :disabled="value <= min" color="lightSurface" class="temperature" icon="mdi-minus" @click="decrement"/>
    <span class="temperature-size px-2 align-self-center">{{value}}{{suffix}}</span>
    <VBtn :disabled="value >= max" color="lightSurface" class="temperature" icon="mdi-plus" @click="increment"/>

</template>

<style scoped>
.temperature{
    width: 3vw;
    height: 3vw;
    border-radius: 40%;
}

.temperature-size{
    font-size: 2rem;
}
</style>