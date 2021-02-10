<template>
  <div>
    <nav class="nav-bar">
      <div class="logo">cardiomyopathie</div>
      <div class="nav-items">
        <div v-if="!user">
          <router-link class="nav-item" to="/">Home</router-link>
          <router-link class="nav-item" to="/login">Login</router-link>
          <router-link class="nav-item" to="/signup">Sign up</router-link>
        </div>
        <div v-else class="user-items">
          <router-link class="nav-item" to="/dashboard">Dashboard</router-link>
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
  padding: 30px;
  background: #0b6dff;
  display: flex;
  justify-content: space-between;
}

.user-items {
  display: flex;
}

.logo {
  color: white;
  text-transform: uppercase;
}

.logout-btn {
  margin: 0;
  padding: 0;
  margin-left: 20px;
}

.nav-item {
  color: white;
  margin-left: 20px;
  text-decoration: none;
}

a.router-link-exact-active {
  text-decoration: underline;
}
</style>
