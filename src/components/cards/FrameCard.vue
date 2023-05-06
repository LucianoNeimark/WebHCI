<script setup>

defineProps({
    id: String,
    name : String,
    icon : String
})

</script>

<template>
    <VCard class="ma-3" color="tertiary" rounded="xl" width="25vw">
        <VContainer>
            <VRow class="flex-row justify-space-between mb-1">
                <div>{{ name }}</div>
                <img :src=icon alt="device-icon" width="35" height="35"/>
            </VRow>

            <VRow class="slot-content mb-5">
                <slot></slot>
            </VRow>

            <VRow class="flex-column mt-5">
                <VBtn bottom rounded="xl" size="small" color="lightSurface" class="align-self-center" :to="`devices/${id}`">Mas opciones</VBtn>
            </VRow>
        </VContainer>
    </VCard>
</template>

<style scoped>

.slot-content {
    height: 20vh;
}

</style>