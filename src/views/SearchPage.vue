<template>
  <div class="container">
    <section>
      <div class="search">
        <h2>Search Graphs</h2>
        <form @submit.prevent="submitData">
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

          <input type="submit" />
        </form>
      </div>

      <div class="graphs">
        <Suspense>
          <SearchGraph :userId="user.uid" />
        </Suspense>
      </div>
    </section>
  </div>
</template>

<script>
import { reactive, ref } from "vue";
import getUser from "../firebaseFunctions/getUser.js";
import BaseSelect from "@/components/BaseSelect.vue";
import SearchGraph from "@/components/SearchGraph.vue";
import getUserDetails from "../firebaseFunctions/getUserDetails.js";

export default {
  components: {
    SearchGraph,
    BaseSelect
  },
  setup() {
    const { user } = getUser();

    const { userDetails, error } = getUserDetails(`${user.value.uid}`);
    console.log(userDetails.value);

    const cardiomyopathyData = createFreshCardiomyopathySearchObject();

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

    return {
      cardiomyopathyData,
      mutatedGeneTypeOptions,
      cardiomyopathyTypeOptions,
      user,
      userDetails,
      error
    };
  }
};
</script>

<style scoped>
.search {
  width: 20%;
  margin: 5px;
  padding: 1em;
  float: left;
}
.graphs {
  width: 60%;
  margin: 5px;
  padding: 1em;
  float: right;
}
</style>
