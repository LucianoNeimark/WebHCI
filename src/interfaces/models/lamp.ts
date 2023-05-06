import type { Device } from '@/interfaces/device.interface';
import type { DeviceType } from '@/interfaces/deviceType.interface';
import { DevicesApi } from '../../api/devices.api';

export interface Lamp extends Device {
    id: string;
    type: DeviceType;
    name: string;
    state: {
      brightness: number;
      color: string;
      status: string;
    };
}

export const toggleLamp = (lamp: Lamp) => {
  lamp.state.status = lamp.state.status === 'on' ? 'off' : 'on';
}

export const changeLampStatus = (lamp: Lamp, status: string): Promise<string> => {
  if (status === 'on') {
    return DevicesApi.executeAction(lamp.id, 'turnOn');
  } else {
    return DevicesApi.executeAction(lamp.id, 'turnOff');
  }
}

export const changeLampBrightness = (lamp: Lamp, brightness: number): Promise<string> => {
  return DevicesApi.executeAction(lamp.id, 'setBrightness', [ brightness ]);
}

export const changeLampColor = (lamp: Lamp, color: string): Promise<string> => {
  return DevicesApi.executeAction(lamp.id, 'setColor', [ color ]);
}

