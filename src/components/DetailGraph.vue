<template>
  <div class="centered-graph">
    <LineChart :graphInformation="graphInformation" />

    <div class="side-buttons">
      <ConfirmationBox
        v-if="user.uid == graphInformation.userId"
        @deleteGraph="deleteGraph(id)"
      />
    </div>
  </div>

  <div class="white-text card-panel blue-grey lighten-1 centered-graph-info">
    <p>Cardiomyopathy Type: {{ graphInformation.cardiomyopathyType }}</p>
    <p>Mutated Gene Type: {{ graphInformation.mutatedGeneType }}</p>
    <p>Type of Data: {{ graphInformation.typeOfData }}</p>
    <p>Paper: {{ graphInformation.paper }}</p>
    <p>Added on: {{ date.toDateString() }}</p>
  </div>

  <div v-if="error" class="error">{{ error }}</div>
</template>

<script>
import getUser from "../firebaseFunctions/getUser.js";
import { getGraph } from "@/firebaseFunctions/getGraph";
import LineChart from "@/components/LineChart";
import { ref } from "vue";
import { graphsCollection } from "@/firebase/config";
import { useRouter } from "vue-router";
import ConfirmationBox from "@/components/ConfirmationBox.vue";
import { useStore } from "vuex";
export default {
  components: {
    LineChart,
    ConfirmationBox
  },
  props: {
    id: {
      type: String,
      required: true
    }
  },
  async setup(props) {
    const router = useRouter();
    const store = useStore();
    //will get user auth
    const { user } = getUser();

    const { graphInformation, error } = await getGraph(props.id);

    async function deleteGraph(graphId) {
      let notification = {};
      console.log(graphId);
      await graphsCollection
        .doc(graphId)
        .delete()
        .then(() => {
          console.log("Deleted graph successfully!");
          router.push({ name: "UserDashboard" });
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

    return {
      graphInformation: ref(graphInformation),
      date: graphInformation.timeOfInsert.toDate(),
      error,
      user,
      deleteGraph
    };
  }
};
</script>

<style scoped>
.centered-graph {
  margin-left: auto;
  margin-right: auto;
  width: 320px;
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

.centered-graph-info {
  margin-left: auto;
  margin-right: auto;
  width: 85%;
  position: relative;
}
</style>
