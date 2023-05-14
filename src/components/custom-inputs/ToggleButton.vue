<script setup lang="ts">
import {computed} from "vue";
import {SizesEnum} from "@/enums/enums";

const props = defineProps({
    icon: {
        type: String,
        required: true
    },
    iconSelected: {
        type: String,
        required: true
    },
    selected: {
        type: Boolean,
        required: true
    },
    size: {
        type: String,
        default: SizesEnum.XLarge
    },
    iconSize: {
        type: String,
        default: '3vw'
    }
})


const currentIcon = computed(() => props.selected ? props.icon : props.iconSelected)

</script>

<template>
    <VBtn :size="size" color="lightSurface" rounded="xl" stacked>
        <VIcon :icon="currentIcon" :size="iconSize"> </VIcon>
    </VBtn>
</template>

<style scoped>

</style>