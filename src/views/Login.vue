<template>
  <form @submit.prevent="handleSubmit">
    <h3 class="header">Login</h3>
    <div v-if="error" class="white-text card-panel red">
      <span>{{ error }}</span>
    </div>
    <div class="card-panel col s10 m10">
      <label>Enter your username (Email):</label>
      <input
        class="validate"
        type="email"
        min="5"
        max="50"
        placeholder="Email"
        v-model="email"
      />
      <label>Enter your password:</label>
      <input
        class="validate"
        type="password"
        placeholder="Password"
        v-model="password"
      />
    </div>
    <button class="waves-effect waves-light btn-small blue-grey lighten-1">
      Login
    </button>
    <p class="noSelect">⠀</p>
    <h6 class="header">Haven't registered or forgotten your password?</h6>
    <br />
    <center>
      <div class="button">
        <router-link to="/signup">
          <button class="waves-effect waves-light btn-small green lighten-1">
            Sign Up
          </button>
        </router-link>
      </div>
      <div class="button">
        <router-link to="/forgotpassword">
          <button class="waves-effect waves-light btn-small red lighten-2">
            Reset Password
          </button>
        </router-link>
      </div>
    </center>
  </form>
</template>

<script>
import { ref } from "vue";
import useLogin from "../firebaseFunctions/useLogin.js";
import { useRouter } from "vue-router";
export default {
  setup() {
    const router = useRouter();

    const { login, error } = useLogin();
    const email = ref(null);
    const password = ref(null);
    const handleSubmit = async () => {
      await login(email.value, password.value);
      router.push({ name: "UserDashboard" });
    };

    return { email, password, handleSubmit, error };
  }
};
</script>

<style>
form {
  width: 35%;
  display: block;
  margin: 50px auto;
  text-align: left;
}

.button {
  padding: 1%;
}
</style>
