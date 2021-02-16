<template>
  <div>
    <section class="container">
      <div class="search">
        <h2>Search Graphs</h2>
        <div class="search-btns">
          <button v-bind:disabled="!hideCardioType" @click="toggleCardioType">
            Cardiomyopathy Type
          </button>
          <button v-bind:disabled="!hideGeneType" @click="toggleGeneType">
            MutatedGene Type
          </button>
        </div>
        <form @submit.prevent="submitData">
          <div v-if="!hideCardioType">
            <BaseSelect
              :options="cardiomyopathyTypeOptions"
              v-model="cardiomyopathyData.cardiomyopathyType"
              label="Select Cardiomyopathy Type"
            />
          </div>

          <div v-if="!hideGeneType">
            <BaseSelect
              :options="mutatedGeneTypeOptions"
              v-model="cardiomyopathyData.mutatedGeneType"
              label="Select Mutated Gene Type"
            />
          </div>
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
    const hideCardioType = ref(false);
    const hideGeneType = ref(true);

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
      error,
      hideCardioType,
      hideGeneType,
      toggleCardioType,
      toggleGeneType
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
