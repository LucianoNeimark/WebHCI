<script setup lang="ts">
import SmallFrameCard from "@/components/cards/SmallFrameCard.vue";
import type { Room } from "@/interfaces/room.interface";
import type { PropType } from "vue";
import {reactive} from "vue";
import { useDevicesStore } from "@/stores/device.store";

const props = defineProps({
    room: {
        type: Object as PropType<Room>,
        required: true
    }
})
const { getDevicesGroupByRoom } = useDevicesStore()

const room = reactive(props.room)

const devicesList = getDevicesGroupByRoom().get(room.id)?.map(device => ({
                        typeId : device.type.id,
                        name : device.name
                    })) || []
</script>

<template>
    <SmallFrameCard :name="room.name" :id="room.id" :types="devicesList" empty-message="Sin dispositivos" options-url-base="/rooms"/>
</template>

<style scoped>

</style>