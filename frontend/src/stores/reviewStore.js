import { defineStore } from 'pinia'
import { getMockData } from '../services/mockApi.js'

export const useReviewStore = defineStore('review', {
  state: () => ({
    reviews: [],
    sessionReviews: JSON.parse(sessionStorage.getItem('sessionReviews')) || []
  }),

  getters: {
    allReviews(state) {
      return [...state.sessionReviews, ...state.reviews]
    }
  },

  actions: {
    async loadReviews() {
      const mockReviews = await getMockData('reviews.json')
      this.reviews = mockReviews
    },

    addReview(reviewData) {
      const newReview = {
        review_id: Date.now(),
        order_id: reviewData.order_id,
        vendor_id: reviewData.vendor_id,
        user_id: reviewData.user_id,
        rating: reviewData.rating,
        comment: reviewData.comment,
        created_at: new Date().toISOString()
      }

      this.sessionReviews.unshift(newReview)
      sessionStorage.setItem('sessionReviews', JSON.stringify(this.sessionReviews))

      return newReview
    },

    hasReviewedOrder(orderId) {
      return this.allReviews.some((review) => {
        return Number(review.order_id) === Number(orderId)
      })
    },

    getVendorReviews(vendorId) {
      return this.allReviews.filter((review) => {
        return Number(review.vendor_id) === Number(vendorId)
      })
    },

    getAverageRating(vendorId) {
      const vendorReviews = this.getVendorReviews(vendorId)

      if (vendorReviews.length === 0) {
        return 0
      }

      const total = vendorReviews.reduce((sum, review) => {
        return sum + Number(review.rating || 0)
      }, 0)

      return total / vendorReviews.length
    }
  }
})