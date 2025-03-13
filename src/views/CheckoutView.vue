<template>
    <div>
      <h1 class="text-h4 mb-6">Finalizar Compra</h1>
      
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
          <v-card class="mb-4">
            <v-card-title>Información de Contacto</v-card-title>
            <v-card-text>
              <v-form ref="form" v-model="isFormValid">
                <v-row>
                  <v-col cols="12" sm="6">
                    <v-text-field
                      v-model="formData.firstName"
                      label="Nombre"
                      required
                      :rules="[v => !!v || 'El nombre es requerido']"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6">
                    <v-text-field
                      v-model="formData.lastName"
                      label="Apellidos"
                      required
                      :rules="[v => !!v || 'Los apellidos son requeridos']"
                    ></v-text-field>
                  </v-col>
                </v-row>
                
                <v-text-field
                  v-model="formData.email"
                  label="Email"
                  type="email"
                  required
                  :rules="[
                    v => !!v || 'El email es requerido',
                    v => /.+@.+\..+/.test(v) || 'El email debe ser válido'
                  ]"
                ></v-text-field>
                
                <v-text-field
                  v-model="formData.phone"
                  label="Teléfono"
                  type="tel"
                  required
                  :rules="[v => !!v || 'El teléfono es requerido']"
                ></v-text-field>
              </v-form>
            </v-card-text>
          </v-card>
          
          <v-card class="mb-4">
            <v-card-title>Dirección de Envío</v-card-title>
            <v-card-text>
              <v-form ref="addressForm" v-model="isAddressFormValid">
                <v-text-field
                  v-model="formData.address"
                  label="Dirección"
                  required
                  :rules="[v => !!v || 'La dirección es requerida']"
                ></v-text-field>
                
                <v-row>
                  <v-col cols="12" sm="6">
                    <v-text-field
                      v-model="formData.city"
                      label="Ciudad"
                      required
                      :rules="[v => !!v || 'La ciudad es requerida']"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6">
                    <v-text-field
                      v-model="formData.postalCode"
                      label="Código Postal"
                      required
                      :rules="[v => !!v || 'El código postal es requerido']"
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-form>
            </v-card-text>
          </v-card>
          
          <v-card>
            <v-card-title>Método de Pago</v-card-title>
            <v-card-text>
              <v-radio-group v-model="formData.paymentMethod" inline>
                <v-radio value="creditCard" label="Tarjeta de Crédito"></v-radio>
                <v-radio value="paypal" label="PayPal"></v-radio>
                <v-radio value="bankTransfer" label="Transferencia Bancaria"></v-radio>
              </v-radio-group>
              
              <div v-if="formData.paymentMethod === 'creditCard'" class="mt-4">
                <v-text-field
                  v-model="formData.cardNumber"
                  label="Número de Tarjeta"
                  placeholder="XXXX XXXX XXXX XXXX"
                  :rules="[v => !!v || 'El número de tarjeta es requerido']"
                ></v-text-field>
                
                <v-row>
                  <v-col cols="12" sm="6">
                    <v-text-field
                      v-model="formData.cardExpiry"
                      label="Fecha de Expiración"
                      placeholder="MM/AA"
                      :rules="[v => !!v || 'La fecha de expiración es requerida']"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6">
                    <v-text-field
                      v-model="formData.cardCvv"
                      label="CVV"
                      placeholder="123"
                      :rules="[v => !!v || 'El CVV es requerido']"
                    ></v-text-field>
                  </v-col>
                </v-row>
              </div>
            </v-card-text>
          </v-card>
        </v-col>
        
        <v-col cols="12" md="4">
          <v-card class="pa-4">
            <h2 class="text-h5 mb-4">Resumen del pedido</h2>
            
            <div v-for="item in cartStore.items" :key="item.id" class="mb-2 d-flex justify-space-between">
              <span>{{ item.name }} (x{{ item.quantity }})</span>
              <span>{{ formatPrice(item.price * item.quantity) }}</span>
            </div>
            
            <v-divider class="my-4"></v-divider>
            
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
              @click="submitOrder"
              :disabled="!isFormValid || !isAddressFormValid"
              prepend-icon="mdi-check-circle"
            >
              Confirmar Pedido
            </v-btn>
            
            <v-btn
              variant="text"
              block
              class="mt-2"
              to="/cart"
              prepend-icon="mdi-arrow-left"
            >
              Volver al carrito
            </v-btn>
          </v-card>
        </v-col>
      </v-row>
      
      <!-- Diálogo de confirmación -->
      <v-dialog v-model="orderCompleteDialog" max-width="500">
        <v-card>
          <v-card-title class="text-h5">
            ¡Pedido Completado!
          </v-card-title>
          <v-card-text>
            Gracias por tu compra. Hemos recibido tu pedido y te enviaremos un correo electrónico con los detalles.
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="primary"
              variant="text"
              @click="finishOrder"
            >
              Continuar
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, computed } from 'vue';
  import { useRouter } from 'vue-router';
  import { useCartStore } from '@/stores/cart';
  
  const router = useRouter();
  const cartStore = useCartStore();
  
  const isFormValid = ref(false);
  const isAddressFormValid = ref(false);
  const orderCompleteDialog = ref(false);
  
  const formData = ref({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    paymentMethod: 'creditCard',
    cardNumber: '',
    cardExpiry: '',
    cardCvv: ''
  });
  
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
  
  const submitOrder = () => {
    // Aquí iría la lógica para enviar el pedido a un servidor
    // Por ahora, solo mostramos el diálogo de confirmación
    orderCompleteDialog.value = true;
  };
  
  const finishOrder = () => {
    // Limpiar el carrito
    cartStore.clearCart();
    // Cerrar el diálogo
    orderCompleteDialog.value = false;
    // Redirigir a la página principal
    router.push('/');
  };
  </script>