import { Api } from '@/api/api'
import type { Device } from '@/interfaces/device.interface'
export class DevicesApi {

    static async addDevice(id : String, name : String, meta : String){
        
        const data = {
            "type": {
                "id": id
            },    
            "name": name,
            "meta": meta
        }

        await Api.post("/devices", JSON.stringify(data))
    }

    static async getDevices() : Promise<Device[]> {
        const res = await Api.get("/devices")
        const { result } = await res.json()
        return result
    }

    

}