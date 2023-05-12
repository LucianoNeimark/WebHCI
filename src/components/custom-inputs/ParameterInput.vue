<script setup lang="ts">
import type {PropType} from "vue";
import type {Parameter} from "@/interfaces/actionParam.interface";
import {computed, ref} from "vue";
const props = defineProps({
    param: {
       type : Object as PropType<Parameter>,
        required : true
    },
    value : {
        required : true
    }
})
const emit = defineEmits(["update:modelValue"])

const paramType = computed<string>(() => {
    return props.param.type === "integer"? "number" : props.param.type
})
const isValid = () => {
    if(props.param?.minValue){
        if(paramType.value === "number" && Number(newValue.value) < props.param.minValue){
            return false
        }
    }
    if(props.param?.maxValue){
        if(paramType.value === "number" && Number(newValue.value) > props.param.maxValue){
            return false
        }
    }
    return true
}

const newValue = ref(props.value)

</script>
<template>
    <VAutocomplete v-if="param.supportedValues" variant="solo-filled"  hide-details="auto" class="required"
        :items="param.supportedValues" v-model="newValue" :label="param.name"
    />
    <VTextField v-else :label="param.name" v-model="newValue" :type="paramType" :min="param.minValue" :max="param.maxValue"
                    outlined dense  hide-details="auto" variant="solo-filled" class="required"
    />
</template>

<style scoped>

</style>