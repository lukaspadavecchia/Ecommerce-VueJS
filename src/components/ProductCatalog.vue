<template>
    <div>
      <h1 class="text-h4 mb-6">Catálogo de Productos</h1>
      
      <!-- Filtros y búsqueda -->
      <v-row class="mb-6">
        <v-col cols="12" sm="6" md="4">
          <v-text-field
            v-model="searchQuery"
            label="Buscar productos"
            prepend-inner-icon="mdi-magnify"
            variant="outlined"
            density="comfortable"
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="6" md="4">
          <v-select
            v-model="selectedCategory"
            :items="productStore.categories"
            label="Categoría"
            variant="outlined"
            density="comfortable"
          ></v-select>
        </v-col>
      </v-row>
      
      <!-- Grid de productos -->
      <v-row>
        <v-col 
          v-for="product in filteredProducts" 
          :key="product.id" 
          cols="12" sm="6" md="4" lg="3"
        >
          <v-card class="h-100">
            <v-img
              :src="product.image"
              height="200px"
              cover
              class="bg-grey-lighten-2"
            ></v-img>
            
            <v-card-title>{{ product.name }}</v-card-title>
            
            <v-card-text>
              <div class="text-subtitle-1 font-weight-bold mb-2">
                {{ formatPrice(product.price) }}
              </div>
              <div class="text-body-2">{{ product.description }}</div>
            </v-card-text>
            
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="primary"
                variant="elevated"
                @click="addToCart(product)"
              >
                Agregar al carrito
                <v-icon end icon="mdi-cart-plus"></v-icon>
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
      
      <!-- Snackbar para notificaciones -->
      <v-snackbar
        v-model="snackbar"
        :timeout="2000"
        color="success"
      >
        {{ snackbarText }}
      </v-snackbar>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, computed } from 'vue';
  import { useCartStore } from '@/stores/cart';
  import { useProductStore, type Product } from '@/stores/products';
  
  // Stores
  const cartStore = useCartStore();
  const productStore = useProductStore();
  
  // Estado local
  const searchQuery = ref('');
  const selectedCategory = ref('Todos');
  const snackbar = ref(false);
  const snackbarText = ref('');
  
  // Productos filtrados basados en búsqueda y categoría
  const filteredProducts = computed(() => {
    return productStore.products.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
                          product.description.toLowerCase().includes(searchQuery.value.toLowerCase());
      
      const matchesCategory = selectedCategory.value === 'Todos' || 
                            product.category === selectedCategory.value;
      
      return matchesSearch && matchesCategory;
    });
  });
  
  // Formatear precio a moneda local
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'EUR'
    }).format(price);
  };
  
  // Agregar producto al carrito
  const addToCart = (product: Product) => {
    cartStore.addItem(product);
    snackbarText.value = `${product.name} añadido al carrito`;
    snackbar.value = true;
  };
  </script>
  
  <style scoped>
  .h-100 {
    height: 100%;
    display: flex;
    flex-direction: column;
  }
  
  .v-card-text {
    flex-grow: 1;
  }
  </style>