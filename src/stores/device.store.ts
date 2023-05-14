import { defineStore } from 'pinia'
import { reactive } from 'vue'
import type { Device } from '@/interfaces/device.interface'
import { CONSTANTS } from '@/utils/constants'

export const useDevicesStore = defineStore('devices', () => {
  const devices = reactive<{items: Map<string, Device>}>({
    items: new Map<string, Device>() 
  })

  const currentDevice = reactive<{value: Device}>({value: {} as Device})

  const loadDevice = (device : Device) => {
    devices.items.set(device.id, device)
  }

  const removeDevice = (deviceId : string) => {
    devices.items.delete(deviceId)
  }

  const getDevicesGroupByType = () : Map<string,Device[]> => {
    const result = new Map<string,Device[]>();
    devices.items.forEach(device => {
      const devicesByType = result.get(device.type.id) || [];
      devicesByType.push(device);
      result.set(device.type.id, devicesByType);
    });
    return result;
  }

  const getDevicesGroupByRoom = () : Map<string, Device[]> => {
    const result = new Map<string, Device[]>();
    devices.items.forEach(device => {
      const devicesByRoom = result.get(device.room?.id || CONSTANTS.NO_ROOM) || [];
      devicesByRoom.push(device);
      result.set(device.room?.id || CONSTANTS.NO_ROOM, devicesByRoom);
    });
    return result;
  }

  const clearDevices = () => {
    devices.items.clear()
  }

  const getTopDevices = (count: number) : Device[] => {
      return [...devices.items.values()].sort((a, b) => b.meta.qtyUses - a.meta.qtyUses).slice(0, count);
  }

  const setCurrentDevice = (deviceId: string) => {
    currentDevice.value = devices.items.get(deviceId) as Device
  }

  const deviceWithSameNameExists = (deviceName: string) => {
    return Array.from(devices.items.values()).some(device => device.name === deviceName)
  }

  return {
      devices,
      currentDevice,
      setCurrentDevice,
      loadDevice,
      removeDevice,
      getDevicesGroupByType,
      clearDevices,
      getTopDevices,
      getDevicesGroupByRoom,
      deviceWithSameNameExists
  }
})