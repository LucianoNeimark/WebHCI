import { defineStore } from 'pinia'
import { reactive } from 'vue'
import type { Device } from '../interfaces/device.interface'

export const useDevicesStore = defineStore('deviceTypes', () => {
  const devices = reactive<{items: Map<string, Device>}>({
    items: new Map<string, Device>() 
  }) 

  const addDevice = (device : Device) => {
    devices.items.set(device.id, device)
  }
  
  return { devices, addDevice }
})