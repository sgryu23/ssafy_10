<template>
  <div>
    <nav class="text-bg-dark p-3 text-center">
      <RouterLink class="text-white text-decoration-none" :to="{ name: 'home' }"> Home </RouterLink>
      <RouterLink class="text-white text-decoration-none" :to="{ name: 'postList' }"> PostList </RouterLink>
    </nav>
  </div>

  <RouterView />
</template>

<script setup>

</script>

<style scoped>

</style>