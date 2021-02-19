<template>
  <p v-if="error != ''">No graphs found, add a graph and come back.</p>
  <button @click="getPreviousGraph" :disabled="disableLeftButton"></button>
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
  <button @click="getNextGraph" :disabled="disableRightButton"></button>
</template>

<script>
import LineChart from "@/components/LineChart";
import { useRouter } from "vue-router";
import { computed, ref } from "vue";
import { useStore } from "vuex";
export default {
  components: {
    LineChart
  },
  props: {
    cardiomyopathyTypeValue: {
      type: String,
      required: false
    },
    mutatedGeneTypeValue: {
      type: String,
      required: false
    }
  },
  async setup(props) {
    const router = useRouter();
    const store = useStore();

    await getNextGraph();
    store.commit("DISABLE_SEARCH_PREVIOUS_BUTTON", true);

    let graphs = computed(() => store.state.searchGraph);
    let disableLeftButton = computed(() => store.state.searchPreviousButton);
    let disableRightButton = computed(() => store.state.searchNextButton);

    const error = ref("");

    console.log(graphs);
    if (graphs.value.length === 0) {
      error.value = "No graphs found matching search";
    }

    const graphDetails = id => {
      router.push({ name: "GraphDetails", params: { id: id } });
    };

    async function getNextGraph() {
      await store.dispatch("fetchNextSearchGraph", {
        cardiomyopathyTypeValue: props.cardiomyopathyTypeValue,
        mutatedGeneTypeValue: props.mutatedGeneTypeValue
      });
    }

    async function getPreviousGraph() {
      await store.dispatch("fetchPreviousSearchGraph", {
        cardiomyopathyTypeValue: props.cardiomyopathyTypeValue,
        mutatedGeneTypeValue: props.mutatedGeneTypeValue
      });
    }

    return {
      graphs,
      error,
      graphDetails,
      getPreviousGraph,
      getNextGraph,
      disableLeftButton,
      disableRightButton
    };
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
