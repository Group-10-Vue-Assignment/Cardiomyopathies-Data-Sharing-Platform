<template>
  <p>{{ graphInformation.cardiomyopathyType }}</p>
  <p>{{ graphInformation.mutatedGeneType }}</p>
  <p>{{ graphInformation.typeOfData }}</p>
  <p>{{ graphInformation.paper }}</p>
  <p>Added on: {{ date.toDateString() }}</p>
  <div>
    <LineChart
      class="center"
      :graphInformation="graphInformation"
      :yPlots="yPlots"
    />
  </div>
  <div v-if="error" class="error">{{ error }}</div>
</template>

<script>
import { getGraph } from "@/firebaseFunctions/getGraph";
import LineChart from "@/components/LineChart";
import { ref } from "vue";
export default {
  components: {
    LineChart
  },
  props: {
    id: {
      type: String,
      required: true
    }
  },
  async setup(props) {
    const { graphInformation, yPlots, error } = await getGraph(props.id);

    return {
      graphInformation: ref(graphInformation),
      date: graphInformation.timeOfInsert.toDate(),
      yPlots: ref(yPlots),
      error
    };
  }
};
</script>

<style></style>