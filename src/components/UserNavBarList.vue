<template>
  <li>
    <router-link to="/helper" id="user-help-test-identifier"
      ><i class="material-icons right">help</i>Help</router-link
    >
  </li>
  <li>
    <router-link to="/" id="user-home-test-identifier">Home</router-link>
  </li>
  <li>
    <router-link to="/global-dashboard" id="user-gdashboard-test-identifier"
      >Global Dashboard</router-link
    >
  </li>
  <li>
    <router-link to="/user-dashboard" id="user-udashboard-test-identifier"
      >User Dashboard</router-link
    >
  </li>
  <li>
    <router-link to="/search-dashboard" id="user-sdashboard-test-identifier"
      >Search Dashboard</router-link
    >
  </li>
  <li>
    <router-link to="/add-graph" id="user-add-graph-test-identifier"
      >Add Graph</router-link
    >
  </li>
  <li class="logout" @click="$emit('handleClick')">
    <router-link to="/">
      <i class="small material-icons">exit_to_app</i>
    </router-link>
  </li>
</template>

<script>
export default {
  emits: ["handleClick"]
};
</script>
