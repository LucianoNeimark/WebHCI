<script setup lang="ts">

    import {ref} from 'vue'
    import AddDeviceModal from "@/components/modals/AddDeviceModal/AddDeviceModal.vue";
    const dialog = ref(false)
</script>

<template>
    <p> Dispositivos </p>
    <VBtn class="ma-3"
        color="surface" rounded="xl"
        @click="dialog = true"
    >
        Agregar Dispositivo
        <VIcon icon="mdi-plus-circle-outline"></VIcon>
    </VBtn>
    <AddDeviceModal :dialog="dialog" @updateDialog="(state: boolean) => dialog = state"/>
</template>

