<template>
  <PageBanner>
    <template v-slot:title>User Dashboard</template>
    <template v-slot:description
      >Hello {{ userDetails.name }} from {{ userDetails.institution }}, these
      are your user details and available graph data.
    </template>
  </PageBanner>
  <div v-if="error">{{ error }}</div>

  <Suspense>
    <template #default>
      <Dashboard
        :userId="user.uid"
        :firebaseNextQueryResults="firebaseNextQueryResults"
        :firebasePreviousQueryResults="firebasePreviousQueryResults"
        @firebaseNextQuery="firebaseNextQuery($event)"
        @firebasePreviousQuery="firebasePreviousQuery($event)"
      />
    </template>
    <template #fallback>
      <Loader />
    </template>
  </Suspense>
</template>

<script>
import getUser from "../firebaseFunctions/getUser.js";
import getUserDetails from "../firebaseFunctions/getUserDetails.js";
import Loader from "../components/Loader.vue";
import PageBanner from "@/components/PageBanner.vue";
import { ref } from "vue";
import { graphsCollection } from "@/firebase/config";
import Dashboard from "@/components/Dashboard.vue";

export default {
  components: {
    Dashboard,
    Loader,
    PageBanner
  },
  setup() {
    //will get user auth
    const { user } = getUser();

    //will get other use details such as phone number, address institution
    const { userDetails, error } = getUserDetails(`${user.value.uid}`);

    let graphPaginationLimit = 1;
    const firebaseNextQueryResults = ref({});
    const firebasePreviousQueryResults = ref({});

    // Both the firebaseNextQuery method and firebasePreviousQuery
    // is linked to the dashboard component via emits up, and props down
    function firebaseNextQuery(lastVisible) {
      firebaseNextQueryResults.value = graphsCollection
        .where("userId", "==", user.value.uid)
        .orderBy("timeOfInsert", "desc")
        .startAfter(lastVisible)
        .limit(graphPaginationLimit);
    }

    function firebasePreviousQuery(firstVisible) {
      firebasePreviousQueryResults.value = graphsCollection
        .where("userId", "==", user.value.uid)
        .orderBy("timeOfInsert", "desc")
        .endBefore(firstVisible)
        .limitToLast(graphPaginationLimit);
    }

    return {
      user,
      userDetails,
      error,
      firebaseNextQuery,
      firebaseNextQueryResults,
      firebasePreviousQuery,
      firebasePreviousQueryResults
    };
  }
};
</script>
