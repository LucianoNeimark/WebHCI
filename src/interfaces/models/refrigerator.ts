import type { Device } from '@/interfaces/device.interface';
import type { DeviceType } from '@/interfaces/deviceType.interface';
import { DevicesApi } from '../../api/devices.api';

export interface Refrigerator extends Device {
    id: string;
    type: DeviceType;
    name: string;
    state: {
        freezerTemperature: number,
        temperature: number,
        mode: string,
    };
}

export const changeTemperatureRefrigerator = (refrigerator : Refrigerator, temp : number) => {
    return DevicesApi.executeAction(refrigerator.id, 'setTemperature', [temp])
}

export const changeFreezerTemperatureRefrigerator = (refrigerator : Refrigerator, temp : number) => {
    return DevicesApi.executeAction(refrigerator.id, 'setFreezerTemperature', [temp])
}

export const changeModeRefrigerator = (refrigerator: Refrigerator, mode: string) : Promise <string> => {
    return DevicesApi.executeAction(refrigerator.id, 'setMode', [mode])
 }

 export const setMode = (refrigerator: Refrigerator, mode : string) => {
    refrigerator.state.mode = mode
}