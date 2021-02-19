<template>
  <h1>User Dashboard</h1>
  <h3>Graphs Created By You</h3>
  <div v-if="error">{{ error }}</div>
  <div class="userDetails" v-if="userDetails">
    <label>{{ userDetails.name }}</label>
    <br />
    <label>{{ userDetails.institution }}</label>
  </div>
  <div>
    <Suspense>
      <template #default>
        <UserGraph :userId="user.uid" />
      </template>
      <template #fallback>
        <Loader />
      </template>
    </Suspense>
  </div>
</template>

<script>
import getUser from "../firebaseFunctions/getUser.js";
import getUserDetails from "../firebaseFunctions/getUserDetails.js";
import UserGraph from "@/components/UserGraph.vue";
import Loader from "../components/Loader.vue";

export default {
  components: {
    UserGraph,
    Loader
  },
  setup() {
    //will get user auth
    const { user } = getUser();

    //will get other use details such as phone number, address institution
    const { userDetails, error } = getUserDetails(`${user.value.uid}`);
    console.log(userDetails.value);

    return { user, userDetails, error };
  }
};
</script>

<style>
h1 {
  padding: 0.5%;
}
.userDetails {
  padding: 0.5%;
}
</style>