<template>
    <div>
      <h1 class="text-h4 mb-6">Carrito de Compras</h1>
      
      <div v-if="cartStore.items.length === 0" class="text-center py-12">
        <v-icon icon="mdi-cart-off" size="x-large" class="mb-4"></v-icon>
        <h2 class="text-h5 mb-2">Tu carrito está vacío</h2>
        <p class="mb-6">Agrega productos para comenzar a comprar</p>
        <v-btn color="primary" to="/" prepend-icon="mdi-shopping">
          Ir a la tienda
        </v-btn>
      </div>
      
      <v-row v-else>
        <v-col cols="12" md="8">
          <cart-item
            v-for="item in cartStore.items"
            :key="item.id"
            :item="item"
          />
        </v-col>
        
        <v-col cols="12" md="4">
          <v-card class="pa-4">
            <h2 class="text-h5 mb-4">Resumen del pedido</h2>
            
            <div class="d-flex justify-space-between mb-2">
              <span>Subtotal</span>
              <span>{{ formatPrice(cartStore.totalPrice) }}</span>
            </div>
            
            <div class="d-flex justify-space-between mb-2">
              <span>Envío</span>
              <span>{{ formatPrice(shippingCost) }}</span>
            </div>
            
            <v-divider class="my-4"></v-divider>
            
            <div class="d-flex justify-space-between mb-6 text-subtitle-1 font-weight-bold">
              <span>Total</span>
              <span>{{ formatPrice(cartStore.totalPrice + shippingCost) }}</span>
            </div>
            
            <v-btn
              color="primary"
              block
              size="large"
              to="/checkout"
              prepend-icon="mdi-cash-register"
            >
              Proceder al pago
            </v-btn>
            
            <v-btn
              variant="text"
              block
              class="mt-2"
              to="/"
              prepend-icon="mdi-arrow-left"
            >
              Seguir comprando
            </v-btn>
          </v-card>
        </v-col>
      </v-row>
    </div>
  </template>
  
  <script setup lang="ts">
  import { computed } from 'vue';
  import CartItem from '@/components/CartItem.vue';
  import { useCartStore } from '@/stores/cart';
  
  const cartStore = useCartStore();
  
  // Costo de envío (gratis si el total es mayor a 50)
  const shippingCost = computed(() => {
    return cartStore.totalPrice > 50 ? 0 : 4.99;
  });
  
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'EUR'
    }).format(price);
  };
  </script>