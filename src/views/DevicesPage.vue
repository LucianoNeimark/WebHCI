<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'
import AddDeviceModal from "@/components/modals/AddDeviceModal/AddDeviceModal.vue";
import { useDevicesStore } from "@/stores/device.store";
import { DevicesApi } from "@/api/devices.api";
import type { Device } from "@/interfaces/device.interface";
import { useToast } from 'vue-toast-notification';
import {deviceTypes} from "@/utils/constants";

const $toast = useToast()
const dialog = ref(false)
const panel = ref();
const { getDevicesGroupByType } = useDevicesStore()
const devicesGroupByType = reactive<{ value: Map<string, Device[]> }>({ value: new Map<string, Device[]>() })

const loadDevices = async () => {
    await DevicesApi.reloadDevices()
    devicesGroupByType.value = getDevicesGroupByType()
}

const reloadDevices = () => {
    loadDevices()
    $toast.success('Dispositivo cargado exitosamente', { position: 'top-right' })
}
onMounted(loadDevices)

</script>

<template>
        <VRow>
            <VBtn class="ma-5"
                color="surface" rounded="xl"
                @click="dialog = true"
            >
                Agregar Dispositivo
                <VIcon icon="mdi-plus-circle-outline"></VIcon>
            </VBtn>
            <AddDeviceModal v-model:dialog="dialog" @device-added="reloadDevices"/>
        </VRow>
        <VRow>
            <VExpansionPanels
                v-model="panel" multiple variant="accordion"
            >
                <VExpansionPanel
                    v-for="(type, typeId) in deviceTypes" :key="typeId" class="width-auto"
                    color="background" bg-color="background" elevation="0"
                >
                    <VExpansionPanelTitle>
                        {{type.name}}s
                    </VExpansionPanelTitle>
                    <VExpansionPanelText>
                        <VSheet class="d-flex flex-wrap justify-start height-auto" color="background">
                            <component v-for="device in devicesGroupByType.value.get(typeId)" :key="device.id" :device="device"
                                   :is="deviceTypes[device.type.id].card"/>
                        </VSheet>
                    </VExpansionPanelText>
                </VExpansionPanel>
            </VExpansionPanels>
        </VRow>
</template>

<style scoped>
</style>