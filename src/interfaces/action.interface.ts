import type {Device} from "@/interfaces/device.interface";

export interface Action {
    device: Device
    actionName: string;
    params: any;
    meta?: any;
}