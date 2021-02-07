<template>
  <h1>User dashboard</h1>

  <div v-if="error">{{ error }}</div>
  <div v-if="userDetails">
    <label>{{ userDetails.name }}</label>
    <br />
    <label>{{ userDetails.institution }}</label>
  </div>
</template>

<script>
import getUser from "../firebaseFunctions/getUser.js";
import getUserDetails from "../firebaseFunctions/getUserDetails.js";
export default {
  setup() {
    //will get user auth
    const { user } = getUser();

    //will get other use details such as phone number, address institution
    const { userDetails, error } = getUserDetails(`${user.value.uid}`);
    console.log(userDetails.value);

    return { userDetails, error };
  }
};
</script>

<style></style>
