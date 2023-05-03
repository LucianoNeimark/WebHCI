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
        <VCol cols="4">
            <VRow v-if="room !== 'No room'">
                <VBtn class="mb-3">
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
</template>

<style scoped>

</style>