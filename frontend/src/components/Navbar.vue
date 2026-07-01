<template>
  <div class="navbar">
    <div class="navbar-brand">
      <img
        src="/images/campuseats-logo.png"
        alt="CampusEats Logo"
        class="navbar-logo"
      />
      <strong>CampusEats</strong>
    </div>

    <div class="navbar-actions">
      <RouterLink to="/notifications" class="navbar-icon">
        🔔
        <span
          v-if="userUnreadCount > 0"
          class="notification-badge"
        >
          {{ userUnreadCount }}
        </span>
      </RouterLink>

      <button class="navbar-icon logout-icon" @click="handleLogout">
        🚪
      </button>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/authStore'
import { useNotificationStore } from '../stores/notificationStore'

const router = useRouter()
const authStore = useAuthStore()
const notificationStore = useNotificationStore()

onMounted(async () => {
  if (notificationStore.notifications.length === 0) {
    await notificationStore.loadNotifications()
  }
})

const userUnreadCount = computed(() => {
  return notificationStore.notifications.filter(
    (item) =>
      Number(item.user_id) === Number(authStore.currentUser?.user_id) &&
      !item.is_read
  ).length
})

function handleLogout() {
  authStore.logout()
  router.push('/login')
}
</script>