import { ref, computed, reactive } from 'vue'
import { defineStore } from 'pinia'
import AirConditionerSVG from "@/assets/device-icons/device/air-conditioner.svg";
import LightbulbSVG from "@/assets/device-icons/device/lightbulb.svg";
import SpeakerSVG from "@/assets/device-icons/device/speaker.svg";
import CurtainSVG from "@/assets/device-icons/device/curtain.svg";
import OvenSVG from "@/assets/device-icons/device/oven.svg";
import CloseDoorSVG from "@/assets/device-icons/device/door-close.svg";
import FridgeSVG from "@/assets/device-icons/device/refrigerator.svg";

import AirConditionerCard from "@/components/device-cards/AirConditionerCard.vue";
import DoorCard from "@/components/device-cards/DoorCard.vue";
import OvenCard from "@/components/device-cards/OvenCard.vue";
import LightCard from "@/components/device-cards/LightCard.vue";
import SpeakerCard from "@/components/device-cards/SpeakerCard.vue";

export const useDeviceTypesStore = defineStore('deviceTypes', () => {
  const deviceTypes = reactive({
        // TODO: Poner iconos bien
        'li6cbv5sdlatti0j': { name: 'AC', img: AirConditionerSVG, icon: null, component: AirConditionerCard },
        'go46xmbqeomjrsjr': { name: 'Lámpara', img: LightbulbSVG, icon: null, component: LightCard },
        'c89b94e8581855bc': { name: 'Parlante', img: SpeakerSVG, icon: null , component: SpeakerCard},
        'eu0v2xgprrhhg41g': { name: 'Persiana', img: CurtainSVG, icon: null, component: null },
        'mxztsyjzsrq7iaqc': { name: 'Alarma', img: null, icon: "mdi:mdi-alarm-light-outline", component: null},
        'im77xxyulpegfmv8': { name: 'Horno', img: OvenSVG, icon: null, component: OvenCard },
        'lsf78ly0eqrjbz91': { name: 'Puerta', img: CloseDoorSVG, icon: null, component: DoorCard },
        'rnizejqr2di0okho': { name: 'Heladera', img: FridgeSVG, icon: null, component: null },
  }) 

  
  
  return { deviceTypes }
})
