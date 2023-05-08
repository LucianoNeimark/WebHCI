<script setup lang="ts">
import {useRoomsStore} from "@/stores/room.store"
import {computed, type PropType, ref} from "vue"
import type { Room } from "@/interfaces/room.interface"

const { rooms } = useRoomsStore()
const roomList= computed<Room[]>(
    () => Array.from(rooms.items.values())
)
const props = defineProps({
    modelValue: {
        type: Object as PropType<Room | String>
    }
})
const msg = ref("")
const emit = defineEmits(['update:modelValue'])
const room = computed({
    get() {
        return props.modelValue
    },
    set(newValue : Room | String | undefined | null) {
        if(typeof(newValue) === "string" && newValue !== "") {
            msg.value = `Se creará una nueva habitación con nombre "${newValue}"`
        }else {
            if(newValue === "") newValue=null;
            msg.value = ""
        }
        emit('update:modelValue', newValue)
    }
})

</script>

<template>
    <VCombobox
        v-model="room"
        clearable persistent-clear variant="solo-filled" label="Habitación"
        no-data-text="No hay habitaciones" placeholder="Sin Habitación" persistent-placeholder
        :items="roomList" item-title="name" item-value="id"
        :messages="msg"
        :single-line="false"
    />
</template>

<style scoped>

</style>