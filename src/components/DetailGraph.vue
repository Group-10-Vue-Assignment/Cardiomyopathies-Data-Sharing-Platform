<template>
  <p>Cardiomyopathy Type: {{ graphInformation.cardiomyopathyType }}</p>
  <p>Mutated Gene Type: {{ graphInformation.mutatedGeneType }}</p>
  <p>Type of Data: {{ graphInformation.typeOfData }}</p>
  <p>Paper: {{ graphInformation.paper }}</p>
  <p>
    Added on:
    {{ date.toDateString() }}
  </p>
  <div>
    <LineChart class="center" :graphInformation="graphInformation"> </LineChart>
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
