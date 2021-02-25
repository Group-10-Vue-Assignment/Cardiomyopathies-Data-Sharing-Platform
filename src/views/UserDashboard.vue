<template>
  <PageBanner>
    <template v-slot:title>User Dashboard</template>
    <template v-slot:description
      >Hello {{ userDetails.name }} from {{ userDetails.institution }}, these
      are your user details and available graph data.
    </template>
  </PageBanner>
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
import PageBanner from "@/components/PageBanner.vue";

export default {
  components: {
    UserGraph,
    Loader,
    PageBanner
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
