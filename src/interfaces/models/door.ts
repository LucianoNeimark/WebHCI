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
    door.state.status = door.state.status === 'closed' ? "opened" : "closed"
}

export const changeDoorOpenClosed = (door : Door, status: string) : Promise <string> => {
    if (status === 'closed'){
        return DevicesApi.executeAction(door.id, 'close')
    } else {
        return DevicesApi.executeAction(door.id, 'open')
    }
}

export const changeDoorLockedUnlocked = (door : Door, lock: string) : Promise <string> => {
    if (lock === 'locked'){
        return DevicesApi.executeAction(door.id, 'lock')
    } else {
        return DevicesApi.executeAction(door.id, 'unlock')
    }
}




