<script setup lang="ts">
import {computed} from "vue";
import {deviceTypes} from "@/utils/constants";

const props = defineProps({
    id: {
        type: String,
        required: true
    },
    name : String,
    icon: String,
    types:{
        type: Array,
        required: true,
    },
    emptyMessage:{
        type: String,
        required: true   
    },
    optionsUrlBase:{
        type: String,
        required: true
    }
})

const typesLimited = computed(() => props.types.slice(0, 5))

</script>

<template>
    <VCard class="ma-3 pa-3 pb-2" color="tertiary" rounded="xl" height="20vh" width="25vw">
        <VContainer>
            <VRow>
                <div>{{name}}</div>
            </VRow>
            <VRow align-conent="center">
                <VCol class="pl-0 pt-3" align-self="center">
                    <VCard rounded="lg" color="surface" height="9vh" width="auto" class="icons">
                        <VRow v-if="typesLimited?.length" class="mx-2">
                            <div v-for="(device, i) in typesLimited" class="device-type" :key="i">
                                <VIcon :icon="deviceTypes[device.typeId]?.icon" size="3vw"/> 
                                <VTooltip
                                    content-class="tooltip-content"
                                    class="tooltip"
                                    activator="parent"
                                    location="bottom"
                                >
                                    <p>{{ device.name }}</p>
                                    <p>{{device.secondaryName && $t(device.secondaryName) }}</p>
                                </VTooltip>
                            </div>
                        </VRow>
                        <VRow v-else class="ml-2">{{emptyMessage}}</VRow>
                    </VCard>
                </VCol>
                <VCol cols="3" align-self="center">
                    <VBtn v-if="icon" size="4vw" rounded="circle" @click="$emit('routine')">
                        <VIcon :icon="icon" size="3vw"/>
                    </VBtn>
                </VCol>
            </VRow>
            <VRow class="flex-column my-2">
                <VBtn bottom rounded="xl" size="small" color="lightSurface" class="align-self-center" :to="`${optionsUrlBase}/${id}`">Mas opciones</VBtn>
            </VRow>
        </VContainer>
    </VCard>
</template>

<style scoped >
.icons {
    align-items: center;
    display: flex;
}
.tooltip{
    text-align: center;
}
.device-type{
    height: 3vw !important;
    width: 3vw !important;
}

</style>