<template>
  <main class="auth-page">
    <section class="auth-card">
      <img
        src="/images/campuseats-logo.png"
        alt="CampusEats Logo"
        class="auth-logo"
      />

      <h1 class="auth-title">CampusEats</h1>
      <p class="auth-subtitle">
        Skip the queue. Order ahead and collect when ready.
      </p>

      <div class="auth-form">
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
          placeholder="Enter your password"
        />

        <p v-if="errorMessage" class="auth-error">
          {{ errorMessage }}
        </p>

        <button class="btn" @click="handleLogin">
          Login
        </button>
      </div>

      <p class="auth-link">
        New to CampusEats?
        <RouterLink to="/register">Create account</RouterLink>
      </p>

      <div class="demo-box">
        <strong>Demo Accounts</strong>
        <p>Customer: ali@student.utm.my / 123456</p>
        <p>Vendor: lemontree@utm.my / 123456</p>
        <p>Admin: admin@campuseats.my / 123456</p>
      </div>
    </section>
  </main>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/authStore'

const router = useRouter()
const authStore = useAuthStore()

const email = ref('ali@student.utm.my')
const password = ref('123456')
const errorMessage = ref('')

async function handleLogin() {
  errorMessage.value = ''

  if (!email.value || !password.value) {
    errorMessage.value = 'Please enter email and password.'
    return
  }

  try {
    const user = await authStore.login(email.value, password.value)

    if (user.role === 'customer') router.push('/home')
    if (user.role === 'vendor') router.push('/vendor/dashboard')
    if (user.role === 'admin') router.push('/admin/dashboard')
  } catch (error) {
    errorMessage.value = error.message
  }
}
</script>