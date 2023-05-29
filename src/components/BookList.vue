<template>
  <div class="flex flex-wrap p-6">
    <router-link v-for="book in books" :key="book.id" :to="`/book/${book.id}`"
                 class="max-w-sm rounded overflow-hidden shadow-lg m-4 no-underline text-black">

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
      </div>
    </router-link>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: 'BookList',
  data() {
    return {
      books: []
    }
  },
  async created() {
    try {
      const {data} = await axios.get('/books');
      this.books = data.data;
    } catch (e) {
      console.error(e);
    }
  }
}
</script>
