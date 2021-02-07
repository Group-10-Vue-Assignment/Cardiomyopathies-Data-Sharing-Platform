/*eslint-disable */
<template>
  <form @submit.prevent="handleSubmit">
    <h3>Sign up</h3>
    <input type="text" placeholder="name" v-model="displayName" required />
    <input
      type="text"
      placeholder="institutional affiliation "
      v-model="institution"
      required
    />
    <input type="email" placeholder="Email" v-model="email" required />
    <input type="password" placeholder="Password" v-model="password" required />
    <input type="address" placeholder="address" v-model="address" />
    <input
      type="tel"
      placeholder="phone number"
      name="phone"
      v-model="phoneNumber"
    />

    <button>Registar</button>
    <div class="switch-user">
      <router-link to="/login"> Already have an account?</router-link>
    </div>

    <div v-if="error" class="error">{{ error }}</div>
  </form>
</template>

<script>
/* eslint-disable */
import { ref } from 'vue';
import useSignup from '../firebaseFunctions/useSignup.js';
import { useRouter } from 'vue-router';
export default {
  setup() {
    //getting user locations

    const longitude = ref(0);
    const latitude = ref(0);

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
        console.log('user signed up');
        router.push({ name: 'DashBoard' });
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
.error {
  margin: 20px;
  text-align: center;
  color: red;
}

.switch-user {
  margin-top: 15px;
  text-align: center;
  color: #555;
}

.switch-user a {
  text-decoration: none;
  color: #555;
}

form {
  width: 450px;
  margin: 10px auto;
  background: white;
  text-align: left;
  padding: 40px;
  border-radius: 10px;
}

form h3 {
  margin-left: 15px;
  margin-bottom: 20px;
}

input,
select {
  display: block;
  padding: 15px;
  width: 100%;
  box-sizing: border-box;
  border: none;
  border-bottom: 1px solid #ddd;
  color: #555;
}
input[type='checkbox'] {
  display: inline-block;
  width: 16px;
  margin: 0 10px 0 0;
}

button {
  display: block;
  background: #0b6dff;
  border: 0;
  margin: auto;
  padding: 10px 20px;
  cursor: pointer;
  margin-top: 20px;
  color: white;
  border-radius: 20px;
}
</style>
