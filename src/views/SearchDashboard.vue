<template>
  <PageBanner>
    <template v-slot:title>Search Dashboard</template>
    <template v-slot:description>
      Search through the stored experimental data by Cardiomyopathy type and
      mutated gene type. This will return data we have stored, as well as
      external information from OMIM, NCBI and HPO.
    </template>
  </PageBanner>
  <div class="row">
    <div class="col s6 m6">
      <form @submit.prevent="queryData">
        <h5 class="header">Select Filters</h5>
        <BaseSelect
          :options="cardiomyopathyTypeOptions"
          v-model="cardiomyopathyData.cardiomyopathyType"
          label="Select Cardiomyopathy Type"
        />
        <br />
        <BaseSelect
          :options="mutatedGeneTypeOptions"
          v-model="cardiomyopathyData.mutatedGeneType"
          label="Select Mutated Gene Type"
        />

        <br />
        <button
          class="waves-effect waves-light btn-small blue-grey lighten-1"
          type="submit"
        >
          Search
        </button>
      </form>
    </div>
    <div
      class="col s6 m6"
      v-if="chosenCardiomyopathyType && chosenMutatedGeneType"
    >
      <div v-show="internalDataLoaded">
        <Suspense>
          <Dashboard
            :userId="user.uid"
            :firebaseNextQueryResults="firebaseNextQueryResults"
            :firebasePreviousQueryResults="firebasePreviousQueryResults"
            @firebaseNextQuery="firebaseNextQuery($event)"
            @firebasePreviousQuery="firebasePreviousQuery($event)"
            :key="searchId"
            @internalDataLoaded="internalDataLoaded = true"
          />
        </Suspense>
      </div>
      <div v-show="!internalDataLoaded">
        <Loader />
      </div>
    </div>
    <p v-else>Please search for a graph, results will show here.</p>
  </div>
  <div class="row">
    <div class="col s12">
      <div v-show="externalDataLoaded">
        <Suspense>
          <ExternalInformation
            :chosenMutatedGeneType="chosenMutatedGeneType"
            :chosenCardiomyopathyType="chosenCardiomyopathyType"
            :key="searchId"
            @externalDataLoaded="externalDataLoaded = true"
          />
        </Suspense>
      </div>
      <div v-show="!externalDataLoaded">
        <Loader />
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, ref } from "vue";
import getUser from "../firebaseFunctions/getUser.js";
import BaseSelect from "@/components/BaseSelect.vue";
import Loader from "../components/Loader.vue";
import PageBanner from "@/components/PageBanner.vue";
import { graphsCollection } from "@/firebase/config";
import Dashboard from "@/components/Dashboard.vue";
import ExternalInformation from "@/components/ExternalInformation.vue";
import {
  mutatedGeneTypes,
  cardiomyopathyTypes
} from "@/composables/sharedData.js";

export default {
  components: {
    Dashboard,
    BaseSelect,
    Loader,
    PageBanner,
    ExternalInformation
  },
  setup() {
    // To update the components used on this page, we will attach a :key to them,
    // and on each search we will increment it - forcing the component to update.
    const searchId = ref(0);

    const { user } = getUser();

    const internalDataLoaded = ref(true);
    const externalDataLoaded = ref(true);

    const cardiomyopathyData = createFreshCardiomyopathySearchObject();
    // matches graphs on firebase, havent included graphdata
    function createFreshCardiomyopathySearchObject() {
      return reactive({
        cardiomyopathyType: "",
        mutatedGeneType: "",
        userId: user.value.uid
      });
    }

    let mutatedGeneTypeOptions = ref(mutatedGeneTypes);
    let cardiomyopathyTypeOptions = ref(cardiomyopathyTypes);
    const chosenCardiomyopathyType = ref("");
    const chosenMutatedGeneType = ref("");

    async function queryData() {
      chosenCardiomyopathyType.value = cardiomyopathyData.cardiomyopathyType;
      chosenMutatedGeneType.value = cardiomyopathyData.mutatedGeneType;

      console.log("reset");
      searchId.value += 1;
      internalDataLoaded.value = false;
      externalDataLoaded.value = false;
    }

    let graphPaginationLimit = 1;
    const firebaseNextQueryResults = ref({});
    const firebasePreviousQueryResults = ref({});

    // Both the firebaseNextQuery method and firebasePreviousQuery
    // is linked to the dashboard component via emits up, and props down
    function firebaseNextQuery(lastVisible) {
      firebaseNextQueryResults.value = graphsCollection
        .where("cardiomyopathyType", "==", chosenCardiomyopathyType.value)
        .where("mutatedGeneType", "==", chosenMutatedGeneType.value)
        .orderBy("timeOfInsert", "desc")
        .startAfter(lastVisible)
        .limit(graphPaginationLimit);
    }

    function firebasePreviousQuery(firstVisible) {
      firebasePreviousQueryResults.value = graphsCollection
        .where("cardiomyopathyType", "==", chosenCardiomyopathyType.value)
        .where("mutatedGeneType", "==", chosenMutatedGeneType.value)
        .orderBy("timeOfInsert", "desc")
        .endBefore(firstVisible)
        .limitToLast(graphPaginationLimit);
    }

    return {
      searchId,
      cardiomyopathyData,
      mutatedGeneTypeOptions,
      cardiomyopathyTypeOptions,
      chosenCardiomyopathyType,
      chosenMutatedGeneType,
      user,
      queryData,
      firebaseNextQuery,
      firebaseNextQueryResults,
      firebasePreviousQuery,
      firebasePreviousQueryResults,
      internalDataLoaded,
      externalDataLoaded
    };
  }
};
</script>

<style scoped>
.search-btns {
  display: flex;
}

.graphs {
  gap: 332px;
}
</style>
