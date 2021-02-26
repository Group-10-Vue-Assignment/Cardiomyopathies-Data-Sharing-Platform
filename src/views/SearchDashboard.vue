<template>
  <PageBanner>
    <template v-slot:title>Search Dashboard</template>
    <template v-slot:description>
      Search through the stored experimental data by Cardiomyopathy type and
      mutated gene type. This will return data we have stored, and external
      information from OMIM.
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
      <Suspense>
        <template #default>
          <Dashboard
            :userId="user.uid"
            :firebaseNextQueryResults="firebaseNextQueryResults"
            :firebasePreviousQueryResults="firebasePreviousQueryResults"
            @firebaseNextQuery="firebaseNextQuery($event)"
            @firebasePreviousQuery="firebasePreviousQuery($event)"
            :key="searchId"
          />
        </template>
        <template #fallback>
          <Loader />
        </template>
      </Suspense>
    </div>
    <p v-else>Please search for a graph, results will show here.</p>
  </div>
  <!-- fix wahab styling -->
  <div v-if="showData.length > 0">
    <div v-for="entry in showData" :key="entry">
      <Info :entry="entry.entry" />
    </div>
  </div>
</template>

<script>
import { reactive, ref, computed } from "vue";
import getUser from "../firebaseFunctions/getUser.js";
import BaseSelect from "@/components/BaseSelect.vue";
import Loader from "../components/Loader.vue";
import Info from "../components/Info.vue";
import PageBanner from "@/components/PageBanner.vue";
import { graphsCollection } from "@/firebase/config";
import Dashboard from "@/components/Dashboard.vue";

import {
  mutatedGeneTypes,
  cardiomyopathyTypes
} from "@/composables/sharedData.js";

export default {
  components: {
    Dashboard,
    BaseSelect,
    Loader,
    Info,
    PageBanner
  },
  setup() {
    const searchId = ref(0);

    const { user } = getUser();

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

    const extraData = ref([]);

    async function queryData() {
      chosenCardiomyopathyType.value = cardiomyopathyData.cardiomyopathyType;
      chosenMutatedGeneType.value = cardiomyopathyData.mutatedGeneType;

      console.log("reset");
      searchId.value += 1;

      const apiData = await fetch(
        `https://api.omim.org/api/entry/search?search=${chosenCardiomyopathyType.value}%20${chosenMutatedGeneType.value}&include=all&exclude=referenceList&exclude=externalLinks&exclude=contributors&format=json&start=0&limit=10&apiKey=tNhHB-RqSsSFIdWm5DPUOA`
      );

      let data = await apiData.json();

      let filteredData = data.omim.searchResponse.entryList
        .filter(e => e.entry.phenotypeMapList != null)
        .filter(e => e.entry.clinicalSynopsis.oldFormat == null);
      extraData.value = filteredData;
      console.log(extraData);
    }

    const showData = computed(() => {
      return extraData.value;
    });

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
      showData,
      firebaseNextQuery,
      firebaseNextQueryResults,
      firebasePreviousQuery,
      firebasePreviousQueryResults
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
