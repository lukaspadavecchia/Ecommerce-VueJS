// src/stores/products.ts
import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
  category: string;
}

export const useProductStore = defineStore('products', () => {
  const products = ref<Product[]>([
    {
      id: 1,
      name: 'Smartphone XYZ',
      price: 599.99,
      category: 'Electrónica',
      description: 'Smartphone de última generación con cámara de alta resolución',
      image: 'https://via.placeholder.com/300x200?text=Smartphone'
    },
    {
      id: 2,
      name: 'Laptop Pro',
      price: 1299.99,
      category: 'Electrónica',
      description: 'Laptop potente para trabajo y gaming',
      image: 'https://via.placeholder.com/300x200?text=Laptop'
    },
    {
      id: 3,
      name: 'Auriculares Bluetooth',
      price: 89.99,
      category: 'Accesorios',
      description: 'Auriculares inalámbricos con cancelación de ruido',
      image: 'https://via.placeholder.com/300x200?text=Auriculares'
    },
    {
      id: 4,
      name: 'Zapatillas Running',
      price: 129.99,
      category: 'Deportes',
      description: 'Zapatillas ligeras para correr largas distancias',
      image: 'https://via.placeholder.com/300x200?text=Zapatillas'
    },
    {
      id: 5,
      name: 'Smartwatch Fitness',
      price: 199.99,
      category: 'Electrónica',
      description: 'Reloj inteligente con monitor de ritmo cardíaco y GPS',
      image: 'https://via.placeholder.com/300x200?text=Smartwatch'
    },
    {
      id: 6,
      name: 'Cámara DSLR',
      price: 699.99,
      category: 'Electrónica',
      description: 'Cámara profesional con lente intercambiable',
      image: 'https://via.placeholder.com/300x200?text=Camara'
    }
  ]);

  const categories = computed(() => {
    const uniqueCategories = new Set<string>();
    products.value.forEach(product => {
      uniqueCategories.add(product.category);
    });
    return ['Todos', ...Array.from(uniqueCategories)];
  });

  const getProductById = (id: number) => {
    return products.value.find(product => product.id === id);
  };

  return {
    products,
    categories,
    getProductById
  };
});