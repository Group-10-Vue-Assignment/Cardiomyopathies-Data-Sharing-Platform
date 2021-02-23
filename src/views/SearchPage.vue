<template>
  <div>
    <section class="container">
      <div class="search">
        <h2>Search Graphs</h2>
        <form @submit.prevent="queryData">
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

          <button type="submit">Search</button>
        </form>
      </div>
      <div
        class="graphs"
        v-if="chosenCardiomyopathyType && chosenMutatedGeneType"
      >
        <Suspense>
          <template #default>
            <SearchGraph
              :cardiomyopathyTypeValue="chosenCardiomyopathyType"
              :mutatedGeneTypeValue="chosenMutatedGeneType"
              :key="searchId"
            />
          </template>
          <template #fallback>
            <Loader />
          </template>
        </Suspense>
      </div>
    </section>

    <div v-if="showData.length">
      <div v-for="entry in showData" :key="entry">
        <Info :entry="entry.entry" />
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, ref, computed } from "vue";
import getUser from "../firebaseFunctions/getUser.js";
import BaseSelect from "@/components/BaseSelect.vue";
import getUserDetails from "../firebaseFunctions/getUserDetails.js";
import SearchGraph from "@/components/SearchGraph.vue";
import Loader from "../components/Loader.vue";
import Info from "../components/Info.vue";
import {
  mutatedGeneTypes,
  cardiomyopathyTypes
} from "@/composables/sharedData.js";

export default {
  components: {
    SearchGraph,
    BaseSelect,
    Loader,
    Info
  },
  setup() {
    const searchId = ref(0);

    const hideCardioType = ref(false);
    const hideGeneType = ref(true);

    const { user } = getUser();

    const { userDetails, error } = getUserDetails(`${user.value.uid}`);
    console.log(userDetails.value);

    const cardiomyopathyData = createFreshCardiomyopathySearchObject();
    const chosenCardiomyopathyType = ref("");
    const chosenMutatedGeneType = ref("");

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
    const extraData = ref([]);

    const queryData = async () => {
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
    };

    const showData = computed(() => {
      return extraData.value;
    });

    return {
      searchId,
      cardiomyopathyData,
      mutatedGeneTypeOptions,
      cardiomyopathyTypeOptions,
      chosenCardiomyopathyType,
      chosenMutatedGeneType,
      user,
      userDetails,
      error,
      queryData,
      hideCardioType,
      hideGeneType,
      showData
    };
  }
};
</script>

<style scoped>
.container {
  display: flex;
  padding: 60px;
  justify-content: center;
}
.search-btns {
  display: flex;
}

.graphs {
  gap: 332px;
}
</style>
