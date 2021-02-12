<template>
  <form @submit.prevent="handleSubmit">
    <h3>Login</h3>
    <input type="email" placeholder="Email" v-model="email" />
    <input type="password" placeholder="Password" v-model="password" />
    <div v-if="error" class="error">{{ error }}</div>
    <button>Log in</button>

    <div class="switch-user">
      <router-link to="/signup">Not registared?</router-link>

      <router-link to="/forgotpassword">Forgotten password?</router-link>
    </div>
  </form>
</template>

<script>
import { ref } from "vue";
import useLogin from "../firebaseFunctions/useLogin.js";
import { useRouter } from "vue-router";
export default {
  setup() {
    const router = useRouter();

    const { login, error } = useLogin();
    const email = ref(null);
    const password = ref(null);
    const handleSubmit = async () => {
      await login(email.value, password.value);
      router.push({ name: "DashBoard" });
    };

    return { email, password, handleSubmit, error };
  }
};
</script>

<style>
.error {
  margin: 21px;
  text-align: center;
  color: red;
}

.switch-user {
  margin-top: 10px;
  text-align: center;
  color: #555;
  align-items: center;
  display: flex;
  justify-content: center;
  flex-direction: column;
}

.switch-user a {
  margin-top: 7px;
  text-decoration: none;
  color: #555;
}

form {
  width: 450px;
  display: block;
  margin: 50px auto;
  background: white;
  text-align: left;
  padding: 40px;
  border-radius: 10px;
}

form h3 {
  margin-left: 15px;
  margin-bottom: 20px;
}

input,
select {
  display: block;
  padding: 15px;
  width: 100%;
  box-sizing: border-box;
  border: none;
  border-bottom: 1px solid #ddd;
  color: #555;
}
input[type="checkbox"] {
  display: inline-block;
  width: 16px;
  margin: 0 10px 0 0;
}

button {
  display: block;
  background: #0b6dff;
  border: 0;
  margin: auto;
  padding: 10px 20px;
  cursor: pointer;
  margin-top: 20px;
  color: white;
  border-radius: 20px;
}
</style>
