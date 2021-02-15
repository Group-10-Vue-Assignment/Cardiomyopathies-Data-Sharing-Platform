<template>
  <p v-if="error != ''">No graphs found, add a graph and come back.</p>
  <div>
    <Suspense>
      <line-chart
        class="center"
        v-for="graph in graphs"
        :key="graph.graphId"
        :graphInformation="graph.graphInformation"
        :yPlots="graph.yPlots"
      ></line-chart>
    </Suspense>
  </div>
</template>

<script>
import LineChart from "@/components/LineChart";
import { getGraphsBySearchTerm } from "@/firebaseFunctions/getGraph";
import { ref } from "vue";

export default {
  components: {
    LineChart
  },
  props: {
    userId: {
      type: String,
      required: true
    },
    cardioMyopathyType: {
      type: String
    },
    mutatedGeneType: {
      type: String
    }
  },
  async setup(props) {
    const graphs = ref(await getGraphsBySearchTerm("userId", props.userId));
    const error = ref("");

    //     // .where("cardioMyopathyType", "==", props.cardioMyopathyType)
    //     // .where("mutatedGeneType", "==", props.mutatedGeneType)
    if (graphs.value.length === 0) {
      error.value = "No graphs found matching search";
    }

    return { graphs, error };
  }
};
</script>

<style scoped>
.center {
  margin: 0 auto;
  display: flex;
  justify-content: center;
}
</style>
