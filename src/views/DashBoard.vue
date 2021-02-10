<template>
  <h1>User dashboard</h1>

  <div v-if="error">{{ error }}</div>
  <div v-if="userDetails">
    <label>{{ userDetails.name }}</label>
    <br />
    <label>{{ userDetails.institution }}</label>
  </div>
  <div>
    <Suspense>
      <GraphsCollection :userId="user.uid" />
    </Suspense>
  </div>
</template>

<script>
import getUser from "../firebaseFunctions/getUser.js";
import getUserDetails from "../firebaseFunctions/getUserDetails.js";
import GraphsCollection from "@/components/GraphsCollection.vue";

export default {
  components: {
    GraphsCollection
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

<style></style>
