import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { projectAuth } from "./firebase/config";
import VueApexCharts from "vue3-apexcharts";
import "materialize-css";
import "materialize-css/dist/css/materialize.min.css";
import "material-design-icons/iconfont/material-icons.css";

let app;

projectAuth.onAuthStateChanged(() => {
  if (!app) {
    app = createApp(App)
      .use(router)
      .use(store)
      .use(VueApexCharts)
      .mount("#app");
  }
});
