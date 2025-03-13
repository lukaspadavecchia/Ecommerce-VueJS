<template>
  <div>
    <v-row>
      <v-col cols="12">
        <v-carousel
          height="400"
          hide-delimiter-background
          show-arrows="hover"
          class="rounded-lg mb-6"
        >
          <v-carousel-item
            v-for="(slide, i) in slides"
            :key="i"
            :src="slide.src"
            cover
          >
            <div class="d-flex fill-height justify-center align-center">
              <div class="text-center bg-black bg-opacity-50 pa-4 rounded">
                <h2 class="text-h4 text-white">{{ slide.title }}</h2>
                <p class="text-white">{{ slide.text }}</p>
              </div>
            </div>
          </v-carousel-item>
        </v-carousel>
      </v-col>
    </v-row>
    
    <product-catalog />
  </div>
</template>

<script setup lang="ts">
import ProductCatalog from '@/components/ProductCatalog.vue';

const slides = [
  {
    src: 'https://via.placeholder.com/1200x400?text=Ofertas+Especiales',
    title: 'Ofertas Especiales',
    text: 'Descubre nuestras ofertas exclusivas'
  },
  {
    src: 'https://via.placeholder.com/1200x400?text=Nuevos+Productos',
    title: 'Nuevos Productos',
    text: 'Conoce nuestras últimas novedades'
  },
  {
    src: 'https://via.placeholder.com/1200x400?text=Envío+Gratis',
    title: 'Envío Gratis',
    text: 'En compras superiores a 50€'
  }
];
</script>
