<template>
    <v-app-bar color="primary" app dark>
      <v-app-bar-title>
        <router-link to="/" class="text-white text-decoration-none">
          Vue Shop
        </router-link>
      </v-app-bar-title>
      
      <v-spacer></v-spacer>
      
      <v-btn to="/" variant="text">
        <v-icon icon="mdi-home" class="mr-2"></v-icon>
        Inicio
      </v-btn>
      
      <v-btn to="/cart" variant="text" class="ml-2">
        <v-badge
          :content="cartStore.totalItems.toString()"
          :model-value="cartStore.totalItems > 0"
          color="error"
        >
          <v-icon icon="mdi-cart" class="mr-2"></v-icon>
        </v-badge>
        Carrito
      </v-btn>
    </v-app-bar>
  </template>
  
  <script setup lang="ts">
  import { useCartStore } from '@/stores/cart';
  
  const cartStore = useCartStore();
  </script>