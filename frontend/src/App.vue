<template>
  <RouterView />

  <div v-if="cartStore.showVendorSwitchModal" class="app-modal-overlay">
    <div class="app-modal-card">
      <div class="app-modal-icon">
        🛒
      </div>

      <h3>Clear Current Cart?</h3>

      <p>
        Your cart already has items from another vendor. To add this item,
        your current cart must be cleared first.
      </p>

      <div class="app-modal-actions">
        <button class="btn secondary" @click="cartStore.cancelVendorSwitch">
          Cancel
        </button>

        <button class="btn" @click="cartStore.confirmVendorSwitch">
          Clear and Add
        </button>
      </div>
    </div>
  </div>

  <div v-if="orderStore.showStatusModal" class="app-modal-overlay">
    <div class="app-modal-card">
      <div class="app-modal-icon">
        ✅
      </div>

      <h3>{{ orderStore.statusModalTitle }}</h3>

      <p>
        {{ orderStore.statusModalMessage }}
      </p>

      <div class="app-modal-actions single-action">
        <button class="btn" @click="orderStore.closeStatusModal">
          OK
        </button>
      </div>
    </div>
  </div>

  <div v-if="orderStore.showCancelModal" class="app-modal-overlay">
    <div class="app-modal-card">
      <div class="app-modal-icon">
        ⚠️
      </div>

      <h3>Cancel Order?</h3>

      <p>
        Are you sure you want to cancel this order? This action cannot be undone.
      </p>

      <div class="app-modal-actions">
        <button class="btn secondary" @click="orderStore.closeCancelModal">
          No, Keep Order
        </button>

        <button class="btn danger-btn" @click="orderStore.confirmCancelOrder">
          Yes, Cancel
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useCartStore } from './stores/cartStore.js'
import { useOrderStore } from './stores/orderStore.js'

const cartStore = useCartStore()
const orderStore = useOrderStore()
</script>