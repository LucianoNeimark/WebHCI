import { defineStore } from 'pinia'
import {reactive} from 'vue'
import type { Room } from "@/interfaces/room.interface";

export const useRoomsStore = defineStore('rooms', () => {
    const rooms = reactive<{items: Map<string, Room>}>({
        items: new Map<string, Room>()
    })

    const currentRoom = reactive<{value: Room}>({value: {} as Room})

    const loadRoom = (room : Room) => {
        rooms.items.set(room.id, room)
    }

    const clearRooms = () => {
        rooms.items.clear()
    }

    const removeRoom = (roomId : string) => {
        rooms.items.delete(roomId)
    }

    const setCurrentRoom = (roomId: string) => {
        currentRoom.value = rooms.items.get(roomId) as Room
    }

    const roomWithSameNameExists = (roomName: string) => {
        return Array.from(rooms.items.values()).some(room => room.name === roomName)
    }

    return { rooms, loadRoom, clearRooms, removeRoom, setCurrentRoom, currentRoom, roomWithSameNameExists }
})