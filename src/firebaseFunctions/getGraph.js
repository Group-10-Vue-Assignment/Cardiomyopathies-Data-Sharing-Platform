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

const getNextGlobalGraph = async lastVisible => {
  let graphs = [];
  let current = graphsCollection
    .orderBy("timeOfInsert", "desc")
    .startAfter(lastVisible)
    .limit(1);

  await current
    .get()
    .then(querySnapshot => {
      lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];
      console.log("last", lastVisible);

      querySnapshot.forEach(doc => {
        let graph = {
          graphId: doc.id,
          graphInformation: doc.data()
        };
        graphs.push(graph);
      });
    })
    .then(() => {
      if (lastVisible) {
        let next = graphsCollection
          .orderBy("timeOfInsert", "desc")
          .startAfter(lastVisible)
          .limit(1);
        next.get().then(snap => {
          if (snap.size === 0) {
            store.commit("DISABLE_GLOBAL_DASHBOARD_PREVIOUS_BUTTON", false);
            store.commit("DISABLE_GLOBAL_DASHBOARD_NEXT_BUTTON", true);
          } else {
            store.commit("DISABLE_GLOBAL_DASHBOARD_NEXT_BUTTON", false);
            store.commit("DISABLE_GLOBAL_DASHBOARD_PREVIOUS_BUTTON", false);
          }
        });
      } else {
        store.commit("DISABLE_GLOBAL_DASHBOARD_NEXT_BUTTON", true);
        store.commit("DISABLE_GLOBAL_DASHBOARD_PREVIOUS_BUTTON", true);
      }
    });

  await addYPlots(graphs);

  store.commit("SET_GLOBAL_DASBOARD_GRAPH", graphs);
  return lastVisible;
};

const getPreviousGlobalGraph = async lastVisible => {
  let graphs = [];
  let current = graphsCollection
    .orderBy("timeOfInsert", "desc")
    .endBefore(lastVisible)
    .limitToLast(1);

  await current
    .get()
    .then(querySnapshot => {
      lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];
      console.log("last", lastVisible);

      querySnapshot.forEach(doc => {
        let graph = {
          graphId: doc.id,
          graphInformation: doc.data()
        };
        graphs.push(graph);
      });
    })
    .then(() => {
      let previous = graphsCollection
        .orderBy("timeOfInsert", "desc")
        .endBefore(lastVisible)
        .limitToLast(1);
      previous.get().then(snap => {
        if (snap.size === 0) {
          store.commit("DISABLE_GLOBAL_DASHBOARD_PREVIOUS_BUTTON", true);
          store.commit("DISABLE_GLOBAL_DASHBOARD_NEXT_BUTTON", false);
        } else {
          store.commit("DISABLE_GLOBAL_DASHBOARD_PREVIOUS_BUTTON", false);
          store.commit("DISABLE_GLOBAL_DASHBOARD_NEXT_BUTTON", false);
        }
      });
    });

  await addYPlots(graphs);

  store.commit("SET_GLOBAL_DASBOARD_GRAPH", graphs);

  return lastVisible;
};

const getNextUserGraph = async (lastVisible, userId) => {
  let graphs = [];
  let current = graphsCollection
    .where("userId", "==", userId)
    .orderBy("timeOfInsert", "desc")
    .startAfter(lastVisible)
    .limit(1);

  await current
    .get()
    .then(querySnapshot => {
      lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];
      console.log("last", lastVisible);

      querySnapshot.forEach(doc => {
        let graph = {
          graphId: doc.id,
          graphInformation: doc.data()
        };
        graphs.push(graph);
      });
    })
    .then(() => {
      if (lastVisible) {
        let next = graphsCollection
          .where("userId", "==", userId)
          .orderBy("timeOfInsert", "desc")
          .startAfter(lastVisible)
          .limit(1);
        next.get().then(snap => {
          if (snap.size === 0) {
            store.commit("DISABLE_USER_DASHBOARD_PREVIOUS_BUTTON", false);
            store.commit("DISABLE_USER_DASHBOARD_NEXT_BUTTON", true);
          } else {
            store.commit("DISABLE_USER_DASHBOARD_NEXT_BUTTON", false);
            store.commit("DISABLE_USER_DASHBOARD_PREVIOUS_BUTTON", false);
          }
        });
      } else {
        store.commit("DISABLE_USER_DASHBOARD_NEXT_BUTTON", true);
        store.commit("DISABLE_USER_DASHBOARD_PREVIOUS_BUTTON", true);
      }
    });

  await addYPlots(graphs);

  store.commit("SET_USER_DASHBOARD_GRAPH", graphs);
  return lastVisible;
};

const getPreviousUserGraph = async (lastVisible, userId) => {
  let graphs = [];
  let current = graphsCollection
    .where("userId", "==", userId)
    .orderBy("timeOfInsert", "desc")
    .endBefore(lastVisible)
    .limitToLast(1);

  await current
    .get()
    .then(querySnapshot => {
      lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];
      console.log("last", lastVisible);

      querySnapshot.forEach(doc => {
        let graph = {
          graphId: doc.id,
          graphInformation: doc.data()
        };
        graphs.push(graph);
      });
    })
    .then(() => {
      let previous = graphsCollection
        .where("userId", "==", userId)
        .orderBy("timeOfInsert", "desc")
        .endBefore(lastVisible)
        .limitToLast(1);
      previous.get().then(snap => {
        if (snap.size === 0) {
          store.commit("DISABLE_USER_DASHBOARD_PREVIOUS_BUTTON", true);
          store.commit("DISABLE_USER_DASHBOARD_NEXT_BUTTON", false);
        } else {
          store.commit("DISABLE_USER_DASHBOARD_PREVIOUS_BUTTON", false);
          store.commit("DISABLE_USER_DASHBOARD_NEXT_BUTTON", false);
        }
      });
    });

  await addYPlots(graphs);

  store.commit("SET_USER_DASHBOARD_GRAPH", graphs);

  return lastVisible;
};

const getNextSearchGraph = async (
  lastVisible,
  cardiomyopathyTypeValue,
  mutatedGeneTypeValue
) => {
  let graphs = [];
  let current = graphsCollection
    .where("cardiomyopathyType", "==", cardiomyopathyTypeValue)
    .where("mutatedGeneType", "==", mutatedGeneTypeValue)
    .orderBy("timeOfInsert", "desc")
    .startAfter(lastVisible)
    .limit(1);

  await current
    .get()
    .then(querySnapshot => {
      lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];
      console.log("last", lastVisible);

      querySnapshot.forEach(doc => {
        let graph = {
          graphId: doc.id,
          graphInformation: doc.data()
        };
        graphs.push(graph);
      });
    })
    .then(() => {
      if (lastVisible) {
        let next = graphsCollection
          .where("cardiomyopathyType", "==", cardiomyopathyTypeValue)
          .where("mutatedGeneType", "==", mutatedGeneTypeValue)
          .orderBy("timeOfInsert", "desc")
          .startAfter(lastVisible)
          .limit(1);
        next.get().then(snap => {
          if (snap.size === 0) {
            store.commit("DISABLE_SEARCH_PREVIOUS_BUTTON", false);
            store.commit("DISABLE_SEARCH_NEXT_BUTTON", true);
          } else {
            store.commit("DISABLE_SEARCH_NEXT_BUTTON", false);
            store.commit("DISABLE_SEARCH_PREVIOUS_BUTTON", false);
          }
        });
      } else {
        store.commit("DISABLE_SEARCH_NEXT_BUTTON", true);
        store.commit("DISABLE_SEARCH_PREVIOUS_BUTTON", true);
      }
    });

  await addYPlots(graphs);

  store.commit("SET_SEARCH_GRAPH", graphs);
  return lastVisible;
};

const getPreviousSearchGraph = async (
  lastVisible,
  cardiomyopathyTypeValue,
  mutatedGeneTypeValue
) => {
  let graphs = [];
  let current = graphsCollection
    .where("cardiomyopathyType", "==", cardiomyopathyTypeValue)
    .where("mutatedGeneType", "==", mutatedGeneTypeValue)
    .orderBy("timeOfInsert", "desc")
    .endBefore(lastVisible)
    .limitToLast(1);

  await current
    .get()
    .then(querySnapshot => {
      lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];
      console.log("last", lastVisible);

      querySnapshot.forEach(doc => {
        let graph = {
          graphId: doc.id,
          graphInformation: doc.data()
        };
        graphs.push(graph);
      });
    })
    .then(() => {
      let next = graphsCollection
        .where("cardiomyopathyType", "==", cardiomyopathyTypeValue)
        .where("mutatedGeneType", "==", mutatedGeneTypeValue)
        .orderBy("timeOfInsert", "desc")
        .endBefore(lastVisible)
        .limitToLast(1);
      next.get().then(snap => {
        if (snap.size === 0) {
          store.commit("DISABLE_SEARCH_PREVIOUS_BUTTON", true);
          store.commit("DISABLE_SEARCH_NEXT_BUTTON", false);
        } else {
          store.commit("DISABLE_SEARCH_NEXT_BUTTON", false);
          store.commit("DISABLE_SEARCH_PREVIOUS_BUTTON", false);
        }
      });
    });

  await addYPlots(graphs);

  store.commit("SET_SEARCH_GRAPH", graphs);
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

  await addYPlots(graphCollection);

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

  await addYPlots(graphCollection);

  return graphCollection;
};

let addYPlots = async graphCollection => {
  await Promise.all(
    graphCollection.map(async graph => {
      graph.yPlots = await getYPlotsForGraph(graph.graphId);
    })
  );

  return graphCollection;
};

let getYPlotsForGraph = async graphId => {
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
};

export {
  getGraph,
  getAllGraphs,
  getNextGlobalGraph,
  getPreviousGlobalGraph,
  getNextUserGraph,
  getPreviousUserGraph,
  getNextSearchGraph,
  getPreviousSearchGraph,
  getGraphsBySearchTerm,
  getGraphsByTwoSearchTerms
};
