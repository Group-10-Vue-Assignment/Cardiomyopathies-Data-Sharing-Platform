import { ref } from "vue";
import { projectAuth, projectFireStore } from "../firebase/config";

const error = ref(null);
const isPending = ref(false);

const signup = async (
  email,
  password,
  displayName,
  institution,
  address,
  phoneNumber
) => {
  error.value = null;
  isPending.value = true;

  try {
    const res = await projectAuth.createUserWithEmailAndPassword(
      email,
      password
    );

    let user = {
      name: displayName,
      email: email,
      institution: institution,
      address: address,
      phoneNumber: phoneNumber
    };

    if (!res) {
      throw new Error("Could not complete signup");
    }
    await res.user.updateProfile({ displayName });
    await projectFireStore.collection("users").add(user);
    error.value = null;
    isPending.value = false;

    return res;
  } catch (err) {
    console.log(err.message);
    error.value = err.message;
    isPending.value = false;
  }
};

const useSignup = () => {
  return { error, signup, isPending };
};

export default useSignup;
