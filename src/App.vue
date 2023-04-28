  <script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import VerticalNavBar from "@/components/VerticalNavBar.vue"
import Footer from "./components/StaticFooter.vue"

</script>

<template>
        <VApp>
            <VLayout>
                <VerticalNavBar/>
                <VMain>
                    <router-view/>
                </VMain>
            </VLayout>
            <Footer/>
        </VApp>
</template>

<style>

</style>
