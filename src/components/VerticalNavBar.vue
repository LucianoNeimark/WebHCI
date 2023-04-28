<template>
      <VNavigationDrawer
              app
              clipped
              color="primary"
              dark
      >
          <VList color="transparent">
              <VListItem prepend-icon="mdi-view-dashboard" title="Pantalla principal" value="main" @click="$router.push('/')"></VListItem>
              <VListItem prepend-icon="mdi-account-box" title="Dispositivos" value="devices" @click="$router.push('/devices')"></VListItem>
              <VListItem prepend-icon="mdi-account-box" title="Rutinas" value="routines" @click="$router.push('/routines')"></VListItem>
              <VListItem prepend-icon="mdi-gavel" title="Habitaciones" value="rooms" @click="$router.push('/rooms')"></VListItem>
          </VList>
      </VNavigationDrawer>
</template>

<script>
</script>

<style scoped>

</style>