<template>
  <div v-if="!user" class="non-user">
    <nav class="blue-grey lighten-1">
      <div class="nav-wrapper">
        <a class="brand-logo">Cardiomyopathies Data-Sharing Platform</a>
        <ul id="nav-mobile" class="right hide-on-med-and-down">
          <li><router-link to="/">Home</router-link></li>
          <li><router-link to="/login">Login</router-link></li>
          <li><router-link to="/signup">Sign up</router-link></li>
        </ul>
      </div>
    </nav>
  </div>
  <div v-else class="user-items">
    <nav class="blue-grey lighten-1">
      <div class="nav-wrapper">
        <a class="brand-logo">Cardiomyopathies Data-Sharing Platform</a>
        <ul id="nav-mobile" class="right hide-on-med-and-down">
          <li>
            <router-link to="/global-dashboard">Global Dashboard</router-link>
          </li>
          <li>
            <router-link to="/user-dashboard">User Dashboard</router-link>
          </li>
          <li><router-link to="/searchpage">Search Graphs</router-link></li>
          <li><router-link to="/add-graph">Add Graph</router-link></li>
          <li class="logout-btn" @click="handleClick">
            <i class="small material-icons">exit_to_app</i>
          </li>
        </ul>
      </div>
    </nav>
  </div>
</template>

<script>
import getUser from "../firebaseFunctions/getUser.js";
import { projectAuth } from "../firebase/config";
import { useRouter } from "vue-router";

export default {
  setup() {
    const router = useRouter();
    const { user } = getUser();
    console.log(user);

    //handle log out for user
    const handleClick = async () => {
      try {
        await projectAuth.signOut();
        router.push({ name: "Login" });
      } catch (err) {
        console.log(err.message);
      }
    };

    return { user, handleClick };
  }
};
</script>

<style scoped>
.brand-logo {
  margin-left: -48.5%;
}

.user-items {
  display: flex;
}

.non-user {
  display: flex;
}

.logout-btn {
  margin-right: 8px;
  cursor: pointer;
}

a.router-link-exact-active {
  background-color: rgba(255, 255, 255, 0.1);
  text-decoration: none;
}
</style>
