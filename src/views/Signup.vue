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
    <input type="tel" id="phone" name="phone" v-model="phoneNumber" />
    <div v-if="error" class="error">{{ error }}</div>
    <button v-if="!isPending">Registar</button>
    <button v-if="isPending" disabled>Loading...</button>
  </form>
</template>

<script>
/* eslint-disable */
import { ref } from 'vue';
import useSignup from '../firebaseFunctions/useSignup.js';
export default {
  setup() {
    const { error, signup, isPending } = useSignup();
    const displayName = ref(null);
    const institution = ref(null);
    const email = ref(null);
    const password = ref(null);
    const address = ref(null);
    const phoneNumber = ref(null);

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
    };
  },
};
</script>

<style></style>
