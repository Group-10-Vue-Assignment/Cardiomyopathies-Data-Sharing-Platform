import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
//import store from './store';
import { projectAuth } from "./firebase/config";
import VueApexCharts from "vue3-apexcharts";

let app;

projectAuth.onAuthStateChanged(() => {
  if (!app) {
    app = createApp(App)
      .use(router)
      .use(VueApexCharts)
      .mount("#app");
  }
});
