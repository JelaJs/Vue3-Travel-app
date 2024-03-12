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
        <RouterLink to="/yourtrip">Your Trip</RouterLink>
        <div v-show="!loginG.authToken">
          <RouterLink to="/login">Login</RouterLink>
        </div>
        <div v-show="loginG.authToken">
          <button class="logoutBtn" @click="logout">Logout</button>
        </div>
      </nav>
    </div>
  </header>

  <RouterView />
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { RouterLink, RouterView } from 'vue-router'
import { useLoginStore } from '@/stores/login'

const router = useRouter()
const loginG = useLoginStore()
let authTokenStore = localStorage.getItem('authToken')

if (authTokenStore) {
  loginG.authToken = JSON.parse(authTokenStore)
}

const logout = () => {
  localStorage.removeItem('authToken')
  loginG.authToken = null
  router.push('/')
}
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

  .logoutBtn {
    background-color: transparent;
    border: none;
    font-weight: 600;
    font-size: 1.6rem;
    cursor: pointer;
  }
}
</style>
