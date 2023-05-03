<script setup>
import {toRefs} from "vue";

const props = defineProps({
    actions: {
        type: Array,
        required: true
    }
});
const { actions } = toRefs(props);
</script>

<template>
    <VTable>
        <thead>
          <tr>
            <th>Acción</th>
            <th>Parámetros</th>
            <th>Fecha</th>
            <th>Hora</th>
          </tr>
        </thead>
        <tbody>
        <tr
                v-for="action in actions"
                :key="action.id"
        >
            <td>{{ action.actionName }}</td>
            <td>{{ action.params }}</td>
            <td>{{ action.date }}</td>
            <td>{{ action.time }}</td>
        </tr>
        </tbody>
    </VTable>

</template>

<style scoped>

</style>