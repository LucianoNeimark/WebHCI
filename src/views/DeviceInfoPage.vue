<script setup >

import LightInfo from "@/components/device-pages/LightInfo.vue";
import ActionsHistoryTable from "@/components/tables/ActionsHistoryTable.vue";
import ToRooms from "@/components/ToRooms.vue";

const device = { id: '4', component: LightInfo, data: { intensity: 50, color: '#FF0000', power: true } };

const actions = [
    { id: 1, actionName: 'apagar', params: '', date: '25/03/2023', time: '12:32' },
    // llenar el resto de la tabla
    { id: 2, actionName: 'prender', params: '', date: '25/03/2023', time: '11:22' }
]

const room = "Cocina"

</script>

<template>
    <VCol>
        <VRow>
            <h1 class="ma-5">
                Lampara living 1
            </h1>
        </VRow>
        <VRow class="device-row ma-5">
            <component :is="device.component" v-bind="device.data" class="device mr-10" ></component>
            <ToRooms :room="room" class="ml-10" />
        </VRow>
        <VRow>
            <VExpansionPanels multiple class="ma-5">
                <VExpansionPanel>
                    <VExpansionPanelTitle>Consumo electrico</VExpansionPanelTitle>
                    <VExpansionPanelText>
                    </VExpansionPanelText>
                </VExpansionPanel>
                <VExpansionPanel>
                    <VExpansionPanelTitle>Historial de acciones</VExpansionPanelTitle>
                    <VExpansionPanelText>
                        <ActionsHistoryTable :actions="actions"/>
                    </VExpansionPanelText>
                </VExpansionPanel>
            </VExpansionPanels>
        </VRow>
    </VCol>
</template>

<style>

.device {
    min-width: 30vw;
    min-height: 35vh;
}

.v-expansion-panel-title {
    font-weight: bold;
}

.v-table tbody tr:nth-of-type(even) {
    background-color: rgba(0, 0, 0, .03);
}

.v-table thead th {
    background-color: rgba(0, 0, 0, .03);
}

</style>