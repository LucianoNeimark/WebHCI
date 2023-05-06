import { defineStore } from 'pinia'
import { reactive } from 'vue'
import type { Device } from '../interfaces/device.interface'

export const useDevicesStore = defineStore('devices', () => {
  const devices = reactive<{items: Map<string, Device>}>({
    items: new Map<string, Device>() 
  }) 

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

  return { devices, loadDevice, removeDevice, getDevicesGroupByType }
})