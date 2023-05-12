import type { DeviceType } from '@/interfaces/deviceType.interface';
import type { Device } from '@/interfaces/device.interface';
import { DevicesApi } from '../../api/devices.api';

export interface Blind extends Device {
    id: string;
    type: DeviceType;
    name: string;
    state: {    
        status: string,
        level: number,
        currentLevel: number
    }
}

export const openBlind = (blind: Blind) => {
    DevicesApi.executeAction(blind.id, 'open');
}

export const closeBlind = (blind: Blind) => {
    DevicesApi.executeAction(blind.id, 'close');
}

export const changeBlindLevel = (blind: Blind, level: number) => {
    DevicesApi.executeAction(blind.id, 'setLevel', [ level ]);
}