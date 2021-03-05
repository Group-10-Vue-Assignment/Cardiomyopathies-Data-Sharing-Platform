<template>
  <li>
    <router-link to="/" id="user-home-test-identifier">
      <i class="material-icons right">home</i>Home</router-link
    >
  </li>
  <li v-if="!horizontalSwitch">
    <router-link to="/global-dashboard" id="user-gdashboard-test-identifier"
      ><i class="material-icons right">language</i>Global Dashboard</router-link
    >
  </li>
  <li v-if="!horizontalSwitch">
    <router-link to="/user-dashboard" id="user-udashboard-test-identifier"
      ><i class="material-icons right">person</i>User Dashboard</router-link
    >
  </li>
  <li v-if="!horizontalSwitch">
    <router-link to="/search-dashboard" id="user-sdashboard-test-identifier"
      ><i class="material-icons right">search</i>Search Dashboard</router-link
    >
  </li>
  <li v-if="horizontalSwitch">
    <a class="dropdown-trigger" href="#" data-target="dashboard-dropdown"
      ><i class="material-icons right">dashboard</i>Dashboard</a
    >
  </li>
  <li>
    <router-link to="/add-graph" id="user-add-graph-test-identifier"
      ><i class="material-icons right">poll</i>Add Graph</router-link
    >
  </li>
  <li>
    <router-link to="/helper" id="user-help-test-identifier">
      <i class="material-icons right">help</i>Help</router-link
    >
  </li>
  <li class="logout" @click="$emit('handleClick')">
    <router-link to="/login">
      <i class=" material-icons right">exit_to_app</i>
      Logout
    </router-link>
  </li>

  <ul
    id="dashboard-dropdown"
    class="dropdown-content blue-grey lighten 5"
    v-if="horizontalSwitch"
  >
    <li>
      <router-link to="/global-dashboard" id="user-gdashboard-test-identifier"
        ><i class="material-icons right white-text">language</i>
        <p class="white-text">Global</p></router-link
      >
    </li>
    <li>
      <router-link to="/user-dashboard" id="user-udashboard-test-identifier"
        ><i class="material-icons right white-text">person</i>
        <p class="white-text">User</p></router-link
      >
    </li>
    <li>
      <router-link to="/search-dashboard" id="user-sdashboard-test-identifier"
        ><i class="material-icons right white-text">search</i>
        <p class="white-text">Search</p></router-link
      >
    </li>
  </ul>
</template>

<script>
export default {
  emits: ["handleClick"],
  props: {
    horizontalSwitch: {
      type: Boolean,
      required: false,
      default: true
    }
  }
};
</script>
