import { projectAuth } from "../firebase/config";
import { ref } from "vue";
const error = ref(null);

const login = async (email, password) => {
  error.value = null;

  try {
    const res = await projectAuth.signInWithEmailAndPassword(email, password);
    error.value = null;

    return res;
  } catch (err) {
    console.log(err.message);
    error.value = `${err.message}`;
  }
};

const useLogin = () => {
  return { error, login };
};

export default useLogin;
