<script setup lang="ts">

import type { VMenu } from 'vuetify/lib/components';

const props = defineProps({
  items: { type: Array<string>, required: true },
  text: { type: String, required: true },
  selected: {type: String, required: true},
  color: {type: String, default: 'lightSurface'}
})

</script>

<template>
    <div>
        <VMenu>
            <template v-slot:activator="{ props }">
                <VBtn :color="color" rounded="xl" v-bind="props"> 
                  {{ text }}
                </VBtn>
            </template>
            <VList>
              <VListItem
                :active="item === selected"
                v-for="(item, i) in items"
                :key="i"
                @click="$emit('itemClicked', item)">
                <VListItemTitle>{{ $t(item) }}</VListItemTitle>
              </VListItem>
            </VList>
          </VMenu>
    </div>
  </template>

<style scoped>

</style>