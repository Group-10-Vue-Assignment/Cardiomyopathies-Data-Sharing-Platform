/*eslint-disable */
<template>
  <form @submit.prevent="handleSubmit">
    <h3>Sign up</h3>
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
      type="tel"
      placeholder="Phone Number"
      v-model="phoneNumber"
    />
    <button class="waves-effect waves-light btn-small green">Register</button>
    <div v-if="error" class="error">{{ error }}</div>
    <div class="switch-user">
      Already have an account?
      <router-link to="/login">
        <button class="waves-effect waves-light btn-small blue">Login</button>
      </router-link>
    </div>
  </form>
</template>

<script>
/* eslint-disable */
import { ref } from "vue";
import useSignup from "../firebaseFunctions/useSignup.js";
import { useRouter } from "vue-router";
export default {
  setup() {
    function showPosition(position) {
      return position.coords.latitude, position.coords.longitude;
    }

    function getLocation() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
        console.log(navigator);
      } else {
      }
    }

    getLocation();

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

<style>
.error {
  font-size: 90%;
  color: white;
  text-align: center;
}

.switch-user {
  margin-top: 10px;
  text-align: center;
  color: #555;
  align-items: center;
  display: flex;
  justify-content: center;
  flex-direction: column;
}

.switch-user a {
  margin-top: 7px;
  text-decoration: none;
  color: rgb(255, 255, 255);
}

form {
  width: 35%;
  display: block;
  margin: 50px auto;
  text-align: left;
}

.icon_style{
    position: absolute;
    right: 10px;
    top: 10px;
    font-size: 20px;
    color: white;
    cursor:pointer; 
}

input[type="checkbox"] {
  display: inline-block;
  width: 16px;
  margin: 0 10px 0 0;
}

button:disabled {
  background-color: rgb(97 139 202 / 52%);
  cursor: -moz-grab;
}
</style>