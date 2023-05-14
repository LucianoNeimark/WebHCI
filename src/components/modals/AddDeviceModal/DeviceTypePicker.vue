<script setup lang="ts">
import { computed } from 'vue';
import {deviceTypes} from "@/utils/constants";

const props = defineProps({
  selectedTypeId: String
})

const emit = defineEmits(['pick'])

const SelectedTypeId = computed({
    get() {
        return props.selectedTypeId
    },
    set(index) {
        emit('pick', index)
    }
})
</script>

<template>
  <VBtnToggle v-model="SelectedTypeId" class="flex-wrap justify-center height-auto" mandatory :max="1" >
      <VContainer v-for="(type, typeId) in deviceTypes"
          :key="typeId" class="width-auto">
          <VRow>
              <VBtn class="device-type mx-3 my-2" rounded="circle" :value="typeId" elevation="8" selected-class="selected">
                  <VIcon :icon="type.icon" size="2.5vw"/>
              </VBtn>
          </VRow>
          <VRow justify="center">
              <p class="device-name">{{type.name}}</p>
          </VRow>
      </VContainer>
  </VBtnToggle>
</template>

<style scoped lang="scss">
@import '@/assets/variables';

.selected {
  background-color: $secondary !important;
  color: white !important;
}
.width-auto{ 
  width: auto;
}

.height-auto{
  height: auto;
}

.device-type{
    height: 6vw !important;
    width: 6vw;
    background-color: $lightSurface;
}

.device-name{
    color: $lightSurface;
}

</style>