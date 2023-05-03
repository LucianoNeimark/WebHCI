<script setup >

import LightInfo from "@/components/device-pages/LightInfo.vue";
import ActionsHistoryTable from "@/components/tables/ActionsHistoryTable.vue";
import ToRooms from "@/components/ToRooms.vue";

const device = { id: '4', component: LightInfo, data: { intensity: 50, color: 'red', power: true } };

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
            <div>
                <!-- El id nos da toda la info necesaria (aca seria el nombre)-->
                <h1>{{$route.params.id}}</h1>
            </div>
        </VRow>
        <VRow>
            <VCol>
                <component :is="device.component" v-bind="device.data" ></component>
            </VCol>
            <VCol>
                <ToRooms :room="room" />
            </VCol>
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