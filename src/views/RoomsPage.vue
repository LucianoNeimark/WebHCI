<script setup lang="ts">

    import {onMounted, reactive, ref} from 'vue'
    import AddDeviceModal from "@/components/modals/AddDeviceModal/AddDeviceModal.vue";
    import {useDevicesStore} from "@/stores/device.store";
    import {DevicesApi} from "@/api/devices.api";
    import type { Device} from "@/interfaces/device.interface";
    import { useRoomsStore } from '@/stores/room.store';
    import { RoomsApi } from '@/api/rooms.api';
    import { computed } from 'vue';
    import { useDeviceTypesStore } from '@/stores/deviceTypes.store';
    const dialog = ref(false)
    const panel = ref();
    const { rooms } = useRoomsStore()
    const { getDevicesGroupByRoom } = useDevicesStore()
    const { deviceTypes } = useDeviceTypesStore()


    const devicesGroupByRoom  = reactive<{value: Map<string, Device[]>}>({
            value: new Map<string, Device[]>()
        }
    )

    const loadPage = async () => {
        await RoomsApi.reloadRooms()
        await DevicesApi.reloadDevices()
        devicesGroupByRoom.value = getDevicesGroupByRoom()
        console.log(rooms.items)
    }

    const roomItems = computed(() => {
        return rooms.items.values()
    })
   
    onMounted(loadPage)


</script>

<template>
        <VRow>
            <VBtn class="ma-5 add-button"
                color="surface" rounded="xl"
                @click="dialog = true"
            >
                Agregar Habitación
                <VIcon icon="mdi-plus-circle-outline"></VIcon>
            </VBtn>
            <AddDeviceModal v-model:dialog="dialog" @device-added="loadPage()"/>
        </VRow>
        <VRow>
            <VExpansionPanels
                v-model="panel" multiple variant="accordion"
            >
                <VExpansionPanel
                    v-for="(room, roomId) in roomItems" :key="roomId" class="width-auto"
                    color="background" bg-color="background" elevation="0"
                >
                    <VExpansionPanelTitle>
                        {{room.name}}
                    </VExpansionPanelTitle>
                    <VExpansionPanelText>
                        <VSheet class="d-flex flex-wrap justify-start height-auto" color="background">
                            <component v-for="device in devicesGroupByRoom.value.get(room.id)" :key="device.id" :device="device" :id="device.id" :name="device.name"
                                   :is="deviceTypes[device.type.id].card"/>
                        </VSheet>
                    </VExpansionPanelText>
                </VExpansionPanel>
            </VExpansionPanels>
        </VRow>
</template>

<style scoped>
.add-button{

}
</style>