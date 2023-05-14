import { Api } from '@/api/api'
import type { Device } from '@/interfaces/device.interface'
import { DeviceCreationDTO } from '@/dtos/deviceCreation.dto'
import { DeviceUpdateDTO } from '@/dtos/deviceUpdate.dto'
import { useDevicesStore } from '@/stores/device.store';
import type Log from "@/interfaces/log.interface";
import { useToast } from 'vue-toast-notification';
import { displayErrorMsg } from '@/utils/utils';
export class DevicesApi {
    private static $toast = useToast();

    static async addDevice(typeId: string, name: string) {
        const device = new DeviceCreationDTO(typeId, name);
        const res = await Api.post("/devices", device)
        const { result, error } = await res.json()
        if (!res.ok) displayErrorMsg(DevicesApi.$toast, "Error al crear el dispositivo", error?.code);
        else this.$toast.success(`Dispositivo ${name} creado satisfactoriamente`, { position: 'top-right' });
        return result
    }

    static async reloadDevices() : Promise<void> {
        const res = await Api.get("/devices");
        const { result, error } = await res.json();
        if (!res.ok) displayErrorMsg(DevicesApi.$toast, "Error al obtener los dispostivos", error?.code);
        const { loadDevice, clearDevices } = useDevicesStore();
        clearDevices();
        result.forEach((device: Device) => loadDevice(device));
    }

    static async getDeviceById(deviceId: string) : Promise<Device> {
        const res = await Api.get(`/devices/${deviceId}`);
        const { result, error } = await res.json();
        if (!res.ok) displayErrorMsg(DevicesApi.$toast, "Error al obtener el dispositivo", error?.code);
        return result;
    }

    static async deleteDevice(deviceId: string) {
        const res = await Api.delete(`/devices/${deviceId}`);
        const { result, error } = await res.json();
        if (!res.ok) displayErrorMsg(DevicesApi.$toast, "Error al eliminar el dispositivo", error?.code);
        else {
            const { removeDevice } = useDevicesStore();
            removeDevice(deviceId);
            this.$toast.success(`Dispositivo eliminado satisfactoriamente`, { position: 'top-right' });
        }
        return result;
    }

    static async updateDevice(device : Device){
        const res = await Api.put(`/devices/${device.id}`, new DeviceUpdateDTO(device));
        const { result, error } = await res.json();
        if (!res.ok) displayErrorMsg(DevicesApi.$toast, "Error al modificar el dispositivo", error?.code);
        else this.$toast.success(`Dispositivo ${device.name} modificado satisfactoriamente`, { position: 'top-right' });
        return result;
    }

    static async executeAction(deviceId: string, actionName: string, params?: any) : Promise<any> {
        const res = await Api.put(`/devices/${deviceId}/${actionName}`, params);
        const { result, error } = await res.json();
        if (res.ok) {
            const { devices, loadDevice } = useDevicesStore();
            const actionedDevice = devices.items.get(deviceId);
            if (actionedDevice) {
                actionedDevice.meta.qtyUses++;
                await this.updateDevice(actionedDevice);
                loadDevice(actionedDevice);
            } else {
                this.$toast.error("Error al ejecutar la acción: uno de los dispositivos no existe", { position: 'top-right' });
            }
            return result;
        } else displayErrorMsg(DevicesApi.$toast, "Error al ejecutar la acción", error?.code);
        return "";
    }

    static async getLogs(deviceId: string, limit: number, offset: number) : Promise<Log[]> {
        const res = await Api.get(`/devices/${deviceId}/logs/limit/${limit}/offset/${offset}`);
        const { result, error } = await res.json();
        if (!res.ok) displayErrorMsg(DevicesApi.$toast, "Error al obtener los logs", error?.code);
        return result.sort((a: Log, b: Log) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
    }
}