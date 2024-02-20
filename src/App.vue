<template>
  <header>
    <div class="logo">
      <h1>Logo</h1>
    </div>
    <nav>
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/about">About</RouterLink>
      <RouterLink to="/accomodation">Where To Stay</RouterLink>
      <RouterLink to="/explore">Find Hotel</RouterLink>
    </nav>
  </header>

  <RouterView />
</template>

<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<style scoped lang="scss">
header {
  max-width: 130rem;
  margin: 0 auto;
  padding: 1rem 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: transparent;

  nav {
    display: flex;
    align-items: center;
    gap: 2rem;
  }
}
</style>
