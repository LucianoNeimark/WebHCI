<script setup lang="ts">
import {useRoomsStore} from "@/stores/room.store"
import {computed, ref} from "vue"
import type { Room } from "@/interfaces/room.interface"
import { onMounted } from 'vue'
import { RoomsApi } from '@/api/rooms.api'

const { rooms } = useRoomsStore()
const roomList = computed<Room[]>(() => Array.from(rooms.items.values()))

const props = defineProps<{ modelValue : Room | String}>()
const msg = ref("")
const emit = defineEmits(['update:modelValue'])
const room = computed({
    get() {
        return props.modelValue
    },
    set(newValue : Room | String | undefined | null) {
        if(typeof(newValue) === "string" && newValue !== "") {
            msg.value = `Se creará una nueva habitación con nombre "${newValue}"`
        }
        else {
            if(newValue === "") newValue=null;
            msg.value = ""
        }
        emit('update:modelValue', newValue)
    }
})

onMounted(() => {
    RoomsApi.reloadRooms()
})

</script>

<template>
    <VCombobox
        v-if="roomList.length > 0" class="room-combo-box"
        v-model="room"
        clearable persistent-clear variant="solo-filled" label="Habitación"
        no-data-text="No hay habitaciones" placeholder="Sin Habitación" persistent-placeholder
        :items="roomList" item-title="name"
        :messages="msg"
    />
</template>

<style scoped>
.room-combo-box{
    overflow: hidden;
    text-overflow: ellipsis;
}
</style>