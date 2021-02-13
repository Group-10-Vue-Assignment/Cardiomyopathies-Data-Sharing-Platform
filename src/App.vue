<template>
  <NavBar />
  <NotificationContainer />
  <router-view />
</template>
<script>
import NavBar from "./components/NavBar.vue";
import NotificationContainer from "@/components/NotificationContainer.vue";
export default {
  components: {
    NavBar,
    NotificationContainer
  }
};
</script>
<style>
* {
  padding: 0%;
  margin: 0%;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #496a8c;
}
</style>
