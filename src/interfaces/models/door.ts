import type { Device } from '@/interfaces/device.interface';
import type { DeviceType } from '@/interfaces/deviceType.interface';
import { DevicesApi } from '../../api/devices.api';

export interface Door extends Device {
    id: string;
    type: DeviceType;
    name: string;
    state: {
      lock: string;
      status: string;
    };
}


//Tiene dos toggles el de lock y el de abierto y cerrado

export const toggleLock = (door : Door) => {
    door.state.lock = door.state.lock === 'locked' ? "unlocked" : "locked"
}

export const toggleStatus = (door : Door) => {
    door.state.status = door.state.status === 'closed' ? "open" : "closed"
}

export const changeDoorOpenClosed = (door : Door, status: string) : Promise <string> => {
    if (status === 'closed'){
        return DevicesApi.executeAction(door.id, 'open')
    } else {
        return DevicesApi.executeAction(door.id, 'close')
    }
}

export const changeDoorLockedUnlocked = (door : Door, lock: string) : Promise <string> => {
    if (lock === 'locked'){
        return DevicesApi.executeAction(door.id, 'unlock')
    } else {
        return DevicesApi.executeAction(door.id, 'lock')
    }
}


// export const toggleLamp = (lamp: Door) => {
//   lamp.state.status = lamp.state.status === 'on' ? 'off' : 'on';
// }

// export const changeLampStatus = (lamp: Door, status: string): Promise<string> => {
//   if (status === 'on') {
//     return DevicesApi.executeAction(lamp.id, 'turnOn');
//   } else {
//     return DevicesApi.executeAction(lamp.id, 'turnOff');
//   }
// }


