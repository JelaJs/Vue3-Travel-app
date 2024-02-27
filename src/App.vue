<template>
  <header>
    <div class="logo-nav-wrap">
      <h2>Logo</h2>

      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/tripideas">Trip Ideas</RouterLink>
        <RouterLink to="/accomodations">Where To Stay</RouterLink>
      </nav>
    </div>

    <div class="build-and-find">
      <nav>
        <RouterLink to="/explore">Find Hotel</RouterLink>
        <RouterLink to="/">Your Trip</RouterLink>
      </nav>
    </div>
  </header>

  <RouterView />
</template>

<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<style scoped lang="scss">
header {
  max-width: 160rem;
  padding: 1rem 2rem;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: transparent;
  position: absolute;
  top: 0;
  right: 0;
  left: 0;

  .logo-nav-wrap {
    display: flex;
    align-items: center;
    gap: 5rem;
  }

  nav {
    display: flex;
    align-items: center;
    gap: 2rem;
    font-weight: 500;
  }
}
</style>
