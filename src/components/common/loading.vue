<template>
  <div>
    <h2 class="py-2 text-center">Loading</h2>
    <v-progress-circular
      class="center"
      color="primary"
      indeterminate
      :size="115"
      :width="8"
    ></v-progress-circular>
  </div>
</template>

<style scoped>
.center {
  display: block;
  margin: 0 auto;
}
</style>
