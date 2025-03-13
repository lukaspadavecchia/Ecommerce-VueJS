// src/stores/cart.ts
import { defineStore } from 'pinia';
import { ref, computed, watch } from 'vue';

export interface CartItem {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
  category: string;
}

export const useCartStore = defineStore('cart', () => {
  // Estado
  const items = ref<CartItem[]>([]);
  
  // Cargar del localStorage al iniciar
  const storedCart = localStorage.getItem('cart');
  if (storedCart) {
    items.value = JSON.parse(storedCart);
  }
  
  // Guardar en localStorage cuando cambie
  watch(items, (newItems) => {
    localStorage.setItem('cart', JSON.stringify(newItems));
  }, { deep: true });
  
  // Getters
  const totalItems = computed(() => {
    return items.value.reduce((total, item) => total + item.quantity, 0);
  });
  
  const totalPrice = computed(() => {
    return items.value.reduce((total, item) => total + (item.price * item.quantity), 0);
  });
  
  // Acciones
  function addItem(product: Product) {
    const existingItem = items.value.find(item => item.id === product.id);
    
    if (existingItem) {
      existingItem.quantity++;
    } else {
      items.value.push({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity: 1
      });
    }
  }
  
  function removeItem(productId: number) {
    const index = items.value.findIndex(item => item.id === productId);
    if (index !== -1) {
      items.value.splice(index, 1);
    }
  }
  
  function updateQuantity(productId: number, quantity: number) {
    const item = items.value.find(item => item.id === productId);
    if (item) {
      item.quantity = quantity;
    }
  }
  
  function clearCart() {
    items.value = [];
  }
  
  return {
    items,
    totalItems,
    totalPrice,
    addItem,
    removeItem,
    updateQuantity,
    clearCart
  };
});