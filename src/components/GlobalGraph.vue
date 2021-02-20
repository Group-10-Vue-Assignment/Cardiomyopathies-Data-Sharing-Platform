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
import { ref } from "vue";
import { graphsCollection } from "@/firebase/config";

export default {
  components: {
    LineChart
  },
  async setup() {
    const router = useRouter();

    let disablePreviousButton = ref(true);
    let disableNextButton = ref(false);
    let graphs = ref([]);
    let lastVisible = "";
    let firstVisible = "";
    let graphPaginationLimit = 1;

    const error = ref("");

    if (graphs.value == {}) {
      error.value = "No graphs found matching search";
    }

    const graphDetails = id => {
      router.push({ name: "GraphDetails", params: { id: id } });
    };

    async function getNextGraph() {
      await getNextGraphUsingPagination();
    }

    async function getNextGraphUsingPagination() {
      let retrievedGraphs = [];
      let current = graphsCollection
        .orderBy("timeOfInsert", "desc")
        .startAfter(lastVisible)
        .limit(graphPaginationLimit);

      let initialLoad = lastVisible ? false : true;

      await current.get().then(querySnapshot => {
        lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];
        firstVisible = querySnapshot.docs[0];
        let nextChecker = querySnapshot.docs[querySnapshot.docs.length];
        console.log(nextChecker);
        querySnapshot.forEach(doc => {
          let graph = {
            graphId: doc.id,
            graphInformation: doc.data()
          };
          retrievedGraphs.push(graph);
          console.log(retrievedGraphs);
        });
      });
      console.log(retrievedGraphs);
      // if statement as no graphs may exist to begin with
      if (lastVisible) {
        let next = graphsCollection
          .orderBy("timeOfInsert", "desc")
          .startAfter(lastVisible)
          .limit(graphPaginationLimit);

        await next.get().then(snap => {
          if (snap.size === 0) {
            disableNextButton.value = true;
          } else {
            disableNextButton.value = false;
          }
          if (!initialLoad) {
            disablePreviousButton.value = false;
          }
        });
      } else {
        disableNextButton.value = true;
        disablePreviousButton.value = true;
      }
      graphs.value = retrievedGraphs;
    }

    async function getPreviousGraph() {
      console.log("clicked previous button! ", disablePreviousButton.value);
      await getPreviousGraphUsingPagination();
      console.log(disablePreviousButton.value);
    }

    async function getPreviousGraphUsingPagination() {
      let retrievedGraphs = [];
      let current = graphsCollection
        .orderBy("timeOfInsert", "desc")
        .endBefore(firstVisible)
        .limitToLast(graphPaginationLimit);

      await current.get().then(querySnapshot => {
        lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];
        firstVisible = querySnapshot.docs[0];
        querySnapshot.forEach(doc => {
          let graph = {
            graphId: doc.id,
            graphInformation: doc.data()
          };
          retrievedGraphs.push(graph);
        });
      });

      let previous = graphsCollection
        .orderBy("timeOfInsert", "desc")
        .endBefore(firstVisible)
        .limitToLast(graphPaginationLimit);

      await previous.get().then(snap => {
        if (snap.size === 0) {
          disablePreviousButton.value = true;
        } else {
          disablePreviousButton.value = false;
        }
        disableNextButton.value = false;
      });

      graphs.value = retrievedGraphs;
    }

    await getNextGraphUsingPagination();
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
