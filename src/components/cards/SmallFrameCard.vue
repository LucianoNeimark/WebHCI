<script setup lang="ts">
import {computed} from "vue";
import {deviceTypes} from "@/utils/constants";

const props = defineProps({
    id: String,
    name : String,
    icon:{
        type: String,
        required: true,
    },
    types:{
        type: Array,
        required: true,
    }
})

const typesLimited = computed(() => props.types.slice(0, 5))
</script>

<template>
    <VCard class="ma-3" color="tertiary" rounded="xl" height="20vh" width="25vw">
        <VContainer>
            <VRow>
                <div>{{name}}</div>
            </VRow>
            <VRow align-conent="center">
                <VCol cols="9" class="pl-0 pt-3" align-self="center">
                    <VCard rounded="lg" color="surface" height="9vh" width="auto" class="align">
                        <VIcon v-for="(device, i) in typesLimited" :key="i" :icon="deviceTypes[device].icon" size="3vw"/>
                    </VCard>
                </VCol>
                <VCol cols="3" align-self="center">
                   <VIcon :icon="icon" size="4vw"/>
                </VCol>
            </VRow>
        </VContainer>
    </VCard>
</template>

<style scoped >
.align {
    display: flex;
    align-items: center;
}
</style>