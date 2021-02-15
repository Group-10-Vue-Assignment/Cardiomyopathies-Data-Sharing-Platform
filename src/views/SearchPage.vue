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
          <label for="paper">Enter the paper the data was sourced from</label>
          <input
            v-model="cardiomyopathyData.paper"
            type="text"
            id="paper"
            placeholder="e.g: Measurement of Myofilament-Localized Calcium Dynamics in Adult Cardiomyocytes and the Effect of Hypertrophic Cardiomyopathy Mutations"
            required
          />
          <br />
          <BaseSelect
            :options="dataTypeOptions"
            v-model="cardiomyopathyData.typeOfData"
            label="Select Data Type"
          />

          <input
            type="submit"
            :disabled="parsedData == null"
            :class="{ clickable: parsedData != null }"
          />
        </form>
      </div>

      <div class="graphs">
        <Suspense>
          <GraphsCollection :userId="user.uid" />
        </Suspense>
      </div>
    </section>
  </div>
  npm
</template>

<script>
import { reactive, ref } from "vue";
import getUser from "../firebaseFunctions/getUser.js";
import BaseSelect from "@/components/BaseSelect.vue";
import GraphsCollection from "@/components/GraphsCollection.vue";
import getUserDetails from "../firebaseFunctions/getUserDetails.js";

export default {
  components: {
    GraphsCollection,
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
        paper: "",
        typeOfData: "",
        userId: user.value.uid
      });
    }

    let dataTypeOptions = ref([
      "Force-time Curve",
      "Sarcomere Length vs Time",
      "Sliding Velocity vs Calcium Concentration",
      "Tension vs Calcium Concentration",
      "Force vs Calcium Concentration",
      "Tension vs Sarcomere Shortening Velocity",
      "Force vs Sarcomere Shortening Velocity",
      "Sarcomere Shortening vs Time"
    ]);

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
      dataTypeOptions,
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
