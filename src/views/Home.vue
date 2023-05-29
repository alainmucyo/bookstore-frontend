<template>
  <div class="flex justify-center py-6 px-3">
    <div class="lg:w-1/2 w-full bg-white rounded p-4 shadow">
      <div v-if="user" class="mb-2 flex justify-between items-center">
        <div>
          <h1 class="text-xl text-gray-600">Hello <b>{{ user.name }}</b>!
          </h1>

        </div>

        <a href="#" @click.prevent="logout" class="text-red-600">Logout</a>
      </div>
      <hr class="my-6 ">
      <BookCreate/>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import BookCreate from "@/components/BookCreate.vue";


export default {
  name: 'Home',
  components: {BookCreate},
  data() {
    return {
      transactions: [],
      user: null
    }
  },
  methods: {
    async loadUser() {
      try {
        const {data} = await axios.get("/check");
        this.user = data.data;
      } catch (e) {
        if (e.response.status === 401) {
          this.logout()
        }
      }

    },

    logout() {
      localStorage.removeItem("token");
      this.$store.dispatch("setAuth", false);
      this.$store.dispatch("setToken", '');
      this.$router.push("/login")
    }
  },
  computed: {
    state() {
      if (!this.user) return {state: "Loading...", background: "", color: ""}
      if (this.user.state.toLowerCase().includes("pending")) {
        return {state: "Pending", background: "bg-blue-200", color: "text-blue-800"}
      }
      if (this.user.state.toLowerCase().includes("unverified")) {
        return {state: "Unverified", background: "bg-red-200", color: "text-red-800"}
      }
      return {state: "Verified", background: "bg-green-200", color: "text-green-800"}
    }
  },
  created() {
    this.loadUser();

  }
}
</script>