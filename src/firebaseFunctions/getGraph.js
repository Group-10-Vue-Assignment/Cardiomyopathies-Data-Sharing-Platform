import { ref } from "vue";
import { graphsCollection } from "@/firebase/config";
import store from "@/store";

const getGraph = async id => {
  const error = ref(null);
  const loader = ref(true);
  let docRef = await graphsCollection.doc(id).get();
  let graphInformation = docRef.data();
  let yPlots = [];
  if (graphInformation) {
    yPlots = await getYPlotsForGraph(id);
    loader.value = false;
  } else {
    error.value = "graph does not exist";
    loader.value = false;
  }
  return { graphInformation, yPlots, error, loader };
};

const getAllGraphs = async () => {
  let graphCollection = [];

  await graphsCollection.get().then(querySnapshot => {
    querySnapshot.forEach(doc => {
      let graph = {
        graphId: doc.id,
        graphInformation: doc.data()
      };
      graphCollection.push(graph);
    });
  });

  await Promise.all(
    graphCollection.map(async graph => {
      graph.yPlots = await getYPlotsForGraph(graph.graphId);
    })
  );

  return graphCollection;
};

const getAllGraphsPagination = async lastVisible => {
  let graphs = [];
  let first = graphsCollection
    .orderBy("timeOfInsert", "desc")
    .startAfter(lastVisible)
    .limit(2);

  await first.get().then(querySnapshot => {
    querySnapshot.forEach(doc => {
      let graph = {
        graphId: doc.id,
        graphInformation: doc.data()
      };
      graphs.push(graph);
    });

    lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];
    console.log("last", lastVisible);
  });

  await Promise.all(
    graphs.map(async graph => {
      graph.yPlots = await getYPlotsForGraph(graph.graphId);
    })
  );

  console.log(graphs);
  store.commit("SET_GRAPHS", graphs);
  return lastVisible;
};

const getGraphsBySearchTerm = async (searchTerm, searchValue) => {
  let graphCollection = [];

  await graphsCollection
    .where(searchTerm, "==", searchValue)
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

  await Promise.all(
    graphCollection.map(async graph => {
      graph.yPlots = await getYPlotsForGraph(graph.graphId);
    })
  );

  return graphCollection;
};

const getGraphsByTwoSearchTerms = async (
  searchTerm1,
  searchValue1,
  searchTerm2,
  searchValue2
) => {
  let graphCollection = [];

  await graphsCollection
    .where(searchTerm1, "==", searchValue1)
    .where(searchTerm2, "==", searchValue2)
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

  await Promise.all(
    graphCollection.map(async graph => {
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

export {
  getGraph,
  getAllGraphs,
  getAllGraphsPagination,
  getGraphsBySearchTerm,
  getGraphsByTwoSearchTerms
};
