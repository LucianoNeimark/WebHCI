<script setup>
import FrameCard from "@/components/FrameCard.vue"
import AirConditioner from "@/assets/air-conditioner.svg"

const devices = [
    { name: 'Aire acondicionado', icon: AirConditioner }
]
</script>

<template>
  <p> Pagina Principal </p>
    <VContainer>
          <FrameCard v-for="device in devices" :key="device.name" :name="device.name" :icon="device.icon" class="v-col-3">
              <VBtn rounded="xl" size="x-large">-</VBtn>
              <VBtn rounded="xl" size="x-large">+</VBtn>
              <!-- TODO: Mover -->
          </FrameCard>
    </VContainer>
</template>

<style scoped>

</style>
