<template>
  <div>
    <nav class="nav-bar">
      <div class="logo">
        CDSP
        <p class="slogan">Cardiomyopathies-Data-Sharing-Platform</p>
      </div>
      <div class="nav-items">
        <div v-if="!user" class="non-user">
          <router-link class="nav-item" to="/">Home</router-link>
          <router-link class="nav-item" to="/login">Login</router-link>
          <router-link class="nav-item" to="/signup">Sign up</router-link>
        </div>
        <div v-else class="user-items">
          <router-link class="nav-item" to="/dashboard">Dashboard</router-link>
          <router-link class="nav-item" to="/searchpage"
            >Search Graphs</router-link
          >
          <router-link class="nav-item" to="/add-graph">Add Graph</router-link>
          <button @click="handleClick" class="logout-btn">Log out</button>
        </div>
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
.nav-bar {
  padding: 2%;
  background: #618bca;
  display: flex;
  justify-content: space-between;
}

.user-items {
  display: flex;
}

.non-user {
  display: flex;
}

.logo {
  font-size: 25px;
  color: white;
  text-transform: uppercase;
  font-weight: bold;
}

.slogan {
  font-size: 15px;
  color: white;
  text-transform: uppercase;
  font-weight: 500;
}

.logout-btn {
  margin: 0;
  padding: 0;
  font-size: 16px;
  margin-left: 20px;
  margin-top: 16px;
  background: #618bca;
}

.nav-item {
  color: white;
  margin-top: 16px;
  margin-left: 20px;

  text-decoration: none;
}

a.router-link-exact-active {
  text-decoration: underline;
}
</style>
