<script setup lang="ts">
import {computed} from "vue";
import {useRoute} from "vue-router";


const route = useRoute()


const items = computed(() => {
    const defaultFunc = () => ""
    const title = (route.meta.name || defaultFunc)()
    return [...(route.meta.ancestors || []), { title: title, disabled: false }]
})
</script>


<template>
    <VToolbar density="compact" color="primary">
        <VBreadcrumbs :items="items" class="v-col-2">
            <template v-slot:divider>
                <VIcon icon="mdi-chevron-right"></VIcon>
            </template>
        </VBreadcrumbs>
    </VToolbar>
</template>

<style scoped>

</style>