<template>
  <h1>Global Dashboard</h1>
  <h3>Graphs created by everyone (sorted by newest first *todo*)</h3>
  <div v-if="error">{{ error }}</div>
  <div class="userDetails" v-if="userDetails">
    <label>{{ userDetails.name }}</label>
    <br />
    <label>{{ userDetails.institution }}</label>
  </div>
  <div>
    <Suspense>
      <template #default>
        <GlobalGraph />
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
import GlobalGraph from "@/components/GlobalGraph.vue";
import Loader from "../components/Loader.vue";

export default {
  components: {
    GlobalGraph,
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
