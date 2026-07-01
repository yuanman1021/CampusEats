import { defineStore } from 'pinia'
import { loginUserApi, registerUserApi } from '../services/mockApi.js'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    currentUser: JSON.parse(localStorage.getItem('currentUser')) || null
  }),

  getters: {
    isAuthenticated(state) {
      return !!state.currentUser
    },

    isCustomer(state) {
      return state.currentUser?.role === 'customer'
    },

    isVendor(state) {
      return state.currentUser?.role === 'vendor'
    },

    isAdmin(state) {
      return state.currentUser?.role === 'admin'
    }
  },

  actions: {
    async login(email, password) {
      const user = await loginUserApi(email, password)

      this.currentUser = user
      localStorage.setItem('currentUser', JSON.stringify(user))

      return user
    },

    async register(name, email, password, role = 'customer') {
      const newUser = await registerUserApi({
        name,
        email,
        password,
        role
      })

      return newUser
    },

    logout() {
      this.currentUser = null
      localStorage.removeItem('currentUser')
    }
  }
})