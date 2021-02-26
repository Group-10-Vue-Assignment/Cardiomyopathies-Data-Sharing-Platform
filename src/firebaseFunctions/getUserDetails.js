import { projectFireStore } from "../firebase/config";
const getUserDetails = async id => {
  // register the firestore collection reference
  let userProfile = await projectFireStore
    .collection("users")
    .doc(id)
    .get();
  return userProfile.data();
};

export default getUserDetails;
