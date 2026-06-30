<template>
  <main class="auth-page">
    <section class="auth-card">
      <img
        src="/images/campuseats-logo.png"
        alt="CampusEats Logo"
        class="auth-logo"
      />

      <h1 class="auth-title">Create Account</h1>
      <p class="auth-subtitle">
        Join CampusEats and start ordering from campus vendors.
      </p>

      <div class="auth-form">
        <label>Full Name</label>
        <input
          v-model="name"
          class="input"
          placeholder="Enter your full name"
        />

        <label>Email Address</label>
        <input
          v-model="email"
          class="input"
          placeholder="Enter your email"
        />

        <label>Password</label>
        <input
          v-model="password"
          class="input"
          type="password"
          placeholder="Create a password"
        />

        <label>Account Type</label>
        <select v-model="role" class="input">
          <option value="customer">Customer</option>
          <option value="vendor">Vendor</option>
        </select>

        <p v-if="errorMessage" class="auth-error">
          {{ errorMessage }}
        </p>

        <button class="btn" :disabled="loading" @click="handleRegister">
          {{ loading ? 'Creating Account...' : 'Register' }}
        </button>
      </div>

      <p class="auth-link">
        Already have an account?
        <RouterLink to="/login">Login here</RouterLink>
      </p>
    </section>
  </main>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { registerUserApi } from '../services/mockApi.js'

const router = useRouter()

const name = ref('')
const email = ref('')
const password = ref('')
const role = ref('customer')
const errorMessage = ref('')
const loading = ref(false)

async function handleRegister() {
  errorMessage.value = ''

  if (!name.value || !email.value || !password.value) {
    errorMessage.value = 'Please complete all fields.'
    return
  }

  loading.value = true

  try {
    await registerUserApi({
      name: name.value,
      email: email.value,
      password: password.value,
      role: role.value
    })

    alert('Account created successfully. Please login.')
    router.push('/login')
  } catch (error) {
    errorMessage.value = error.message || 'Unable to create account.'
  } finally {
    loading.value = false
  }
}
</script>