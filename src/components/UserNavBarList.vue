<template>
  <li>
    <router-link to="/helper" id="user-help-test-identifier"
      ><i class="material-icons right">help</i>Help</router-link
    >
  </li>
  <li>
    <router-link to="/" id="user-home-test-identifier">
      <i class="material-icons right">home</i>Home</router-link
    >
  </li>
  <li>
    <router-link to="/global-dashboard" id="user-gdashboard-test-identifier"
      ><i class="material-icons right">language</i>Global Dashboard</router-link
    >
  </li>
  <li>
    <router-link to="/user-dashboard" id="user-udashboard-test-identifier"
      ><i class="material-icons right">person</i>User Dashboard</router-link
    >
  </li>
  <li>
    <router-link to="/search-dashboard" id="user-sdashboard-test-identifier"
      ><i class="material-icons right">search</i>Search Dashboard</router-link
    >
  </li>
  <li>
    <router-link to="/add-graph" id="user-add-graph-test-identifier"
      ><i class="material-icons right">poll</i>Add Graph</router-link
    >
  </li>
  <li class="logout" @click="$emit('handleClick')">
    <router-link to="/">
      <i class=" material-icons right">exit_to_app</i>
      Logout
    </router-link>
  </li>
</template>

<script>
export default {
  emits: ["handleClick"]
};
</script>
