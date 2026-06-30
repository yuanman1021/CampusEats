import { defineStore } from 'pinia'
import { getMockData, createOrderApi, updateOrderStatusApi } from '../services/mockApi.js'

export const useOrderStore = defineStore('orders', {
  state: () => ({
    orders: [],
    latestOrder: JSON.parse(sessionStorage.getItem('latestOrder')) || null,
    sessionOrders: JSON.parse(sessionStorage.getItem('sessionOrders')) || [],
    showStatusModal: false,
    statusModalTitle: '',
    statusModalMessage: ''
  }),

  actions: {
    async loadOrders() {
      this.orders = await getMockData('orders.json')
    },

    async createOrder(orderData) {
      const newOrder = await createOrderApi(orderData)

      this.latestOrder = newOrder
      this.orders.unshift(newOrder)

      sessionStorage.setItem('latestOrder', JSON.stringify(newOrder))

      return newOrder
    },

    async updateOrderStatus(orderId, status) {
      try {
        const response = await fetch(`http://localhost:8000/api/orders/${orderId}/status`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            status
          })
        })

        if (!response.ok) {
          throw new Error('Failed to update order status.')
        }

        const updatedOrder = await response.json()

        const order = this.orders.find((item) => {
          return Number(item.order_id) === Number(orderId)
        })

        if (order) {
          order.status = updatedOrder.status || status
        }

        if (this.latestOrder && Number(this.latestOrder.order_id) === Number(orderId)) {
          this.latestOrder.status = updatedOrder.status || status
          sessionStorage.setItem('latestOrder', JSON.stringify(this.latestOrder))
        }

        this.showStatusModal = true
        this.statusModalTitle = 'Order Status Updated'
        this.statusModalMessage = `Order #${orderId} has been updated to ${status}.`

        return updatedOrder
      } catch (error) {
        this.showStatusModal = true
        this.statusModalTitle = 'Update Failed'
        this.statusModalMessage = error.message || 'Unable to update order status.'

        throw error
      }
    },

    async cancelOrder(orderId) {
      await this.updateOrderStatus(orderId, 'cancelled')
    },

    closeStatusModal() {
      this.showStatusModal = false
      this.statusModalTitle = ''
      this.statusModalMessage = ''
    }
  }
})