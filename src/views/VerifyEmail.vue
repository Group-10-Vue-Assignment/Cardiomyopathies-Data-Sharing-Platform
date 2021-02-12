<template>
  <div class="verify-section">
    <div v-if="user.emailVerified">
      <h1>Your account has been successfully verified by email</h1>
    </div>
    <div v-else>
      <h1>Your account needs to be verified</h1>
      <p class="verify-message">
        Please check your email for a verification link, or click the button
        below to recieve a new link
      </p>
      <button v-if="!success" @click="handleClick">verify email</button>
    </div>
    <div v-if="error" class="error">{{ error }}</div>
    <div v-if="success" class="success">{{ success }}</div>
  </div>
</template>

<script>
//import ref from "../firebaseFunctions/getUser.js";
import getUser from "../firebaseFunctions/getUser.js";
import { projectAuth } from "../firebase/config";
import { ref } from "vue";
export default {
  setup() {
    const { user } = getUser();
    const success = ref(null);
    const error = ref(null);

    const handleClick = async () => {
      await projectAuth.currentUser
        .sendEmailVerification()
        .then(() => {
          success.value = "Link was successfully sent, also check junk";
          error.value = "";
        })
        .catch(err => {
          error.value = err.message;
          success.value = "";
        });
      success.value = "Link was successfully sent, also check junk";
      console.log("Clicked");
    };
    return { user, handleClick, success, error };
  }
};
</script>

<style>
.verify-section {
  margin: 100px;
}

.verify-message {
  margin: 20px;
}
</style>
