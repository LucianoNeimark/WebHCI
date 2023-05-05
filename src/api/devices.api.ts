import { Api } from '@/api/api'
import type { Device } from '@/interfaces/device.interface'
import { DeviceCreationDTO } from '../dtos/device-creation.dto'
export class DevicesApi {

    static async addDevice(typeId: string, name: string) {
        const device = new DeviceCreationDTO(typeId, name);
        await Api.post("/devices", JSON.stringify(device));
    }

    static async getDevices() : Promise<Device[]> {
        const res = await Api.get("/devices");
        const { result } = await res.json();
        return result;
    }

    static async executeAction(deviceId: string, actionName: string, params: any) : Promise<string> {
        const res = await Api.put(`/devices/${deviceId}/${actionName}`, params);
        const { result } = await res.json();
        return result;
    }

}