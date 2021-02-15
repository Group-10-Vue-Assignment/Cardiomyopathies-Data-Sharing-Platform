<template>
  <h3>Graphs Created By You</h3>
  <p v-if="error != ''">No graphs found, add a graph and come back.</p>
  <div>
    <line-chart
      class="center"
      v-for="graph in graphs"
      :key="graph.graphId"
      :graphInformation="graph.graphInformation"
      :yPlots="graph.yPlots"
      ><router-link
        :to="{ name: 'GraphDetails', params: { id: graph.graphId } }"
        >View Details
      </router-link></line-chart
    >
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
    }
  },
  async setup(props) {
    const graphs = ref(await getGraphsBySearchTerm("userId", props.userId));
    const error = ref("");

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
