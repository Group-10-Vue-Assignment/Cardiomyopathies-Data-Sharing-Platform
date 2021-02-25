import { ref } from "vue";
import { graphsCollection } from "@/firebase/config";

const getGraph = async id => {
  const error = ref(null);
  const loader = ref(true);
  let docRef = await graphsCollection.doc(id).get();
  let graphInformation = docRef.data();
  if (graphInformation) {
    loader.value = false;
  } else {
    error.value = "graph does not exist";
    loader.value = false;
  }
  return { graphInformation, error, loader };
};

export { getGraph };
