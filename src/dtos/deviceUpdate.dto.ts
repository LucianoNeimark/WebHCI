import type { Device } from "@/interfaces/device.interface"
export class DeviceUpdateDTO {

    name: string;
    meta : any;
    constructor(device : Device) {
        this.name = device.name
        this.meta = device.meta
    }
}