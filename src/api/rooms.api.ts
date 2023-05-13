import { Api } from '@/api/api'
import type { Room } from '@/interfaces/room.interface'
import { RoomCreationDTO } from '@/dtos/roomCreation.dto'
import { RoomUpdateDTO } from '@/dtos/roomUpdate.dto'
import { useRoomsStore } from '@/stores/room.store'
import { useToast } from 'vue-toast-notification'

export class RoomsApi{
    private static $toast = useToast();

    static async addRoom(name : string) {
        const room = new RoomCreationDTO(name) 
        const res = await Api.post("/rooms", room)
        if (!res.ok) this.$toast.error("Error al crear la habitación", { position: 'top-right' });
        const { result } = await res.json()
        return result
    }

    static async updateRoom(room : Room) {
        const roomDto = new RoomUpdateDTO(room)
        const res = await Api.put(`/rooms/${room.id}`, roomDto)
        if (!res.ok) this.$toast.error("Error al modificar la habitación", { position: 'top-right' });
        const { result } = await res.json()
        return result
    }

    static async reloadRooms() : Promise<void> {
        const res = await Api.get("/rooms")
        if (!res.ok) this.$toast.error("Error al obtener las habitaciones", { position: 'top-right' });
        const { result } = await res.json()
        const { loadRoom, clearRooms } = useRoomsStore()
        clearRooms()
        result.forEach((room: Room) => loadRoom(room));
    }

    static async deleteRoom(roomId : string) {
        const res = await Api.delete(`/rooms/${roomId}`)
        if (!res.ok) this.$toast.error("Error al eliminar la habitación", { position: 'top-right' });
        else{
            const { removeRoom } = useRoomsStore()
            removeRoom(roomId)
        }
        const { result } = await res.json()
        return result
    }

    static async addDeviceToRoom(roomId : string, deviceId : string) { 
        const res = await Api.post(`/rooms/${roomId}/devices/${deviceId}`)
        if (!res.ok) this.$toast.error("Error al añadir el dispositivo a la habitación", { position: 'top-right' });
        const { result } = await res.json()
        return result
    }

    static async removeDeviceFromRoom(deviceId : string) {
        const res = await Api.delete(`/rooms/devices/${deviceId}`)
        if (!res.ok) this.$toast.error("Error al eliminar el dispositivo de la habitación", { position: 'top-right' });
        const { result } = await res.json()
        return result
    }
}

