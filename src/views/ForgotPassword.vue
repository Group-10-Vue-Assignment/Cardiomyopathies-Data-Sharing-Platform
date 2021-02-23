<template>
  <form @submit.prevent="handleSubmit">
    <div class="card blue-grey darken-1">
      <div class="card-content white-text">
        <span class="card-title">Forgot Password</span>
        <p>
          Enter your email below to be sent a one-time link to reset your
          password.
        </p>
      </div>
    </div>
    <div class="card-panel col s10 m10">
      <label>Enter your email address:</label>
      <input
        class="validate"
        type="email"
        placeholder="Email"
        v-model="email"
      />
    </div>
    <div v-if="success" class="white-text card light-green lighten-1 popup">
      <span>Link was successfully delivered to your (junk) email.</span>
    </div>
    <div v-if="error" class="white-text card-panel red popup">
      <span>{{ error }}</span>
    </div>
    <button class="waves-effect waves-light btn-small red lighten-2">
      Reset Password
    </button>
    <div>
      <br />
      <h6 class="header">Retrieved your password?</h6>
      <br />
      <center>
        <button class="waves-effect waves-light btn-small blue-grey lighten-1">
          <router-link to="/login">Return to login</router-link>
        </button>
      </center>
    </div>
  </form>
</template>

<script>
import { ref } from "vue";
import { projectAuth } from "../firebase/config.js";
export default {
  setup() {
    const email = ref("");
    const error = ref("");
    const success = ref(false);

    const handleSubmit = async () => {
      await projectAuth
        .sendPasswordResetEmail(email.value)
        .then(() => {
          success.value = true;
          error.value = "";
        })
        .catch(err => {
          error.value = err.message;
          success.value = false;
        });
    };

    return { email, handleSubmit, error, success };
  }
};
</script>

<style scoped>
a {
  color: white;
}

.popup {
  padding: 2%;
  text-align: center;
}
</style>
