<script setup lang="ts">

import type { PropType} from 'vue'

const props = defineProps({
  items: { type: Array<string>, required: true },
  icon: { type: String, required: true },
  selected: {type: String, required: true}
})


</script>

<template>
    <div class="text-center">
        <v-menu >
            
            <template v-slot:activator="{ props }">
              <v-btn size="4vw" :icon="icon" v-bind="props"></v-btn>
            </template>

            <v-list>
              <v-list-item
                :active="item === selected"
                v-for="(item, i) in items"
                :key="i"
                @click="$emit('itemClicked', item)"
              >
                <v-list-item-title>{{ item }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
    </div>
  </template>