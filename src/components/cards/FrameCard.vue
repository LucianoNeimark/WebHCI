<script setup>

defineProps({
    id: String,
    name : String,
    icon : String
})

</script>

<template>
    <VCard class="ma-3 pa-3" color="tertiary" rounded="xl" width="25vw">
        <VContainer>
            <VRow class="flex-row justify-space-between">
                <div>{{ name }}</div>
                <VIcon :icon=icon size="2.5vw"/>
            </VRow>

            <VRow class="slot-content mb-5">
                <slot/>
            </VRow>

            <VRow class="flex-column mt-5">
                <VBtn bottom rounded="xl" size="small" color="lightSurface" class="align-self-center" :to="`/devices/${id}`">Más opciones</VBtn>
            </VRow>
        </VContainer>
    </VCard>
</template>

<style scoped>

.slot-content {
    height: 22vh;
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
}

</style>