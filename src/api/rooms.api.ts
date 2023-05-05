import { Api } from '@/api/api'
import type { Room } from '@/interfaces/room.interface'

export class RoomsApi{
    static async addRoom(id : String, name : String, meta : String){
        
        const data = { 
            "name": name,
            "meta": meta
        }
    
        await Api.post("/rooms", JSON.stringify(data))
    }

    static async getDevices() : Promise<Room[]> {
        const res = await Api.get("/rooms")
        const { result } = await res.json()
        return result
    }
}

