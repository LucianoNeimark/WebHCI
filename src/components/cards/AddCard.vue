<script setup lang="ts">

</script>

<template>
    <VCard class="ma-3 pa-3 pb-2" color="background" elevation="10" rounded="xl" width="25vw">
        <VContainer class="icon-container">
            <VBtn class="add" :ripple="false" density="compact" icon="mdi-plus" size="10vw" color="white"/>
        </VContainer>
    </VCard>
</template>

<style scoped>
.icon-container {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    font-size: 6rem;
    align-items: center;
}

.add {
    align-content: center;
}
</style>