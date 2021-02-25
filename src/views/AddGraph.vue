<template>
  <PageBanner>
    <template v-slot:title>Add Graph Data</template>
    <template v-slot:description>
      Insert graph data by filling in the form and uploading a CSV file.
    </template>
  </PageBanner>
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
      >Enter the amount of Y axis ticks you wish to be displayed on the rendered
      graph</label
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
    <FileReader @load="csvData = $event" @filename="tmpFilename = $event" />
    <br />
    <p v-if="chosenFilename">Selected File: {{ chosenFilename }}</p>
    <div v-if="csvData != ''">
      <button
        @click="parseCSVData"
        class="waves-effect waves-light btn-small green lighten-1"
      >
        Add CSV
      </button>
      <br />
      <br />
    </div>
    <button
      class="waves-effect waves-light btn-small blue-grey lighten-2"
      type="submit"
      :disabled="parsedData == null"
      :class="{ clickable: parsedData != null }"
    >
      Submit Graph
    </button>
  </form>
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
import PageBanner from "@/components/PageBanner.vue";
import {
  mutatedGeneTypes,
  cardiomyopathyTypes,
  dataTypes
} from "@/composables/sharedData.js";

export default {
  name: "AddGraph",
  components: {
    FileReader,
    BaseSelect,
    PageBanner
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

    let dataTypeOptions = ref(dataTypes);

    let mutatedGeneTypeOptions = ref(mutatedGeneTypes);

    let cardiomyopathyTypeOptions = ref(cardiomyopathyTypes);

    let parsedData = ref(null);

    const csvData = ref("");
    const tmpFilename = ref("");
    const chosenFilename = ref("");

    let csvFileAsJSON = {};

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

      csvFileAsJSON = JSON.stringify(
        formatCSVArrayIntoJSON(parsedData.value.data)
      );

      // // testing as if we got it from firebase
      // let jsonNow = JSON.stringify(objectToStoreInFirestore)
      // console.log(jsonNow)

      // let objectAgain = JSON.parse(jsonNow)
      // console.log(objectAgain)
    }

    async function submitData() {
      let notification = {};
      try {
        const docRef = await addGraphToFirestoreCollection();
        notification = {
          type: "success",
          message: "Your data has been submitted successfully!"
        };
        router.push({
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

    function formatCSVArrayIntoJSON(CSVArray) {
      let toBeStoredJSON = {
        xPlots: getXPlots(CSVArray),
        yPlots: getYPlotsAndLineName(CSVArray)
      };
      return toBeStoredJSON;
    }

    function getXPlots(CSVArray) {
      let xPlots = CSVArray.map(function(pair) {
        return pair[0];
      });
      xPlots.shift();
      return xPlots;
    }

    function getYPlotsAndLineName(CSVArray) {
      let yPlotsObjectCollection = [];
      for (let i = 1; i < CSVArray[0].length; i++) {
        let yPlots = [];
        let yDataName = "";

        yPlots = CSVArray.map(function(pair) {
          return pair[i];
        });

        yDataName = yPlots[0];
        yPlots.shift();

        let yPlotsObject = {
          yDataName: yDataName,
          yPlots: yPlots
        };
        yPlotsObjectCollection.push(yPlotsObject);
      }
      return yPlotsObjectCollection;
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
        experimentalData: csvFileAsJSON
      });

      return docRef;
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
