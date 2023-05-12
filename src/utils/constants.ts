import AirConditionerCard from "@/components/cards/device-cards/AirConditionerCard.vue";
import AirConditionerInfo from "@/components/device-pages/AirConditionerInfo.vue";
import LightCard from "@/components/cards/device-cards/LightCard.vue";
import LightInfo from "@/components/device-pages/LightInfo.vue";
import SpeakerCard from "@/components/cards/device-cards/SpeakerCard.vue";
import SpeakerInfo from "@/components/device-pages/SpeakerInfo.vue";
import AlarmCard from "@/components/cards/device-cards/AlarmCard.vue";
import AlarmInfo from "@/components/device-pages/AlarmInfo.vue";
import OvenCard from "@/components/cards/device-cards/OvenCard.vue";
import OvenInfo from "@/components/device-pages/OvenInfo.vue";
import DoorCard from "@/components/cards/device-cards/DoorCard.vue";
import DoorInfo from "@/components/device-pages/DoorInfo.vue";

export const CONSTANTS = {
  NO_ROOM: 'no_room',
  MUSIC_GENRES: {
    COUNTRY: 'country',
    CLASSICAL: 'classical',
    DANCE: 'dance',
    LATINA: 'latina',
    POP: 'pop',
    ROCK: 'rock'
  },
  EVENT : 'event'
}

export const deviceTypes = {
  'li6cbv5sdlatti0j': { name: 'AC', icon: 'mdi-air-conditioner', card: AirConditionerCard, info: AirConditionerInfo},
  'go46xmbqeomjrsjr': { name: 'Lámpara', icon: 'mdi-lightbulb-outline', card: LightCard, info: LightInfo},
  'c89b94e8581855bc': { name: 'Parlante', icon: 'mdi-volume-high' , card: SpeakerCard, info: SpeakerInfo},
  'eu0v2xgprrhhg41g': { name: 'Persiana', icon: "mdi-blinds-horizontal", card: null, info: null},
  'mxztsyjzsrq7iaqc': { name: 'Alarma', icon: "mdi-alarm-light-outline", card: AlarmCard, info: AlarmInfo},
  'im77xxyulpegfmv8': { name: 'Horno', icon: "mdi-toaster-oven", card: OvenCard, info: OvenInfo},
  'lsf78ly0eqrjbz91': { name: 'Puerta', icon: 'mdi-door-open', card: DoorCard, info: DoorInfo},
  'rnizejqr2di0okho': { name: 'Heladera', icon: 'mdi-fridge-outline', card: null, info: null},
}
