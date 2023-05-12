<script setup lang="ts">
import type {PropType} from "vue";
import type {Parameter} from "@/interfaces/actionParam.interface";
import {computed, ref, watch} from "vue";
import {minMaxRule, requiredRule} from "@/utils/rules";
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

const rules : ((v:string)=>boolean|string)[] = [requiredRule]
if (paramType.value === "number" && props.param.minValue !== undefined && props.param.maxValue !== undefined){
    rules.push(minMaxRule(Number(props.param.minValue), Number(props.param.maxValue)))
}
const newValue = ref(props.value)
watch(newValue, () => {
    emit('update:modelValue', newValue.value)
})
</script>
<template>
    <VAutocomplete v-if="param.supportedValues" variant="solo-filled"  hide-details="auto" :rules="[requiredRule]"
        :items="param.supportedValues" v-model="newValue" :label="param.name"
    />
    <VTextField v-else :label="param.name" v-model="newValue" :type="paramType" :min="param.minValue" :max="param.maxValue"
                    outlined dense  hide-details="auto" variant="solo-filled" :rules="rules"
    />
</template>

<style scoped>

</style>