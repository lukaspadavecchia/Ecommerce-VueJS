<template>
    <v-card class="mb-4">
      <div class="d-flex flex-wrap">
        <v-img
          :src="item.image"
          height="100"
          width="100"
          cover
          class="flex-shrink-0"
        ></v-img>
        
        <div class="flex-grow-1 pa-4">
          <div class="d-flex justify-space-between align-center">
            <h3 class="text-subtitle-1 font-weight-bold">{{ item.name }}</h3>
            <v-btn
              icon="mdi-delete"
              variant="text"
              color="error"
              density="comfortable"
              @click="removeItem"
            ></v-btn>
          </div>
          
          <div class="text-subtitle-2 mb-2">{{ formatPrice(item.price) }}</div>
          
          <div class="d-flex align-center">
            <v-btn
              icon="mdi-minus"
              variant="text"
              density="comfortable"
              @click="decreaseQuantity"
              :disabled="item.quantity <= 1"
            ></v-btn>
            
            <span class="mx-2">{{ item.quantity }}</span>
            
            <v-btn
              icon="mdi-plus"
              variant="text"
              density="comfortable"
              @click="increaseQuantity"
            ></v-btn>
            
            <v-spacer></v-spacer>
            
            <div class="text-subtitle-1 font-weight-bold">
              {{ formatPrice(item.price * item.quantity) }}
            </div>
          </div>
        </div>
      </div>
    </v-card>
  </template>
  
  <script setup lang="ts">
  import { useCartStore, type CartItem } from '@/stores/cart';
  
  const props = defineProps<{
    item: CartItem;
  }>();
  
  const cartStore = useCartStore();
  
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'EUR'
    }).format(price);
  };
  
  const removeItem = () => {
    cartStore.removeItem(props.item.id);
  };
  
  const increaseQuantity = () => {
    cartStore.updateQuantity(props.item.id, props.item.quantity + 1);
  };
  
  const decreaseQuantity = () => {
    if (props.item.quantity > 1) {
      cartStore.updateQuantity(props.item.id, props.item.quantity - 1);
    }
  };
  </script>