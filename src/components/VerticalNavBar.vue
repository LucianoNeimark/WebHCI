<template>
      <VNavigationDrawer
              app
              clipped
              color="primary"
              dark
              width=200
      >
          <VList color="transparent">
              <!-- Prepend icon -->
              <VListItem title="Pantalla principal" value="main" @click="$router.push('/')"></VListItem>
              <VListItem title="Dispositivos" value="devices" @click="$router.push('/devices')"></VListItem>
              <VListItem title="Rutinas" value="routines" @click="$router.push('/routines')"></VListItem>
              <VListItem title="Habitaciones" value="rooms" @click="$router.push('/rooms')"></VListItem>
          </VList>
      </VNavigationDrawer>
</template>

<script>
</script>

<style scoped>

</style>