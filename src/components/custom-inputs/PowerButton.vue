<script setup lang="ts">
import {computed} from "vue";
import {SizesEnum} from "@/enums/enums";

const props = defineProps({
    power: Boolean,
    size: {
        type: String,
        default: SizesEnum.XLarge
    }
})

const iconSize = {
    [SizesEnum.XSmall]: '2vw',
    [SizesEnum.Small]: '3vw',
    [SizesEnum.Medium]: '4vw',
    [SizesEnum.Large]: '5vw',
    [SizesEnum.XLarge]: '7vw'
}

const powerButtonColor = computed(() => {
    return props.power ? 'secondary' : 'lightSurface'
})
</script>

<template>
    <VBtn :class="`btn-${size}`" rounded="xl" :color="powerButtonColor" stacked>
        <VIcon icon="mdi:mdi-power" :size="iconSize[size]"></VIcon>
    </VBtn>
</template>

<style scoped>

</style>