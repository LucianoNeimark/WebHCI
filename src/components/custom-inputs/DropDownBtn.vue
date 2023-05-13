<script setup lang="ts">

import type { VMenu } from 'vuetify/lib/components';

const props = defineProps({
  items: { type: Array<string>, required: true },
  text: { type: String, required: true },
  selected: {type: String, required: true}
})

</script>

<template>
    <div>
        <VMenu>
            <template v-slot:activator="{ props }">
                <VBtn rounded="xl" v-bind="props" class="hola"> 
                  {{ text }}
                </VBtn>
            </template>
            <VList>
              <VListItem
                :active="item === selected"
                v-for="(item, i) in items"
                :key="i"
                @click="$emit('itemClicked', item)">
                <VListItemTitle>{{ item }}</VListItemTitle>
              </VListItem>
            </VList>
          </VMenu>
    </div>
  </template>

<style scoped>

</style>