import { ref } from "vue";
import { graphsCollection } from "@/firebase/config";

const getGraph = async id => {
  const error = ref(null);
  let docRef = await graphsCollection.doc(id).get();
  let graphInformation = docRef.data();
  let yPlots = [];
  if (graphInformation) {
    yPlots = await getYPlotsForGraph(id);
  } else {
    error.value = "graph does not exist";
  }
  return { graphInformation, yPlots, error };
};

const getGraphsBySearchTerm = async (searchTerm, searchValue) => {
  let graphCollection = ref([]);

  await graphsCollection
    .where(searchTerm, "==", searchValue)
    .get()
    .then(querySnapshot => {
      querySnapshot.forEach(doc => {
        let graph = {
          graphId: doc.id,
          graphInformation: doc.data()
        };
        graphCollection.value.push(graph);
      });
    });

  await Promise.all(
    graphCollection.value.map(async graph => {
      graph.yPlots = await getYPlotsForGraph(graph.graphId);
    })
  );

  return graphCollection;
};

async function getYPlotsForGraph(graphId) {
  let plots = [];
  await graphsCollection
    .doc(graphId)
    .collection("yPlots")
    .get()
    .then(querySnapshot => {
      querySnapshot.forEach(doc => {
        plots.push(doc.data());
      });
    });
  return plots;
}

export { getGraph, getGraphsBySearchTerm };