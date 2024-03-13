<template>
  <div class="login-page">
    <div class="container">
      <div class="center-form">
        <form @submit.prevent="submitForm">
          <div>
            <label for="username">Email:</label>
            <input type="text" id="email" v-model="email" />
          </div>
          <div>
            <label for="password">Password:</label>
            <input type="password" id="password" v-model="password" />
          </div>
          <button type="submit">Login</button>
        </form>
        <div class="error-box" v-if="loginErr">{{ loginErr }}</div>
        <div class="signup-box">
          Don't have account? <RouterLink to="/signup">Sign up</RouterLink>
        </div>
        <div class="demo-box">
          <p class="demo-header">Demo account:</p>
          <p>Email: niko@nikolic.com</p>
          <p>Password: 12345678a</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useLoginStore } from '@/stores/login'
import { useRouter } from 'vue-router'

const apiUrl = 'https://x8ki-letl-twmt.n7.xano.io/api:GC_IgfR7/auth/login'
const email = ref('')
const password = ref('')
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
        email: email.value,
        password: password.value
      })
    })

    if (!response.ok) throw new Error('Invalid Email or Password')

    const data = await response.json()
    loginG.authToken = data
    localStorage.setItem('authToken', JSON.stringify(loginG.authToken))
    //console.log('Successfull Login:', authToken.value)
    router.push('/yourtrip')
  } catch (error) {
    console.error('Try again', error)
    loginErr.value = error
  }

  email.value = ''
  password.value = ''
}
</script>

<style lang="scss">
.login-page {
  padding-top: 8rem;
  height: 100vh;

  .center-form {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
  }

  .error-box {
    margin-top: 0.5rem;
    color: red;
  }

  .signup-box {
    margin-top: 1rem;
    margin-bottom: 3rem;

    a {
      color: blue;
    }
  }

  .demo-box {
    display: flex;
    flex-direction: column;
    gap: 1rem;

    .demo-header {
      font-weight: 600;
    }
  }

  form {
    max-width: 300px;
    margin: 0 auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
    background-color: #f9f9f9;
  }

  /* Stilizacija input polja */
  input[type='text'],
  input[type='password'] {
    width: 100%;
    padding: 10px;
    margin: 5px 0;
    box-sizing: border-box; /* Da se padding ne dodaje na širinu elementa */
    border: 1px solid #ccc;
    border-radius: 4px;
  }

  /* Stilizacija dugmeta */
  button {
    width: 100%;
    padding: 10px;
    margin: 10px 0 0;
    box-sizing: border-box;
    border: none;
    border-radius: 4px;
    background-color: #4caf50; /* Zelena boja */
    color: white;
    cursor: pointer;
  }

  /* Stilizacija dugmeta na hover */
  button:hover {
    background-color: #45a049; /* Tamnija zelena boja */
  }

  /* Stilizacija labela */
  label {
    font-weight: bold;
  }
}
</style>
