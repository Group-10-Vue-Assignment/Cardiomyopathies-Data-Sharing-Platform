<template>
  <div class="container">
    <section>
      <div class="add-data">
        <h2>Insert graph data</h2>
        <div>
          <form @submit.prevent="submitData">
            <label for="cardiomyopathyType"
              >Enter the Cardiomyopathy type</label
            >
            <input
              v-model="cardiomyopathyData.cardiomyopathyType"
              type="text"
              id="cardiomyopathyType"
              placeholder="e.g: hypertrophic cardiomyopathy"
              required
            />
            <br />
            <label for="mutatedGeneType">Enter the mutated gene type</label>
            <input
              v-model="cardiomyopathyData.mutatedGeneType"
              type="text"
              id="mutatedGeneType"
              placeholder="e.g: TNNT"
              required
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
            <label for="typeOfData">Enter the type of data</label>
            <input
              v-model="cardiomyopathyData.typeOfData"
              type="text"
              id="typeOfData"
              placeholder="e.g: sarcomere length vs time"
              required
            />
            <br />
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
              placeholder="e.g: 3"
              required
            />
            <br />
            <label for="xTickAmount"
              >Enter the amount of X axis ticks you wish to be displayed on the
              rendered graph</label
            >
            <input
              v-model="cardiomyopathyData.xTickAmount"
              type="number"
              id="xTickAmount"
              placeholder="e.g: 5"
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
              placeholder="e.g: 7"
              required
            />
            <p>Select a csv to pull data from</p>
            <FileReader @load="csvData = $event" />
            <br />
            <div v-if="csvData != ''">
              <button
                type="button"
                @click="parseCSVData"
                :disabled="csvData === ''"
              >
                Add data
              </button>
              <br />
              <br />
            </div>
            <input type="submit" :disabled="parsedData == null" />
          </form>
        </div>
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

export default {
  name: "AddGraph",
  components: {
    FileReader
  },
  setup() {
    const { user } = getUser();

    const cardiomyopathyData = createFreshCardiomyopathyDataObject();

    // matches graphs on firebase, havent included graphdata
    function createFreshCardiomyopathyDataObject() {
      return reactive({
        cardiomyopathyType: "",
        mutatedGeneType: "",
        paper: "",
        roundYAxisDP: null,
        timeOfInsert: "Date placeholder",
        typeOfData: "",
        xTickAmount: null,
        xAxisTitle: "",
        yTickAmount: null,
        yAxisTitle: "",
        userId: user.value.uid
      });
    }

    let parsedData = ref(null);
    let xPlots = [];

    const csvData = ref("");

    function parseCSVData() {
      parsedData.value = Papa.parse(csvData.value, {
        skipEmptyLines: "greedy",
        dynamicTyping: true
      });

      csvData.value = "";
    }

    async function submitData() {
      xPlots = getXPlots();
      xPlots.shift();

      try {
        const docRef = await addGraphToFirestoreCollection();
        addYPlotsToFirestoreGraphCollection(docRef);
      } catch (err) {
        // add success / fail notification system
        console.log(err);
      }
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
        xTickAmount: cardiomyopathyData.xTickAmount,
        xAxisTitle: cardiomyopathyData.xAxisTitle,
        yTickAmount: cardiomyopathyData.yTickAmount,
        yAxisTitle: cardiomyopathyData.yAxisTitle,
        userId: cardiomyopathyData.userId,
        xPlots: xPlots
      });

      return docRef;
    }

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
      parseCSVData,
      submitData,
      parsedData
    };
  }
};
</script>
