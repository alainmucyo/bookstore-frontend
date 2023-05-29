<template>
  <div>
    <HeaderNav/>
    <div v-if="book" class="p-6">
      <div class="max-w-sm mx-auto rounded overflow-hidden shadow-lg">
        <img class="w-full h-64 object-cover" :src="book.image_url" alt="Book cover">
        <div class="px-6 py-4">
          <div class="font-bold text-xl mb-2">{{ book.title }}</div>
          <p class="text-gray-700 text-base">
            {{ book.description }}
          </p>
        </div>
        <div class="px-6 pt-4 pb-2">
        <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#{{
            book.author.first_name
          }} {{ book.author.last_name }}</span>
        </div>
        <div class="px-6 pt-4 pb-2 flex justify-between">
        <span class="inline-block bg-green-200 rounded-full px-3 py-1 text-sm font-semibold text-green-700 mr-2 mb-2">${{
            Number(book.price).toLocaleString()
          }}</span>
          <span class="inline-block bg-blue-200 rounded-full px-3 py-1 text-sm font-semibold text-blue-700 mr-2 mb-2">{{
              new Date(book.published).toLocaleDateString()
            }}</span>
          <button
              class="inline-block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              @click="addToCart">Add to Cart
          </button>
        </div>
      </div>
    </div>
    <div v-else class="text-center p-6">
      Loading...
    </div>
  </div>

</template>

<script>
import axios from "axios";
import HeaderNav from "@/components/HeaderNav.vue";
export default {
  name: 'BookDetails',
  components: {HeaderNav},
  data() {
    return {
      book: null
    }
  },
  methods: {
    async addToCart() {
      await this.$store.dispatch('addToCart', this.book);
    }
  },
  async created() {
    try {
      const {data} = await axios.get(`/books/${this.$route.params.id}`);
      this.book = data.data;
    } catch (e) {
      console.error(e);
    }
  }
}
</script>
