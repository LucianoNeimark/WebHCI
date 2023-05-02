<script setup>
import FrameCard from "@/components/FrameCard.vue"

import AirConditionerCard from "@/components/device-cards/AirConditionerCard.vue";
import DoorCard from "@/components/device-cards/DoorCard.vue";
import OvenCard from "@/components/device-cards/OvenCard.vue";
import LightCard from "@/components/device-cards/LightCard.vue";
import SpeakerCard from "@/components/device-cards/SpeakerCard.vue";

const devices = [
    { id: '1', name: 'Aire acondicionado cocina', component: AirConditionerCard },
    { id: '2', name: 'Puerta cocina', component: DoorCard },
    { id: '3', name: 'Horno living', component: OvenCard },
    { id: '4', name: 'Luz cocina', component: LightCard },
    { id: '5', name: 'Parlante living', component: SpeakerCard },
]

</script>

<template>
  <p> Pagina Principal </p>
    <VRow class="ma-3">
         <component v-for="device in devices" :key="device.id" :name="device.name" :is="device.component" class="pa-3" />
    </VRow>
</template>

<style scoped>

</style>
