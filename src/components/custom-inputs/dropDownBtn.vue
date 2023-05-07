<script setup lang="ts">

const props = defineProps({
  items: { type: Array<string>, required: true },
  icon: { type: String, required: true}
})

const handleClick = (item: string) => {
    console.log(item)
}

</script>

<template>
    <div class="text-center">
        <v-menu :close-on-content-click="false">
            
            <template v-slot:activator="{ props }">
              <v-btn size="4vw" :icon="icon" v-bind="props"></v-btn>
            </template>

            <v-list>
              <v-list-item
                v-for="(item, i) in items"
                :key="i"
                @click="handleClick(item)"
              >
                <v-list-item-title>{{ item }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
    </div>
  </template>