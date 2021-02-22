<template>
  <form @submit.prevent="handleSubmit">
    <div class="col s6 m6">
      <div class="card blue-grey darken-1">
        <div class="card-content white-text">
          <span class="card-title">Forgot Password</span>
          <p>
            Enter your email below to be sent a one-time link to reset your
            password.
          </p>
        </div>
      </div>
    </div>
    <input class="validate" type="email" placeholder="Email" v-model="email" />

    <div v-if="success" class="white-text card light-green darken-1 success">
      Link was successfully delivered to your email, please also check your junk
      folder.
    </div>
    <div v-if="error" class="white-text card red darken-1">{{ error }}</div>

    <button class="waves-effect waves-light btn-small blue-grey lighten-1">
      Reset Password
    </button>

    <div class="switch-user">
      <br />
      <button class="waves-effect waves-light btn-small blue-grey lighten-1">
        <router-link to="/login">Return to login</router-link>
      </button>
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

<style>
.success {
  margin: 21px;
  text-align: center;
  color: #28a745;
}
</style>
