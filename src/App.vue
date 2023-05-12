<script setup lang="ts">
  import { /*RouterLink,*/ RouterView } from 'vue-router'
  import VerticalNavBar from "@/components/VerticalNavBar.vue"
  import Footer from "@/components/StaticFooter.vue"
  import StaticHeader from "@/components/StaticHeader.vue";
  import EventsHandler from './EventsHandler.vue';
</script>

<template>
        <VApp>
            <VLayout>
                <VerticalNavBar/>
                <VMain>
                    <StaticHeader/>
                    <EventsHandler/>                    
                </VMain>
                <Footer/>
            </VLayout>
        </VApp>
</template>

<style>

</style>
