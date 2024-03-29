<template>
  <p v-if="graphs.length == 0">No graphs found, add a graph and come back.</p>
  <div v-for="graph in graphs" :key="graph.graphId">
    <div class="centered-graph">
      <LineChart :graphInformation="graph.graphInformation" />

      <div class="side-buttons">
        <button
          class="waves-effect waves-light btn-small blue-grey lighten-2"
          @click="graphDetails(graph.graphId)"
        >
          View Details
        </button>
        <br /><br />
        <ConfirmationBox
          v-if="userId == graph.graphInformation.userId"
          @deleteGraph="deleteGraph(graph.graphId)"
        />
      </div>
      <br />
      <div v-if="graphs.length != 0" class="pagination-btns">
        <button
          class="waves-effect waves-light btn-small blue-grey lighten-2"
          @click="getPreviousGraph()"
          :disabled="disablePreviousButton"
        >
          <i class="material-icons">arrow_back</i>
        </button>
        <a class="noSelect">⠀</a>
        <button
          class="waves-effect waves-light btn-small blue-grey lighten-2"
          @click="getNextGraph()"
          :disabled="disableNextButton"
        >
          <i class="material-icons">arrow_forward</i>
        </button>
      </div>
    </div>

    <div class="card-panel blue-grey centered-graph-info">
      <span class="white-text">
        <p>
          Cardiomyopathy Type:
          {{ graph.graphInformation.cardiomyopathyType }}
        </p>
        <p>Mutated Gene Type: {{ graph.graphInformation.mutatedGeneType }}</p>
        <p>Type of Data: {{ graph.graphInformation.typeOfData }}</p>
        <p>Paper: {{ graph.graphInformation.paper }}</p>
        <p>
          Added on:
          {{ graph.graphInformation.timeOfInsert.toDate().toDateString() }}
        </p>
      </span>
    </div>
  </div>
</template>

<script>
import { useRouter } from "vue-router";
import LineChart from "@/components/LineChart";
import ConfirmationBox from "@/components/ConfirmationBox.vue";
import { graphsCollection } from "@/firebase/config";
import { useStore } from "vuex";
import { ref } from "vue";

export default {
  emits: ["firebaseNextQuery", "firebasePreviousQuery", "internalDataLoaded"],
  components: {
    LineChart,
    ConfirmationBox
  },
  props: {
    userId: {
      type: String,
      required: true
    },
    firebaseNextQueryResults: {
      type: Object,
      required: true
    },
    firebasePreviousQueryResults: {
      type: Object,
      required: true
    }
  },
  async setup(props, context) {
    const router = useRouter();
    const store = useStore();

    let disablePreviousButton = ref(true);
    let disableNextButton = ref(false);
    let lastVisible = "";
    let firstVisible = "";
    let graphs = ref([]);

    const graphDetails = id => {
      router.push({ name: "GraphDetails", params: { id: id } });
    };

    async function deleteGraph(graphId) {
      let notification = {};

      await graphsCollection
        .doc(graphId)
        .delete()
        .then(async () => {
          console.log("Deleted graph successfully!");
          // Reset last visible, so we go to the start again
          lastVisible = "";
          await getNextGraphUsingPagination();
          disablePreviousButton.value = true;
          notification = {
            type: "success",
            message: "Data has been deleted successfully!"
          };
        })
        .catch(error => {
          console.error("Error removing document: ", error);
          notification = {
            type: "error",
            message: "Data was not deleted! error: " + error
          };
        });

      store.dispatch("addNotification", notification);
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
      await context.emit("firebaseNextQuery", lastVisible);

      // If the lastVisible variable is empty, the webpage has loaded for the first time
      // This means we want to change the prevent button to disabled.
      let initialLoad = lastVisible ? false : true;

      // Get the snapshot of selected
      await props.firebaseNextQueryResults.get().then(querySnapshot => {
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
        await context.emit("firebaseNextQuery", lastVisible);
        // check the snap size, if it is 0 then we have reached the end and cannot go forward
        await props.firebaseNextQueryResults.get().then(snap => {
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
      await context.emit("firebasePreviousQuery", firstVisible);

      // Get the snapshot of the above selected
      await props.firebasePreviousQueryResults.get().then(querySnapshot => {
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
      await context.emit("firebasePreviousQuery", firstVisible);

      await props.firebasePreviousQueryResults.get().then(snap => {
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

    context.emit("internalDataLoaded");
    return {
      graphDetails,
      deleteGraph,
      getNextGraph,
      getPreviousGraph,
      graphs,
      disablePreviousButton,
      disableNextButton
    };
  }
};
</script>

<style scoped>
.centered-graph {
  margin-left: auto;
  margin-right: auto;
  width: 350px;
  position: relative;
}
@media only screen and (min-width: 776px) {
  .side-buttons {
    position: absolute;
    left: 420px;
    top: 145px;
    width: 120px;
  }
}
@media only screen and (max-width: 775px) {
  .centered-graph {
    width: 65%;
  }
}

.centered-graph-info {
  margin-left: auto;
  margin-right: auto;
  width: 85%;
  position: relative;
}
</style>
