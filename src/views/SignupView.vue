<template>
  <div class="login-page">
    <div class="container">
      <div class="center-form">
        <form @submit.prevent="submitForm">
          <div>
            <label for="username">Name:</label>
            <input type="text" id="signName" v-model="signName" />
          </div>
          <div>
            <label for="username">Email:</label>
            <input type="text" id="signEmail" v-model="signEmail" />
          </div>
          <div>
            <label for="password">Password:</label>
            <input type="password" id="SignPass" v-model="signPassword" />
          </div>
          <button type="submit">Sign up</button>
        </form>
        <div class="error-box" v-if="loginErr">{{ loginErr }}</div>
        <div class="signup-box">
          Already have an account? <RouterLink to="/login">Login</RouterLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useLoginStore } from '@/stores/login'
import { useRouter } from 'vue-router'

const apiUrl = 'https://x8ki-letl-twmt.n7.xano.io/api:GC_IgfR7/auth/signup'
const signEmail = ref('')
const signPassword = ref('')
const signName = ref('')
//const authToken = ref(null)
const loginErr = ref(null)
const loginG = useLoginStore()
const router = useRouter()

const submitForm = async () => {
  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: signName.value,
        email: signEmail.value,
        password: signPassword.value
      })
    })

    if (!response.ok) {
      const errorResponse = await response.json() // Dekodiranje odgovora kao JSON
      throw new Error(errorResponse.message) // Bacanje greške sa porukom iz odgovora
    }

    const data = await response.json()
    loginG.authToken = data
    localStorage.setItem('authToken', JSON.stringify(loginG.authToken))
    //console.log('Successfull Login:', authToken.value)
    router.push('/yourtrip')
  } catch (error) {
    console.error('Try again', error)
    loginErr.value = error.message
  }

  signEmail.value = ''
  signPassword.value = ''
  signName.value = ''
}
</script>
