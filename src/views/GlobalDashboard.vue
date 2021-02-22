<template>
  <div class="col s6 m6">
    <div class="card blue-grey darken-1">
      <div class="card-content white-text">
        <span class="card-title">Global Dashboard</span>
        <p>
          The graphs generated on this page are the ones that have been created
          by other people.
        </p>
      </div>
    </div>
  </div>
  <div v-if="error">{{ error }}</div>
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
  async setup() {
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
.userDetails {
  color: white;
}
</style>
