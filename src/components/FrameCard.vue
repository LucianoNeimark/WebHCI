<script setup>

defineProps({
    name : String,
    icon : String
})

</script>

<template>
    <VCard class="ma-2 pa-1 card v-col-3" color="tertiary">
        <VContainer>
            <VRow class="flex-row justify-space-between">
                <div>{{ name }}</div>
                <img :src=icon alt="device-icon" width="35" height="35"/>
            </VRow>

            <VRow class="slot-content">
                <slot></slot>
            </VRow>

            <VRow class="flex-column">
                <v-btn bottom rounded="xl" size="small" class="align-self-center">Mas opciones</v-btn>
            </VRow>
        </VContainer>
    </VCard>
</template>

<style scoped>

.slot-content {
    height: 100px;
}

</style>