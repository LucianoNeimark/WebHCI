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
            <VRow class="flex-row justify-space-between">
                <div>{{ name }}</div>
                <img :src=icon alt="device-icon" width="35" height="35"/>
            </VRow>

            <VRow class="slot-content">
                <slot></slot>
            </VRow>

            <VRow class="flex-column">
                <VBtn bottom rounded="xl" size="small" class="align-self-center" to="devices/hola">Mas opciones</VBtn>
            </VRow>
        </VContainer>
    </VCard>
</template>

<style scoped>

.card {
    width: 30%;
}

.slot-content {
    height: 150px;
}

</style>