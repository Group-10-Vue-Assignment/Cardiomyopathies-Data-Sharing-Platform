<template>
  <PageBanner>
    <template v-slot:title>User Dashboard</template>
    <template v-slot:description>
      <Suspense>
        <template #default>
          <UserInformation :userId="user.uid" />
        </template>
        <template #fallback>
          <Loader />
        </template>
      </Suspense>
    </template>
  </PageBanner>

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
import Loader from "../components/Loader.vue";
import PageBanner from "@/components/PageBanner.vue";
import { ref } from "vue";
import { graphsCollection } from "@/firebase/config";
import Dashboard from "@/components/Dashboard.vue";
import UserInformation from "@/components/UserInformation.vue";

export default {
  components: {
    Dashboard,
    Loader,
    PageBanner,
    UserInformation
  },
  setup() {
    //will get user auth
    const { user } = getUser();

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
      firebaseNextQuery,
      firebaseNextQueryResults,
      firebasePreviousQuery,
      firebasePreviousQueryResults
    };
  }
};
</script>
