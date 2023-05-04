<script setup>

defineProps({
    id: String,
    name : String,
    icon : String
})

</script>

<template>
    <VCard class="ma-3 pa-5 card" color="tertiary" rounded="xl">
        <VContainer>
            <VRow class="flex-row justify-space-between mb-1">
                <div>{{ name }}</div>
                <img :src=icon alt="device-icon" width="35" height="35"/>
            </VRow>

            <VRow class="slot-content mb-5">
                <slot></slot>
            </VRow>

            <VRow class="flex-column mt-5">
                <VBtn bottom rounded="xl" size="small" color="lightSurface" class="align-self-center" to="devices/hola">Mas opciones</VBtn>
            </VRow>
        </VContainer>
    </VCard>
</template>

<style scoped>

.card {
    width: 30%;
}

.slot-content {
    height: 20vh;
}

</style>