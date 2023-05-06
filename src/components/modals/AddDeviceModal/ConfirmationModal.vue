<script setup lang="ts">

import {defineProps, toRefs} from "vue";
const props = defineProps({
    title: String,
    show: Boolean,
    cancelText: {
        type: String,
        default: 'No'
    },
    acceptText: {
        type: String,
        default: 'Si'
    }
})

const {show} = toRefs(props)

</script>

<template>
  <VDialog v-model="show" close-on-back class="modal align-center" scrim="true">
        <VCard color="primary">
            <VCardTitle class="headline">{{title}}</VCardTitle>
            <VCardActions class="actions">
                <VBtn elevation="2" @click="$emit('update:show', false)">{{cancelText}}</VBtn>
                <VBtn elevation="2" @click="$emit('confirm')">{{acceptText}}</VBtn>
            </VCardActions>
        </VCard>
    </VDialog>
</template>

<style scoped lang="scss">
@import '@/assets/variables';

.modal {
  width:  30%;
}

.headline {
    text-align: center;
    justify-self: center;
    height: 10vh;
}

.actions {
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    height: 10vh;

    .v-btn {
      background-color: $secondary !important;
    }
}

</style>