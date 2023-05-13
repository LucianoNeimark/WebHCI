<script setup lang="ts">
import {computed} from "vue";
import {deviceTypes} from "@/utils/constants";


const props = defineProps({
    id: String,
    name : String,
    icon:{
        type: String,
        required: false,
    },
    types:{
        type: Array,
        required: true,
    },
    emptyMessage:{
        type: String,
        required: true   
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
                <VCol class="pl-0 pt-3" align-self="center">
                    <VCard rounded="lg" color="surface" height="9vh" width="auto" class="icons">
                        <VRow v-if="typesLimited?.length" class="ml-2">
                            <div v-for="(device, i) in typesLimited" height="3vw" width="3vw" :key="i">
                                <VIcon :icon="deviceTypes[device.typeId]?.icon" size="3vw"/> 
                                <VTooltip
                                    content-class="tooltip-content"
                                    class="tooltip"
                                    activator="parent"
                                    location="bottom"
                                    :text="`${device.name} \r\n ${device.secondaryName || ''}`"
                                ></VTooltip>     
                            </div>
                        </VRow>
                        <VRow v-else class="ml-2">{{emptyMessage }}</VRow>
                    </VCard>
                </VCol>
                <VCol cols="3" align-self="center">
                    <VBtn size="4vw" :rounded="true" variant="text" @click="$emit('routine')">
                        <VIcon :icon="icon" size="4vw"/>
                    </VBtn>
                </VCol>
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
    white-space: pre-line;
    text-align: center;
}
</style>