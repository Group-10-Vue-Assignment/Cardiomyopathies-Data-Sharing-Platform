<template>
  <NavBar />
  <NotificationContainer />
  <Suspense>
    <router-view />
  </Suspense>
</template>
<script>
import M from "materialize-css";
import NavBar from "./components/NavBar.vue";
import NotificationContainer from "@/components/NotificationContainer.vue";
import { onMounted } from "vue";
export default {
  components: {
    NavBar,
    NotificationContainer
  },
  setup() {
    onMounted(() => {
      M.AutoInit();
    });
  }
};
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: grey;
}
* {
  padding: 0%;
  margin: 0%;
}
.center {
  margin: 0 auto;
  display: flex;
  justify-content: center;
}
form {
  width: 40%;
  display: block;
  margin: 50px auto;
  margin-bottom: 0;
  text-align: left;
}
.displayBlock {
  display: block;
}
::-moz-selection {
  background: #c9e2ff85;
}
::selection {
  background: #c9e2ff85;
}
::-webkit-scrollbar {
  width: 5px;
}
::-webkit-scrollbar-track {
  background: #f1f1f1;
}
::-webkit-scrollbar-thumb {
  background: #6f8691;
}
::-webkit-scrollbar-thumb:hover {
  background: #6b808b;
}
::-webkit-scrollbar-thumb:active {
  background: #546e7a;
}
</style>
