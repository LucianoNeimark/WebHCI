<script setup>
  import {toRefs} from "vue";

  const props = defineProps({
      room: {
          type: String,
          required: true
      }
  })

  const { room } = toRefs(props);
</script>

<template>
    <VRow>
        <VCol cols="2">
            <VRow class="to-rooms">
                <span>Habitacion:</span>
            </VRow>
        </VCol>
        <VCol cols="4">
            <VRow v-if="room !== 'No room'" class="mb-3">
                <VBtn>
                    Ir a la habitacion
                    <VIcon>
                        mdi-arrow-right
                    </VIcon>
                </VBtn>
            </VRow>
            <VRow>
                <VBtn>{{room}}
                    <VIcon>mdi-wrench</VIcon>
                </VBtn>
            </VRow>
        </VCol>

    </VRow>
</template>

<style scoped>
    .to-rooms {
        position: relative;
        top: 10%;
        //flex-direction: row;
        justify-content: center;
        align-items: center;
    }
</style>