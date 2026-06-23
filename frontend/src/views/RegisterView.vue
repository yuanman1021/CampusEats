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

        <button class="btn" @click="handleRegister">
          Register
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

const router = useRouter()

const name = ref('')
const email = ref('')
const password = ref('')
const role = ref('customer')
const errorMessage = ref('')

function handleRegister() {
  errorMessage.value = ''

  if (!name.value || !email.value || !password.value) {
    errorMessage.value = 'Please complete all fields.'
    return
  }

  alert('Account created successfully. Please login.')
  router.push('/login')
}
</script>