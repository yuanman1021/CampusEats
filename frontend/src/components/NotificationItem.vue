<template>
  <div class="card notification-card" :class="{ read: notification.is_read }">
    <div class="space-between">
      <div>
        <h3>{{ notification.title }}</h3>
        <p>{{ notification.message }}</p>

        <span v-if="notification.is_read" class="read-label">
          Read
        </span>
      </div>

      <button
        v-if="!notification.is_read"
        class="mark-read-btn"
        @click="$emit('read', notification.notification_id)"
      >
        Mark as read
      </button>
    </div>
  </div>
</template>

<script setup>
defineProps({
  notification: {
    type: Object,
    required: true
  }
})

defineEmits(['read'])
</script>

<style scoped>
.notification-card {
  transition: 0.2s ease;
}

.notification-card.read {
  opacity: 0.65;
}

.space-between {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 16px;
}

.mark-read-btn {
  width: auto;
  padding: 8px 14px;
  border: none;
  border-radius: 999px;
  background: #ff6b00;
  color: white;
  font-weight: 600;
  cursor: pointer;
  white-space: nowrap;
}

.read-label {
  display: inline-block;
  margin-top: 10px;
  color: #6b7280;
  font-size: 14px;
  font-weight: 600;
}
</style>