import type { Room } from "@/interfaces/room.interface"
import type { DeviceType } from "@/interfaces/deviceType.interface"

export interface Device {
    id: string;
    name: string;
    type: DeviceType;
    state: any;
    room : Room;
    meta? : any
}




