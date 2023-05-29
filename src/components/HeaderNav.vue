<template>
  <div class="p-6 bg-white flex justify-between items-center">
    <div>
      <router-link to="/" class="text-blue-500 hover:text-blue-800">Bookstore</router-link>
    </div>
    <div class="flex">
      <router-link to="/login" class="text-blue-500 hover:text-blue-800">Login</router-link>
      <div class="ml-4">
        <span class="text-gray-600">Books in Cart: {{ cartItemCount }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HeaderNav',
  computed: {
    cartItemCount() {
      return this.$store.getters.cartItems.length;
    }
  }
};
</script>
