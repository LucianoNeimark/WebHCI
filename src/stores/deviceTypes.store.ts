import { reactive } from 'vue'
import { defineStore } from 'pinia'
import AirConditionerSVG from "@/assets/device-icons/device/air-conditioner.svg";
import LightbulbSVG from "@/assets/device-icons/device/lightbulb.svg";
import SpeakerSVG from "@/assets/device-icons/device/speaker.svg";
import CurtainSVG from "@/assets/device-icons/device/curtain.svg";
import OvenSVG from "@/assets/device-icons/device/oven.svg";
import CloseDoorSVG from "@/assets/device-icons/device/door-close.svg";
import FridgeSVG from "@/assets/device-icons/device/refrigerator.svg";

import AirConditionerCard from "@/components/cards/device-cards/AirConditionerCard.vue";
import DoorCard from "@/components/cards/device-cards/DoorCard.vue";
import OvenCard from "@/components/cards/device-cards/OvenCard.vue";
import LightCard from "@/components/cards/device-cards/LightCard.vue";
import SpeakerCard from "@/components/cards/device-cards/SpeakerCard.vue";

import LightInfo from "@/components/device-pages/LightInfo.vue";
import ACInfo from "@/components/device-pages/ACInfo.vue";
import SpeakerInfo from "@/components/device-pages/SpeakerInfo.vue";
import OvenInfo from "@/components/device-pages/OvenInfo.vue";
import DoorInfo from "@/components/device-pages/DoorInfo.vue";


export const useDeviceTypesStore = defineStore('deviceTypes', () => {
  const deviceTypes = reactive({
        // TODO: Poner iconos bien
        'li6cbv5sdlatti0j': { name: 'AC', img: AirConditionerSVG, icon: null, card: AirConditionerCard, info: ACInfo},
        'go46xmbqeomjrsjr': { name: 'Lámpara', img: LightbulbSVG, icon: 'mdi:mdi-lightbulb', card: LightCard, info: LightInfo},        
        'c89b94e8581855bc': { name: 'Parlante', img: SpeakerSVG, icon: null , card: SpeakerCard, info: SpeakerInfo},
        'eu0v2xgprrhhg41g': { name: 'Persiana', img: CurtainSVG, icon: null, card: null, info: null},
        'mxztsyjzsrq7iaqc': { name: 'Alarma', img: null, icon: "mdi:mdi-alarm-light-outline", card: null, info: null},
        'im77xxyulpegfmv8': { name: 'Horno', img: OvenSVG, icon: null, card: OvenCard, info: OvenInfo},
        'lsf78ly0eqrjbz91': { name: 'Puerta', img: CloseDoorSVG, icon: null, card: DoorCard, info: DoorInfo},
        'rnizejqr2di0okho': { name: 'Heladera', img: FridgeSVG, icon: null, card: null, info: null},
  }) 

  
  
  return { deviceTypes }
})
