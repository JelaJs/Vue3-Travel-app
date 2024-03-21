<template>
  <div class="custom-trip-wrap">
    <div v-if="loginG.authToken">
      <div>
        <div class="make-trip-wrap">
          <p class="make-trip-p">Make Your Trip</p>
          <button @click="openModal">+</button>
        </div>
      </div>
    </div>
    <div v-if="!loginG.authToken">
      <p>Please Login To Make Your Trip...</p>
      <RouterLink to="/login">Login</RouterLink>
    </div>
    <CustomTripInfo />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useLoginStore } from '@/stores/login'
import CustomTripInfo from './CustomTripInfo.vue'
import { useTripStore } from '../stores/customTrip.js'

const customTrip = useTripStore()
const loginG = useLoginStore()
let authTokenStore = localStorage.getItem('authToken')

if (authTokenStore) {
  loginG.authToken = JSON.parse(authTokenStore)
}

const openModal = () => {
  customTrip.modalOpen = true
}
</script>

<style scoped lang="scss">
.custom-trip-wrap {
  margin-top: 2rem;

  .no-trips-p {
    font-size: 2.8rem;
  }

  .make-trip-wrap {
    display: inline-block;
    margin-top: 3rem;
    padding: 5rem;
    border: 1px solid #ccc;
    border-radius: 10px;
    text-align: center;

    .make-trip-p {
      font-size: 2.3rem;
      color: #000000b7;
    }

    button {
      margin-top: 3rem;
      background-color: transparent;
      font-size: 2rem;
      width: 5rem;
      height: 5rem;
      border: 1px solid #ccc;
      border-radius: 50%;
      cursor: pointer;
      transition: all 0.3s;
    }

    button:hover {
      border: 1px solid #444444;
    }
  }

  a {
    color: blue;
    font-size: 1.8rem;
    font-weight: 500;
    display: inline-block;
    margin-top: 2rem;
  }
}
</style>
