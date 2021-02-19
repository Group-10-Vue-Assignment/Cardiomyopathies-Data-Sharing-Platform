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
    const store = useStore();

    let graphs = [];
    let disableLeftButton = true;
    let disableRightButton = false;
    let selectedNextDispatcher = "";
    let selectedPreviousDispatcher = "";

    // Problem - getNextGraph() function is tied to our buttons, but we need to send different
    // parameters on the dispatcher depending on whether it is global, user, or search system
    if (
      props.searchTermOne &&
      props.searchTermTwo &&
      props.searchValueOne &&
      props.searchValueTwo
    ) {
      console.log("Search page");
      // graphs.value = await getGraphsByTwoSearchTerms(
      //   filters.searchTermOne,
      //   filters.searchValueOne,
      //   filters.searchTermTwo,
      //   filters.searchValueTwo
      // );
    } else if (props.searchTermOne && props.searchValueOne) {
      console.log("User Dashboard");
      graphs = computed(() => store.state.userGraph);
      disableLeftButton = computed(
        () => store.state.userDashboardPreviousButton
      );
      disableRightButton = computed(() => store.state.userDashboardNextButton);
      selectedNextDispatcher = "fetchNextUserDashboardGraph";
      selectedPreviousDispatcher = "fetchPreviousUserDashboardGraph";
      if (graphs.value.length == 0) {
        await getNextGraph();
        store.commit("DISABLE_USER_DASHBOARD_PREVIOUS_BUTTON", true);
      }
      // graphs.value = await getGraphsBySearchTerm(
      //   filters.searchTermOne,
      //   filters.searchValueOne
      // );
    } else {
      console.log("Global Dashboard");
      graphs = computed(() => store.state.globalGraph);
      disableLeftButton = computed(
        () => store.state.globalDashboardPreviousButton
      );
      disableRightButton = computed(
        () => store.state.globalDashboardNextButton
      );
      selectedNextDispatcher = "fetchNextGlobalDashboardGraph";
      selectedPreviousDispatcher = "fetchPreviousGlobalDashboardGraph";
      if (graphs.value.length == 0) {
        await getNextGraph();
        store.commit("DISABLE_GLOBAL_DASHBOARD_PREVIOUS_BUTTON", true);
      }
    }

    const error = ref("");

    console.log(graphs);
    if (graphs.value.length === 0) {
      error.value = "No graphs found matching search";
    }

    const graphDetails = id => {
      router.push({ name: "GraphDetails", params: { id: id } });
    };

    async function getNextGraph() {
      console.log("clicked next button");
      await store.dispatch(selectedNextDispatcher);
    }

    async function getPreviousGraph() {
      console.log("clicked previous button");
      await store.dispatch(selectedPreviousDispatcher);
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
