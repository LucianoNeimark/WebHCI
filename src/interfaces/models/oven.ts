import type { Device } from '@/interfaces/device.interface';
import type { DeviceType } from '@/interfaces/deviceType.interface';
import { DevicesApi } from '@/api/devices.api';

export interface Oven extends Device {
    id: string;
    type: DeviceType;
    name: string;
    state: {
      status: string,
      temperature: number,
      heat: string,
      grill: string,
      convection: string
    };
}

export enum convModes {
    Normal = 'normal',
    Eco = 'eco',
    Off = 'off'
}

export enum grillModes {
    Large = 'large',
    Eco = 'eco',
    Off = 'off'
}
export enum heatModes{
    Conventional = 'conventional',
    Bottom = 'bottom',
    Top = 'top'
}


export const toggleOven = (oven: Oven) => {
    oven.state.status = oven.state.status === 'on' ? 'off' : 'on';
}

export const changeModes = (oven : Oven, type : string,  mode : string) : Promise <string> => {
    return DevicesApi.executeAction(oven.id, `set${type}`, [mode])
}

export const changeOnOf = (oven : Oven, status: string) : Promise <string> => {
    if (status === 'on') {
        return DevicesApi.executeAction(oven.id, 'turnOn')
    }
    else {
        return DevicesApi.executeAction(oven.id, 'turnOff')
    }
}

export const changeOvenTemp = (oven : Oven, temp : number) => {
    let limitTemp = temp
    if(temp < 90)
        limitTemp = 90
    else if(temp > 230)
        limitTemp = 230
    return DevicesApi.executeAction(oven.id, 'setTemperature', [limitTemp]) 
}

