<template>
  <v-app>
    <app-header />
    
    <v-main>
      <v-container fluid>
        <router-view />
      </v-container>
    </v-main>
    
    <v-footer app class="bg-primary text-white">
      <v-container>
        <div class="text-center">
          &copy; {{ new Date().getFullYear() }} - Vue Shop
        </div>
      </v-container>
    </v-footer>
  </v-app>
</template>

<script setup lang="ts">
import AppHeader from '@/components/AppHeader.vue';
</script>