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
.pagination-btns {
  margin-top: -15px;
  margin-bottom: 15px;
}
.popup {
  padding: 2%;
  text-align: center;
}
form {
  margin-left: auto;
  margin-right: auto;
  margin-top: 50px;
  width: 40%;
  display: block;
  text-align: left;
}

@media only screen and (max-width: 992px) {
  form {
    width: 80%;
  }
}
.centered-graph-info {
  margin-left: auto;
  margin-right: auto;
  width: 85%;
  position: relative;
}

.displayBlock {
  display: block;
}
a.router-link-exact-active {
  cursor: default;
  background-color: rgba(255, 255, 255, 0.1);
  text-decoration: none;
}
.noSelect {
  cursor: default;
  user-select: none;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
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
