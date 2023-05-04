<script setup>
const emit = defineEmits(['decrement', 'increment'])

const props = defineProps({
    suffix: String,
    val: Number,
    max: Number,
    min: Number
})
const decrement = () => {
    if (props.val > props.min) emit('decrement')
}

const increment = () => {
    if (props.val < props.max) emit('increment')
}

</script>

<template>
    <VBtn :disabled="val <= min" color="lightSurface" class="temperature" icon="mdi-minus" @click="decrement"/>
    <span class="temperature-size px-2 align-self-center">{{val}}{{suffix}}</span>
    <VBtn :disabled="val >= max" color="lightSurface" class="temperature" icon="mdi-plus" @click="increment"/>

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