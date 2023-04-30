<script setup lang="ts">
  import { /*RouterLink,*/ RouterView } from 'vue-router'
  import VerticalNavBar from "@/components/VerticalNavBar.vue"
  import Footer from "@/components/StaticFooter.vue"
  import StaticHeader from "@/components/StaticHeader.vue";
</script>

<template>
        <VApp>
            <VLayout>
                <VerticalNavBar/>
                <VMain>
                    <StaticHeader/>
                    <router-view/>
                </VMain>
                <Footer/>
            </VLayout>
        </VApp>
</template>

<style>

</style>
