<template>
  <div class="verify-section">
    <div v-if="user.emailVerified">
      <PageBanner>
        <template v-slot:title>Your Account Has Been Verified</template>
        <template v-slot:description>
          You may proceed across the website as normal.
        </template>
      </PageBanner>
    </div>
    <div v-else>
      <PageBanner>
        <template v-slot:title>Verify Your Email</template>
        <template v-slot:description>
          You need to verify your account by clicking the verification link in
          your (junk) email. <b>Once verified, please refresh the browser.</b>
        </template>
      </PageBanner>
      <div v-if="success" class="white-text card light-green lighten-1 popup">
        <span>{{ success }}</span>
      </div>
      <div v-if="error" class="white-text card-panel red popup">
        <span>{{ error }}</span>
      </div>
      <div v-if="!success" class="white-text card blue-grey popup">
        <span
          >Did not receive the verification email? Click on the button below to
          receive a new one. Make sure to check your spam/junk folder too.
        </span>
      </div>
      <button
        v-if="!success"
        @click="handleClick"
        class="waves-effect waves-light btn-small red lighten-2"
      >
        Verify Email
      </button>
    </div>
  </div>
</template>

<script>
import getUser from "../firebaseFunctions/getUser.js";
import PageBanner from "@/components/PageBanner.vue";
import { projectAuth } from "../firebase/config";
import { ref } from "vue";
export default {
  name: "VerifyEmail",
  components: {
    PageBanner
  },
  setup() {
    const { user } = getUser();
    const success = ref(null);
    const error = ref(null);

    const handleClick = async () => {
      await projectAuth.currentUser
        .sendEmailVerification()
        .then(() => {
          success.value =
            "Link was successfully delivered to your (junk) email.";
          error.value = "";
        })
        .catch(err => {
          error.value = err.message;
          success.value = "";
        });
    };
    return { user, handleClick, success, error };
  }
};
</script>
