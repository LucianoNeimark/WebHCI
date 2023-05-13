<script setup lang="ts">
import type {PropType} from "vue";
import type {Parameter} from "@/interfaces/actionParam.interface";
import {computed, ref, watch} from "vue";
import {codeRules, colorRule, minMaxRule, requiredRule} from "@/utils/rules";
import {isColor} from "@/utils/utils";
const props = defineProps({
    param: {
       type : Object as PropType<Parameter>,
        required : true
    },
    value : {
        required : true
    }
})
const emit = defineEmits(["update:value"])

const paramType = computed<string>(() => {
    if (props.param.type === "integer") return "number"
    if (props.param.name === "color") return "color"
    return props.param.type
})

const rules : ((v:string)=>boolean|string)[] = [requiredRule]
if (paramType.value === "number" && props.param.minValue !== undefined && props.param.maxValue !== undefined){
    rules.push(minMaxRule(Number(props.param.minValue), Number(props.param.maxValue)))
} else if (paramType.value === "color") {
    rules.push(colorRule)
} else if (props.param?.maxValue === "9999" && props.param?.minValue === "0000") {
    rules.push(...codeRules)
}
const newValue = ref(props.value)
if (paramType.value === "color") {
    if (isColor(newValue.value as string))
        newValue.value = "#" + (props.value as string)
    else {
        newValue.value = "#000000" as string
        emit("update:value", (newValue.value as string).slice(1).toUpperCase())
    }
}

watch(newValue, (value) => {
    if (paramType.value === "color" && (value as string).startsWith("#")) {
        emit("update:value", (value as string).slice(1).toUpperCase())
    } else {
        emit("update:value", newValue.value)
    }
})

</script>
<template>
    <VSelect v-if="param.supportedValues" variant="solo-filled" :rules="[requiredRule]" v-model="newValue" :label="$t(param.name)"
        :items="param.supportedValues" :item-value="item => item"  :item-title="item => `${$t(item as string)}`"
    />
    <VTextField v-else :label="$t(param.name)" v-model="newValue" :type="paramType" :min="param.minValue" :max="param.maxValue"
                    outlined dense variant="solo-filled" :rules="rules"
    />
</template>

<style scoped>

</style>