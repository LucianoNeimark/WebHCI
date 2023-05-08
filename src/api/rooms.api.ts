import { Api } from '@/api/api'
import type { Room } from '@/interfaces/room.interface'
import { RoomCreationDTO } from '@/dtos/roomCreation.dto'
import { RoomUpdateDTO } from '@/dtos/roomUpdate.dto'
import { useRoomsStore } from '@/stores/room.store'

export class RoomsApi{
    static async addRoom(name : string) {
        const room = new RoomCreationDTO(name) 
        const res = await Api.post("/rooms", room)
        const { result } = await res.json()
        return result
    }

    static async updateRoom(room : Room) {
        const roomDto = new RoomUpdateDTO(room)
        const res = await Api.put(`/rooms/${room.id}`, roomDto)
        const { result } = await res.json()
        return result
    }

    static async reloadRooms() : Promise<void> {
        const res = await Api.get("/rooms")
        const { result } = await res.json()
        const { loadRoom, clearRooms } = useRoomsStore()
        clearRooms()
        result.forEach((room: Room) => loadRoom(room));
    }

    static async deleteRoom(roomId : string) {
        const res = await Api.delete(`/rooms/${roomId}`)
        const { result } = await res.json()
        return result
    }

    static async addDeviceToRoom(roomId : string, deviceId : string) { 
        const res = await Api.post(`/rooms/${roomId}/devices/${deviceId}`)
        const { result } = await res.json()
        return result
    }

    static async removeDeviceFromRoom(deviceId : string) {
        const res = await Api.delete(`/rooms/devices/${deviceId}`)
        const { result } = await res.json()
        return result
    }
}

