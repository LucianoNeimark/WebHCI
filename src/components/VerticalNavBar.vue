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
              <VListItem prepend-icon="mdi-view-dashboard" title="Pantalla principal" value="main" @click="$router.push('/')"></VListItem>
              <VListItem prepend-icon="mdi-lamp" title="Dispositivos" value="devices" @click="$router.push('/devices')"></VListItem>
              <VListItem prepend-icon="mdi-clock-fast" title="Rutinas" value="routines"  @click="$router.push('/routines')"></VListItem>
              <VListItem prepend-icon="mdi-bed-king-outline" title="Habitaciones" value="rooms" @click="$router.push('/rooms')"></VListItem>
          </VList>
      </VNavigationDrawer>
</template>


<style>
  .v-list .v-list-item--active {
      background-color: rgb(var(--v-theme-secondary))!important;
  }
  .v-list .v-list-item--active .v-list-item-title {
      color: white !important;
  }

  .v-list .v-list-item--active i {
      color: white !important;
  }

</style>