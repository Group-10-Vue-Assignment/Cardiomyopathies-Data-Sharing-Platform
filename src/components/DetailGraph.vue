<template>
  <div class="col s6 m6">
    <div class="card blue-grey darken-1">
      <div class="card-content white-text">
        <span class="card-title">Graph Details</span>
        <div>
          <p>{{ graphInformation.cardiomyopathyType }}</p>
          <p>{{ graphInformation.mutatedGeneType }}</p>
          <p>{{ graphInformation.typeOfData }}</p>
          <p>{{ graphInformation.paper }}</p>
          <p>Added on: {{ date.toDateString() }}</p>
        </div>
      </div>
    </div>
  </div>
  <div class="graph">
    <LineChart class="center" :graphInformation="graphInformation" />
  </div>
  <button v-if="user.uid == graphInformation.userId" @click="deleteGraph(id)">
    Delete My Graph
  </button>
  <div v-if="error" class="error">{{ error }}</div>
</template>

<script>
import getUser from "../firebaseFunctions/getUser.js";
import { getGraph } from "@/firebaseFunctions/getGraph";
import LineChart from "@/components/LineChart";
import { ref } from "vue";
import { graphsCollection } from "@/firebase/config";
import { useRouter } from "vue-router";

export default {
  components: {
    LineChart
  },
  props: {
    id: {
      type: String,
      required: true
    }
  },
  async setup(props) {
    const router = useRouter();

    //will get user auth
    const { user } = getUser();

    const { graphInformation, error } = await getGraph(props.id);

    async function deleteGraph(graphId) {
      console.log(graphId);
      await graphsCollection
        .doc(graphId)
        .delete()
        .then(() => {
          console.log("Deleted graph successfully!");
          router.push({ name: "UserDashboard" });
        })
        .catch(error => {
          console.error("Error removing document: ", error);
        });
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

<style></style>
