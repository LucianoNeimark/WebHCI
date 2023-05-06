<script setup lang="ts">
import {computed, ref} from "vue";
import {useRoute} from "vue-router";


const route = useRoute()


const search = ref('')

const items = computed(() =>
    [{ title: route.name, disabled: false, href: route.path }]
)
</script>


<template>
    <VToolbar density="compact" color="primary">
        <VBreadcrumbs :items="items" class="v-col-2">
            <template v-slot:divider>
                <VIcon icon="mdi-chevron-right"></VIcon>
            </template>
        </VBreadcrumbs>

        <VSpacer></Vspacer>
            <VTextField
                v-model="search"
                append-icon="mdi-magnify"
                label="Buscar"
                single-line
                hide-details
                class="mr-7"
            >
            </VTextField>
    </VToolbar>
</template>

<style scoped>

</style>