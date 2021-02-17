<template>
  <p v-if="error != ''">No graphs found, add a graph and come back.</p>
  <div>
    <line-chart
      class="center"
      v-for="graph in graphs"
      :key="graph.graphId"
      :graphInformation="graph.graphInformation"
      :yPlots="graph.yPlots"
    >
      <div class="graph-btns">
        <button @click="graphDetails(graph.graphId)">View Details</button>
        <button>Delete</button>
      </div>
    </line-chart>
  </div>
</template>

<script>
import LineChart from "@/components/LineChart";
import { useRouter } from "vue-router";
import {
  getAllGraphs,
  getGraphsBySearchTerm,
  getGraphsByTwoSearchTerms
} from "@/firebaseFunctions/getGraph";
import { ref } from "vue";

export default {
  components: {
    LineChart
  },
  props: {
    searchTermOne: {
      type: String,
      required: false
    },
    searchValueOne: {
      type: String,
      required: false
    },
    searchTermTwo: {
      type: String,
      required: false
    },
    searchValueTwo: {
      type: String,
      required: false
    }
  },
  async setup(props) {
    const router = useRouter();
    const graphs = ref([]);
    if (
      props.searchTermOne &&
      props.searchTermTwo &&
      props.searchValueOne &&
      props.searchValueTwo
    ) {
      graphs.value = await getGraphsByTwoSearchTerms(
        props.searchTermOne,
        props.searchValueOne,
        props.searchTermTwo,
        props.searchValueTwo
      );
    }
    if (props.searchTermOne && props.searchValueOne) {
      graphs.value = await getGraphsBySearchTerm(
        props.searchTermOne,
        props.searchValueOne
      );
    } else {
      graphs.value = await getAllGraphs();
    }

    const error = ref("");

    if (graphs.value.length === 0) {
      error.value = "No graphs found matching search";
    }

    const graphDetails = id => {
      router.push({ name: "GraphDetails", params: { id: id } });
    };

    return { graphs, error, graphDetails };
  }
};
</script>

<style scoped>
.center {
  display: flex;
  align-items: center;
  justify-content: center;
}

.graph-btns {
  margin-right: -8.5%;
}
</style>
