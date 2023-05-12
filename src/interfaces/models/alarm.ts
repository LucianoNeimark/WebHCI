import {DevicesApi} from "@/api/devices.api";

export interface Alarm {
    id: string;
    name: string;
    state: {
        status: alarmType;
    }
}

export const alarmIcons = [ 'mdi-home-account', 'mdi-home-alert', 'mdi-alarm-light-off']

export enum alarmType { armedStay = 'armedStay', armAway = 'armedAway', disarmed = 'disarmed' }

export const changeSecurityCode = (alarm: Alarm, oldCode: string, newCode: string) : Promise<boolean> => {
    return DevicesApi.executeAction(alarm.id, 'changeSecurityCode',[oldCode, newCode]) as Promise<boolean>
}

export const changeStatusAlarm = (alarm: Alarm, status: alarmType, code: string) : Promise<boolean> => {
    const statusMethods = {
        [alarmType.armedStay]: () => setArmStay(alarm, code),
        [alarmType.armAway]: () => setArmAway(alarm, code),
        [alarmType.disarmed]: () => setDisarm(alarm, code)
    }
    return statusMethods[status]() as Promise<boolean>
}

export const setArmStay = (alarm : Alarm, code: string) => {
    return DevicesApi.executeAction(alarm.id, 'armStay', [code])
}

export const setArmAway = (alarm : Alarm, code: string) => {
    return DevicesApi.executeAction(alarm.id, 'armAway', [code])
}

export const setDisarm = (alarm : Alarm, code: string) => {
    return DevicesApi.executeAction(alarm.id, 'disarm', [code])
}
