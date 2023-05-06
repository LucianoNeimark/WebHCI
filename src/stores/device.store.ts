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

  return { devices, loadDevice, removeDevice }
})