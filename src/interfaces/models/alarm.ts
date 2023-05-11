import {DevicesApi} from "@/api/devices.api";

export interface Alarm {
    id: string;
    name: string;
    state: {
        status: alarmType;
    }
    code: string;
}

export const alarmIcons = [ 'mdi-home-account', 'mdi-home-alert', 'mdi-alarm-light-off']

export enum alarmType { armedStay = 'armedStay', armAway = 'armedAway', disarmed = 'disarmed' }

export const changeSecurityCode = (alarm: Alarm, oldCode: string, newCode: string) : Promise<boolean> => {
    return DevicesApi.executeAction(alarm.id, 'changeSecurityCode',[oldCode, newCode]) as Promise<boolean>
}

export const changeStatusAlarm = (alarm: Alarm, status: alarmType) : Promise<boolean> => {
    const statusMethods = {
        [alarmType.armedStay]: () => setArmStay(alarm),
        [alarmType.armAway]: () => setArmAway(alarm),
        [alarmType.disarmed]: () => setDisarm(alarm)
    }
    return statusMethods[status]() as Promise<boolean>
}

export const setArmStay = (alarm : Alarm) => {
    return DevicesApi.executeAction(alarm.id, 'armStay', [alarm.code])
}

export const setArmAway = (alarm : Alarm) => {
    return DevicesApi.executeAction(alarm.id, 'armAway', [alarm.code])
}

export const setDisarm = (alarm : Alarm) => {
    return DevicesApi.executeAction(alarm.id, 'disarm', [alarm.code])
}
