import { Api } from '@/api/api'
import type { Room } from '@/interfaces/room.interface'
import { RoomCreationDTO } from '@/dtos/roomCreation.dto'
import { RoomUpdateDTO } from '@/dtos/roomUpdate.dto'
import { useRoomsStore } from '@/stores/room.store'
import { useToast } from 'vue-toast-notification'
import { displayErrorMsg } from '@/utils/utils'

export class RoomsApi{
    private static $toast = useToast();

    static async addRoom(name : string) {
        const room = new RoomCreationDTO(name) 
        const res = await Api.post("/rooms", room)
        const { result, error } = await res.json()
        if (!res.ok) displayErrorMsg(RoomsApi.$toast, "Error al crear la habitación", error?.code);
        else this.$toast.success(`Habitación ${name} creada satisfactoriamente`, { position: 'top-right' });
        return result
    }

    static async updateRoom(room : Room) {
        const roomDto = new RoomUpdateDTO(room)
        const res = await Api.put(`/rooms/${room.id}`, roomDto)
        const { result, error } = await res.json()
        if (!res.ok) displayErrorMsg(RoomsApi.$toast, "Error al modificar la habitación", error?.code);
        else this.$toast.success(`Nombre de habitación cambiado a ${room.name}`, { position: 'top-right' });
        return result
    }

    static async reloadRooms() : Promise<void> {
        const res = await Api.get("/rooms")
        const { result, error } = await res.json()
        if (!res.ok) displayErrorMsg(RoomsApi.$toast, "Error al obtener las habitaciones", error?.code);
        const { loadRoom, clearRooms } = useRoomsStore()
        clearRooms()
        result.forEach((room: Room) => loadRoom(room));
    }

    static async deleteRoom(roomId : string) {
        const res = await Api.delete(`/rooms/${roomId}`)
        const { result, error } = await res.json()
        if (!res.ok) displayErrorMsg(RoomsApi.$toast, "Error al eliminar la habitación", error?.code);
        else{
            const { removeRoom } = useRoomsStore()
            removeRoom(roomId)
            this.$toast.success(`Habitación eliminada satisfactoriamente`, { position: 'top-right' });
        }
        return result
    }

    static async addDeviceToRoom(roomId : string, deviceId : string) { 
        const res = await Api.post(`/rooms/${roomId}/devices/${deviceId}`)
        const { result, error } = await res.json()
        if (!res.ok) displayErrorMsg(RoomsApi.$toast, "Error al añadir el dispositivo a la habitación", error?.code);
        //else this.$toast.success(`Dispositivo añadido a la habitación satisfactoriamente`, { position: 'top-right' });
        return result
    }

    static async removeDeviceFromRoom(deviceId : string) {
        const res = await Api.delete(`/rooms/devices/${deviceId}`)
        const { result, error } = await res.json()
        if (!res.ok) displayErrorMsg(RoomsApi.$toast, "Error al eliminar el dispositivo de la habitación", error?.code);
        //else this.$toast.success(`Dispositivo eliminado de la habitación satisfactoriamente`, { position: 'top-right' });
        return result
    }
}

