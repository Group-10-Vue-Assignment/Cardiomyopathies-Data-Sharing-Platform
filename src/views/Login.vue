<template>
  <PageBanner>
    <template v-slot:title>Login Page</template>
    <template v-slot:description>
      Login to your account to add, view, search and remove specific or all
      types of data relating to cardiomyopathy.
    </template>
  </PageBanner>

  <form @submit.prevent="handleSubmit">
    <div v-if="error" class="white-text card-panel red">
      <span>{{ error }}</span>
    </div>
    <div class="card-panel">
      <div class="input-wrapper">
        <label>Enter your username (email address):</label>
        <input
          type="email"
          class="validate"
          min="5"
          max="50"
          placeholder="Email"
          v-model="email"
        />
      </div>
      <div class="input-wrapper">
        <label>Enter your password:</label>
        <input
          type="password"
          class="validate"
          placeholder="Password"
          v-model="password"
        />
      </div>
      <button
        type="submit"
        class="waves-effect waves-light btn-small blue-grey lighten-1"
      >
        Login
      </button>
    </div>
  </form>
  <div class="button">
    <router-link
      to="/signup"
      class="waves-effect waves-light btn-small green darken-1"
    >
      Sign Up
    </router-link>
  </div>
  <br />
  <div class="button">
    <router-link
      to="/forgotpassword"
      class="waves-effect waves-light btn-small red lighten-2"
    >
      Reset Password
    </router-link>
  </div>
</template>

<script>
import { ref } from "vue";
import PageBanner from "@/components/PageBanner.vue";
import useLogin from "../firebaseFunctions/useLogin.js";
import { useRouter } from "vue-router";
export default {
  name: "Login",
  components: {
    PageBanner
  },
  setup() {
    const router = useRouter();

    const { login, error } = useLogin();
    const email = ref(null);
    const password = ref(null);
    const handleSubmit = async () => {
      await login(email.value, password.value);
      router.push({ name: "GlobalDashboard" });
    };

    return { email, password, handleSubmit, error };
  }
};
</script>

<style scoped></style>
