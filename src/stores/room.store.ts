import { defineStore } from 'pinia'
import { reactive } from 'vue'
import type { Room } from "@/interfaces/room.interface";

export const useRoomsStore = defineStore('rooms', () => {
    const rooms = reactive<{items: Map<string, Room>}>({
        items: new Map<string, Room>()
    })

    const loadRoom = (room : Room) => {
        rooms.items.set(room.id, room)
    }

    const clearRooms = () => {
        rooms.items.clear()
    }

    const removeRoom = (roomId : string) => {
        rooms.items.delete(roomId)
    }

    return { rooms, loadRoom, clearRooms, removeRoom }
})