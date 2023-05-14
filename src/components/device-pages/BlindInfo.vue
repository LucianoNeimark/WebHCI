
<script setup lang="ts">
import { type Blind, openBlind, changeBlindLevel, closeBlind} from "@/interfaces/models/blind";
import { reactive, ref, onMounted, type PropType, onUnmounted } from "vue";
import { DevicesApi } from "@/api/devices.api";
const props = defineProps({
  device: {
    type: Object as PropType<Blind>,
    required: true
  }
})

const blind = reactive(props.device)

const updateLevel = async () => {
  await changeBlindLevel(blind, blind.state.level)
}

const open = async () => {
  await openBlind(blind)
}

const close = async () => {
  await closeBlind(blind)
}

// const { devices } = useDevicesStore()

// const MSG = inject<Ref<Event>>(CONSTANTS.EVENT)

// watch(() => MSG?.value, async (newMSG) => {
//     if (newMSG && newMSG.deviceId === blind.id)
//         ({...blind.state} = {...(devices.items.get(blind.id) as Blind)?.state} || {...blind.state})
// })

const interval = ref()

const getData = async () => {
  const data = await DevicesApi.getDeviceById(blind.id) as Blind
  ({...blind.state} = {...data.state}) 
}

onMounted(async () => {
  interval.value = setInterval(() => {
    getData()
  }, 1000)
})

onUnmounted(() => {
  clearInterval(interval.value)
})




</script>

<template>
  <VCard color="primary" rounded="xl">
    <VContainer>
      <VRow class="mt-3 mb-5 buttons-align justify-space-evenly">
        <VBtn rounded="xl" color="lightSurface" class="btn-large" @click="open"><VIcon icon="mdi-blinds-horizontal" size="4.5vw"/></VBtn>
        <VBtn rounded="xl" color="lightSurface" class="btn-large" @click="close"><VIcon icon="mdi-blinds-horizontal-closed" size="4.5vw"/></VBtn>
      </VRow>
      <VCol>
        <VRow class="ml-3">
          Nivel de apertura
        </VRow>
        <VRow class="px-4">
          <VSlider  
            v-model="blind.state.level"
            @end="updateLevel"
            min="0"
            max="100"
            step="1"
            thumb-label
            track-fill-color="white"
            thumb-color="white"
            append-icon="mdi-blinds"
          />        
        </VRow>
      </VCol>
      <VCol class="ml-4 pr-10 mb-5">
        Nivel actual: {{blind.state.currentLevel}}
        <VProgressLinear :model-value="blind.state.currentLevel"></VProgressLinear>
      </VCol>
    </VContainer>
  </VCard>
</template>

<style scoped>
.buttons-align {
  justify-content: center;
}

</style>