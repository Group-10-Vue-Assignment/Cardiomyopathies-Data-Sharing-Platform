<template>
  <PageBanner>
    <template v-slot:title>Reset Password</template>
    <template v-slot:description>
      Enter your email below to be sent a one-time link to reset your password.
    </template>
  </PageBanner>
  <form @submit.prevent="handleSubmit">
    <div class="card-panel">
      <label>Enter your email address:</label>
      <input
        class="validate"
        type="email"
        placeholder="Email"
        v-model="email"
      />
      <button class="waves-effect waves-light btn-small red lighten-2">
        Reset Password
      </button>
    </div>
  </form>
  <div v-if="success" class="white-text card light-green lighten-1 popup">
    <span>Link was successfully delivered to your (junk) email.</span>
  </div>
  <div v-if="error" class="white-text card-panel red popup">
    <span>{{ error }}</span>
  </div>
  <router-link
    to="/login"
    class="waves-effect waves-light btn-small blue-grey lighten-1"
    >Return to login
  </router-link>
</template>

<script>
import { ref } from "vue";
import { projectAuth } from "../firebase/config.js";
import PageBanner from "@/components/PageBanner.vue";
export default {
  components: {
    PageBanner
  },
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
form {
  margin-bottom: 0px;
}

.popup {
  padding: 2%;
  text-align: center;
}
</style>
