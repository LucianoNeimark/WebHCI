<script setup>

</script>

<template>

      <VNavigationDrawer
              app
              clipped
              color="primary"
              width=240
      >
          <VList color="transparent">
              <VListItem prepend-icon="mdi-view-dashboard" title="Inicio" value="main" to="/"></VListItem>
              <VListItem prepend-icon="mdi-lamp" title="Dispositivos" value="devices" to="/devices"></VListItem>
              <VListItem prepend-icon="mdi-bed-king-outline" title="Habitaciones" value="rooms" to="/rooms"></VListItem>
              <VListItem prepend-icon="mdi-clock-fast" title="Rutinas" value="routines"  to="/routines"></VListItem>
          </VList>
      </VNavigationDrawer>
</template>


<style lang="scss">
  @import '@/assets/variables.scss';

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