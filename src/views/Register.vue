<template>
  <div class="flex justify-center px-2 py-2 items-center h-screen">
    <div class="lg:w-2/5  w-full bg-white px-6 py-6 rounded shadow">
      <h1 class="text-gray-700 text-2xl tracking-wide">Welcome,</h1>
      <h3 class="text-gray-800 text-lg tracking-wide">Please provide your details to register!</h3>
      <form class="mt-4" @submit.prevent="submit">
        <div class="mb-4 flex">
          <form-input label="First Name" type="text" v-model="form.firstName"/>
          <div class="ml-2"></div>
          <form-input label="Last Name" type="text" v-model="form.lastName"/>
        </div>
        <div class="mb-4 flex">

          <form-input label="Email" type="text" v-model="form.email"/>
        </div>


        <div class="mb-4 ">
          <form-input label="Password" type="password" v-model="form.password"/>
        </div>
        <div class="mb-4 ">
          <form-input label="Confirm Password" type="password" v-model="form.confirm_password"/>
          <span class="text-red-500 text-sm" v-if="errorMsg!=''">{{ errorMsg }}</span>
        </div>
        <div class="mb-4 ">
          <div class="flex justify-between items-center">
            <router-link to="/login" class="text-blue-600 hover:text-blue-500 duration-100">Login Here!</router-link>
            <submit-button text="Create Account" :loading="loading" loading_text="Creating Account..."/>
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
  name: 'Register',
  components: {SubmitButton, FormInput},
  data() {
    return {
      form: {
        firstName: '',
        lastName: '',
        email: "",
        gender: "male",
        maritalStatus: "single",
        nationality: "rwanda",
        phoneNumber: "250",
        dateOfBirth: "",
        username: '',
        password: '',
        confirm_password: '',
        profilePicture: null,
      },
      loading: false,
      failed: false,
      errorMsg: ''
    }
  },
  methods: {
    async submit() {
      if (this.form.password != this.form.confirm_password) {
        console.log("Not equal");
        this.errorMsg = "Password confirmation doesn't match";
        return;
      }

      try {
        this.loading = true;
        const {data} = await axios.post("/register", {
          name: this.form.firstName + " " + this.form.lastName,
          email: this.form.email,
          password: this.form.password
        })
        console.log(data);
        this.$router.push("/login")
      } catch (e) {
        this.failed = true;
        if (e.response.status === 400) {
          const msg = e.response.data.message
          this.errorMsg = typeof msg == "string" ? msg : msg[0]
        } else
          this.errorMsg = "Something went wrong."

      } finally {
        this.loading = false;
      }

    }
  }
}
</script>