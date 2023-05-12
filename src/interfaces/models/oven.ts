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

export const setHeat = (oven : Oven , heat : string) => {
    oven.state.heat = heat
}

export const setGrill = (oven : Oven , grill : string) => {
    oven.state.grill = grill
}

export const setTemp = (oven : Oven , temp : number) => {
    oven.state.temperature = temp
}

export const setConv = (oven : Oven , conv : string) => {
    oven.state.convection = conv
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
    return DevicesApi.executeAction(oven.id, 'setTemperature', [temp])
}

// export const changeAngle = (ac : AC, axis: string, angle : string) : Promise <string> => {
//     return DevicesApi.executeAction(ac.id, 'set'+axis+'Swing', [angle])
// }
