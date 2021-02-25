import { ref } from "vue";
import { projectAuth } from "../firebase/config";

// collect user refs
const user = ref(projectAuth.currentUser);

// detech is user auth changes
projectAuth.onAuthStateChanged(_user => {
  console.log("User state change. Current user is:", _user);
  user.value = _user;
});

const getUser = () => {
  return { user };
};

export default getUser;
