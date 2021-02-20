<template>
  <p v-if="error != ''">No graphs found, add a graph and come back.</p>
  <div v-if="graphs.length != 0">
    <line-chart
      class="center"
      v-for="graph in graphs"
      :key="graph.graphId"
      :graphInformation="graph.graphInformation"
    >
      <div class="graph-btns">
        <button @click="graphDetails(graph.graphId)">View Details</button>
        <button>Delete</button>
      </div>
    </line-chart>
    <button @click="getPreviousGraph" :disabled="disablePreviousButton">
      Previous
    </button>
    <button @click="getNextGraph" :disabled="disableNextButton">Next</button>
  </div>
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
    userId: {
      type: String,
      required: true
    }
  },
  async setup(props) {
    const router = useRouter();
    const store = useStore();

    let graphs = computed(() => store.state.userGraph);
    let disablePreviousButton = computed(
      () => store.state.userDashboardPreviousButton
    );
    let disableNextButton = computed(() => store.state.userDashboardNextButton);

    if (graphs.value.length == 0) {
      await getNextGraph();
      store.commit("DISABLE_USER_DASHBOARD_PREVIOUS_BUTTON", true);
    }

    const error = ref("");

    console.log(graphs);
    if (graphs.value.length === 0) {
      error.value = "Graph not found!";
    }

    const graphDetails = id => {
      router.push({ name: "GraphDetails", params: { id: id } });
    };

    async function getNextGraph() {
      console.log("clicked next button");
      await store.dispatch("fetchNextUserDashboardGraph", props.userId);
    }

    async function getPreviousGraph() {
      console.log("clicked previous button");
      await store.dispatch("fetchPreviousUserDashboardGraph", props.userId);
    }

    return {
      graphs,
      error,
      graphDetails,
      getPreviousGraph,
      getNextGraph,
      disablePreviousButton,
      disableNextButton
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
