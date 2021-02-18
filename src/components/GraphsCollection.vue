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
  <button @click="getGraphs"></button>
</template>

<script>
import LineChart from "@/components/LineChart";
import { useRouter } from "vue-router";
import {
  getGraphsBySearchTerm,
  getGraphsByTwoSearchTerms
} from "@/firebaseFunctions/getGraph";
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

    let graphs = "";

    async function getGraphs() {
      console.log("clicked");
      await store.dispatch("fetchGraphs");
    }
    if (
      props.searchTermOne &&
      props.searchTermTwo &&
      props.searchValueOne &&
      props.searchValueTwo
    ) {
      console.log("Search page");
      graphs.value = await getGraphsByTwoSearchTerms(
        props.searchTermOne,
        props.searchValueOne,
        props.searchTermTwo,
        props.searchValueTwo
      );
    } else if (props.searchTermOne && props.searchValueOne) {
      console.log("User Dashboard");
      graphs.value = await getGraphsBySearchTerm(
        props.searchTermOne,
        props.searchValueOne
      );
    } else {
      graphs = computed(() => store.state.globalGraphs);
      console.log(graphs.value.length);
      if (graphs.value.length == 0) {
        await getGraphs();
      }
      console.log("Global Dashboard");
    }

    const error = ref("");

    if (graphs.value.length === 0) {
      error.value = "No graphs found matching search";
    }

    const graphDetails = id => {
      router.push({ name: "GraphDetails", params: { id: id } });
    };

    return { graphs, error, graphDetails, getGraphs };
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
