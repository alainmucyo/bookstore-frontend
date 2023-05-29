<template>
  <div class="flex justify-center items-center px-2 py-2 h-screen">
    <div class="lg:w-2/5 w-full bg-white px-6 py-6 rounded shadow">
      <router-link to="/"><h1 class="text-gray-700 text-2xl tracking-wide">Welcome to <span class="text-blue-600">Bookstore</span>,</h1></router-link>
      <h3 class="text-gray-800 text-lg tracking-wide">Please login to your account!</h3>
      <form class="mt-4" @submit.prevent="submit">
        <div class="mb-4 ">
          <form-input label="Email" type="text" v-model="form.email"/>
        </div>
        <div class="mb-4 ">
          <form-input label="Password" type="password" v-model="form.password"/>
          <span class="text-red-500 text-sm" v-if="failed">{{ errorMsg }}</span>
        </div>
        <div class="mb-4 ">
          <div class="flex justify-between items-center">
            <router-link to="/register" class="text-blue-600 hover:text-blue-500 duration-100">Create Account Here!
            </router-link>
            <submit-button text="Login" :loading="loading" loading_text="Logging in..."/>
          </div>
          <div class="flex justify-end mt-4">
            <router-link to="/reset-password" class="text-blue-600 hover:text-blue-500 duration-100">Reset password
            </router-link>
          </div>

        </div>
      </form>

    </div>
  </div>
</template>

<script>
import FormInput from "../components/shared/form-input";
import SubmitButton from "../components/shared/submit-button";
import axios from "axios";

export default {
  name: 'Login',
  components: {SubmitButton, FormInput},
  data() {
    return {
      form: {
        email: '',
        password: '',
      },
      loading: false,
      failed: false,
      errorMsg: ''
    }
  },
  methods: {
    async submit() {
      try {

        this.loading = true;
        const {data} = await axios.post("/login", this.form)
        console.log(data)
        this.$toast.success("Login succeed", {position: "top-right"})
        const token = data.data.token;
        localStorage.setItem("token", token);
        await this.$store.dispatch("setToken", token)
        await this.$store.dispatch("setAuth", true)
        axios.interceptors.request.use(function (config) {
          config.headers.Authorization = `Bearer ${token}`;
          return config;
        });
       await this.$router.push("/home")
      } catch (e) {
        console.log(e)
        this.failed = true;
        if (e.response.status === 400) {
          this.errorMsg = "Wrong email or password."
          this.$toast.error(e.response.data.error, {position: "top-right",duration:0})
        } else
          this.errorMsg = "Something went wrong."

      } finally {
        this.loading = false;
      }

    }
  }
}
</script>