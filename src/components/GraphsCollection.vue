<template>
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
import {
  getAllGraphs,
  getGraphsBySearchTerm
} from "@/firebaseFunctions/getGraph";
import { ref } from "vue";

export default {
  components: {
    LineChart
  },
  props: {
    searchTerm: {
      type: String,
      required: false
    },
    searchValue: {
      type: String,
      required: false
    }
  },
  async setup(props) {
    console.log(props.searchValue);
    const graphs = ref([]);
    if (props.searchTerm && props.searchValue) {
      graphs.value = await getGraphsBySearchTerm(
        props.searchTerm,
        props.searchValue
      );
    } else {
      graphs.value = await getAllGraphs();
    }

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
