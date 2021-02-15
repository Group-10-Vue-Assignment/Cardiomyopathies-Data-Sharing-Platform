<template>
  <p v-if="error != ''">No graphs found, add a graph and come back.</p>
  <div>
    <Suspense>
      <line-chart
        class="center"
        v-for="graph in graphs"
        :key="graph.graphId"
        :graph="graph"
      ></line-chart>
    </Suspense>
  </div>
</template>

<script>
import LineChart from "@/components/LineChart";
import { graphsCollection } from "@/firebase/config";
import { ref } from "vue";

export default {
  components: {
    LineChart
  },
  props: {
    userId: {
      type: String,
      required: true
    },
    cardioMyopathyType: {
      type: String
    }
  },
  async setup(props) {
    const graphs = ref(await getGraphs());
    const error = ref("");

    async function getGraphs() {
      let graphCollection = [];

      await graphsCollection
        .where("userId", "==", props.userId)
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            let graph = {
              graphId: doc.id,
              graphInformation: doc.data()
            };
            graphCollection.push(graph);
          });
        });
      return graphCollection;
    }

    if (graphs.value.length === 0) {
      error.value = "No graphs found matching search";
    }

    return { graphs, error };
  }
};
</script>

<style scoped>
.center {
  margin: 0 auto;
  display: flex;
  justify-content: center;
}
</style>
