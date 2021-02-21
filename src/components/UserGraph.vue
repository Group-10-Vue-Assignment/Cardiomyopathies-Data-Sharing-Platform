<template>
  <p v-if="graphs.length == 0">No graphs found, add a graph and come back.</p>
  <div v-for="graph in graphs" :key="graph.graphId">
    <line-chart class="center" :graphInformation="graph.graphInformation">
      <div class="graph-btns">
        <button @click="graphDetails(graph.graphId)">View Details</button>
        <button @click="deleteGraph(graph.graphId)">Delete</button>
      </div>
    </line-chart>
    <!-- Below div needs styling - moving to the right in a fixed position -->
    <div>
      <p>
        Cardiomyopathy Type: {{ graph.graphInformation.cardiomyopathyType }}
      </p>
      <p>Mutated Gene Type: {{ graph.graphInformation.mutatedGeneType }}</p>
      <p>Type of Data: {{ graph.graphInformation.typeOfData }}</p>
      <p>Paper: {{ graph.graphInformation.paper }}</p>
      <p>
        Added on:
        {{ graph.graphInformation.timeOfInsert.toDate().toDateString() }}
      </p>
    </div>
  </div>
  <div v-if="graphs.length != 0">
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
  props: {
    userId: {
      type: String,
      required: true
    }
  },
  async setup(props) {
    const router = useRouter();

    let disablePreviousButton = ref(true);
    let disableNextButton = ref(false);
    let graphs = ref([]);
    let lastVisible = "";
    let firstVisible = "";
    let graphPaginationLimit = 1;

    const graphDetails = id => {
      router.push({ name: "GraphDetails", params: { id: id } });
    };

    async function deleteGraph(graphId) {
      graphsCollection
        .doc(graphId)
        .delete()
        .then(async () => {
          console.log("Deleted graph successfully!");
          // Reset last visible, so we go to the start again
          lastVisible = "";
          await getNextGraphUsingPagination();
          disablePreviousButton.value = true;
        })
        .catch(error => {
          console.error("Error removing document: ", error);
        });
    }

    let lockProcessing = false;

    async function getNextGraph() {
      // Prevent the user from spamming the button and executing multiple firebase queries
      if (!lockProcessing) {
        lockProcessing = true;
        await getNextGraphUsingPagination();
        lockProcessing = false;
      }
    }

    async function getNextGraphUsingPagination() {
      let retrievedGraphs = [];
      // Preparing the next N amount of documents ready to iterate through.
      // StartAfter puts us at the start of a new document, and limit continues onwards for the next N documents.
      // This results in pagination
      let current = graphsCollection
        .where("userId", "==", props.userId)
        .orderBy("timeOfInsert", "desc")
        .startAfter(lastVisible)
        .limit(graphPaginationLimit);

      // If the lastVisible variable is empty, the webpage has loaded for the first time
      // This means we want to change the prevent button to disabled.
      let initialLoad = lastVisible ? false : true;

      // Get the snapshot of selected
      await current.get().then(querySnapshot => {
        // Set the last visible document, so we know where to continue on with pagination next time
        lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];
        // Set the first visible document so we know where to go backwards with pagination next time
        firstVisible = querySnapshot.docs[0];
        // Iterate over snapshot
        querySnapshot.forEach(doc => {
          // Want id for future use, and for :key attribute, so placing into object
          let graph = {
            graphId: doc.id,
            graphInformation: doc.data()
          };
          retrievedGraphs.push(graph);
        });
      });

      // If last visible is still empty, then 0 graphs were found above and we don't want to continue
      if (lastVisible) {
        // Grab the next snapshot of 1 document
        let next = graphsCollection
          .where("userId", "==", props.userId)
          .orderBy("timeOfInsert", "desc")
          .startAfter(lastVisible)
          .limit(1);

        // check the snap size, if it is 0 then we have reached the end and cannot go forward
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
      }

      graphs.value = retrievedGraphs;
    }

    async function getPreviousGraph() {
      // Prevent the user from spamming the button and executing multiple firebase queries
      if (!lockProcessing) {
        lockProcessing = true;
        await getPreviousGraphUsingPagination();
        lockProcessing = false;
      }
    }

    async function getPreviousGraphUsingPagination() {
      let retrievedGraphs = [];
      // Preparing the next N amount of documents ready to iterate through.
      // endBefore puts us to the document before the last one we found,
      // and limitToLast goes backwards N documents. This results in backwards pagination
      let current = graphsCollection
        .where("userId", "==", props.userId)
        .orderBy("timeOfInsert", "desc")
        .endBefore(firstVisible)
        .limitToLast(graphPaginationLimit);

      // Get the snapshot of the above selected
      await current.get().then(querySnapshot => {
        // Set last visible document within this snapshot, and the first visible document
        lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];
        firstVisible = querySnapshot.docs[0];
        // Iterate over the documents within the snapshot
        querySnapshot.forEach(doc => {
          let graph = {
            graphId: doc.id,
            graphInformation: doc.data()
          };
          retrievedGraphs.push(graph);
        });
      });

      // Prepare to get a snapshot of the document before first visible, to see if we
      // should disable the previous button or not
      let previous = graphsCollection
        .where("userId", "==", props.userId)
        .orderBy("timeOfInsert", "desc")
        .endBefore(firstVisible)
        .limitToLast(1);

      await previous.get().then(snap => {
        // If the snapshot is 0, we hit the end and can no longer go further back
        if (snap.size === 0) {
          disablePreviousButton.value = true;
        } else {
          disablePreviousButton.value = false;
        }
        disableNextButton.value = false;
      });

      graphs.value = retrievedGraphs;
    }

    // When the component is created, we want to grab the first graph
    await getNextGraphUsingPagination();

    return {
      graphs,
      graphDetails,
      getPreviousGraph,
      getNextGraph,
      disablePreviousButton,
      disableNextButton,
      deleteGraph
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
