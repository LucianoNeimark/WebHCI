<script setup lang="ts">

    import {ref, onMounted} from 'vue'
    import AddDeviceModal from "@/components/modals/AddDeviceModal.vue";
    import {Api} from "@/api/api"
    import {DevicesApi} from "@/api/devices.api"
    const dialog = ref(false)

    onMounted(async () => {
        console.log("Calling api")
        const devices = await DevicesApi.getDevices()
        console.log(devices[0].id)
    })
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