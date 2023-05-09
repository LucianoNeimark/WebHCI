import { Api } from '@/api/api'
import type { Device } from '@/interfaces/device.interface'
import { DeviceCreationDTO } from '@/dtos/deviceCreation.dto'
import { DeviceUpdateDTO } from '@/dtos/deviceUpdate.dto'
import { useDevicesStore } from '@/stores/device.store';
import type Log from "@/interfaces/log.interface";
export class DevicesApi {
    static async addDevice(typeId: string, name: string) {
        const device = new DeviceCreationDTO(typeId, name);
        const res = await Api.post("/devices", device)
        const { result } = await res.json()
        return result
    }

    static async reloadDevices() : Promise<void> {
        const res = await Api.get("/devices");
        const { result } = await res.json();
        const { loadDevice, clearDevices } = useDevicesStore();
        clearDevices();
        result.forEach((device: Device) => loadDevice(device));
    }

    static async getDeviceById(deviceId: string) : Promise<Device> {
        const res = await Api.get(`/devices/${deviceId}`);
        const { result } = await res.json();
        return result;
    }

    static async deleteDevice(deviceId: string) {
        const res = await Api.delete(`/devices/${deviceId}`);
        const { result } = await res.json();
        return result;
    }

    static async updateDevice(device : Device){
        const res = await Api.put(`/devices/${device.id}`, new DeviceUpdateDTO(device));
        const { result } = await res.json();
        return result;
    }

    static async executeAction(deviceId: string, actionName: string, params?: any) : Promise<string> {
        const res = await Api.put(`/devices/${deviceId}/${actionName}`, params);
        if (res.ok) {
            const { devices, loadDevice } = useDevicesStore();
            const actionedDevice = devices.items.get(deviceId);
            if (actionedDevice) {
                actionedDevice.meta.qtyUses++;
                await this.updateDevice(actionedDevice);
                loadDevice(actionedDevice);
            } else {
                // TODO: Error???
            }
            const { result } = await res.json();
            return result;
        }
        return "";
    }

    static async getLogs(deviceId: string, limit: number, offset: number) : Promise<Log[]> {
        const res = await Api.get(`/devices/${deviceId}/logs/limit/${limit}/offset/${offset}`);
        const { result } = await res.json();
        return result.sort((a: Log, b: Log) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
    }
}