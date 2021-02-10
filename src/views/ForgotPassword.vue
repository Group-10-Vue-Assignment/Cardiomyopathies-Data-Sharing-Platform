<template>
  <form @submit.prevent="handleSubmit">
    <h3>Forgotten password?</h3>
    <input type="email" placeholder="Email" v-model="email" />

    <div v-if="success" class="success">
      Link was successfully sent to email, also check in junk
    </div>
    <div v-if="error" class="error">{{ error }}</div>

    <button>Send email link</button>

    <div class="switch-user">
      <router-link to="/login">Back to login</router-link>
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
  color: chartreuse;
}
</style>
