<script setup>
import { ref } from "vue";
import {DevicesApi} from "@/api/devices.api";
import {useI18n} from "vue-i18n";

const props = defineProps({
    deviceId: {
        type: String,
        required: true
    },
    qtyUses: {
        type: Number,
        required: true
    }
})
const itemsPerPage = ref(10)
const headers = [
    { title: 'Acción', key: 'actionName', align: 'start', sortable: false},
    { title: 'Parámetros', key: 'params', align: 'end', sortable: false},
    { title: 'Fecha', key: 'date', align: 'end', sortable: false},
    { title: 'Hora', key: 'time', align: 'end', sortable: false}
]
const loading = ref(false)
const actions = ref([])
const { t } = useI18n()
const loadItems = async ({page, itemsPerPage}) => {
   loading.value = true
   const logs = await DevicesApi.getLogs(props.deviceId, itemsPerPage, (page - 1)*itemsPerPage)
    actions.value = logs.map((log) => {
        const date = new Date(log.timestamp)
        return {
            actionName: t(log.action),
            params: log.params?.map(p => t(p)).join(', ') || 'Sin parámetros',
            date: date.toLocaleDateString(),
            time: date.toLocaleTimeString()
        }
   })
   loading.value = false

}
</script>

<template>
    <VDataTableServer
            v-model:items-per-page="itemsPerPage"
            :headers="headers"
            :loading="loading"
            :items-length="qtyUses"
            :items="actions"
            :show-expand="false"
            @update:options="loadItems"
    />

</template>

<style>
.v-table tbody tr:nth-of-type(even) td {
    background-color: rgba(0, 0, 0, .03) !important;
}

.v-table thead th {
    color: black !important;
    background-color: rgba(0, 0, 0, .03) !important;
}

</style>