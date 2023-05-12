import type { Device } from '@/interfaces/device.interface';
import type { DeviceType } from '@/interfaces/deviceType.interface';
import { DevicesApi } from '../../api/devices.api';

export interface AC extends Device {
    id: string;
    type: DeviceType;
    name: string;
    state: {
      status: string,
      temperature: number,
      mode: string,
      verticalSwing: string,
      horizontalSwing: string,
      fanSpeed: string
    };
}

export enum acModes {
    Heat = 'heat',
    Cool = 'cool',
    Fan = 'fan'
}

export const verticalOpts = ["auto", "22º", "45º", "67º", "90º"]
export const horizontalOpts = ["auto", "-90º", "-45º", "0º", "45º", "90º"]
export const speedOpts = ["auto", "25", "50", "75", "100"]
export const iconArray = [ "mdi-white-balance-sunny",  "mdi-snowflake", "mdi-weather-windy" ]


export const toggleAC = (ac: AC) => {
    ac.state.status = ac.state.status === 'on' ? 'off' : 'on';
}

export const changeAcMode = (ac: AC, mode: string) : Promise <string> => {
   return DevicesApi.executeAction(ac.id, 'setMode', [mode])
}

export const changeOnOf = (ac : AC, status: string) : Promise <string> => {
    if (status === 'on') 
        return DevicesApi.executeAction(ac.id, 'turnOn')
    else 
        return DevicesApi.executeAction(ac.id, 'turnOff')
}

export const changeAngle = (ac : AC, axis: string, angle : string) : Promise <string> => {
    return DevicesApi.executeAction(ac.id, 'set'+axis+'Swing', [angle])
}

export const changeTemperature = (ac : AC, temperature : number) : Promise <string> => {
    return DevicesApi.executeAction(ac.id, 'setTemperature', [temperature])
}

export const changeFanSpeed = (ac : AC, speed : string) : Promise <string> => {
    return DevicesApi.executeAction(ac.id, 'setFanSpeed', [speed])
}

