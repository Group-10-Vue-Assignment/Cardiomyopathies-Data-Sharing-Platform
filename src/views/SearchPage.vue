<template>
  <div>
    <section class="container">
      <div class="search">
        <h2>Search Graphs</h2>

        <!--
        <div class="search-btns">
          <button v-bind:disabled="!hideCardioType" @click="toggleCardioType">
            Cardiomyopathy Type
          </button>
          <button v-bind:disabled="!hideGeneType" @click="toggleGeneType">
            MutatedGene Type
          </button>
        </div>
        Might want to add this switch back
        -->

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
            <GraphsCollection
              :searchTermOne="searchTermOne"
              :searchValueOne="chosenCardiomyopathyType"
              :searchTermTwo="searchTermTwo"
              :searchValueTwo="chosenMutatedGeneType"
              :key="searchId"
            />
          </template>
          <template #fallback>
            <Loader />
          </template>
        </Suspense>
      </div>
    </section>
  </div>
</template>

<script>
import { reactive, ref } from "vue";
import getUser from "../firebaseFunctions/getUser.js";
import BaseSelect from "@/components/BaseSelect.vue";
import getUserDetails from "../firebaseFunctions/getUserDetails.js";
import GraphsCollection from "@/components/GraphsCollection.vue";
import Loader from "../components/Loader.vue";

export default {
  components: {
    GraphsCollection,
    BaseSelect,
    Loader
  },
  setup() {
    const searchId = ref(0);

    const hideCardioType = ref(false);
    const hideGeneType = ref(true);
    const searchTermOne = ref("cardiomyopathyType");
    const searchTermTwo = ref("mutatedGeneType");

    const toggleCardioType = () => {
      hideCardioType.value = !hideCardioType.value;
      hideGeneType.value = true;
    };

    const toggleGeneType = () => {
      hideGeneType.value = !hideGeneType.value;
      hideCardioType.value = true;
    };

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

    let mutatedGeneTypeOptions = ref(["TNNT", "MYH", "MYBPC3", "TPM1"]);

    let cardiomyopathyTypeOptions = ref([
      "Hypertrophic Cardiomyopathy",
      "Dilated Cardiomyopathy",
      "Restrictive Cardiomyopathy",
      "Transthyretin Amyloid Cardiomyopathy (ATTR-CM)",
      "Arrhythmogenic Right Ventricular Dysplasia"
    ]);

    function queryData() {
      chosenCardiomyopathyType.value = cardiomyopathyData.cardiomyopathyType;
      chosenMutatedGeneType.value = cardiomyopathyData.mutatedGeneType;

      console.log(chosenCardiomyopathyType.value);
      console.log(chosenMutatedGeneType.value);
      searchId.value += 1;
    }

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
      toggleCardioType,
      toggleGeneType,
      searchTermOne,
      searchTermTwo
    };
  }
};
</script>

<style scoped>
/*
.search {
  width: 20%;
  margin: 5px;
  padding: 1em;
  float: left;
}
*/

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
/*
.graphs {
  width: 60%;
  margin: 5px;
  padding: 1em;
  float: right;
}
*/
</style>
