<template>
  <form @submit.prevent="handleSubmit" class="col s12">
    <h3>Login</h3>
    <div v-if="error" class="error card-panel red">
      <span>{{ error }}</span>
    </div>
    <label>Enter your username (Email):</label>
    <input class="validate" type="email" placeholder="Email" v-model="email" />
    <label>Enter your password:</label>
    <input
      class="validate"
      type="password"
      placeholder="Password"
      v-model="password"
    />
    <button class="waves-effect waves-light btn-small blue">Log in</button>
  </form>
  <div class="switch-user">
    <router-link to="/signup">
      <button class="waves-effect waves-light btn-small green">
        Sign Up
      </button>
    </router-link>
    <router-link to="/forgotpassword">
      <button class="waves-effect waves-light btn-small red">
        Reset Password
      </button>
    </router-link>
  </div>
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
      router.push({ name: "UserDashboard" });
    };

    return { email, password, handleSubmit, error };
  }
};
</script>

<style>
.error {
  font-size: 90%;
  color: white;
  text-align: center;
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
  width: 35%;
  display: block;
  margin: 50px auto;
  text-align: left;
}

.icon_style {
  position: absolute;
  right: 10px;
  top: 10px;
  font-size: 20px;
  color: white;
  cursor: pointer;
}

input[type="checkbox"] {
  display: inline-block;
  width: 16px;
  margin: 0 10px 0 0;
}

button:disabled {
  background-color: rgb(97 139 202 / 52%);
  cursor: -moz-grab;
}
</style>
