<script setup>
import Wizard from "@/assets/mago.png"
</script>

<template>
    <div class="align-wizard">
        <h1 cla>404</h1>
        <h2>El brujo está confundido, no pudo encontrar tu página</h2>
        <img :src="Wizard" alt="mago" width="328" height="481">
    </div>

</template>

<style scoped>
.align-wizard{
    text-align: center;
    /* alinear el div verticalmente en el centro*/
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100%;
}

h1{
    font-size: 3rem;
    font-weight: bold;
}
</style>