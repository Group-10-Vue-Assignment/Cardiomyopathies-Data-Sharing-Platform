import { ref, watchEffect } from "vue";
import { projectFireStore } from "../firebase/config";
const getUserDetails = id => {
  const userDetails = ref("");
  const error = ref(null);

  // register the firestore collection reference
  let documentRef = projectFireStore.collection("users").doc(id);

  const unsub = documentRef.onSnapshot(
    doc => {
      // need to make sure the doc exists & has data
      if (doc.data()) {
        console.log(doc.data());
        userDetails.value = {
          name: doc.data().name,
          email: doc.data().email,
          institution: doc.data().institution,
          phoneNumber: doc.data().phoneNumber
        };
        error.value = null;
      } else {
        error.value = "user dosent exisit";
      }
    },
    err => {
      console.log(err.message);
      error.value = err.message;
    }
  );

  watchEffect(onInvalidate => {
    onInvalidate(() => unsub());
  });

  return { userDetails, error };
};

export default getUserDetails;
