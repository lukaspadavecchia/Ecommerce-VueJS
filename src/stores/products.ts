// src/stores/products.ts
import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import axios, { AxiosError } from 'axios';

// URL base de la API
const API_URL = 'http://localhost:5000/api';

// Definir la interfaz para un producto
export interface Product {
  _id: string;  // MongoDB usa _id en lugar de id
  name: string;
  price: number;
  image: string;
  description: string;
  category: string;
  stock: number;
}

// Definir la interfaz para la respuesta de error de la API
interface ApiErrorResponse {
  message: string;
}

export const useProductStore = defineStore('products', () => {
  // Especificar el tipo del array de productos
  const products = ref<Product[]>([]);
  const loading = ref(false);
  const error = ref<string | null>(null);

  // Obtener todos los productos desde la API
  const fetchProducts = async () => {
    loading.value = true;
    error.value = null;

    try {
      const response = await axios.get<Product[]>(`${API_URL}/products`);
      products.value = response.data;
    } catch (err: unknown) {
      // Manejar el error con tipado correcto
      console.error('Error al cargar productos:', err);

      if (axios.isAxiosError(err)) {
        // Es un error de Axios con tipado correcto para la respuesta
        const axiosError = err as AxiosError<ApiErrorResponse>;
        error.value = axiosError.response?.data?.message || 'Error al cargar productos';
      } else {
        // Es otro tipo de error
        error.value = 'Error desconocido al cargar productos';
      }
    } finally {
      loading.value = false;
    }
  };

  // Categorías únicas
  const categories = computed(() => {
    const uniqueCategories = new Set<string>();

    // Asegurarse de que products.value no esté vacío
    if (products.value.length > 0) {
      products.value.forEach(product => {
        uniqueCategories.add(product.category);
      });
    }

    return ['Todos', ...Array.from(uniqueCategories)];
  });

  // Obtener un producto por ID con tipo explícito
  const getProductById = (id: string): Product | undefined => {
    return products.value.find(product => product._id === id);
  };

  return {
    products,
    loading,
    error,
    categories,
    fetchProducts,
    getProductById
  };
});