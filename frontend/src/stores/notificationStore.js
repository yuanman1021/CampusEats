import { defineStore } from 'pinia'
import { getMockData } from '../services/mockApi'

const NOTIFICATION_STORAGE_KEY = 'campuseats_notifications'

export const useNotificationStore = defineStore('notifications', {
  state: () => ({
    notifications: []
  }),

  getters: {
    unreadCount(state) {
      return state.notifications.filter((item) => !item.is_read).length
    }
  },

  actions: {
    async loadNotifications() {
      const savedNotifications = localStorage.getItem(NOTIFICATION_STORAGE_KEY)

      if (savedNotifications) {
        this.notifications = JSON.parse(savedNotifications)
        return
      }

      this.notifications = await getMockData('notifications.json')
      this.saveNotifications()
    },

    markAsRead(notificationId) {
      const notification = this.notifications.find(
        (item) => Number(item.notification_id) === Number(notificationId)
      )

      if (notification) {
        notification.is_read = true
        this.saveNotifications()
      }
    },

    saveNotifications() {
      localStorage.setItem(
        NOTIFICATION_STORAGE_KEY,
        JSON.stringify(this.notifications)
      )
    }
  }
})