<template>
  <div class="col s6 m6">
    <div class="card blue-grey darken-1">
      <div class="card-content white-text">
        <span class="card-title">User Dashboard</span>
        <p>
          Hello {{ userDetails.name }} from {{ userDetails.institution }}, these
          are your user details and available graph data.
        </p>
      </div>
    </div>
  </div>
  <div v-if="error">{{ error }}</div>
  <div>
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
