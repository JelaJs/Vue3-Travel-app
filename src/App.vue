<template>
  <header class="desktop-header">
    <div class="logo-nav-wrap">
      <h2><RouterLink to="/">LOGO</RouterLink></h2>

      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/tripideas">Trip Ideas</RouterLink>
        <RouterLink to="/accomodations">Where To Stay</RouterLink>
      </nav>
    </div>

    <div class="build-and-find">
      <nav>
        <RouterLink class="build-trip-link" to="/yourtrip">Build Trip</RouterLink>
        <div v-show="!loginG.authToken">
          <RouterLink class="login-btn" to="/login">Login</RouterLink>
        </div>
        <div v-show="loginG.authToken">
          <button class="logoutBtn" @click="logout">Logout</button>
        </div>
      </nav>
    </div>
  </header>

  <div class="mobile-logo-btn">
    <h2><RouterLink to="/">LOGO</RouterLink></h2>

    <button @click="setMenu(true)">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
        <path
          d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z"
        />
      </svg>
    </button>
  </div>

  <header v-show="mobileMenuOpen" class="mobile-header">
    <div class="content-wrap">
      <button @click="setMenu(false)" class="close-menu">X</button>
      <nav @click="setMenu(false)">
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/tripideas">Trip Ideas</RouterLink>
        <RouterLink to="/accomodations">Where To Stay</RouterLink>

        <RouterLink to="/explore">Explore Map</RouterLink>
        <div v-show="!loginG.authToken">
          <RouterLink class="login-btn" to="/login">Login</RouterLink>
        </div>
        <div v-show="loginG.authToken">
          <button class="logoutBtn" @click="logout">Logout</button>
        </div>
        <RouterLink class="yourTrip" to="/yourtrip">Build Your Trip</RouterLink>
      </nav>
    </div>
  </header>

  <RouterView v-slot="{ Component }">
    <Transition name="page" mode="out-in">
      <component :is="Component" />
    </Transition>
  </RouterView>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { RouterLink, RouterView } from 'vue-router'
import { useLoginStore } from '@/stores/login'

const router = useRouter()
const loginG = useLoginStore()
let authTokenStore = localStorage.getItem('authToken')
const mobileMenuOpen = ref(false)

if (authTokenStore) {
  loginG.authToken = JSON.parse(authTokenStore)
}

const logout = () => {
  localStorage.removeItem('authToken')
  loginG.authToken = null
  router.push('/')
}

const setMenu = (state) => {
  mobileMenuOpen.value = state
}
</script>

<style scoped lang="scss">
header {
  font-size: 2rem;
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

  h2 {
    cursor: pointer;
  }

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

  a {
    transition: all 0.3s;
  }

  a:hover {
    color: #636363;
  }

  .login-btn {
    color: #000;
    font-weight: 600;
  }

  .build-trip-link {
    background-color: #fff;
    padding: 1rem 2rem;
    border-radius: 100px;
    transition: all 0.3s;
  }

  .build-trip-link:hover {
    background-color: #000;
    color: #fff;
  }
}

.mobile-header {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  left: 0;
  background-color: #fffffffd;
  width: 100%;
  height: 100%;
  z-index: 9999;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .content-wrap {
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    .close-menu {
      position: absolute;
      top: 20px;
      right: 20px;
      background-color: transparent;
      border: none;
      outline: none;
      font-size: 3rem;
    }

    nav {
      flex-direction: column;
      gap: 4rem;

      .yourTrip {
        background-color: #000;
        color: #fff;
        padding: 1.5rem 3rem;
        border-radius: 100px;
        margin-top: 3rem;
      }
    }
  }
}

.mobile-logo-btn {
  font-size: 2rem;
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
  display: none;

  button {
    background-color: transparent;
    border: none;
    outline: none;

    svg {
      width: 2rem;
      height: 2rem;
    }
  }
}

/**Transition animation */
.page-enter-active,
.page-leave-active {
  transition: 400ms ease all;
}

.page-enter-from,
.page-leave-to {
  opacity: 0;
}

/**Responsive */
@media (max-width: 1200px) {
  .desktop-header {
    font-size: 1.8rem;
  }
}

@media (max-width: 960px) {
  .desktop-header {
    display: none;
  }

  .mobile-logo-btn {
    display: flex;
    padding-left: 3rem;
    padding-right: 3rem;
  }
}
</style>
