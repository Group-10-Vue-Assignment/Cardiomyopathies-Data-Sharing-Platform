<template>
  <PageBanner>
    <template v-slot:title>Register Page</template>
    <template v-slot:description>
      Create an account to add, view, search and remove specific or all types of
      data relating to cardiomyopathy.
    </template>
  </PageBanner>

  <form @submit.prevent="handleSubmit">
    <div class="card-panel blue-grey col s10 m10">
      <label>Enter your name:</label>
      <input
        class="validate"
        type="text"
        placeholder="Name"
        v-model="displayName"
        required
      />
      <label
        >Enter the institution you affiliate with (leave blank if none):</label
      >
      <input
        class="validate"
        type="text"
        placeholder="Institutional Affiliation"
        v-model="institution"
        required
      />
      <label>Enter your email address (required):</label>
      <input
        class="validate"
        type="email"
        placeholder="Email*"
        v-model="email"
        required
      />
      <label>Enter your password (required):</label>
      <input
        class="validate"
        type="password"
        placeholder="Password*"
        v-model="password"
        required
      />
      <label>Enter your address:</label>
      <input
        class="validate"
        type="text"
        placeholder="Address"
        v-model="address"
      />
      <label>Enter your number:</label>
      <input
        class="validate"
        type="number"
        placeholder="Phone Number"
        v-model="phoneNumber"
      />
      <button class="waves-effect waves-light btn-small green lighten-1">
        Register
      </button>
    </div>
  </form>
  <div v-if="error" class="white-text card-panel red">
    <span>{{ error }}</span>
  </div>
  <div>
    <br />

    <router-link
      to="/login"
      class="waves-effect waves-light btn-small blue-grey lighten-1"
      >Return to Login</router-link
    >
  </div>
</template>

<script>
/* eslint-disable */
import { ref } from "vue";
import useSignup from "../firebaseFunctions/useSignup.js";
import { useRouter } from "vue-router";
import PageBanner from "@/components/PageBanner.vue"
export default {
  components: {
    PageBanner,
  },
  setup() {
    const router = useRouter();

    //setting up input refs
    const { error, signup } = useSignup();
    const displayName = ref(null);
    const institution = ref(null);
    const email = ref(null);
    const password = ref(null);
    const address = ref(null);
    const phoneNumber = ref(null);

    //sigm up user function
    const handleSubmit = async () => {
      await signup(
        email.value,
        password.value,
        displayName.value,
        institution.value,
        address.value,
        phoneNumber.value
      );

      if (!error.value) {
        console.log("user signed up");
        router.push({ name: "DashBoard" });
      }
    };

    return {
      displayName,
      institution,
      email,
      handleSubmit,
      password,
      address,
      phoneNumber,
      error,
    };
  },
};
</script>

<style scoped>
a {
  color: white;
}
form {
  margin-bottom: 0px;
}
</style>