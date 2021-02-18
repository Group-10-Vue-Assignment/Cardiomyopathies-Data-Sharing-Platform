<template>
  <div class="container">
    <section>
      <div class="add-data">
        <h2>Insert graph data</h2>
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
          <h5>Graph information</h5>
          <label for="xAxisTitle">Enter the title for the x Axis</label>
          <input
            v-model="cardiomyopathyData.xAxisTitle"
            type="text"
            id="xAxisTitle"
            placeholder="e.g: Time (sec)"
            required
          />
          <br />
          <label for="yAxisTitle">Enter the title for the y Axis</label>
          <input
            v-model="cardiomyopathyData.yAxisTitle"
            type="text"
            id="yAxisTitle"
            placeholder="e.g: Sarcomere length (µm)"
            required
          />
          <br />
          <label for="roundYAxisDP"
            >Enter the decimal place to round Y Axis too</label
          >
          <input
            v-model="cardiomyopathyData.roundYAxisDP"
            type="number"
            id="roundYAxisDP"
            min="0"
            max="4"
            required
          />
          <br />
          <label for="yTickAmount"
            >Enter the amount of Y axis ticks you wish to be displayed on the
            rendered graph</label
          >
          <input
            v-model="cardiomyopathyData.yTickAmount"
            type="number"
            id="yTickAmount"
            min="3"
            max="10"
            required
          />
          <p>Select a csv to pull data from</p>
          <FileReader
            @load="csvData = $event"
            @filename="tmpFilename = $event"
          />
          <br />
          <p v-if="chosenFilename">Selected File: {{ chosenFilename }}</p>
          <div v-if="csvData != ''">
            <button @click="parseCSVData">
              Add data
            </button>
            <br />
            <br />
          </div>
          <input
            type="submit"
            :disabled="parsedData == null"
            :class="{ clickable: parsedData != null }"
          />
        </form>
      </div>
    </section>
  </div>
</template>

<script>
import { reactive, ref } from "vue";
import getUser from "../firebaseFunctions/getUser.js";
import FileReader from "@/components/FileReader";
import Papa from "papaparse";
import { graphsCollection } from "@/firebase/config";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import BaseSelect from "@/components/BaseSelect.vue";
export default {
  name: "AddGraph",
  components: {
    FileReader,
    BaseSelect
  },
  setup() {
    const store = useStore();
    const router = useRouter();

    const { user } = getUser();
    const cardiomyopathyData = createFreshCardiomyopathyDataObject();

    // matches graphs on firebase, havent included graphdata
    function createFreshCardiomyopathyDataObject() {
      return reactive({
        cardiomyopathyType: "",
        mutatedGeneType: "",
        paper: "",
        roundYAxisDP: 2,
        timeOfInsert: "Date placeholder",
        typeOfData: "",
        xAxisTitle: "",
        yAxisTitle: "",
        yTickAmount: 7,
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

    let parsedData = ref(null);
    let xPlots = [];

    const csvData = ref("");
    const tmpFilename = ref("");
    const chosenFilename = ref("");
    function parseCSVData() {
      parsedData.value = Papa.parse(csvData.value, {
        skipEmptyLines: "greedy",
        dynamicTyping: true
      });

      let notification = {
        type: "success",
        message: "CSV file has uploaded successfully!"
      };

      store.dispatch("addNotification", notification);

      chosenFilename.value = tmpFilename.value;
      csvData.value = "";
      tmpFilename.value = "";
    }

    async function submitData() {
      xPlots = getXPlots();
      xPlots.shift();

      let notification = {};
      try {
        const docRef = await addGraphToFirestoreCollection();
        addYPlotsToFirestoreGraphCollection(docRef);
        notification = {
          type: "success",
          message: "Your data has been submitted successfully!"
        };
        router.push({
          // Cold add params and push them to their specific graph to show it worked
          name: "GraphDetails",
          params: { id: docRef.id }
        });
        // because we are using an object, we need a new object reference for future
        this.cardiomyopathyData = createFreshCardiomyopathyDataObject();
      } catch (err) {
        notification = {
          type: "error",
          message: "There was a problem submitting your data: " + err.message
        };
        console.log(err);
      }
      store.dispatch("addNotification", notification);
    }

    function getXPlots() {
      xPlots = parsedData.value.data.map(function(pair) {
        return pair[0];
      });
      return xPlots;
    }

    async function addGraphToFirestoreCollection() {
      const docRef = await graphsCollection.add({
        cardiomyopathyType: cardiomyopathyData.cardiomyopathyType,
        mutatedGeneType: cardiomyopathyData.mutatedGeneType,
        paper: cardiomyopathyData.paper,
        roundYAxisDP: cardiomyopathyData.roundYAxisDP,
        timeOfInsert: new Date(),
        typeOfData: cardiomyopathyData.typeOfData,
        xAxisTitle: cardiomyopathyData.xAxisTitle,
        yTickAmount: cardiomyopathyData.yTickAmount,
        yAxisTitle: cardiomyopathyData.yAxisTitle,
        userId: cardiomyopathyData.userId,
        xPlots: xPlots
      });

      return docRef;
    }

    // We skip the first column as that is xPlots column.
    // Every column after is yPlots.
    // First row on each column is the header
    async function addYPlotsToFirestoreGraphCollection(docRef) {
      for (let i = 1; i < parsedData.value.data[0].length; i++) {
        let yPlots = [];
        let yDataName = "";

        yPlots = parsedData.value.data.map(function(pair) {
          return pair[i];
        });

        yDataName = yPlots[0];
        yPlots.shift();

        await docRef.collection("yPlots").add({
          yDataName: yDataName,
          yPlots: yPlots
        });
      }
    }

    return {
      cardiomyopathyData,
      csvData,
      tmpFilename,
      chosenFilename,
      parseCSVData,
      submitData,
      parsedData,
      dataTypeOptions,
      mutatedGeneTypeOptions,
      cardiomyopathyTypeOptions
    };
  }
};
</script>

<style scoped>
.clickable {
  cursor: pointer;
}
</style>
