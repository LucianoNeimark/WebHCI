<script setup>
import Logo from '@/assets/homewizard.png'
</script>

<template>
      <VNavigationDrawer
              app
              clipped
              color="primary"
              width=240
      >
        <img class="align-center" :src="Logo" alt="logo" width="200"/>
          <VList color="transparent">
            <VListItem prepend-icon="mdi-view-dashboard" title="Inicio" value="main" to="/"/>
            <VListItem prepend-icon="mdi-lamp" title="Dispositivos" value="devices" to="/devices"/>
            <VListItem prepend-icon="mdi-bed-king-outline" title="Habitaciones" value="rooms" to="/rooms"/>
            <VListItem prepend-icon="mdi-clock-fast" title="Rutinas" value="routines"  to="/routines"/>
          </VList>
      </VNavigationDrawer>
</template>


<style lang="scss">
  @import '@/assets/variables.scss';

  .align-center {
      display: block;
      margin-top: 3%;
      margin-bottom: 2%;
      margin-left: auto;
      margin-right: auto;
  }

  .v-list .v-list-item--active {
      background-color: $secondary !important;
  }
  .v-list .v-list-item--active .v-list-item-title {
      color: white !important;
  }

  .v-list .v-list-item--active i {
      color: white !important;
  }

</style>