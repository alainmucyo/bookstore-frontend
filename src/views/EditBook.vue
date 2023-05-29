<template>
  <div class="flex justify-center py-6 px-3">
    <div class="lg:w-1/2 w-full bg-white rounded p-4 shadow">
      <div class="flex justify-between">
        <h1 class="text-xl text-gray-600">Edit Book</h1>
        <router-link to="/" class="text-blue-500 hover:text-blue-800">All Books</router-link>
      </div>
      <hr class="my-6">
      <form @submit.prevent="submitForm">
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="title">Title</label>
          <input
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="title" v-model="book.title" type="text" placeholder="Title" required>
        </div>

        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="image_url">Image URL</label>
          <input
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="image_url" v-model="book.image_url" type="url" placeholder="Image URL" required>
        </div>

        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="description">Description</label>
          <textarea
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="description" v-model="book.description" placeholder="Description" required></textarea>
        </div>

        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="author">Author</label>
          <select
              class="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="author" v-model="book.author_id" required>
            <option disabled value="">Please select one</option>
            <option v-for="author in authors" :key="author.id" :value="author.id">{{ author.first_name }}
              {{ author.last_name }}
            </option>
          </select>
        </div>

        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="price">Price</label>
          <input
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="price" v-model="book.price" type="number" step="0.01" placeholder="Price" required>
        </div>

        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="published">Published Date</label>
          <input
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="published" v-model="book.published" type="date" required>
        </div>

        <div class="flex items-center justify-between">
          <button
              class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit">Update
          </button>
          <button
              class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button" @click="deleteBook">Delete
          </button>
        </div>
      </form>

    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: 'EditBook',
  data() {
    return {
      book: null,
      authors: [],
    }
  },
  methods: {
    async loadBook() {
      try {
        const {data} = await axios.get(`/books/${this.$route.params.id}`);
        this.book = data.data;
        this.book.author_id = this.book.author.id;
        this.book.published = new Date(this.book.published).toISOString().split('T')[0];
      } catch (e) {
        console.error(e);
      }
    },
    async loadAuthors() {
      try {
        const {data} = await axios.get("/authors");
        this.authors = data.data;
      } catch (e) {
        console.error(e);
      }
    },
    async submitForm() {
      try {
        const {data} = await axios.put(`/books/${this.$route.params.id}`, {
          ...this.book,
          price: Number(this.book.price),
          published: new Date(this.book.published)
        });
        console.log(data);
        // After successfully updating the book, redirect to the book details page.
        this.$router.push(`/book/${this.$route.params.id}`);
      } catch (e) {
        console.error(e);
      }
    },
    async deleteBook() {
      try {
        await axios.delete(`/books/${this.$route.params.id}`);
        // After successfully deleting the book, redirect to the home page.
        this.$router.push(`/home`);
      } catch (e) {
        console.error(e);
      }
    },
  },
  created() {
    this.loadBook();
    this.loadAuthors();
  }
}
</script>
