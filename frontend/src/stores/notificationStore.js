import { defineStore } from 'pinia'
import { getMockData, markNotificationAsRead } from '../services/mockApi'

export const useNotificationStore = defineStore('notifications', {
  state: () => ({
    notifications: []
  }),

  getters: {
    unreadCount(state) {
      return state.notifications.filter((item) => !Number(item.is_read)).length
    }
  },

  actions: {
    async loadNotifications() {
      this.notifications = await getMockData('notifications.json')
    },

    async markAsRead(notificationId) {
      const notification = this.notifications.find(
        (item) => Number(item.notification_id) === Number(notificationId)
      )

      if (notification) {
        notification.is_read = 1
      }

      await markNotificationAsRead(notificationId)
    }
  }
})